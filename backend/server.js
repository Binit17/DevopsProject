const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongodb:27017/bookdb", { useNewUrlParser: true });

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

app.listen(3000, () => console.log("Server running on port 3000"));
