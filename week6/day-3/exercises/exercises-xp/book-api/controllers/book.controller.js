import Books from "../models/books.js";

const booksModel = new Books();

export const getAllBooks = (req, res) => {
  
  booksModel
    .findAll()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const createBook = (req, res) => {
  booksModel
    .createBook(req.body)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
export const getBookById = (req, res) => {
  booksModel
    .findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
export const updateBook = (req, res) => {

    booksModel
    .updateBook(req.params.id, req.body)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
export const deleteBook = (req, res) => {
  booksModel
    .deleteBook(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
