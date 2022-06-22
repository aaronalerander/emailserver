const Data = require("../../Data/Database");

function get() {
  return Data.Emails;
}

module.exports = get;
