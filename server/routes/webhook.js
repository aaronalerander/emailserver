const express = require("express");
const router = express.Router();
const Validate = require("../Data/validate");
const Data = require("../Data/Database");

//route for webhook
router.post("/", async (req, res) => {
  console.log(req.body);
  let { error, message } = Validate.validateWebHook(req.body);
  if (error) {
    res.status(400).send(message);
    return;
  }

  let recordType = req.body.RecordType;
  let templateId = parseInt(req.body.Metadata.templateId);
  let emailId = parseInt(req.body.Metadata.emailId);

  try {
    let email = Data.Emails.find((email) => email.id === emailId);
    let template = Data.Templates.find(
      (template) => template.id === templateId
    );
    if (email === undefined || template === undefined) {
      throw new Error("email id or template id not found");
    }

    if (recordType == "Click") {
      email.clicks += 1;
      template.clicks += 1;
    } else if (recordType == "Open") {
      email.opens += 1;
      template.opens += 1;
    }

    res.sendStatus(200);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

module.exports = router;
