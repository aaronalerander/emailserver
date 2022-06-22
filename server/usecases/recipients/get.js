const Data = require("../../Data/Database");

function get() {
  return Data.Recipients;
}

module.exports = get;
