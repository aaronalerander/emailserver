const Data = require("../../Data/Database");
const Postmark = require("../../Data/PostMark");
const Validate = require("../../Data/validate");

async function post(template) {
  let { name, subject, textbody } = validateTemplate(template);
  validateEmail(name);

  let { TemplateId, Name } = await Postmark.createTemplate(
    name,
    textbody,
    subject
  );

  email = addEmailToDataBase(Name, TemplateId);
  template = addTemplateToDataBase(TemplateId);

  return { template, email };
}

function addEmailToDataBase(name, templateId) {
  let emailId = Data.Emails.length + 1;

  let email = {
    id: emailId,
    name: name,
    opens: 0,
    clicks: 0,
    currentTemplateId: templateId,
  };

  Data.Emails.push(email);

  return email;
}

function addTemplateToDataBase(templateId) {
  let emailId = Data.Emails.length;
  let template = {
    id: templateId,
    emailId: emailId,
    version: 1,
    opens: 0,
    clicks: 0,
  };

  Data.Templates.push(template);
}

function validateEmail(name) {
  let email = Data.Emails.find((email) => email.name === name);
  if (email !== undefined) {
    throw "An email with that name already exists";
  }
  return email;
}

function validateTemplate(template) {
  const { error } = Validate.validateTemplate(template);
  if (error) {
    throw error.details[0].message;
  }
  return {
    name: template.name,
    subject: template.subject,
    textbody: template.textbody,
  };
}

module.exports = post;
