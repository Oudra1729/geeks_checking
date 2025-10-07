 
const express = require('express');
const router = express.Router();

// Hard-coded trivia questions
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" },
];

// Game state (for simplicity, using in-memory variables)
let currentQuestionIndex = 0;
let score = 0;

// GET /quiz - Start the quiz or show the current question
router.get('/', (req, res) => {
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.json({ message: "Quiz finished! Go to /quiz/score to see your score." });
  }

  const question = triviaQuestions[currentQuestionIndex].question;
  res.json({
    message: `Question ${currentQuestionIndex + 1}`,
    question,
  });
});

// POST /quiz - Submit an answer
router.post('/', (req, res) => {
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.json({ message: "Quiz already finished! Go to /quiz/score to see your score." });
  }

  const { answer } = req.body;
  const correctAnswer = triviaQuestions[currentQuestionIndex].answer;

  let feedback;
  if (answer && answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    feedback = "✅ Correct!";
  } else {
    feedback = `❌ Incorrect! The correct answer was "${correctAnswer}".`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < triviaQuestions.length) {
    res.json({
      feedback,
      nextQuestion: triviaQuestions[currentQuestionIndex].question,
    });
  } else {
    res.json({
      feedback,
      message: "Quiz completed! Visit /quiz/score to view your final score.",
    });
  }
});

// GET /quiz/score - Display the final score
router.get('/score', (req, res) => {
  res.json({
    score,
    total: triviaQuestions.length,
    message: `You scored ${score} out of ${triviaQuestions.length}!`,
  });

  // Reset game for new playthrough
  currentQuestionIndex = 0;
  score = 0;
});

module.exports = router;
