const Postmark = require("../../Data/PostMark");

function get(id) {
  id = validateTemplateId(id);
  if (id === null) return;

  return Postmark.getTemplate(id);
}

function validateTemplateId(id) {
  if (!id) {
    throw "You did not include the id";
  }
  if (isNaN(id)) {
    throw "Id must be an integer";
  }

  return parseInt(id);
}

module.exports = get;
