// Importing required modules
const express = require("express");
const { connectToMongoDB } = require("./connect"); // Function to connect to MongoDB
const urlRoute = require("./routes/url"); // Route handler for URL-related operations
const URL = require("./models/url"); // Mongoose model for URL schema

const app = express(); // Initialize Express app
const PORT = 8001; // Define the port number

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON requests
app.use(express.json());

// Route for handling URL-related operations
app.use("/url", urlRoute);

// Route to handle redirection based on shortId
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId; // Extract shortId from the request parameters

  // Find the URL document by shortId and update its visit history
  const entry = await URL.findOneAndUpdate(
    {
      shortId, // Query to find the document with the given shortId
    },
    {
      $push: {
        visitHistory: {
          Timestamp: Date.now(), // Add the current timestamp to the visit history
        },
      },
    }
  );

  // Redirect to the original URL stored in the database
  res.redirect(entry.redirectUrl);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});