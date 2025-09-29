import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve static files

// 🎯 Emojis dataset
const emojis = [
  { emoji: "😀", name: "Smile" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🚗", name: "Car" },
  { emoji: "⚽", name: "Soccer Ball" },
  { emoji: "🍕", name: "Pizza" },
];

let leaderboard = []; // keep top scores

// 📌 Endpoint to get random emoji + options
app.get("/api/game", (req, res) => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  // generate distractors
  const options = [randomEmoji.name];
  while (options.length < 4) {
    const randomOption = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  // shuffle options
  options.sort(() => Math.random() - 0.5);

  res.json({ emoji: randomEmoji.emoji, answer: randomEmoji.name, options });
});

// 📌 Endpoint to submit score
app.post("/api/score", (req, res) => {
  const { username, score } = req.body;
  leaderboard.push({ username, score });

  // keep top 5 scores
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);

  res.json({ message: "Score submitted", leaderboard });
});

// 📌 Endpoint to get leaderboard
app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
