let currentAnswer = "";
let score = 0;
const username = prompt("Enter your username:") || "Guest";

// DOM elements
const emojiEl = document.getElementById("emoji");
const guessForm = document.getElementById("guessForm");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const leaderboardEl = document.getElementById("leaderboard");

// 🔹 Load a new question
async function loadQuestion() {
  const res = await fetch("/api/game");
  const data = await res.json();

  currentAnswer = data.answer;
  emojiEl.textContent = data.emoji;

  // render options
  guessForm.innerHTML = "";
  data.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.type = "button";
    btn.onclick = () => checkAnswer(option);
    guessForm.appendChild(btn);
  });
}

// 🔹 Check guess
function checkAnswer(selected) {
  if (selected === currentAnswer) {
    score++;
    feedbackEl.textContent = "✅ Correct!";
  } else {
    feedbackEl.textContent = `❌ Wrong! The answer was ${currentAnswer}`;
  }
  scoreEl.textContent = score;
  setTimeout(loadQuestion, 1000);
}

// 🔹 Submit score
async function submitScore() {
  await fetch("/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, score }),
  });
  loadLeaderboard();
}

// 🔹 Load leaderboard
async function loadLeaderboard() {
  const res = await fetch("/api/leaderboard");
  const data = await res.json();

  leaderboardEl.innerHTML = "";
  data.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.username}: ${entry.score}`;
    leaderboardEl.appendChild(li);
  });
}

// before unload => save score
window.addEventListener("beforeunload", submitScore);

// start game
loadQuestion();
loadLeaderboard();
