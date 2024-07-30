-- db/schema.sql
DROP DATABASE IF EXISTS tuner;
CREATE DATABASE tuner;

\c tuner;

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time INTEGER
);

CREATE TABLE playlist(
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
    is_favorite BOOLEAN
);