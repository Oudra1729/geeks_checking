import express from 'express';
import session from 'express-session';
import quizRoutes from './routes/quiz.routes.js';

const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "trivia-quiz-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', quizRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>🧠 Trivia Quiz</h1>
    <p>Test your knowledge with 3 fun questions!</p>
    <a href="/quiz">Start Quiz</a>
  `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

