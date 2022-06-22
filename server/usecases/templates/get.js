const data = require("../../data/database");
const utils = require("../utils/");

function get(id) {
  id = utils.validateEmailId(id);
  if (id === null) return;

  let templates = data.Templates.filter((template) => template.emailId === id);

  return templates;
}

module.exports = get;
