const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
    {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter"
  },
  {
    question: "Who wrote 'Hamlet'?",    
    options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"],
    answer: "Shakespeare"
  } 
];

let currentQuestionIndex = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectOption(option);
        optionsEl.appendChild(button);
    });
}
function selectOption(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}
function showResults() {
    questionEl.textContent = "Quiz Over!";
    optionsEl.innerHTML = `Your final score is ${score} out of ${questions.length}.`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
}   
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    nextBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
}
restartBtn.onclick = restartQuiz;
nextBtn.onclick = () => {
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
};