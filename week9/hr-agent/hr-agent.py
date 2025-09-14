#!/usr/bin/env python3
import os, json, re
from pathlib import Path
from typing import List, Dict, Any, Optional
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# ----------------- OpenAI Setup -----------------
from openai import OpenAI
API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")
MODEL = os.getenv("MODEL", "gpt-4o-mini")
client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

# ----------------- Data -----------------
DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)
CANDIDATES_FILE = DATA_DIR / "candidates.json"
SHORTLISTS_FILE = DATA_DIR / "shortlists.json"
JOBS_FILE = DATA_DIR / "jobs.json"

def load_json_file(path: Path) -> List[Dict[str, Any]]:
    if path.exists():
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    return []

candidates = load_json_file(CANDIDATES_FILE)
shortlists = load_json_file(SHORTLISTS_FILE) if SHORTLISTS_FILE.exists() else {}
jobs = load_json_file(JOBS_FILE)

# ----------------- AI Tools -----------------

def search_candidates(skills: List[str], location: Optional[str] = None,
                      minExp: int = 0, maxExp: int = 100,
                      availabilityWindowDays: Optional[int] = None,
                      top_n: int = 5) -> List[Dict[str, Any]]:
    """
    AI-powered candidate search: returns top candidates with reasoning.
    """
    user_prompt = f"""
    You are an AI HR assistant. 
    Search among the following candidates: {json.dumps(candidates)}
    Skills to match: {skills}
    Location: {location if location else 'any'}
    Experience: {minExp}-{maxExp} years
    Availability within {availabilityWindowDays if availabilityWindowDays else 'any'} days
    Return top {top_n} candidates sorted by fit with reasons for scoring.
    """
    resp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful recruiting assistant."},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3,
        max_tokens=600
    )
    result_text = resp.choices[0].message.content
    try:
        return json.loads(result_text)
    except:
        return [{"candidate": c, "score": 0, "reason": "Could not parse AI output"} for c in candidates[:top_n]]

def save_shortlist(name: str, candidate_emails: List[str]):
    """
    Save a shortlist; AI can summarize or validate the selection.
    """
    shortlists[name] = candidate_emails
    with SHORTLISTS_FILE.open("w", encoding="utf-8") as f:
        json.dump(shortlists, f, indent=2, ensure_ascii=False)
    return f"Shortlist '{name}' saved with {len(candidate_emails)} candidates."

def draft_email(recipients: List[str], job_title: str, tone: str = "friendly") -> Dict[str,str]:
    """
    AI-generated email draft for candidates or shortlists.
    """
    recipient_names = ", ".join(recipients)
    system_prompt = f"You are a recruiting assistant. Write a {tone} email with subject + body for job '{job_title}' to: {recipient_names}."
    user_prompt = f"Generate a concise subject line and a professional email body for {recipient_names} for the role '{job_title}'. Keep it engaging and action-oriented."
    
    resp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3,
        max_tokens=400
    )
    ai_text = resp.choices[0].message.content.strip()
    lines = ai_text.splitlines()
    if len(lines) > 1 and lines[0].lower().startswith("subject"):
        subject = lines[0].split(":",1)[1].strip()
        body = "\n".join(lines[1:]).strip()
    else:
        if len(lines[0]) < 80:
            subject = lines[0]
            body = "\n".join(lines[1:]).strip()
        else:
            subject = f"Opportunity: {job_title}"
            body = ai_text
    return {"subject": subject, "text": body}

def analytics_summary() -> Dict[str, Any]:
    """
    AI-powered summary of candidates, stages, and top skills.
    """
    user_prompt = f"""
    You are an AI analyst. Analyze these candidates: {json.dumps(candidates)}.
    Return a summary JSON with counts by stage and top 3 skills with counts.
    """
    resp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful AI data analyst."},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0,
        max_tokens=300
    )
    result_text = resp.choices[0].message.content
    try:
        return json.loads(result_text)
    except:
        return {"countByStage": {}, "topSkills": []}

# ----------------- Example AI-driven CLI -----------------
if __name__ == "__main__":
    print("🤖 AI-Powered HR Agent CLI (all tools AI)")
    while True:
        text = input("You: ").strip()
        if text.lower() in ("quit","exit"): break
        # Basic intent detection
        if any(k in text.lower() for k in ["top","find"]):
            print("Searching candidates...")
            skills = re.findall(r'\b(React|Vue|Angular|Python|Node|JS|JavaScript|TypeScript|SQL)\b', text, re.IGNORECASE)
            res = search_candidates(skills=[s.capitalize() for s in skills])
            print(json.dumps(res, indent=2, ensure_ascii=False))
        elif "draft email" in text.lower():
            names = re.findall(r'"([^"]+)"', text)
            job = re.search(r'job\s+"([^"]+)"', text)
            if job: job_title = job.group(1)
            else: job_title = "Unknown Position"
            res = draft_email(names, job_title)
            print(json.dumps(res, indent=2, ensure_ascii=False))
        elif "analytics" in text.lower():
            res = analytics_summary()
            print(json.dumps(res, indent=2, ensure_ascii=False))
        elif "save shortlist" in text.lower():
            names = re.findall(r'"([^"]+)"', text)
            emails = re.findall(r'\S+@\S+', text)
            if names and emails:
                res = save_shortlist(names[0], emails)
                print(res)
            else:
                print("Specify shortlist name and candidate emails.")
        else:
            print("Unknown command. Try: top candidates, draft email, save shortlist, analytics, exit")
