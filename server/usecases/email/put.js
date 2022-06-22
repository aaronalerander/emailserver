const Data = require("../../Data/Database");
const Validate = require("../../Data/validate");
const utils = require("../utils/");

function put(id, body) {
  let emailId = utils.validateEmailId(id);
  if (emailId === null) return;

  let email = utils.validateEmail(emailId);
  if (email === null) return;

  let templateId = validateBody(body);
  if (templateId === null) return;

  let template = validateTemplate(templateId, emailId);
  if (template === null) return;

  email.currentTemplateId = templateId;

  return { email: email, template: template };
}

function validateBody(body) {
  const { error } = Validate.validateRevertTemplate(body);
  if (error) {
    throw error;
  }

  let templateId = body.templateId;
  return parseInt(templateId);
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
