# agent.py
from dotenv import load_dotenv
import os, json
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

# ----------------- Structured Queries -----------------
def get_events_structured(start=None, end=None, limit=5):
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

# ----------------- Tools Definition -----------------
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_events_structured",
            "description": "Fetch upcoming events from database",
            "parameters": {
                "type": "object",
                "properties": {
                    "start": {"type": "string", "format": "date"},
                    "end": {"type": "string", "format": "date"},
                    "limit": {"type": "integer"}
                },
                "required": ["limit"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_organizers_structured",
            "description": "Fetch list of organizers",
            "parameters": {
                "type": "object",
                "properties": {
                    "limit": {"type": "integer"}
                },
                "required": ["limit"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_attendees_structured",
            "description": "Fetch list of attendees",
            "parameters": {
                "type": "object",
                "properties": {
                    "limit": {"type": "integer"}
                },
                "required": ["limit"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_tickets_structured",
            "description": "Fetch available tickets",
            "parameters": {
                "type": "object",
                "properties": {
                    "limit": {"type": "integer"}
                },
                "required": ["limit"]
            }
        }
    }
]

# ----------------- Agent Logic with Tools -----------------
def ask_agent(question: str) -> str:
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question}
            ],
            tools=tools,
            tool_choice="auto"
        )

        msg = response.choices[0].message

        # Case 1: Tool call
        if msg.tool_calls:
            tool_call = msg.tool_calls[0]
            fn_name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)

            # ----------------- Switch-case style -----------------
            match fn_name:
                case "get_events_structured":
                    result = get_events_structured(**args)
                case "get_organizers_structured":
                    result = get_organizers_structured(**args)
                case "get_attendees_structured":
                    result = get_attendees_structured(**args)
                case "get_tickets_structured":
                    result = get_tickets_structured(**args)
                case _:
                    result = {"error": "Unknown tool"}

            # Send result back so model can answer naturally
            followup = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": question},
                    msg,
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(result, ensure_ascii=False)
                    }
                ]
            )
            return followup.choices[0].message.content

        # Case 2: Direct answer
        return msg.content

    except (RateLimitError, APIConnectionError, AuthenticationError, APIError) as e:
        return f"حصل خطأ أثناء محاولة الإجابة: {str(e)}"
