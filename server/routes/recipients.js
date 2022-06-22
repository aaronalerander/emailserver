const express = require("express");
const router = express.Router();
const recipients = require("../usecases/recipients");

router.get("/", (req, res) => {
  // let emails = emails.get();
  res.send(recipients.get());
});

module.exports = router;
