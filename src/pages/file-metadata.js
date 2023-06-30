// Mini app for file-metadata.
const express = require('express')
const router = express.Router()

// A middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer')

// Create a distination for file uploading.
const upload = multer({ dest: 'uploads/' })

// Use a middleware function first and call next() to allow following functions to run. Otherwise, it will stop running.
router.use((req, res, next) => {
  console.log('Current Date & Time: ', new Date(Date.now()).toUTCString())
  next()
})

// Create a simple get route.
router.get('/', (req, res) => {
  res.send('File Metadata home page on get request.')
})

// Create a simple post route when uploading a file.
// req.file contains properties created by Multer.
router.post('/', upload.single('upfile'), (req, res) => {
  try {
    if (!req.file) {
      res.send({
        status: false,
        message: "No file uploaded"
      })
    } else {
      let uploadedFile = req.file;
      res.send({
        status: true,
        message: 'File is uploaded',
        name: uploadedFile.originalname,
        type: uploadedFile.mimetype,
        size: uploadedFile.size

      });
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router