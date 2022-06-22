const Data = require("../../Data/Database");
const Postmark = require("../../Data/PostMark");
const Validate = require("../../Data/validate");

async function post(emailId, updateTemplate) {
  emailId = validateEmailId(emailId);
  if (emailId === null) return;

  let email = validateEmail(emailId);
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

  Data.Templates.push(template);

  return template;
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

function validateUpdateTemplate(updateTemplate) {
  const { error } = Validate.validateUpdateTemplate(updateTemplate);
  if (error) {
    throw error.details[0].message;
  }
  return { subject: updateTemplate.subject, textbody: updateTemplate.textbody };
}

function validateEmail(id) {
  let email = Data.Emails.find((email) => email.id === id);
  if (email === undefined) {
    throw "That email doesnt exist";
  }
  return email;
}

function getVersionNumber(emailId) {
  let versionNumber = 0;
  Data.Templates.forEach(function (template) {
    if (template.emailId === emailId) {
      versionNumber = Math.max(versionNumber, template.version);
    }
  });
  return (versionNumber += 1);
}

module.exports = post;
