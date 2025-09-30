import express from "express";

const app = express();
const PORT = 5000;

app.use(express.json());

// In-memory "database"
let books = [
  { id: 1, title: "1984", author: "George Orwell", publishedYear: 1949 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 },
];


app.get("/api/books", (req, res) => {
  res.json(books);
});


app.get("/api/books/:bookId", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});


app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(PORT, () =>
  console.log(`🚀 Book API running at http://localhost:${PORT}`)
);
