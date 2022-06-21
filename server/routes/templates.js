const express = require("express");
const router = express.Router();

const Validate = require("../Data/validate");
const Postmark = require("../Data/PostMark");
const Data = require("../Data/Database");

// get all the templates of type emailId
router.get("/:emailId", (req, res) => {
  let emailId = parseInt(req.params.emailId);
  let templates = Data.Templates.filter(
    (template) => template.emailId === emailId
  );
  res.send(templates);
});

router.post("/", async (req, res) => {
  const { error } = Validate.validateTemplate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let { name, subject, textbody } = req.body;

  try {
    let emailExists = Data.Emails.find((email) => email.name === name);
    if (emailExists !== undefined) {
      res
        .status(404)
        .send({ message: "An email with that name already exsits" });
      console.log("email  exsit");
      return;
    }

    let { TemplateId, Name } = await Postmark.postmarkClient.createTemplate({
      Name: name,
      HtmlBody: textbody,
      Subject: subject,
    });

    let emailId = Data.Emails.length + 1;

    let email = {
      id: emailId,
      name: Name,
      opens: 0,
      clicks: 0,
      currentTemplateId: TemplateId,
    };

    Data.Emails.push(email);

    let template = {
      id: TemplateId,
      emailId: emailId,
      version: 1,
      opens: 0,
      clicks: 0,
    };

    Data.Templates.push(template);

    res.send({
      template: template,
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
});

module.exports = router;
