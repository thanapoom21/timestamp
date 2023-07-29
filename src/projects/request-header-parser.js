const express = require("express");
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    ipaddress: req["ip"],
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

module.exports = router