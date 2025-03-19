const mongoose = require("mongoose");

mongoose.connect("mongodb://mongodb:27017/bookdb", { useNewUrlParser: true });

const Book = mongoose.model("Book", {
  title: String,
  author: String,
  quantity: Number,
});

// Initial book data
const initialBooks = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", quantity: 10 },
  { title: "1984", author: "George Orwell", quantity: 15 },
  { title: "Pride and Prejudice", author: "Jane Austen", quantity: 8 },
];

// Insert initial books
async function initializeDatabase() {
  try {
    // Clear existing books
    await Book.deleteMany({});

    // Insert initial books
    await Book.insertMany(initialBooks);

    console.log("Database initialized with sample books");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

initializeDatabase();
