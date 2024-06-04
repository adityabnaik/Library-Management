const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database (array)
let books = [
    {
        id: 1,
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkien",
        publicationDate: "29 July, 1954",
        genre: "Fantasy"
    },
    {
        id: 2,
        title: "Gone with the Wind",
        author: "Margaret Mitchell",
        publicationDate: "June 30, 1936",
        genre: "Historical Fiction"
    },
    {
        id: 3,
        title: "Dune",
        author: "Frank Herbert",
        publicationDate: "August 1965",
        genre: "Science Fiction"
    },
    {
        id: 4,
        title: "The Shining",
        author: "Stephen King",
        publicationDate: "January 28, 1977",
        genre: "Psychological horror"
    },
    {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        publicationDate: "28 January, 1813",
        genre: "Romance"
    }
];

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
});

// Create a new book
app.post('/books', (req, res) => {
    const { title, author, publicationDate, genre } = req.body;
    const book = books.find(b => (b.title == req.body.title && b.title == req.body.title));
    if(!book){
    c = 1, f = 1;
    for (i = 0; i < books.length; i++) {
        if (books[i].id !== c) {
            const newBook = { id: c, title, author, publicationDate, genre };
            books.splice(i, 0, newBook);
            res.status(201).json(newBook);
            f = 0;
            break;
        }
        c++;
    }
    if (f === 1) {
        const newBook = { id: books.length + 1, title, author, publicationDate, genre };
        books.push(newBook);
        res.status(201).json(newBook);
    }}
    else return res.status(404).json({ message: 'This book already exists!' });
});

// Create a new book at specific id
app.post('/books/:id', (req, res) => {
    const { title, author, publicationDate, genre } = req.body;
    const book = books.find(b => (b.title == req.body.title && b.title == req.body.title));
    if(!book){
    const book = books.find(b => b.id == req.params.id);
    if (!book) {
        const newBook = { id: parseInt(req.params.id), title, author, publicationDate, genre };
        books.push(newBook);
        res.status(201).json(newBook);
    }
    else return res.status(404).json({ message: 'Another book already exists at this id!' });}
    else return res.status(404).json({ message: 'This book already exists!' });
});

// Get all books
app.get('/books', (req, res) => {
    books.sort((a, b) => a.id - b.id)
    res.json(books);
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const book1 = books.find(b => (b.title == req.body.title && b.title == req.body.title));
    if (!book1) {
    const { title, author, publicationDate, genre } = req.body;
    book.title = title !== undefined ? title : book.title;
    book.author = author !== undefined ? author : book.author;
    book.publicationDate = publicationDate !== undefined ? publicationDate : book.publicationDate;
    book.genre = genre !== undefined ? genre : book.genre;}
    else return res.status(404).json({ message: 'This book already exists!' });

    res.json(book);
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.status(204).end();
});

// Start the server
app.listen(port, () => {
    console.log(`Library management app listening at http://localhost:${port}`);
});
