const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser")
const dns = require('dns')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

let urls = []

router.post('/', (req, res) => {
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

router.get('/:id?', (req, res) => {
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

module.exports = router