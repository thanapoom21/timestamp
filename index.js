// index.js
// where your node app starts

// init project
const express = require("express");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
const dns = require('dns')

// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
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

let urls = []

app.post('/api/shorturl', (req, res) => {
  let url = req.body.url
  let urlNoTrailingSlash = url.replace(/\/*$/, '')
  let domainWithPath = urlNoTrailingSlash.replace(/^https?:\/\//, '')
  let domainName = domainWithPath.split('/')[0]

  if (domainName == "") {
    res.json(`Domain name is not provided.`)
  } else {
    dns.lookup(domainName, (err, address, family) => {
      if (err || !address) {
        res.json({error: "Invalid URL"})
      } else {
        let newURL = {
          original_url: url,
          short_url: urls.length
        }
  
        urls.push(newURL)
        res.json(newURL)
      }
    })
  }
})

app.get('/api/shorturl/:id?', (req, res) => {
  let short_url = req.params.id;
  let entry = urls.find(obj => obj.short_url == short_url);

  if (entry) {
    let long_url = entry['original_url'];
    if (long_url) {
      res.redirect(long_url);
    } else {
      res.json({"error": "Not Found."})
    }
  } else {
      res.json({"error": "Not Found."})
    }
})

// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
