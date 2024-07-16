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

async function getAllSongsOrder(order) {
  order = order == "asc" ? "ASC" : "DESC";
  const queryStr = `SELECT * FROM songs ORDER BY name ${order};`;
  try {
    const allSongs = await db.any(queryStr);
    return allSongs;
  } catch (error) {
    return error;
  }
}

async function filterSongsByFavorite(favorite) {
  const queryStr = `SELECT * FROM songs WHERE is_favorite = ${favorite};`;
  try {
    const allSongs = await db.any(queryStr);
    return allSongs;
  } catch (error) {
    return error;
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

async function updateSong(id, song) {
  const keys = Object.keys(song).filter((key) => song[key] != undefined);
  const queryStr =
    "UPDATE songs SET " +
    `${keys.map((key) => `${key}=$[${key}]`).join(", ")} ` +
    "WHERE id=$[id] RETURNING *;";
  try {
    const updatedSong = await db.one(queryStr, { ...song, id: id });
    return updatedSong;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllSongs,
  getAllSongsOrder,
  filterSongsByFavorite,
  getSongByID,
  createSong,
  deleteSong,
  updateSong,
};
