// controllers/songsController.js

const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getSongByID,
  createSong,
  deleteSong,
} = require("../queries/songsQueries.js");
const {
  validateName,
  validateArtist,
  validateAlbum,
  validateTime,
  validateIsFavorite,
} = require("../validators/songsValidators.js");

songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

songs.get("/:id", async (req, res) => {
  const color = await getSongByID(req.params.id);

  if (color.id) {
    res.status(200).json(color);
  } else {
    res.status(404).json({ error: "Song not Found" });
  }
});

songs.post(
  "/",
  validateName,
  validateArtist,
  validateAlbum,
  validateTime,
  validateIsFavorite,
  async (req, res) => {
    const newSong = await createSong(req.body);
    if (newSong.id) {
      res.status(201).json(newSong);
    } else {
      res.status(500).json({ error: "Someting went wrong!" });
    }
  }
);

songs.delete("/:id", async (req, res) => {
  const song = await deleteSong(req.params.id);
  if (song.id) {
    res.status(200).json(song);
  } else {
    res.status(404).json({ error: "Song not found!" });
  }
});

module.exports = songs;
