const Data = require("../../Data/Database");

function get(id) {
  id = validateEmailId(id);
  if (id === null) return;

  let templates = Data.Templates.filter((template) => template.emailId === id);

  return templates;
}

function validateEmailId(id) {
  if (!id) {
    throw "You did not include the id";
  }
  if (isNaN(id)) {
    throw "Id must be an integer";
  }

  return parseInt(id);
}

module.exports = get;
