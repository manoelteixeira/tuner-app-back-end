const { faker } = require("@faker-js/faker");
const { time } = require("console");
const db = require("./dbConfig.js");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateSong() {
  return {
    name: `${faker.word.adjective()} ${faker.vehicle.type()}`,
    artist: `${faker.word.adverb()} ${faker.animal.type()}`,
    album: `${faker.word.adverb()} ${faker.science.chemicalElement().name}`,
    time: randomInt(50, 400),
    is_favorite: faker.datatype.boolean(),
  };
}

function getSeedQuery(n_songs) {
  const songs = [];
  let query =
    "INSERT INTO songs(name, artist, album, time, is_favorite) VALUES ";
  for (let n = 0; n <= n_songs; n++) {
    const song = generateSong();
    songs.push(
      `('${song.name}','${song.artist}','${song.album}',${song.time},${song.is_favorite})`
    );
  }

  return query + songs.join(",") + ";";
}

// Insert random data into database
console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=");
console.log("* Generating Random Songs *");
console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=");
const query = getSeedQuery(50);
db.none(query);
