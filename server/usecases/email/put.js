const Data = require("../../Data/Database");
const Validate = require("../../Data/validate");

function put(id, body) {
  let emailId = validateEmailId(id);
  if (emailId === null) return;

  let email = validateEmail(emailId);
  if (email === null) return;

  let templateId = validateTemplateId(body);
  if (templateId === null) return;

  let template = validateTemplate(templateId, emailId);
  if (template === null) return;

  email.currentTemplateId = templateId;

  return { email: email, template: template };
}

function validateEmailId(id) {
  if (!id) {
    throw "You did not include the email id";
  }
  if (isNaN(id)) {
    throw "Email Id must be an integer";
  }

  return parseInt(id);
}

function validateTemplateId(body) {
  const { error } = Validate.validateRevertTemplate(body);
  if (error) {
    throw error;
  }

  let templateId = body.templateId;
  return parseInt(templateId);
}

function validateEmail(id) {
  let email = Data.Emails.find((email) => email.id === id);

  if (email === undefined) {
    throw "That email doesnt exist";
  }
  return email;
}

function validateTemplate(templateId, emailId) {
  let template = Data.Templates.find((template) => template.id === templateId);

  if (template === undefined) {
    throw "That template version doesnt exist";
  } else if (template.emailId !== emailId) {
    throw "This template does not blong to this type of email";
  }

  return template;
}

module.exports = put;
