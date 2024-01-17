const Joi = require("joi");
const resHndlr = require("../../handlers/responseHandler");
const constants = require("../../constants");

/**
 * Purpose :  Add template Validator
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

async function checkCreateTemplateRequest(req, res, next) {
  try {
    // define schema
    let schema;
    schema = Joi.object({
      smsTitle: Joi.string().required(),
      smsContent: Joi.string().required(),
    })
    // validate field
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log("Validation Error :", error);
    validationErrorHandler(res, error, {});
  }
}

/**
 * Purpose :  Update template Validator
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

async function checkUpdateTemplateRequest(req, res, next) {
  try {
    // define schema
    let schema;
    schema = Joi.object({
      smsTitle: Joi.string().required(),
      smsContent: Joi.string().required(),
    })
    // validate field
    await schema.validateAsync(req.body, { allowUnknown: true });
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
  checkCreateTemplateRequest,
  checkUpdateTemplateRequest,
};
