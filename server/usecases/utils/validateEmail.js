const data = require("../../data/database");

function validateEmail(id) {
  let email = data.Emails.find((email) => email.id === id);
  if (email === undefined) {
    throw "That email doesnt exists";
  }
  return email;
}

module.exports = validateEmail;
