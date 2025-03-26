const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // Import the URL model

// Route to render the home page with all URLs
router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({}); // Fetch all URLs from the database
    return res.render("home", {
      urls: allUrls, // Pass the URLs to the home view
    });
  } catch (error) {
    console.error("Error fetching URLs:", error); // Log any errors
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;