const express = require('express');
const router = express.Router();

let books = [];
let idCounter = 1;

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Add a new book
router.post('/', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: idCounter++, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).send('Book not found.');
    book.title = title;
    book.author = author;
    res.json(book);
});

// Delete a book
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.status(204).send();
});

module.exports = router;
