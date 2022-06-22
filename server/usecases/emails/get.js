const data = require("../../data/database");

function get() {
  return data.Emails;
}

module.exports = get;
