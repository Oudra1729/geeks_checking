import express from 'express';
import bookRouter from './routes/index.js';

const app = express();
const PORT = 4000;
app.use(express.json());
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
