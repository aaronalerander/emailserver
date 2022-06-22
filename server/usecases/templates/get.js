const Data = require("../../Data/Database");
const utils = require("../utils/");

function get(id) {
  id = utils.validateEmailId(id);
  if (id === null) return;

  let templates = Data.Templates.filter((template) => template.emailId === id);

  return templates;
}

module.exports = get;
