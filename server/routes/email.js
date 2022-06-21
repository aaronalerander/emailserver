const express = require("express");
const router = express.Router();
const Validate = require("../Data/validate");
const Postmark = require("../Data/PostMark");
const Data = require("../Data/Database");

const FROM_EMAIL = "aaron@scaledrones.com";

//send email to all users
//TODO you might have to change this if i create a front end where you can select the recipients
//i think it would be better practice to put the id in the url.
router.post("/", async (req, res) => {
  //not sure if i should make this validation into a Joi validation. Only thing is it is one feild so it feel be redundant/complecated for not reason
  if (!req.body.id) {
    res.status(400).send("You  did not include the email id ");
  }
  if (isNaN(req.body.id)) {
    res.status(400).send("Id must be an interger");
  }

  let emailId = parseInt(req.body.id);
  let email = Data.Emails.find((email) => email.id === emailId);

  if (email === undefined)
    res.status(404).send("The email with the given Id was not found");

  let templateId = email.currentTemplateId;
  let RecipientEmails = Data.Recipients.map(
    (recipient) => recipient.email
  ).join(", ");

  try {
    let result = await Postmark.postmarkClient.sendEmailWithTemplate({
      TemplateId: templateId,
      From: FROM_EMAIL,
      To: RecipientEmails,
      TemplateModel: {},
      TrackOpens: true,
      TrackLinks: "HtmlAndText",
      MessageStream: "outbound",
      Metadata: {
        templateId: templateId,
        emailId: emailId,
      },
    });

    console.log(result);
    res.status(200).send("email was sucessfully sent");
  } catch (error) {
    useEffect(() => {
      async function fetchData() {
        try {
          let responce = await fetch("http://localhost:9000/emails");
          let body = await responce.json();
          setEmails(body);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);
    console.log(error);
    res.status(500).send(error);
    return;
  }
});

//revert template
router.put("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("You did not include the email id");
  }
  if (isNaN(req.params.id)) {
    res.status(400).send("Id must be an interger");
  }

  let emailId = parseInt(req.params.id);

  const { error } = Validate.validateRevertTemplate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let { templateId } = req.body;
  templateId = parseInt(templateId);

  try {
    let email = Data.Emails.find((email) => email.id === emailId);

    if (email === undefined) {
      res.status(404).send("that email doesnt exist");
      return;
    }

    let template = Data.Templates.find(
      (template) => template.id === templateId
    );

    if (template === undefined) {
      res.status(404).send("That template version does not exist");
      return;
    } else if (template.emailId !== email.id) {
      res
        .status(404)
        .send("This template version does not belong to this type of email");
      return;
    }

    email.currentTemplateId = templateId;

    res.status(200).send({ email: email, template: template });
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

module.exports = router;
