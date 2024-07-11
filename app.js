// app.js

// Dependencies
const express = require("express");
const cors = require("cors");
const songsController = require("./controllers/songsController");

// Configuration
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/songs", songsController);

// Routes
app.use("/", (req, res) => {
  res.send("Welcome to Tuner App!");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Export
module.exports = app;
