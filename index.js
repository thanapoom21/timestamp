// index.js
// where your node app starts

// init project
const express = require("express");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
const dns = require('dns')
const mongoose = require('mongoose')
require('dotenv').config()

// This section is where DB code lives.
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  }
})

const exerciseSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date },
})

let User = mongoose.model('User', userSchema);
let Exercise = mongoose.model('Exercise', exerciseSchema);

// This is the section end line for DB code.

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
        res.json({ error: "Invalid URL" })
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
      res.json({ "error": "Not Found." })
    }
  } else {
    res.json({ "error": "Not Found." })
  }
})

app.get('/api/users', async (req, res) => {
  let users = await User.find({});

  users.length == 0 ? res.json("No users found!") : res.json(users);
})

app.post('/api/users', async (req, res) => {
  let newUser = await User.create({ username: req.body.username })

  res.json({
    username: newUser.username,
    _id: newUser._id,
  })
})

app.post('/api/users/:_id/exercises', (req, res) => {
  let userID = req.params._id
  let payloadDate = new Date(req.body.date).toDateString();
  let now = new Date(Date.now()).toDateString()

  User.findById(userID).then(userFound => {
    Exercise.create({
      user_id: userFound._id,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date ? payloadDate : now
    }).then(data => {
      res.json({
        "_id": userFound._id,
        "username": userFound.username,
        "date": data.date.toDateString(),
        "duration": data.duration,
        "description": data.description,
      });
    }).catch((err) => {
      console.error(err)
      err.stack
    });
  })
})

app.get('/api/users/:_id/logs', (req, res) => {
  let userID = req.params._id
  let { from: startDate, to: endDate, limit: maximum } = req.query

  if (startDate) {
    startDate = new Date(startDate).getTime()
  }

  if (endDate) {
    endDate = new Date(endDate).getTime()
  }

  User.findById(userID).then(userFound => {
    Exercise.find({
      date: {
        "$gte": startDate || new Date('1450-1-1'),
        "$lt": endDate || new Date('2300-1-1')
      },
      user_id: userID
    }).limit(maximum)
      .select({ user_id: 0 })
      .then(docs => {
        res.json({
          "_id": userFound._id,
          "username": userFound.username,
          "count": docs.length,
          "log": docs.map(doc => ({
            "date": doc.date.toDateString(),
            "duration": doc.duration,
            "description": doc.description,
          }))
        });
      }).catch((err) => {
        console.error(err)
      });
  })
})

// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
