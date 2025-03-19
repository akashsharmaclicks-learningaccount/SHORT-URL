// Importing the Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Function to establish a connection to MongoDB
// Takes the MongoDB connection string (url) as a parameter
async function connectToMongoDB(url) {
  return mongoose.connect(url); // Connects to the MongoDB database using the provided URL
}

// Exporting the connectToMongoDB function for use in other files
module.exports = {
  connectToMongoDB,
};