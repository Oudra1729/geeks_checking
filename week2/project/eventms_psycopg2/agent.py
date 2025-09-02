# agent.py
from dotenv import load_dotenv
import os
from openai import OpenAI, RateLimitError, APIConnectionError, AuthenticationError, APIError

load_dotenv()

api_key = os.getenv("GIT_API_KEY")
if not api_key:
    raise RuntimeError("GIT_API_KEY is missing from your environment/.env")

endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"

client = OpenAI(api_key=api_key, base_url=endpoint)


SYSTEM_PROMPT = "أنت مساعد ذكي لموقع Event Management."

def ask_agent(question: str) -> str:
    try:
        resp = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
            temperature=0.2,
            max_tokens=500,
        )
        return resp.choices[0].message.content.strip()

    except RateLimitError:
        # This is what you're hitting now
        return "تعذر تنفيذ الطلب: الرصيد/الكوتا غير كافٍ لحساب OpenAI. فعِّل الفوترة أو استعمل مفتاح فيه رصيد."

    except AuthenticationError:
        return "مفتاح OpenAI غير صالح. تحقق من OPENAI_API_KEY."

    except APIConnectionError:
        return "تعذر الاتصال بخوادم OpenAI. تحقق من الشبكة أو البروكسي."

    except APIError as e:
        return f"خطأ من OpenAI API: {getattr(e, 'message', str(e))}"

    except Exception as e:
        return f"Unexpected error: {e}"

if __name__ == "__main__":
    print(ask_agent("What is the capital of France?"))
