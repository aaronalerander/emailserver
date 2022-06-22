const express = require("express");
const router = express.Router();
const recipients = require("../usecases/recipients");

router.get("/", (req, res) => {
  res.send(recipients.get());
});

module.exports = router;
