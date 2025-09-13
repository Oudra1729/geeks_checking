# HR Agent CLI — Test Workflow

This README shows an example workflow of using the HR Agent CLI, along with outputs.

---

## 1️⃣ Start CLI

```bash
py hr-agent.py

output:

🤖 HR Agent CLI — simple search / shortlist / email / analytics
Examples:
  find 5 React interns in Casablanca, 0-2 years, available this month
  save #0 #2 as "FE-Intern-A"
  draft email for "FE-Intern-A" job "Frontend Intern" tone friendly
  edit subject 'New subject here' for last_email
  show analytics
  list shortlists
  show shortlist FE-Intern-A
  quit


find 5 React interns in Casablanca, 0-2 years, available this month
Top 5 results for parsed filters: {"role": "5 React interns", "skills": ["React"], "location": "Casablanca", "minExp": 0, "maxExp": 2, "availabilityWindowDays": 45, "top_n": 5}

#0 | Amina El Idrissi | Casablanca | 1y | score: 5 | skills: React, JS, HTML
#1 | Youssef Benz | Casablanca | 2y | score: 5 | skills: React, JS, Git
#2 | Hamid Bouj | Casablanca | 3y | score: 5 | skills: React, Node.js, MongoDB
#3 | Mehdi Haddad | Casablanca | 2y | score: 5 | skills: React, JS, Git
#4 | Lina Fouad | Casablanca | 1y | score: 5 | skills: HTML, CSS, React


save #0 #2 as "FE-Intern-A"
Saved shortlist 'FE-Intern-A' with 2 candidates.


draft email for "FE-Intern-A" job "Frontend Intern" tone friendly


Subject:
Opportunity: Frontend Intern

Hi Amina,

We're hiring for Frontend Intern in Casablanca — we think your background could be a great fit. The role involves: We build UI with React and Git workflows.

Would you be open to a quick 15-minute chat this week?

Best,
HR Team


edit subject "Quick chat about a Frontend Intern role?" for last_email
repreview email


Subject:
Quick chat about a Frontend Intern role?

Hi Amina,

We're hiring for Frontend Intern in Casablanca — we think your background could be a great fit. The role involves: We build UI with React and Git workflows.

Would you be open to a quick 15-minute chat this week?

Best,
HR Team


show analytics
Pipeline by stage:
  SOURCED: 7
  SCREEN: 3
  INTERVIEW: 2

Top skills:
  JS (10)
  React (9)
  HTML (5)

Total candidates: 12


list shortlists
show shortlist FE-Intern-A


- FE-Intern-A (2 candidates)

Shortlist 'FE-Intern-A' (2):
#0 Amina El Idrissi | Casablanca | 1y | skills: React, JS, HTML
#1 Hamid Bouj | Casablanca | 3y | skills: React, Node.js, MongoDB

quit
Bye 👋
