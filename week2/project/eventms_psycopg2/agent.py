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
FALLBACK_FILE = "unanswered_queries.json"

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

# ----------------- JSON File Management -----------------
def load_fallback_data():
    """Load existing fallback data from JSON file"""
    if os.path.exists(FALLBACK_FILE):
        try:
            with open(FALLBACK_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return {"queries": [], "responses": {}}
    return {"queries": [], "responses": {}}

def save_fallback_data(data):
    """Save fallback data to JSON file"""
    with open(FALLBACK_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def save_unanswered_query(question, ai_response):
    """Save unanswered query and AI response to JSON file"""
    fallback_data = load_fallback_data()
    
    query_entry = {
        "id": len(fallback_data["queries"]) + 1,
        "question": question,
        "timestamp": datetime.now().isoformat(),
        "ai_response": ai_response,
        "status": "pending"  # could be: pending, answered, ignored
    }
    
    fallback_data["queries"].append(query_entry)
    
    # Also store in responses dict for quick lookup
    query_key = question.lower().strip()
    fallback_data["responses"][query_key] = ai_response
    
    save_fallback_data(fallback_data)
    return query_entry["id"]

def search_fallback_responses(question):
    """Search for similar questions in fallback data"""
    fallback_data = load_fallback_data()
    query_key = question.lower().strip()
    
    # Exact match first
    if query_key in fallback_data["responses"]:
        return fallback_data["responses"][query_key]
    
    # Partial match (simple keyword search)
    for stored_question, response in fallback_data["responses"].items():
        if any(word in stored_question for word in query_key.split() if len(word) > 3):
            return response
    
    return None

# ----------------- Structured Queries -----------------
def get_events_structured(start=None, end=None, limit=5):
    try:
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
    except Exception as e:
        print(f"Database error in get_events_structured: {e}")
        return []

def get_organizers_structured(limit=5):
    try:
        rows = get_conn("SELECT name, contact_info FROM organizers LIMIT %s", (limit,))
        return [dict(name=r[0], contact_info=r[1]) for r in rows] if rows else []
    except Exception as e:
        print(f"Database error in get_organizers_structured: {e}")
        return []

def get_attendees_structured(limit=5):
    try:
        rows = get_conn("SELECT name, email FROM attendees LIMIT %s", (limit,))
        return [dict(name=r[0], email=r[1]) for r in rows] if rows else []
    except Exception as e:
        print(f"Database error in get_attendees_structured: {e}")
        return []

def get_tickets_structured(limit=5):
    try:
        rows = get_conn("SELECT type, price FROM tickets LIMIT %s", (limit,))
        return [dict(type=r[0], price=r[1]) for r in rows] if rows else []
    except Exception as e:
        print(f"Database error in get_tickets_structured: {e}")
        return []

def search_general_info(query):
    """Search for general information in database"""
    try:
        # Search in events
        events = get_conn(
            "SELECT name, date, location, description FROM events WHERE name ILIKE %s OR description ILIKE %s LIMIT 3",
            (f"%{query}%", f"%{query}%")
        )
        
        # Search in organizers
        organizers = get_conn(
            "SELECT name, contact_info FROM organizers WHERE name ILIKE %s LIMIT 2",
            (f"%{query}%",)
        )
        
        results = {
            "events": [dict(name=r[0], date=str(r[1]), location=r[2], description=r[3] if len(r) > 3 else "") for r in events],
            "organizers": [dict(name=r[0], contact_info=r[1]) for r in organizers]
        }
        
        return results if (results["events"] or results["organizers"]) else None
    except Exception as e:
        print(f"Database error in search_general_info: {e}")
        return None

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
    },
    {
        "type": "function",
        "function": {
            "name": "search_general_info",
            "description": "Search for general information in the database",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"}
                },
                "required": ["query"]
            }
        }
    }
]

# ----------------- Agent Logic with Tools and Fallback -----------------
def ask_agent(question: str) -> str:
    try:
        # First, check if we have a cached response
        cached_response = search_fallback_responses(question)
        if cached_response:
            return cached_response
        
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
        has_db_data = False

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
                case "search_general_info":
                    result = search_general_info(**args)
                case _:
                    result = {"error": "Unknown tool"}

            # Check if we got meaningful data
            has_db_data = bool(result and (
                (isinstance(result, list) and len(result) > 0) or
                (isinstance(result, dict) and any(v for v in result.values() if v))
            ))

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
            final_response = followup.choices[0].message.content
        else:
            # Case 2: Direct answer (no tool call)
            final_response = msg.content
            has_db_data = False

        # If no database data was found, save to JSON file
        if not has_db_data:
            query_id = save_unanswered_query(question, final_response)
            print(f"Saved unanswered query #{query_id} to {FALLBACK_FILE}")

        return final_response

    except (RateLimitError, APIConnectionError, AuthenticationError, APIError) as e:
        error_msg = f"حصل خطأ أثناء محاولة الإجابة: {str(e)}"
        # Save error queries too
        save_unanswered_query(question, error_msg)
        return error_msg

# ----------------- Utility Functions -----------------
def get_unanswered_queries():
    """Get all unanswered queries from JSON file"""
    fallback_data = load_fallback_data()
    return fallback_data["queries"]

def update_query_status(query_id, status):
    """Update the status of a query (pending, answered, ignored)"""
    fallback_data = load_fallback_data()
    for query in fallback_data["queries"]:
        if query["id"] == query_id:
            query["status"] = status
            break
    save_fallback_data(fallback_data)

def add_manual_response(question, response):
    """Manually add a response for future use"""
    fallback_data = load_fallback_data()
    query_key = question.lower().strip()
    fallback_data["responses"][query_key] = response
    save_fallback_data(fallback_data)

# ----------------- Example Usage -----------------
if __name__ == "__main__":
    # Test the agent
    test_questions = [
        "ما هي الأحداث القادمة؟",
        "من هم المنظمون؟",
        "كيف يمكنني الحجز؟",  # This will likely be saved to JSON
        "ما هو الطقس غداً؟"   # This will definitely be saved to JSON
    ]
    
    for q in test_questions:
        print(f"\nسؤال: {q}")
        answer = ask_agent(q)
        print(f"جواب: {answer}")
        print("-" * 50)
    
    # Show unanswered queries
    print(f"\nUnanswered queries saved to {FALLBACK_FILE}:")
    for query in get_unanswered_queries():
        print(f"ID {query['id']}: {query['question']} (Status: {query['status']})")