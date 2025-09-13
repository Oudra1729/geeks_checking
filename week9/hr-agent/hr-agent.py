#!/usr/bin/env python3
"""
hr-agent.py

Minimal CLI HR Agent:
- Search candidates (simple query parsing)
- Save named shortlists (data/shortlists.json)
- Draft outreach email (uses OpenAI model)
- Show HTML preview (printed)
- Tiny analytics (count by stage, top 3 skills)

Env vars required:
- API_KEY (OpenAI)
- BASE_URL (optional, e.g. https://api.openai.com/v1)
- MODEL (e.g. gpt-4o-mini)
- MONGODB_URI (optional; if not provided, fallback to data/*.json)
- DB_NAME (optional)
- CANDIDATES_COLLECTION (default "candidates")
- JOBS_COLLECTION (default "jobs")

Data folder expectation:
data/candidates.json (>=12 items)
data/jobs.json (2-3 items)
data/shortlists.json (auto-created)
"""

import os
import re
import json
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime, timedelta
from collections import Counter
from pathlib import Path

# OpenAI & Mongo
try:
    from openai import OpenAI
except Exception:
    OpenAI = None  # will guard later

try:
    from pymongo import MongoClient
except Exception:
    MongoClient = None

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL", None)
MODEL = os.getenv("MODEL", "gpt-4o-mini")
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "hr_agent")
CANDIDATES_COLLECTION = os.getenv("CANDIDATES_COLLECTION", "candidates")
JOBS_COLLECTION = os.getenv("JOBS_COLLECTION", "jobs")

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)
SHORTLISTS_PATH = DATA_DIR / "shortlists.json"

# Initialize OpenAI client if available
client = None
if OpenAI and API_KEY:
    kwargs = {"api_key": API_KEY}
    if BASE_URL:
        kwargs["base_url"] = BASE_URL
    client = OpenAI(**kwargs)

# Initialize Mongo if URI provided
mongo_client = None
candidates_col = None
jobs_col = None
if MongoClient and MONGODB_URI:
    try:
        mongo_client = MongoClient(MONGODB_URI)
        db = mongo_client[DB_NAME]
        candidates_col = db[CANDIDATES_COLLECTION]
        jobs_col = db[JOBS_COLLECTION]
    except Exception as e:
        print(f"⚠️  Warning: Could not connect to MongoDB: {e}")
        mongo_client = None

# ---------- Utilities: load / save local JSON fallback ----------
def load_json_file(fname: Path) -> List[Dict[str, Any]]:
    if not fname.exists():
        return []
    with fname.open("r", encoding="utf-8") as f:
        return json.load(f)

def save_shortlists_file(data: Dict[str, Any]):
    with SHORTLISTS_PATH.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def load_shortlists_file() -> Dict[str, Any]:
    if not SHORTLISTS_PATH.exists():
        return {}
    with SHORTLISTS_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)

# ---------- Data access ----------
def get_all_candidates() -> List[Dict[str, Any]]:
    """Return all candidates from Mongo if available, otherwise from data/candidates.json"""
    if candidates_col is not None:
        docs = list(candidates_col.find({}))
        # convert ObjectId etc. keep only fields expected
        for d in docs:
            d.pop("_id", None)
        return docs
    else:
        return load_json_file(DATA_DIR / "candidates.json")

def get_all_jobs() -> List[Dict[str, Any]]:
    if jobs_col is not None:
        docs = list(jobs_col.find({}))
        for d in docs:
            d.pop("_id", None)
        return docs
    else:
        return load_json_file(DATA_DIR / "jobs.json")

