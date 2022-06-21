const express = require("express");
const router = express.Router();
const Data = require("../Data/Database");

router.get("/", (req, res) => {
  res.send(Data.Recipients);
});

module.exports = router;
