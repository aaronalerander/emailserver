const express = require("express");
const router = express.Router();

const webhook = require("../usecases/webhook");

//route for webhook
router.post("/", async (req, res) => {
  try {
    webhook.post(req.body);
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
