# agent.py
from dotenv import load_dotenv
import os
import psycopg2
from openai import OpenAI, RateLimitError, APIConnectionError, AuthenticationError, APIError
from datetime import datetime, timedelta

load_dotenv()

api_key = os.getenv("GIT_API_KEY")
if not api_key:
    raise RuntimeError("GIT_API_KEY is missing from your environment/.env")

endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"

client = OpenAI(api_key=api_key, base_url=endpoint)

SYSTEM_PROMPT = "أنت مساعد ذكي لموقع Event Management."

# ⬇️ Database connection setup
DB_URL = os.getenv("DATABASE_URL")


def query_db(sql, params=None):
    """Helper to execute a query and return rows"""
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    cur.execute(sql, params or ())
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows


def ask_agent(question: str) -> str:
    q = question.lower()

    if "event" in q or "الحفل" in q or "العرض" in q:
        return get_events_answer(q)
    elif "organizer" in q or "منظم" in q:
        return get_organizers_answer(q)
    elif "attendee" in q or "حاضر" in q or "مشارك" in q:
        return get_attendees_answer(q)
    elif "ticket" in q or "تذكرة" in q:
        return get_tickets_answer(q)
    else:
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


# --------- EVENTS ----------
def get_events_answer(q: str) -> str:
    today = datetime.today().date()

    if "week" in q or "هاد السيمانة" in q:
        start = today
        end = today + timedelta(days=7)
        rows = query_db(
            "SELECT name, date, location FROM events WHERE date BETWEEN %s AND %s ORDER BY date",
            (start, end)
        )
        if not rows:
            return "ما كايناش فعاليات مبرمجة فهاد الأسبوع."
        events_text = "; ".join([f"{r[0]} يوم {r[1]} فـ {r[2]}" for r in rows])
        return f"خلال هاد الأسبوع، غادي يكون عندنا: {events_text}."
    else:
        rows = query_db("SELECT name, date, location FROM events ORDER BY date LIMIT 5")
        if not rows:
            return "ما كايناش فعاليات مبرمجة دابا."
        events_text = "; ".join([f"{r[0]} يوم {r[1]} فـ {r[2]}" for r in rows])
        return f"من الفعاليات المبرمجة عندنا: {events_text}."


# --------- ORGANIZERS ----------
def get_organizers_answer(q: str) -> str:
    rows = query_db("SELECT name, contact_info FROM organizers LIMIT 5")
    if not rows:
        return "ما عندناش منظمين مسجلين دابا."
    organizers_text = "; ".join([f"{r[0]} (تواصل: {r[1]})" for r in rows])
    return f"من بين المنظمين عندنا: {organizers_text}."


# --------- ATTENDEES ----------
def get_attendees_answer(q: str) -> str:
    rows = query_db("SELECT name, email FROM attendees LIMIT 5")
    if not rows:
        return "ما كايناش معلومات على الحضور حاليا."
    attendees_text = "; ".join([f"{r[0]} ({r[1]})" for r in rows])
    return f"من الحضور اللي عندنا مسجلين: {attendees_text}."


# --------- TICKETS ----------
def get_tickets_answer(q: str) -> str:
    rows = query_db("SELECT type, price FROM tickets LIMIT 5")
    if not rows:
        return "ما كايناش تذاكر متاحة حاليا."
    tickets_text = "; ".join([f"تذكرة {r[0]} بثمن {r[1]} درهم" for r in rows])
    return f"بالنسبة للتذاكر المتوفرة: {tickets_text}."
