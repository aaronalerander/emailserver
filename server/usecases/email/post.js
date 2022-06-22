const Postmark = require("../../Data/PostMark");
const Data = require("../../Data/Database");

function post(id) {
  let emailId = validateEmailId(id);
  if (emailId === null) return;

  let email = getEmailById(emailId);
  if (email === null) return;

  let currentTemplateId = email.currentTemplateId;

  let recipientEmails = Data.Recipients.map(
    (recipient) => recipient.email
  ).join(", ");

  return Postmark.sendEmail(emailId, currentTemplateId, recipientEmails);
}

//****** PRIVATE FUNCTIONS ******/

function validateEmailId(id) {
  if (!id) {
    res.status(400).send("You  did not include the email id ");
    return;
  }
  if (isNaN(id)) {
    res.status(400).send("Id must be an integer");
    return;
  }

  return parseInt(id);
}

function getEmailById(id) {
  let email = Data.Emails.find((email) => email.id === id);

  if (email === undefined) {
    res.status(404).send("The email with the given Id was not found");
    return;
  }
  return email;
}

module.exports = post;
