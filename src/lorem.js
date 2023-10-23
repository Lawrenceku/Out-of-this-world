const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const books = [
  {
    id: uuidv4(),
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
  },
  {
    id: uuidv4(),
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
  },
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET a book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});

// POST a new book
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).send('Missing fields');
  }
  const newBook = { id: uuidv4(), title, author, year };
  books.push(newBook);
  res.json(newBook);
});

// PUT (update) an existing book
app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).send('Missing fields');
  }
  const updatedBook = { id: req.params.id, title, author, year };
  books.splice(bookIndex, 1, updatedBook);
  res.json(updatedBook);
});

// DELETE a book by ID
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }
  books.splice(bookIndex, 1);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
