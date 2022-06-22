const Joi = require("joi");

function validateTemplate(template) {
  const schema = {
    name: Joi.string().min(1).required(),
    subject: Joi.string().min(1).required(),
    textbody: Joi.string().min(1).required(),
  };

  return Joi.validate(template, schema);
}

function validateRevertTemplate(reqBody) {
  const schema = {
    templateId: Joi.number().min(1).required(),
  };

  return Joi.validate(reqBody, schema);
}

//lmfao this is the fucking ulgiest code i have made. this is so fucking hard to read by somwone who doesnt know what its doing
function validateWebHook(body) {
  if (!body.RecordType) {
    return { error: true, message: "does not have record type" };
  } else if (body.RecordType !== "Open" && body.RecordType !== "Click") {
    return { error: true, message: "record type is not click or open" };
  } else if (!body.Metadata) {
    return { error: true, message: "doesnt contain metadata" };
  } else if (!body.Metadata.templateId) {
    return { error: true, message: "doesnt contain templateId" };
  } else if (isNaN(body.Metadata.templateId)) {
    return { error: true, message: "templateId must be an int" };
  } else if (!body.Metadata.emailId) {
    return { error: true, message: "doesnt contain emailId" };
  } else if (isNaN(body.Metadata.emailId)) {
    return { error: true, message: "emailId must be an int" };
  } else {
    return { error: false, message: "All god" };
  }
}

function validateUpdateTemplate(template) {
  const schema = {
    subject: Joi.string().min(1).required(),
    textbody: Joi.string().min(1).required(),
  };

  return Joi.validate(template, schema);
}

module.exports = {
  validateTemplate,
  validateRevertTemplate,
  validateWebHook,
  validateUpdateTemplate,
};
