const Joi = require("joi");
const cors = require("cors");
const express = require("express");
const app = express();

const FROM_EMAIL = "aaron@scaledrones.com";

app.use(cors());
app.use(express.json());

let postmark = require("postmark");
const { Err } = require("joi/lib/errors");
const { max } = require("joi/lib/types/array");
const serverToken = "e23f58d6-bd8a-4bf1-a1f9-a7ac1174dd2b";
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
  { id: 32, emailId: 1, version: 3, opens: 1, clicks: 1 },
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
  //need to check if emailId is an int
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
    let emailExists = Emails.find((email) => email.name === name);
    // if (!email) res.status(404).send("The email with the given Id was not found");
    if (emailExists !== undefined) {
      // throw new Error("email id or template id not found");
      res
        .status(404)
        .send({ message: "An email with that name already exsits" });
      console.log("email  exsit");
      return;
    }

    //i have to check if an eamil with that name already exsits!!!,
    //if yes, send an error with a message!

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
    console.log(error);
    res.status(500).send(error);
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
//i think it would be better practice to put the id in the url.
app.post("/email", async (req, res) => {
  //not sure if i should make this validation into a Joi validation. Only thing is it is one feild so it feel be redundant/complecated for not reason
  if (!req.body.id) {
    res.status(400).send("You  did not include the email id ");
  }
  if (isNaN(req.body.id)) {
    res.status(400).send("Id must be an interger");
  }

  let emailId = parseInt(req.body.id);
  let email = Emails.find((email) => email.id === emailId);
  // if (!email) res.status(404).send("The email with the given Id was not found");
  if (email === undefined)
    res.status(404).send("The email with the given Id was not found");

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
 * then tell a sucess message.
 *
 * tbh i think it is better practice if emailid is in the url and templateId is in the body
 *  */
//did you check if that templateId belongs to that emailId?

app.put("/email/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).send("You did not include the email id");
  }
  if (isNaN(req.params.id)) {
    res.status(400).send("Id must be an interger");
  }

  let emailId = parseInt(req.params.id);

  const { error } = validateRevertTemplate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let { templateId } = req.body;
  templateId = parseInt(templateId);

  try {
    let email = Emails.find((email) => email.id === emailId);

    if (email === undefined) {
      res.status(404).send("that email doesnt exist");
      return;
    }

    let template = Templates.find((template) => template.id === templateId);

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

    // res.status(200).send("The email was sucesfully reverted");
    res.status(200).send({ email: email, template: template });
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

function validateRevertTemplate(reqBody) {
  const schema = {
    templateId: Joi.number().min(1).required(),
  };

  return Joi.validate(reqBody, schema);
}

//route for webhook
/**update both tables
 *
 *
 * try catch  */
//this is a terible name I think
app.post("/webhook", async (req, res) => {
  console.log(req.body);
  let { error, message } = validateWebHook(req.body);
  if (error) {
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

  //i have to set up a try catch. try to find and update. error.

  //check if open or click
  //update the tables, both of them
});

//lmfao this is the fucking ulgiest code i have made. this is so fucking hard to read by somwone who doesnt know what its doing
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

app.get("/template/:id", async (req, res) => {
  //not sure if i should make this validation into a Joi validation. Only thing is it is one feild so it feel be redundant/complecated for not reason
  if (!req.params.id) {
    res.status(400).send("You did not include the template id");
  }
  if (isNaN(req.params.id)) {
    res.status(400).send("Id must be an interger");
  }

  let id = parseInt(req.params.id);

  try {
    let result = await postmarkClient.getTemplate(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

app.post("/template/:emailId", async (req, res) => {
  //not sure if i should make this validation into a Joi validation. Only thing is it is one feild so it feel be redundant/complecated for not reason
  if (!req.params.emailId) {
    res.status(400).send("You did not include the email id");
  }
  if (isNaN(req.params.emailId)) {
    res.status(400).send("Id must be an interger");
  }

  const { error } = validateUpdateTemplate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let { subject, textbody } = req.body;

  let emailId = parseInt(req.params.emailId);
  let email = Emails.find((email) => email.id === emailId);

  let versionNumber = 0;
  Templates.forEach(function (template) {
    if (template.emailId === emailId) {
      versionNumber = Math.max(versionNumber, template.version);
    }
  });
  versionNumber += 1;

  // for (var template in Templates) {
  //   console.log(template);
  //   if (template.emailId === emailId) {
  //     versionNumber = Math.max(versionNumber, template.version);
  //   }
  // }

  //this fuction is wrong, because it doesnt look at the emailId
  // let versionNumber =
  //   Math.max(...Templates.map((template) => template.version)) + 1;
  //get the email name
  //get the version number
  console.log(Emails);
  console.log(Templates);
  console.log();

  try {
    let { TemplateId, Name } = await postmarkClient.createTemplate({
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

    Templates.push(template);

    res.send({
      template: template,
      email: email,
    });

    console.log(Emails);
    console.log(Templates);

    //print the emails to see if it updated the right email record
  } catch (error) {
    res.status(500).send(error);
    return;
  }
});

function validateUpdateTemplate(template) {
  const schema = {
    subject: Joi.string().min(1).required(),
    textbody: Joi.string().min(1).required(),
  };

  return Joi.validate(template, schema);
}

//edit template
/**
 *
 * what do i need,
 * I need the name (emailid), subject, textbod
 */

/**
 * check the data
 * try catch
 * to create the template
 * then update my template arrary (plus the version code)
 * then update my email array current template
 *
 *
 * update the version code
 *
 * i think i need email id and the template stuff?
 */

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

/**an issue could be people creating too many templates and loading that into the front end */
/**
 *
 *
 * im doing edit this way because, I an not storeing the template data in my database.
 */
app.listen(9000);

/**
 *
 * folder for
 * routes
 * eg, email, templates
 *
 * validation
 *
 * types/arrays.
 *
 */
