// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nav_routes = require("./routes/nav_routes");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Creating an Express application
const app = express();

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.use("/api", nav_routes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a route
app.get("/", (req, res) => {
  res.send("Server Is Up!");
});

// Starting the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
