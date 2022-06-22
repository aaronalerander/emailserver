const data = require("../../data/database");
const Postmark = require("../../data/postMark");
const Validate = require("../../data/validate");
const utils = require("../utils/");

async function post(emailId, updateTemplate) {
  emailId = utils.validateEmailId(emailId);
  if (emailId === null) return;

  let email = utils.validateEmail(emailId);
  if (email === null) return;

  let { subject, textbody } = validateUpdateTemplate(updateTemplate);

  let versionNumber = getVersionNumber(emailId);

  let { TemplateId } = await Postmark.createTemplate(
    email.name + versionNumber,
    textbody,
    subject
  );

  let template = updateDataBase(email, TemplateId, versionNumber);

  return { template, email };
}

function updateDataBase(email, templateId, versionNumber) {
  email.currentTemplateId = templateId;

  let template = {
    id: templateId,
    emailId: email.id,
    version: versionNumber,
    opens: 0,
    clicks: 0,
  };

  data.Templates.push(template);

  return template;
}

function validateUpdateTemplate(updateTemplate) {
  const { error } = Validate.validateUpdateTemplate(updateTemplate);
  if (error) {
    throw error.details[0].message;
  }
  return { subject: updateTemplate.subject, textbody: updateTemplate.textbody };
}

function getVersionNumber(emailId) {
  let versionNumber = 0;
  data.Templates.forEach(function (template) {
    if (template.emailId === emailId) {
      versionNumber = Math.max(versionNumber, template.version);
    }
  });
  return (versionNumber += 1);
}

module.exports = post;
