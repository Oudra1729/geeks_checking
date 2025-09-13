import os
from pymongo import MongoClient
from dotenv import load_dotenv

# ----------------- Load env -----------------
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "hr_agent")
CANDIDATES_COLLECTION = os.getenv("CANDIDATES_COLLECTION", "candidates")
JOBS_COLLECTION = os.getenv("JOBS_COLLECTION", "jobs")

# ----------------- MongoDB Client -----------------
client = MongoClient(
    MONGODB_URI,
    tls=True,
    tlsAllowInvalidCertificates=True  # تجاوز SSL للتحسين المحلي
)
db = client[DB_NAME]
candidates_col = db[CANDIDATES_COLLECTION]
jobs_col = db[JOBS_COLLECTION]

# ----------------- Helpers -----------------
def get_all_candidates():
    return list(candidates_col.find({}))

def get_all_jobs():
    return list(jobs_col.find({}))

def search_candidates(filters, top_n=5):
    candidates = get_all_candidates()
    results = []
    for c in candidates:
        match = True
        for k, v in filters.items():
            if k not in c or v.lower() not in str(c[k]).lower():
                match = False
                break
        if match:
            results.append(c)
        if len(results) >= top_n:
            break
    return results

# ----------------- CLI -----------------
def main():
    print("🤖 HR Agent CLI — simple search / shortlist / email / analytics")
    while True:
        cmd = input(">> ").strip().lower()
        if cmd.startswith("find"):
            # مثال: find 5 React interns in Casablanca
            filters = {}
            if "react" in cmd: filters["skills"] = "react"
            if "casablanca" in cmd: filters["location"] = "casablanca"
            results = search_candidates(filters, top_n=5)
            for idx, r in enumerate(results):
                print(f"#{idx}: {r['name']} - {r['skills']} - {r['location']}")
        elif cmd == "quit":
            break
        else:
            print("Unrecognized command. Try: find, quit")

if __name__ == "__main__":
    main()
