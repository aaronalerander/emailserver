const express = require("express");
const router = express.Router();
const templates = require("../usecases/templates");
const Validate = require("../Data/validate");
const Postmark = require("../Data/PostMark");
const Data = require("../Data/Database");

// get all the templates of type emailId
router.get("/:emailId", (req, res) => {
  try {
    let array = templates.get(req.params.emailId);
    res.status(200).send(array);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let responceBody = await templates.post(req.body);
    return res.status(200).send(responceBody);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
