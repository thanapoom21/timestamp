const express = require("express");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require("cors");
const app = express();
require('dotenv').config()

// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

const exerciseTracker = require('./src/pages/exercise-tracker')
const fileMetadata = require('./src/pages/file-metadata')
const requestHeader = require('./src/pages/request-header-parser')
const timeStamp = require('./src/pages/timestamp')
const urlShortener = require('./src/pages/url-shortener')

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/views/index.html");
});
app.get("/timestamp", (req, res) => {
  res.sendFile(__dirname + "/src/views/timestamp.html");
});
app.get("/request-header-parser", (req, res) => {
  res.sendFile(__dirname + "/src/views/request-header-parser.html");
});
app.get("/url-shortener", (req, res) => {
  res.sendFile(__dirname + "/src/views/url-shortener.html");
});
app.get("/exercise-tracker", (req, res) => {
  res.sendFile(__dirname + "/src/views/exercise-tracker.html");
});
app.get("/file-metadata", (req, res) => {
  res.sendFile(__dirname + "/src/views/file-metadata.html");
});

app.use('/api/users', exerciseTracker)
app.use('/api/file-metadata', fileMetadata)
app.use('/api/request-header-parser', requestHeader)
app.use('/api/timestamp', timeStamp)
app.use('/api/shorturl', urlShortener)


// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
