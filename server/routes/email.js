const express = require("express");
const router = express.Router();
const Validate = require("../Data/validate");
const Postmark = require("../Data/PostMark");
const Data = require("../Data/Database");
const email = require("../usecases/email");

const FROM_EMAIL = "aaron@scaledrones.com";

//send email to all users
//TODO you might have to change this if i create a front end where you can select the recipients
//i think it would be better practice to put the id in the url.
router.post("/", async (req, res) => {
  try {
    await email.post(req.body.id);
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(200).send("success");
});

//revert template
router.put("/:id", async (req, res) => {
  try {
    let responceBody = email.put(req.params.id, req.body);
    return res.status(200).send(responceBody);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
