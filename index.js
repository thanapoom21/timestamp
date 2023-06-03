// index.js
// where your node app starts

// init project
let express = require("express");
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/",  (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello",  (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?",  (req, res) => {
  // let timestamp = req.params.date_string == null
  //   ? new Date(Date.now())
  //   : /^[0-9]*$/g.test(req.params.date_string)
  //     ? new Date(parseInt(req.params.date_string, 10))
  //     : new Date(req.params.date_string)

  let timestamp;
  if (req.params.date_string == null) {
    timestamp = new Date(Date.now())
  } else if (req.params.date_string != null && /^[0-9]*$/g.test(req.params.date_string)) {
    timestamp = new Date(parseInt(req.params.date_string, 10))
  } else {
    timestamp = new Date(req.params.date_string)
  }

  let unixTime = timestamp.getTime();
  res.json(
    Number.isNaN(unixTime)
      ? { error: "Invalid Date", message: "this code has been refactored to eliminate nested ternary operators!!" }
      : { unix: unixTime, utc: timestamp.toUTCString() }
  )
});

app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req["ip"],
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
