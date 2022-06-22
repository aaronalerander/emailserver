const Validate = require("../../Data/validate");
const Data = require("../../Data/Database");

function post(webhook) {
  let { recordType, templateId, emailId } = validateWebHook(webhook);

  let email = validateEmail(emailId);
  if (email === null) return;

  let template = validateTemplate(templateId);
  if (email === null) return;

  if (recordType == "Click") updateClicks(email, template);
  else if (recordType == "Open") updateOpens(email, template);

  return;
}

function updateClicks(email, template) {
  email.clicks += 1;
  template.clicks += 1;
}

function updateOpens(email, template) {
  email.opens += 1;
  template.opens += 1;
}

function validateTemplate(templateId) {
  let template = Data.Templates.find((template) => template.id === templateId);

  if (template === undefined) {
    throw "That template version doesnt exist";
  }
  return template;
}

function validateEmail(id) {
  let email = Data.Emails.find((email) => email.id === id);
  if (email === undefined) {
    throw "That email doesnt exists";
  }
  return email;
}

function validateWebHook(webhook) {
  const { error } = Validate.validateWebHook(webhook);
  if (error) {
    throw error.details[0].message;
  }

  let recordType = webhook.RecordType;
  let templateId = parseInt(webhook.Metadata.templateId);
  let emailId = parseInt(webhook.Metadata.emailId);

  return {
    recordType,
    templateId,
    emailId,
  };
}

module.exports = post;