# ---------- Parsing user query (simple heuristics) ----------
def parse_query(text: str) -> Dict[str, Any]:
    """
    Extract:
    - role (string)
    - skills (list)
    - location (string)
    - minExp, maxExp (years ints)
    - availabilityWindowDays (int) -> if 'this month' or 'available this month' -> 45 days
    - top_n (int)
    """
    out = {
        "role": None,
        "skills": [],
        "location": None,
        "minExp": 0,
        "maxExp": 100,
        "availabilityWindowDays": None,
        "top_n": 5
    }
    t = text.lower()

    # top_n: "find 5 ..." or "top 5"
    m = re.search(r'\b(?:top|find)\s+(\d{1,2})\b', t)
    if m:
        out["top_n"] = int(m.group(1))

    # role: try "intern", "engineer", or phrase before "in <location>"
    role_match = re.search(r'(?:(?:find|search for)\s+)?(?:top\s+\d+\s+)?([a-z0-9\-\s]+?)\s+in\s+[A-Za-z\u0080-\u024F\s\-]+', text, re.IGNORECASE)
    if role_match:
        role = role_match.group(1).strip()
        out["role"] = role

    # skills: look for keywords after "React, Vue, Python" or "React interns" etc.
    # common pattern: "React interns" or "React and JS" -> capture capitalized tokens
    skills = re.findall(r'\b(React|Vue|Angular|Python|Django|Flask|Node|Node\.js|JS|JavaScript|TypeScript|SQL|HTML|CSS|Git)\b', text, flags=re.IGNORECASE)
    out["skills"] = list({s.capitalize() if s.lower() not in ("js","node.js","node") else ("JS" if s.lower().startswith("j") else s) for s in skills})

    # location: "in Casablanca" or "Casablanca,"
    m = re.search(r'\bin\s+([A-Za-z\u0080-\u024F\s\-]+)', text, re.IGNORECASE)
    if m:
        loc = m.group(1).strip().split(',')[0]
        out["location"] = loc

    # experience: "0-2 years", "0–2 years", "0 to 2 years", "1 year"
    m = re.search(r'(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s*years?', text, re.IGNORECASE)
    if m:
        out["minExp"] = int(m.group(1))
        out["maxExp"] = int(m.group(2))
    else:
        m2 = re.search(r'(\d{1,2})\s+years?', text, re.IGNORECASE)
        if m2:
            out["minExp"] = int(m2.group(1))
            out["maxExp"] = int(m2.group(1))

    # availability: "available this month", "available next month", "available immediately"
    if "available this month" in t or "available this month" in text.lower():
        out["availabilityWindowDays"] = 45
    elif "available next month" in t:
        out["availabilityWindowDays"] = 75
    elif "available immediately" in t or "available now" in t or "available asap" in t:
        out["availabilityWindowDays"] = 14
    else:
        # check for explicit "available within X days"
        m = re.search(r'available (?:within\s*)?(\d{1,3})\s*days?', t)
        if m:
            out["availabilityWindowDays"] = int(m.group(1))

    return out

# ---------- Scoring and search ----------
def candidate_score_and_reason(candidate: Dict[str, Any], filters: Dict[str, Any]) -> Tuple[int, str]:
    """
    score = +2 per required skill match
          +1 if location exact match
          +1 if experience within user range (±1 year ok)
          +1 if availabilityDate within next availabilityWindowDays
    """
    score = 0
    reasons = []

    cand_skills = [s.strip() for s in candidate.get("skills", [])]
    req_skills = [s.strip() for s in filters.get("skills", [])]

    # skill matches
    skills_matched = []
    for rs in req_skills:
        # case-insensitive partial match
        for cs in cand_skills:
            if cs.lower() == rs.lower() or cs.lower().startswith(rs.lower()) or rs.lower().startswith(cs.lower()):
                skills_matched.append(cs)
                break
    if skills_matched:
        score += 2 * len(skills_matched)
        reasons.append(f"{'+'.join(skills_matched)} match (+{2*len(skills_matched)})")

    # location
    if filters.get("location") and candidate.get("location"):
        if candidate["location"].strip().lower() == filters["location"].strip().lower():
            score += 1
            reasons.append("Location match (+1)")

    # experience
    try:
        exp = float(candidate.get("experienceYears", 0))
    except Exception:
        exp = 0
    minE = filters.get("minExp", 0)
    maxE = filters.get("maxExp", 100)
    if (exp >= (minE - 1)) and (exp <= (maxE + 1)):
        score += 1
        reasons.append("Experience fits (±1)")

    # availability
    if filters.get("availabilityWindowDays") is not None:
        avail_str = candidate.get("availabilityDate")
        if avail_str:
            try:
                avail = datetime.fromisoformat(avail_str)
                days_diff = (avail - datetime.now()).days
                if days_diff <= filters["availabilityWindowDays"]:
                    score += 1
                    reasons.append("Available soon (+1)")
            except Exception:
                pass

    reason = " → ".join(reasons) if reasons else "No strong matches"
    return score, reason

