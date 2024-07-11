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

module.exports = { getAllSongs };
