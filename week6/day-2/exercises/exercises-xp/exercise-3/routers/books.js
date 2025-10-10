import express from 'express';

const router = express.Router();

const books = [];

router.get("/", (req, res) => {
  try {
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.author) {
      return res.status(400).json({ message: "Title and author are required" });
    }
    const newBook = { id: books.length + 1, ...data };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const book = books.find((b) => b.id === id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const data = req.body;
    if (!data.title || !data.author) {
      return res.status(400).json({ message: "Title and author are required" });
    }
    book.title = data.title;
    book.author = data.author;
    res.json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    books.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;