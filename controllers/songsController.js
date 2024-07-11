// controllers/songsController.js

const express = require("express");
const songs = express.Router();
const { getAllSongs } = require("../queries/songsQueries.js");
const { error } = require("console");

songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = songs;
