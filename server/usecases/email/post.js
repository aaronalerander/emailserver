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
    throw "You did not include the email id";
  }
  if (isNaN(id)) {
    throw "Email Id must be an integer";
  }

  return parseInt(id);
}

function getEmailById(id) {
  let email = Data.Emails.find((email) => email.id === id);

  if (email === undefined) {
    throw "The email with the given id was not found";
  }
  return email;
}

module.exports = post;
