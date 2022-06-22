const express = require("express");
const router = express.Router();
const Data = require("../Data/Database");
const emails = require("../usecases/emails");

router.get("/", (req, res) => {
  // let emails = emails.get();
  res.send(emails.get());
});

module.exports = router;
