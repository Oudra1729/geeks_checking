import express from "express";
import triviaQuestions from "../models/triviaquiz.js";

const router = express.Router();

router.get("/", (req, res) => {
    
  if (!req.session.quiz) {
    req.session.quiz = {
      currentQuestionIndex: 0,
      score: 0,
    };
  }

  const { currentQuestionIndex } = req.session.quiz;

  
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect("/quiz/score");
  }

  const question = triviaQuestions[currentQuestionIndex];
  res.send(`
    <h2>Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}</h2>
    <p><strong>${question.question}</strong></p>
    <form method="POST" action="/quiz">
      <label>
        Your answer:<br>
        <input type="text" name="answer" required autofocus style="padding:8px; font-size:16px; width:300px;">
      </label><br><br>
      <button type="submit" style="padding:10px 20px; font-size:16px;">Submit Answer</button>
    </form>
    <br>
    <a href="/quiz/score">View Score (if finished)</a>
  `);
});


router.post("/", (req, res) => {
  if (!req.session.quiz) {
    return res.redirect("/quiz");
  }

  const { answer } = req.body;
  const { currentQuestionIndex } = req.session.quiz;
  const currentQuestion = triviaQuestions[currentQuestionIndex];

  
  const isCorrect =
    answer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();

  if (isCorrect) {
    req.session.quiz.score += 1;
  }

  
  req.session.quiz.currentQuestionIndex += 1;

  
  const feedback = isCorrect
    ? `<p style="color:green; font-weight:bold;">✅ Correct!</p>`
    : `<p style="color:red; font-weight:bold;">❌ Incorrect. The correct answer is: <em>${currentQuestion.answer}</em></p>`;

    
  if (req.session.quiz.currentQuestionIndex < triviaQuestions.length) {
    const nextQuestion = triviaQuestions[req.session.quiz.currentQuestionIndex];
    res.send(`
      ${feedback}
      <p>Next question loading...</p>
      <meta http-equiv="refresh" content="2;url=/quiz">
      <a href="/quiz">Click here if not redirected</a>
    `);
  } else {
    
    res.send(`
      ${feedback}
      <h2>🎉 Quiz Completed!</h2>
      <p>Redirecting to your score...</p>
      <meta http-equiv="refresh" content="2;url=/quiz/score">
      <a href="/quiz/score">View Score Now</a>
    `);
  }
});


router.get("/score", (req, res) => {
  if (!req.session.quiz) {
    return res.send(`
      <p>No quiz found. <a href="/quiz">Start a new quiz</a></p>
    `);
  }

  const { score, currentQuestionIndex } = req.session.quiz;
  const total = triviaQuestions.length;

  
  if (currentQuestionIndex < total) {
    return res.send(`
      <p>Quiz not finished yet! <a href="/quiz">Continue quiz</a></p>
    `);
  }

  const percent = Math.round((score / total) * 100);
  let message = "";
  if (score === total) message = "🌟 Perfect! You’re a trivia master!";
  else if (score >= total * 0.7) message = "👍 Great job!";
  else if (score >= total * 0.5) message = "👌 Good effort!";
  else message = "💡 Keep learning!";

  res.send(`
    <h2>🏆 Your Final Score</h2>
    <h3>${score} out of ${total} (${percent}%)</h3>
    <p><strong>${message}</strong></p>
    <br>
    <a href="/quiz" style="display:inline-block; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:4px;">
      Play Again
    </a>
    <a href="/" style="display:inline-block; padding:10px 20px; background:#6c757d; color:white; text-decoration:none; border-radius:4px; margin-left:10px;">
      Home
    </a>
  `);
});

export default router;
