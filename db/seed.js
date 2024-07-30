const { faker } = require("@faker-js/faker");
const { time } = require("console");
const db = require("./dbConfig.js");
const { exit } = require("process");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function choose(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function chooseN(arr, num) {
  output = [];
  while (output.length <= num) {
    const value = choose(arr);
    if (!output.includes(value)) {
      output.push(value);
    }
  }
  return output;
}

function generateSong() {
  return {
    title: `${capitalize(faker.word.adjective())} ${faker.vehicle.type()}`,
    artist: `${capitalize(faker.word.adverb())} ${capitalize(
      faker.animal.type()
    )}`,
    album: `${capitalize(faker.word.adverb())} ${
      faker.science.chemicalElement().name
    }`,
    time: randomInt(50, 400),
  };
}

function getSongsQuery(n_songs) {
  const songs = [];
  let query = "INSERT INTO songs(title, artist, album, time) VALUES ";
  for (let n = 0; n <= n_songs; n++) {
    const song = generateSong();
    songs.push(
      `('${song.title}','${song.artist}','${song.album}',${song.time})`
    );
  }

  return query + songs.join(",") + " RETURNING *;";
}

function getPlaylistQuey(ids) {
  const values = [];
  for (id of ids) {
    values.push(`(${id}, ${faker.datatype.boolean()})`);
  }
  const query = "INSERT INTO playlist(song_id, is_favorite) VALUES ";
  return query + values.join(",") + " RETURNING *;";
}

async function seed(nSongs, nSongsPlaylist) {
  const songs = await db.many(getSongsQuery(nSongs));
  const ids = chooseN(
    songs.map((song) => song.id),
    nSongsPlaylist
  );
  const playlist = await db.many(getPlaylistQuey(ids));
  console.log(
    `${songs.length} Songs Added\n${playlist.length} Songs Added to the Playlist`
  );
}

// Insert random data into database
console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=");
console.log("* Generating Random Songs *");
console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=");
seed(100, 10);
