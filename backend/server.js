const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const client = require("prom-client");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongodb:27017/bookdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Book = mongoose.model("Book", {
    title: String,
    author: String,
    quantity: Number,
});

// Get all books
app.get("/books", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Add a book
app.post("/books", async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
});

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const booksFetchedCounter = new client.Counter({
    name: "books_fetched_total",
    help: "Total number of books fetched",
});

app.get("/books", async (req, res) => {
    const books = await Book.find();
    booksFetchedCounter.inc();
    res.json(books);
});

app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
