const Data = require("../../Data/Database");

function validateEmail(id) {
  let email = Data.Emails.find((email) => email.id === id);
  if (email === undefined) {
    throw "That email doesnt exists";
  }
  return email;
}

module.exports = validateEmail;
