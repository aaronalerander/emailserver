const express = require("express");
const router = express.Router();
const emails = require("../usecases/emails");

router.get("/", (req, res) => {
  res.send(emails.get());
});

module.exports = router;