def search_candidates(filters: Dict[str, Any], top_n: int = 5) -> List[Dict[str, Any]]:
    candidates = get_all_candidates()
    scored = []
    for c in candidates:
        s, r = candidate_score_and_reason(c, filters)
        scored.append({"candidate": c, "score": s, "reason": r})
    scored_sorted = sorted(scored, key=lambda x: x["score"], reverse=True)
    return scored_sorted[:top_n]

# ---------- Shortlist management ----------
def save_shortlist(name: str, candidate_indices: List[int], last_search_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    sl = load_shortlists_file()
    selected = []
    for i in candidate_indices:
        if 0 <= i < len(last_search_results):
            selected.append(last_search_results[i]["candidate"])
    sl[name] = selected
    save_shortlists_file(sl)
    return {"success": True, "name": name, "count": len(selected)}

def list_shortlists() -> List[str]:
    sl = load_shortlists_file()
    return list(sl.keys())

def get_shortlist(name: str) -> List[Dict[str, Any]]:
    sl = load_shortlists_file()
    return sl.get(name, [])

# ---------- Draft email using OpenAI ----------
def draft_email(recipients: List[Dict[str, Any]], job_title: str, tone: str = "friendly") -> Dict[str, Any]:
    """
    Returns {subject, text}
    Uses OpenAI client if available; otherwise uses a simple template.
    """
    jobs = get_all_jobs()
    job = next((j for j in jobs if j.get("title", "").lower() == job_title.lower()), None)
    if not job:
        return {"error": f"Job '{job_title}' not found in jobs data."}

    recipient_names = ", ".join([f"{r.get('firstName','')} {r.get('lastName','')}".strip() for r in recipients])

    system_prompt = (
        "You are a recruiting assistant. Generate a concise email subject and a plain-text outreach email body. "
        f"Tone: {tone}. Job title: {job['title']}. JD snippet: {job.get('jdSnippet','')}. "
        f"Skills required: {', '.join(job.get('skillsRequired', []))}."
    )
    user_prompt = f"Recipients: {recipient_names}\nWrite: subject line and body. Keep it short and action-oriented."

    if client:
        try:
            resp = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.2,
                max_tokens=400
            )
            text = resp.choices[0].message.content.strip()
            # heuristic: first line as subject if user included "Subject:"; otherwise craft subject
            subject = None
            body = None
            # try find "Subject:" token
            m_sub = re.search(r'(?i)subject:\s*(.*)', text)
            if m_sub:
                subject = m_sub.group(1).strip().splitlines()[0]
                body = text[m_sub.end():].strip()
            else:
                lines = text.splitlines()
                if len(lines) > 0 and len(lines[0]) < 80:
                    subject = lines[0].strip()
                    body = "\n".join(lines[1:]).strip()
                else:
                    subject = f"Opportunity: {job['title']}"
                    body = text
            return {"subject": subject, "text": body}
        except Exception as e:
            print(f"⚠️ OpenAI call failed: {e}")

    # Fallback simple template
    subject = f"Opportunity: {job['title']}"
    text = (
        f"Hi {recipient_names.split(',')[0].split()[0]},\n\n"
        f"We're hiring for {job['title']} in {job.get('location','')} — we think your background could be a great fit. "
        f"The role involves: {job.get('jdSnippet','')}\n\n"
        "Would you be open to a quick 15-minute chat this week?\n\nBest,\nHR Team"
    )
    return {"subject": subject, "text": text}

