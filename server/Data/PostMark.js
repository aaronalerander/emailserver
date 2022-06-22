const FROM_EMAIL = "aaron@scaledrones.com";
const SERVER_TOKEN = "42c39a60-60b2-4e07-85d9-7be497fc56f3"; //hid in env variable
let postmark = require("postmark");
let postmarkClient = new postmark.ServerClient(SERVER_TOKEN); // got to move these over

function sendEmail(emailId, templateId, recipients) {
  return postmarkClient.sendEmailWithTemplate({
    TemplateId: templateId,
    From: FROM_EMAIL,
    To: recipients,
    TemplateModel: {},
    TrackOpens: true,
    TrackLinks: "HtmlAndText",
    MessageStream: "outbound",
    Metadata: {
      templateId: templateId,
      emailId: emailId,
    },
  });
}

function getTemplate(id) {
  return postmarkClient.getTemplate(id);
}

function createTemplate(name, htmlBody, subject) {
  return postmarkClient.createTemplate({
    Name: name,
    HtmlBody: htmlBody,
    Subject: subject,
  });
}

module.exports = { postmarkClient, sendEmail, getTemplate, createTemplate };

//generic send email that takes params
