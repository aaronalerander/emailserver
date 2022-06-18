const Joi = require("joi");
const express = require("express");
const app = express();

const FROM_EMAIL = "aaron@scaledrones.com";

app.use(express.json());

let postmark = require("postmark");
const { Err } = require("joi/lib/errors");
const serverToken = "d9379748-100a-483a-8f01-499bdc0307fc";
let postmarkClient = new postmark.ServerClient(serverToken);

let Recipients = [
  {
    id: 1,
    email: "aaron@scaledrones.com",
    first: "Aaron",
    last: "Alexander",
  },
  { id: 2, email: "aaron@scaledrones.com", first: "Joe", last: "Bob" },
];

//i need a personal id and postmarkid because the open webhook does not tell me which template it was and i need to update them. So I add the serverId to the metadata when creating it
let Templates = [
  { id: 28297082, emailId: 1, version: 1, opens: 1, clicks: 1 },
  { id: 1102, emailId: 1, version: 2, opens: 1, clicks: 1 },
  { id: 1103, emailId: 2, version: 1, opens: 1, clicks: 1 },
  { id: 1104, emailId: 3, version: 1, opens: 1, clicks: 1 },
];

let Emails = [
  { id: 1, name: "Welcome", opens: 2, clicks: 2, currentTemplateId: 28297082 },
  {
    id: 2,
    name: "Reset Passowrd",
    opens: 1,
    clicks: 1,
    currentTemplateId: 1103,
  },
  {
    id: 3,
    name: "Purchase Confirmation",
    opens: 1,
    clicks: 1,
    currentTemplateId: 1104,
  },
];

app.get("/recipients", (req, res) => {
  res.send(Recipients);
});

app.get("/emails", (req, res) => {
  res.send(Emails);
});

// get all the templates of type emailId
app.get("/templates/:emailId", (req, res) => {
  let emailId = parseInt(req.params.emailId);
  let templates = Templates.filter((template) => template.emailId === emailId);
  res.send(templates);
});

//create template
app.post("/templates", async (req, res) => {
  const { error } = validateTemplate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let { name, subject, textbody } = req.body;

  try {
    let { TemplateId, Name } = await postmarkClient.createTemplate({
      Name: name,
      HtmlBody: textbody,
      Subject: subject,
    });

    let emailId = Emails.length + 1;

    let email = {
      id: emailId,
      name: Name,
      opens: 0,
      clicks: 0,
      currentTemplateId: TemplateId,
    };

    Emails.push(email);

    let template = {
      id: TemplateId,
      emailId: emailId,
      version: 1,
      opens: 0,
      clicks: 0,
    };

    Templates.push(template);

    res.send({
      template: template,
      email: email,
    });
  } catch (error) {
    res.status(500).send(error.name);
    return;
  }
});

function validateTemplate(template) {
  const schema = {
    name: Joi.string().min(1).required(),
    subject: Joi.string().min(1).required(),
    textbody: Joi.string().min(1).required(),
  };

  return Joi.validate(template, schema);
}

//send email to all users
//TODO you might have to change this if i create a front end where you can select the recipients

app.post("/email", async (req, res) => {
  //not sure if i should make this validation into a Joi validation. Only thing is it is one feild so it feel be redundant/complecated for not reason
  if (!req.body.id) {
    res
      .status(400)
      .send("You either did not include the email id or the id was not an int");
  }
  if (isNaN(req.body.id)) {
    res.status(400).send("Id must be an interger");
  }

  let emailId = parseInt(req.body.id);
  let email = Emails.find((email) => email.id === emailId);
  if (!email) res.status(404).send("The email with the given Id was not found");

  //i have to get the template id
  let templateId = email.currentTemplateId;
  let RecipientEmails = Recipients.map((recipient) => recipient.email).join(
    ", "
  );

  try {
    let result = await postmarkClient.sendEmailWithTemplate({
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
    console.log(error);
    res.status(500).send(error);
    return;
  }
});

//revet template
//i need email
/** * i need the email id and I need the template Id
 * I need to change it on my end and make sure it is good. (update array)
 * then tell a sucess message. */
app.put("/templates", async (req, res) => {
  const { error } = validateRevertTemplate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let { emailId, templateId } = req.body;
  emailId = parseInt(emailId);
  templateId = parseInt(templateId);

  try {
    let email = Emails.find((email) => email.id === emailId);

    email.currentTemplateId = templateId;

    res.status(200).send("The email was sucesfully reverted");
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

function validateRevertTemplate(reqBody) {
  const schema = {
    emailId: Joi.number().min(1).required(),
    templateId: Joi.number().min(1).required(),
  };

  return Joi.validate(reqBody, schema);
}

//route for webhook
/**update both tables
 *
 *
 * try catch  */

app.post("/templatesEmails", async (req, res) => {
  console.log(req.body);
  let { error, message } = validateWebHook(req.body);
  if (error) {
    console.log(message);
    res.status(400).send(message);
    return;
  }

  let recordType = req.body.RecordType;
  let templateId = parseInt(req.body.Metadata.templateId);
  let emailId = parseInt(req.body.Metadata.emailId);

  //I have to test this and see how the error handling works. So both
  try {
    let email = Emails.find((email) => email.id === emailId);
    let template = Templates.find((template) => template.id === templateId);
    console.log(email);
    console.log(template);
    if (email === undefined || template === undefined) {
      // throw new Error("email id or template id not found");
      console.log("if undefined thing");
      throw new Error("email id or template id not found");
    }

    if (recordType == "Click") {
      email.clicks += 1;
      template.clicks += 1;
    } else if (recordType == "Open") {
      email.opens += 1;
      template.opens += 1;
    }
    console.log(Templates);
    console.log(Emails);
    console.log("all good");
    res.sendStatus(200);
    return;
  } catch (error) {
    console.log("error block");
    console.log(error);

    res.status(500).send(error);
    return;
  }

  //i have to set up a try catch. try to find and update. error.

  //check if open or click
  //update the tables, both of them
});

//lmfao this is the fucking ulgiest code i have made
function validateWebHook(body) {
  //return {error:"this message", message:"this message"}
  // let isError = false;
  if (!body.RecordType) {
    return { error: true, message: "does not have record type" };
  } else if (body.RecordType !== "Open" && body.RecordType !== "Click") {
    return { error: true, message: "record type is not click or open" };
  } else if (!body.Metadata) {
    return { error: true, message: "doesnt contain metadata" };
  } else if (!body.Metadata.templateId) {
    return { error: true, message: "doesnt contain templateId" };
  } else if (isNaN(body.Metadata.templateId)) {
    return { error: true, message: "templateId must be an int" };
  } else if (!body.Metadata.emailId) {
    return { error: true, message: "doesnt contain emailId" };
  } else if (isNaN(body.Metadata.emailId)) {
    return { error: true, message: "emailId must be an int" };
  } else {
    return { error: false, message: "All god" };
  }
}

//edit template

//get template
/**
 * get the old template
 * displat it
 *
 *
 *
 *
 *
 */
/**
 * So a couple things. How will this person do this.
 *
 * they will get a list of templates
 * when they click it i need to load the template data
 *
 * they can edit the subject, (not the name), they can edit the body
 * they hit submit.
 *
 * So they will send the the subject, and the body. I do need two things though, the emailId (eg welcom id)
 * then I need to create the new template. then I need to
 *
 *
 *
 *
 */

app.listen(3000);
