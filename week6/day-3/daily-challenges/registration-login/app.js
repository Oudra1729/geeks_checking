import express from 'express';
import usersRouter from './routes/users.route.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', usersRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});