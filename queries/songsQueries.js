// queries/songs.js
const db = require("../db/dbConfig.js");

async function getAllSongs() {
  try {
    const allSongs = await db.any("SELECT * FROM songs;");
    return allSongs;
  } catch (err) {
    return err;
  }
}

async function getSongByID(id) {
  const queryStr = "SELECT * FROM songs " + "WHERE id=$[id]";
  try {
    const song = await db.one(queryStr, { id: Number(id) });
    return song;
  } catch (error) {
    return error;
  }
}

async function createSong(song) {
  const queryStr =
    "INSERT INTO songs (name, artist, album, time, is_favorite ) VALUES " +
    "($[name], $[artist], $[album], $[time], $[is_favorite]) " +
    "RETURNING *;";
  try {
    const newSong = await db.one(queryStr, song);
    return newSong;
  } catch (error) {
    return error;
  }
}

async function deleteSong(id) {
  const queryStr = "DELETE FROM songs WHERE id=$[id] RETURNING *;";
  try {
    const deletedSong = await db.one(queryStr, { id: Number(id) });
    return deletedSong;
  } catch (error) {
    return error;
  }
}

module.exports = { getAllSongs, getSongByID, createSong, deleteSong };