# ---------- HTML template ----------
def html_template(email: Dict[str, str], closing: Optional[str] = None) -> str:
    closing_line = closing if closing is not None else "Best regards,\nHR Team"
    body_html = email["text"].replace("\n", "<br>")
    return f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    body {{ font-family: Arial, Helvetica, sans-serif; line-height:1.5; }}
    .container {{ max-width:680px; margin:20px auto; padding:18px; border:1px solid #eee; border-radius:8px; }}
    h2 {{ margin-top:0; }}
    .footer {{ margin-top:18px; font-size:13px; color:#666; }}
  </style>
</head>
<body>
  <div class="container">
    <h2>{email['subject']}</h2>
    <div>{body_html}</div>
    <div class="footer">{closing_line.replace('\\n','<br>')}</div>
  </div>
</body>
</html>"""

# ---------- Analytics ----------
def analytics_summary() -> Dict[str, Any]:
    candidates = get_all_candidates()
    stages = [c.get("stage", "UNKNOWN") for c in candidates]
    count_by_stage = Counter(stages)
    skills = []
    for c in candidates:
        skills.extend(c.get("skills", []))
    top_skills = Counter(skills).most_common(3)
    return {"countByStage": dict(count_by_stage), "topSkills": top_skills, "total": len(candidates)}

# ---------- CLI helpers ----------
def print_search_results(results: List[Dict[str, Any]]):
    if not results:
        print("No candidates found.")
        return
    for idx, item in enumerate(results):
        c = item["candidate"]
        score = item["score"]
        reason = item["reason"]
        name = f"{c.get('firstName','')} {c.get('lastName','')}".strip()
        loc = c.get("location","")
        exp = c.get("experienceYears","")
        skills = ", ".join(c.get("skills", []))
        print(f"#{idx} | {name} | {loc} | {exp}y | score: {score} | skills: {skills}")
        print(f"     reason: {reason}")
        print()

def safe_int_list_from_tokens(tokens: List[str]) -> List[int]:
    out = []
    for t in tokens:
        try:
            out.append(int(t))
        except:
            pass
    return out

def handle_unknown_command(cmd: str) -> str:
    if not client:
        # fallback if OpenAI not configured
        return f"Unrecognized command '{cmd}'. Try: find, save, draft email, show analytics, list shortlists, show shortlist, repreview email, edit subject, edit closing, quit"
    
    prompt = (
        f"You are a helpful CLI assistant. The user typed an unknown command: '{cmd}'. "
        "Reply in a friendly, concise way telling them the command was not recognized, "
        "and suggest what commands they can try next."
    )
    
    try:
        resp = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=60
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        # fallback on error
        return f"Unrecognized command '{cmd}'. (AI suggestion failed: {e}) Try: find, save, draft email, show analytics, list shortlists, show shortlist, repreview email, edit subject, edit closing, quit"


# ---------- Main interactive loop ----------
def main():
    print("🤖 HR Agent CLI — simple search / shortlist / email / analytics")
    print("Examples:")
    print("  find 5 React interns in Casablanca, 0-2 years, available this month")
    print('  save #0 #2 as "FE-Intern-A"')
    print('  draft email for "FE-Intern-A" job "Frontend Intern" tone friendly')
    print("  edit subject 'New subject here' for last_email")
    print("  show analytics")
    print("  list shortlists")
    print("  show shortlist FE-Intern-A")
    print("  quit")
    print()

    last_search_results: List[Dict[str, Any]] = []
    last_email_preview: Optional[Dict[str, Any]] = None  # {subject,text,html,closing}

    while True:
        raw = input(">> ").strip()
        if not raw:
            continue
        cmd = raw.strip()

        if cmd.lower() in ("q", "quit", "exit"):
            print("Bye 👋")
            break

        # FIND command
        if cmd.lower().startswith("find "):
            filters = parse_query(cmd)
            top_n = filters.get("top_n", 5)
            results = search_candidates(filters, top_n=top_n)
            last_search_results = results
            print(f"\nTop {len(results)} results for parsed filters: {json.dumps(filters, ensure_ascii=False)}\n")
            print_search_results(results)
            continue

        # SAVE command: e.g. save #1 #3 as "FE-Intern-A"
        if cmd.lower().startswith("save "):
            # extract indices and name
            # indices like #1 #3
            idxs = re.findall(r'#(\d+)', cmd)
            idx_list = [int(i) for i in idxs]
            name_match = re.search(r'as\s+"([^"]+)"', cmd)
            if not name_match:
                name_match = re.search(r'as\s+([^\s]+)$', cmd)
            if not name_match:
                print("Please provide a name for the shortlist, e.g. as \"FE-Intern-A\"")
                continue
            name = name_match.group(1)
            res = save_shortlist(name, idx_list, last_search_results)
            print(f"Saved shortlist '{res['name']}' with {res['count']} candidates.")
            continue

        # LIST SHORTLISTS
        if cmd.lower().startswith("list shortlists"):
            keys = list_shortlists()
            if not keys:
                print("No shortlists saved.")
            else:
                for k in keys:
                    print(f"- {k} ({len(get_shortlist(k))} candidates)")
            continue

        # SHOW SHORTLIST
        m = re.match(r'show shortlist\s+(.+)', cmd, flags=re.IGNORECASE)
        if m:
            name = m.group(1).strip().strip('"')
            sl = get_shortlist(name)
            if not sl:
                print(f"No shortlist named '{name}'")
            else:
                print(f"Shortlist '{name}' ({len(sl)}):")
                for i, c in enumerate(sl):
                    print(f"#{i} {c.get('firstName','')} {c.get('lastName','')} | {c.get('location','')} | {c.get('experienceYears','')}y | skills: {', '.join(c.get('skills',[]))}")
            continue

        # DRAFT email:
        # draft email for "FE-Intern-A" job "Frontend Intern" tone friendly
        m = re.match(r'draft email for\s+"?([^"]+)"?\s+job\s+"?([^"]+)"?(?:\s+tone\s+(\w+))?', cmd, flags=re.IGNORECASE)
        if m:
            sl_name = m.group(1).strip()
            job_title = m.group(2).strip()
            tone = m.group(3).strip() if m.group(3) else "friendly"
            sl = get_shortlist(sl_name)
            if not sl:
                print(f"No shortlist named '{sl_name}'.")
                continue
            email = draft_email(sl, job_title, tone=tone)
            if "error" in email:
                print(email["error"])
                continue
            html = html_template(email)
            last_email_preview = {"subject": email["subject"], "text": email["text"], "html": html, "closing": "Best regards,\nHR Team"}
            print("\nSubject:")
            print(last_email_preview["subject"])
            print("\n--- Plain text ---")
            print(last_email_preview["text"])
            print("\n--- HTML preview (string printed) ---")
            print(last_email_preview["html"])
            print("\nYou can 'edit subject \"new subject\" for last_email' or 'edit closing \"Regards, Alice\" for last_email' and then 'repreview email'\n")
            continue

        # EDIT subject or closing
        m = re.match(r'edit subject\s+"([^"]+)"\s+for\s+last_email', cmd, flags=re.IGNORECASE)
        if m:
            if last_email_preview is None:
                print("No last email to edit.")
                continue
            new_sub = m.group(1)
            last_email_preview["subject"] = new_sub
            last_email_preview["html"] = html_template({"subject": new_sub, "text": last_email_preview["text"]}, closing=last_email_preview.get("closing"))
            print("Subject updated. Use 'repreview email' to see updated preview.")
            continue

        m = re.match(r'edit closing\s+"([^"]+)"\s+for\s+last_email', cmd, flags=re.IGNORECASE)
        if m:
            if last_email_preview is None:
                print("No last email to edit.")
                continue
            new_closing = m.group(1)
            last_email_preview["closing"] = new_closing
            last_email_preview["html"] = html_template({"subject": last_email_preview["subject"], "text": last_email_preview["text"]}, closing=new_closing)
            print("Closing updated. Use 'repreview email' to see updated preview.")
            continue

        # repreview
        if cmd.lower().strip() == "repreview email":
            if last_email_preview is None:
                print("No email to preview.")
                continue
            print("\nSubject:")
            print(last_email_preview["subject"])
            print("\n--- Plain text ---")
            print(last_email_preview["text"])
            print("\n--- HTML preview ---")
            print(last_email_preview["html"])
            continue

        # SHOW analytics
        if cmd.lower().startswith("show analytics") or cmd.lower().startswith("analytics"):
            an = analytics_summary()
            print("\nPipeline by stage:")
            for k, v in an["countByStage"].items():
                print(f"  {k}: {v}")
            print("\nTop skills:")
            for skill, cnt in an["topSkills"]:
                print(f"  {skill} ({cnt})")
            print(f"\nTotal candidates: {an['total']}")
            continue

        # quick search by name: "search name John Doe"
        m = re.match(r'search name\s+(.+)', cmd, flags=re.IGNORECASE)
        if m:
            name = m.group(1).strip()
            parts = name.split()
            first = parts[0]
            last = parts[1] if len(parts) > 1 else None
            # naive search in local data
            candidates = get_all_candidates()
            found = []
            for c in candidates:
                if last:
                    if c.get("firstName","").lower() == first.lower() and c.get("lastName","").lower() == last.lower():
                        found.append(c)
                else:
                    if c.get("firstName","").lower() == first.lower() or c.get("lastName","").lower() == first.lower():
                        found.append(c)
            if not found:
                print("No matching user found.")
            else:
                for c in found:
                    print(json.dumps(c, indent=2, ensure_ascii=False))
            continue

        # Unknown command
        print(handle_unknown_command(raw))

if __name__ == "__main__":
    main()
