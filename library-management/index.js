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
        genre: "Fantasy",
        slug: "the-lord-of-the-rings"
    },
    {
        id: 2,
        title: "Gone with the Wind",
        author: "Margaret Mitchell",
        publicationDate: "June 30, 1936",
        genre: "Historical Fiction",
        slug: "gone-with-the-wind"
    },
    {
        id: 3,
        title: "Dune",
        author: "Frank Herbert",
        publicationDate: "August 1965",
        genre: "Science Fiction",
        slug: "dune"
    },
    {
        id: 4,
        title: "The Shining",
        author: "Stephen King",
        publicationDate: "January 28, 1977",
        genre: "Psychological horror",
        slug: "the-shining"
    },
    {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        publicationDate: "28 January, 1813",
        genre: "Romance",
        slug: "pride-and-prejudice"
    }
];

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
});

// Create a new book
app.post('/books', (req, res) => {
    let { title, author, publicationDate, genre } = req.body;
    title = title.trim(); author = author.trim();
    const book = books.find(b => (b.title == title && b.author == author));
    if (!book) {
        c = 1, f = 1;
        for (i = 0; i < books.length; i++) {
            if (books[i].id !== c) {
                const newBook = { id: c, title, author, publicationDate, genre, slug: title.trim().replace(/ /g, '-').toLowerCase() };
                books.splice(i, 0, newBook);
                res.status(201).json(newBook);
                f = 0;
                break;
            }
            c++;
        }
        if (f === 1) {
            const newBook = { id: books.length + 1, title, author, publicationDate, genre, slug: title.trim().replace(/ /g, '-').toLowerCase() };
            books.push(newBook);
            res.status(201).json(newBook);
        }
    }
    else return res.status(404).json({ message: 'This book already exists!' });
});

// Create a new book at specific ID
app.post('/books/:id', (req, res) => {
    let { title, author, publicationDate, genre } = req.body;
    title = title.trim(); author = author.trim();
    const book = books.find(b => (b.title == title && b.author == author));
    if (!book) {
        const book = books.find(b => b.id == req.params.id);
        if (!book) {
            const newBook = { id: parseInt(req.params.id), title, author, publicationDate, genre, slug: title.trim().replace(/ /g, '-').toLowerCase() };
            books.splice(parseInt(req.params.id)-1, 0, newBook);
            res.status(201).json(newBook);
        }
        else return res.status(404).json({ message: 'Another book already exists at this id!' });
    }
    else return res.status(404).json({ message: 'This book already exists!' });
});

// Get all books
app.get('/books', (req, res) => {
    books.sort((a, b) => a.id - b.id)
    res.json(books);
});

// Get a book by ID or title
app.get('/books/:search', (req, res) => {
    const book = books.find(b => (b.id == req.params.search || b.slug == req.params.search));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// Update a book by ID or title
app.put('/books/:search', (req, res) => {
    const book = books.find(b => (b.id == req.params.search || b.slug == req.params.search));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    let { title, author, publicationDate, genre, slug } = req.body;
    title = title.trim(); author = author.trim();
    book.title = title !== undefined ? title : book.title;
    book.author = author !== undefined ? author : book.author;
    book.publicationDate = publicationDate !== undefined ? publicationDate : book.publicationDate;
    book.genre = genre !== undefined ? genre : book.genre;
    book.slug = slug !== undefined ? slug : book.slug;
    res.json(book);
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.status(204).end();
});

// Delete all books
app.delete('/books/', (req, res) => {
    books = [];
    res.status(204).end();
});

// Start the server
app.listen(port, () => {
    console.log(`Library management app listening at http://localhost:${port}`);
});
