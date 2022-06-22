const Postmark = require("../../data/postMark");
const data = require("../../data/database");
const utils = require("../utils/");

function post(id) {
  let emailId = utils.validateEmailId(id);
  if (emailId === null) return;

  let email = getEmailById(emailId);
  if (email === null) return;

  let currentTemplateId = email.currentTemplateId;

  let recipientEmails = data.Recipients.map(
    (recipient) => recipient.email
  ).join(", ");

  return Postmark.sendEmail(emailId, currentTemplateId, recipientEmails);
}

function getEmailById(id) {
  let email = data.Emails.find((email) => email.id === id);

  if (email === undefined) {
    throw "The email with the given id was not found";
  }
  return email;
}

module.exports = post;
