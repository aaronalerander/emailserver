function validateEmailId(id) {
  if (!id) {
    throw "You did not include the email id";
  }
  if (isNaN(id)) {
    throw "Email Id must be an integer";
  }

  return parseInt(id);
}

module.exports = validateEmailId;
