 
const express = require('express');
const app = express();
const quizRouter = require('./routes/quiz');

app.use(express.json());
app.use('/quiz', quizRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Trivia Quiz running at http://localhost:${PORT}`));
