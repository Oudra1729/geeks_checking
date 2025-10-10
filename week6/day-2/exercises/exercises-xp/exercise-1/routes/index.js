import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, welcome to the homepage!');
});

router.get('/about', (req, res) => {
  res.send('This is the about page.');
});

export default router;
