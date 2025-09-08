# agent.py
from dotenv import load_dotenv
import os
import psycopg2
from openai import OpenAI, RateLimitError, APIConnectionError, AuthenticationError, APIError
from datetime import datetime, timedelta

load_dotenv()

# ----------------- OpenAI Setup -----------------
api_key = os.getenv("GIT_API_KEY")
if not api_key:
    raise RuntimeError("GIT_API_KEY is missing from your environment/.env")

endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"
client = OpenAI(api_key=api_key, base_url=endpoint)

SYSTEM_PROMPT = "أنت مساعد ذكي لموقع Event Management."

# ----------------- Database Setup -----------------
DB_URL = os.getenv("DATABASE_URL")

def get_conn(sql, params=None):
    """
    Execute SQL query and return rows.
    """
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    cur.execute(sql, params or ())
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

# ----------------- Pagination Helper -----------------
def paginate_params(request_args, per_page=6):
    """
    Return (page, per_page, offset) from Flask request.args
    """
    try:
        page = int(request_args.get('page', '1'))
        if page < 1:
            page = 1
    except ValueError:
        page = 1
    offset = (page - 1) * per_page
    return page, per_page, offset

# ----------------- Formatting Helper -----------------
def format_structured_list(items, template="{name}"):
    """
    Convert list of dicts into formatted string.
    """
    return "; ".join([template.format(**item) for item in items])

# ----------------- Structured Queries -----------------
def get_events_structured(start=None, end=None, limit=5):
    """
    Fetch events from DB as structured dicts.
    """
    if start and end:
        rows = get_conn(
            "SELECT name, date, location FROM events WHERE date BETWEEN %s AND %s ORDER BY date",
            (start, end)
        )
    else:
        rows = get_conn(
            "SELECT name, date, location FROM events ORDER BY date LIMIT %s",
            (limit,)
        )
    return [dict(name=r[0], date=str(r[1]), location=r[2]) for r in rows] if rows else []

def get_organizers_structured(limit=5):
    rows = get_conn("SELECT name, contact_info FROM organizers LIMIT %s", (limit,))
    return [dict(name=r[0], contact_info=r[1]) for r in rows] if rows else []

def get_attendees_structured(limit=5):
    rows = get_conn("SELECT name, email FROM attendees LIMIT %s", (limit,))
    return [dict(name=r[0], email=r[1]) for r in rows] if rows else []

def get_tickets_structured(limit=5):
    rows = get_conn("SELECT type, price FROM tickets LIMIT %s", (limit,))
    return [dict(type=r[0], price=r[1]) for r in rows] if rows else []

# ----------------- AI Paragraph Generator -----------------
def ai_generate_paragraph(structured_prompt: str) -> str:
    """
    Send structured data to OpenAI to generate a nicely formatted paragraph.
    """
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": structured_prompt}
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"حصل خطأ أثناء محاولة إنشاء الفقرة: {str(e)}"

# ----------------- Agent Logic -----------------
def ask_agent(question: str, request_args=None) -> str:
    """
    Main function to handle user questions.
    Routes queries to the appropriate handler.
    """
    q = question.lower()

    if "event" in q or "الحفل" in q or "العرض" in q:
        return get_events_answer(q, request_args)
    elif "organizer" in q or "منظم" in q:
        return get_organizers_answer(q, request_args)
    elif "attendee" in q or "حاضر" in q or "مشارك" in q:
        return get_attendees_answer(q, request_args)
    elif "ticket" in q or "تذكرة" in q:
        return get_tickets_answer(q, request_args)
    else:
        # Default: ask AI directly
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": question}
                ],
                temperature=0.7,
            )
            return response.choices[0].message.content
        except (RateLimitError, APIConnectionError, AuthenticationError, APIError) as e:
            return f"حصل خطأ أثناء محاولة الإجابة: {str(e)}"

# ----------------- Event Responses -----------------
def get_events_answer(q: str, request_args=None) -> str:
    """
    Fetch events, send structured data to AI to generate paragraph.
    """
    today = datetime.today().date()
    if "week" in q or "هاد السيمانة" in q:
        start = today
        end = today + timedelta(days=7)
        events = get_events_structured(start, end)
        if not events:
            return "ما كايناش فعاليات مبرمجة فهاد الأسبوع."

        # 🔹 send structured data to AI
        prompt = f"حول هاد الأحداث لقصة قصيرة باللغة العربية:\n{events}"
        return ai_generate_paragraph(prompt)
    else:
        per_page = 6
        if request_args:
            page, per_page, offset = paginate_params(request_args, per_page)
        events = get_events_structured(limit=per_page)
        if not events:
            return "ما كايناش فعاليات مبرمجة دابا."
        prompt = f"حول هاد الأحداث لقصة قصيرة باللغة العربية:\n{events}"
        return ai_generate_paragraph(prompt)

# ----------------- Organizer Responses -----------------
def get_organizers_answer(q: str, request_args=None) -> str:
    per_page = 5
    if request_args:
        page, per_page, offset = paginate_params(request_args, per_page)
    organizers = get_organizers_structured(limit=per_page)
    if not organizers:
        return "ما عندناش منظمين مسجلين دابا."
    prompt = f"حول هاد المنظمين لفقرات قصيرة باللغة العربية:\n{organizers}"
    return ai_generate_paragraph(prompt)

# ----------------- Attendee Responses -----------------
def get_attendees_answer(q: str, request_args=None) -> str:
    per_page = 5
    if request_args:
        page, per_page, offset = paginate_params(request_args, per_page)
    attendees = get_attendees_structured(limit=per_page)
    if not attendees:
        return "ما كايناش معلومات على الحضور حاليا."
    prompt = f"حول هاد الحضور لفقرات قصيرة باللغة العربية:\n{attendees}"
    return ai_generate_paragraph(prompt)

# ----------------- Ticket Responses -----------------
def get_tickets_answer(q: str, request_args=None) -> str:
    per_page = 5
    if request_args:
        page, per_page, offset = paginate_params(request_args, per_page)
    tickets = get_tickets_structured(limit=per_page)
    if not tickets:
        return "ما كايناش تذاكر متاحة حاليا."
    prompt = f"حول هاد التذاكر لفقرات قصيرة باللغة العربية:\n{tickets}"
    return ai_generate_paragraph(prompt)
