const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

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

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.get('/', async (req, res) => {
  let users = await User.find({});

  users.length == 0 ? res.json("No users found!") : res.json(users);
})

router.post('/', async (req, res) => {
  try {
    let newUser = await User.create({ username: req.body.username })

    res.json({
      username: newUser.username,
      _id: newUser._id,
    })
  } catch (err) {
    res.status(500).send({ error: err, message: 'The user has already been created.' })
  }
})


router.post('/:_id/exercises', (req, res) => {
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

router.get('/:_id/logs', (req, res) => {
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

module.exports = router