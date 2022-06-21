const express = require("express");
const router = express.Router();
const Validate = require("../Data/validate");
const Postmark = require("../Data/PostMark");
const Data = require("../Data/Database");

router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("You did not include the template id");
    return;
  }
  if (isNaN(req.params.id)) {
    res.status(400).send("Id must be an interger");
    return;
  }

  let id = parseInt(req.params.id);

  try {
    let result = await Postmark.postmarkClient.getTemplate(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

router.post("/:emailId", async (req, res) => {
  if (!req.params.emailId) {
    res.status(400).send("You did not include the email id");
  }
  if (isNaN(req.params.emailId)) {
    res.status(400).send("Id must be an interger");
  }

  const { error } = Validate.validateUpdateTemplate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let { subject, textbody } = req.body;

  let emailId = parseInt(req.params.emailId);
  let email = Data.Emails.find((email) => email.id === emailId);

  let versionNumber = 0;
  Data.Templates.forEach(function (template) {
    if (template.emailId === emailId) {
      versionNumber = Math.max(versionNumber, template.version);
    }
  });
  versionNumber += 1;

  try {
    let { TemplateId, Name } = await Postmark.postmarkClient.createTemplate({
      Name: email.name + versionNumber,
      HtmlBody: textbody,
      Subject: subject,
    });

    email.currentTemplateId = TemplateId;

    let template = {
      id: TemplateId,
      emailId: email.id,
      version: versionNumber,
      opens: 0,
      clicks: 0,
    };

    Data.Templates.push(template);

    res.send({
      template: template,
      email: email,
    });
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

module.exports = router;
