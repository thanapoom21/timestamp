const express = require("express");
const router = express.Router()

router.get("/:date_string?", (req, res) => {
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

module.exports = router