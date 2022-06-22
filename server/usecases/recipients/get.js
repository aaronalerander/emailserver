const data = require("../../data/database");

function get() {
  return data.Recipients;
}

module.exports = get;
