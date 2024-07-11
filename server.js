// server.js
// Dependencies
const app = require("./app.js");

// Configuration
require("dotenv").config();
const PORT = process.env.PORT || 3345;

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}\nhttp://localhost:${PORT}`);
});
