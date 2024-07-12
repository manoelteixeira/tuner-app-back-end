const { el } = require("@faker-js/faker");

function validateName(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ error: "name is required" });
  } else if (typeof req.body.name != "string") {
    res.status(400).json({ error: "name must be a string" });
  } else {
    next();
  }
}

function validateArtist(req, res, next) {
  if (!req.body.artist) {
    res.status(400).json({ error: "artist is required" });
  } else if (typeof req.body.artist != "string") {
    res.status(400).json({ error: "artist must be a string" });
  } else {
    next();
  }
}

function validateAlbum(req, res, next) {
  if (!req.body.album) {
    req.body.album = undefined;
    next();
  } else if (typeof req.body.album != "string") {
    res.status(400).json({ error: "album must be a string" });
  } else {
    next();
  }
}

function validateTime(req, res, next) {
  if (!req.body.time) {
    req.body.time = undefined;
    next();
  } else if (!Number.isInteger(req.body.time)) {
    res.status(400).json({ error: "time must be an integer" });
  } else {
    next();
  }
}

function validateIsFavorite(req, res, next) {
  if (!req.body.is_favorite) {
    req.body.is_favorite = undefined;
    next();
  } else if (typeof req.body.is_favorite != "boolean") {
    res.status(400).json({ error: "is_favorite must be a boolean" });
  } else {
    next();
  }
}

module.exports = {
  validateName,
  validateArtist,
  validateAlbum,
  validateTime,
  validateIsFavorite,
};
