const Joi = require("joi");
const resHndlr = require("../../handlers/responseHandler");
const constants = require("../../constants");

/**
 * Purpose :  Set Congifuration Validator
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

async function checkConfig(req, res, next) {
  try {
    // define schema
    let schema;
    if (req.body.type == "email") {
      schema = Joi.object({
        type: Joi.string().required(),
        smtpHost: Joi.string().required(),
        smtpPort: Joi.number().required(),
        smtpEmail: Joi.string().required(),
        smtpPassword: Joi.string().required(),
      });
    } else if (req.body.type == "sms") {
      schema = Joi.object({
        type: Joi.string().required(),
        smsAccountSid: Joi.string().required(),
        smsAuthToken: Joi.string().required(),
        smsFrom: Joi.string().required(),
      });
    }
    // validate field
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log("Validation Error :", error);
    validationErrorHandler(res, error, {});
  }
}

/**
 * Purpose : set error while validation is not proper
 * @param {*} req
 * @param {*} error
 */
function validationErrorHandler(res, error) {
  resHndlr.sendError(
    res,
    resHndlr.requestResponse(
      constants.CODE.BadRequest,
      error.details ? error.details[0].message : "There is some issue in Id.",
      {}
    )
  );
}
module.exports = {
  checkConfig,
};
