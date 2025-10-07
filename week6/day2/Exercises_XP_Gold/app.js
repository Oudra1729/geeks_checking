 
const express = require('express');
const app = express();
const postsRouter = require('./routes/posts');

app.use(express.json()); // to parse JSON bodies
app.use('/posts', postsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Blog API running at http://localhost:${PORT}`));
