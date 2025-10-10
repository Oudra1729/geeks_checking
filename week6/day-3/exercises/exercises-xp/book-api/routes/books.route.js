import express from 'express';

import {getAllBooks, createBook, getBookById, updateBook,deleteBook} from '../controllers/book.controller.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', createBook);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
