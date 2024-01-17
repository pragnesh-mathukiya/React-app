const constants = require("../../constants");
const resHndlr = require("../../handlers/responseHandler");
const joi = require("joi");
const regExValidator = require("../../utils/regulerExpression");
const moduleConst = require("./countriesConstants");

/*
 * Validating Country page creating request
 */
async function checkCreateRequest(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.nameRequired,
        "any.required": moduleConst.MESSAGE.nameRequired,
      }),
      code: joi
        .string()
        .required()
        .pattern(regExValidator.countryCodeRegEx)
        .empty()
        .messages({
          "string.empty": moduleConst.MESSAGE.codeRequired,
          "any.required": moduleConst.MESSAGE.codeRequired,
          "string.pattern.base": moduleConst.MESSAGE.invalidCode,
        }),
      char: joi
        .string()
        .required()
        .pattern(regExValidator.countryCharRegEx)
        .empty()
        .messages({
          "string.empty": moduleConst.MESSAGE.charRequired,
          "any.required": moduleConst.MESSAGE.charRequired,
          "string.pattern.base": moduleConst.MESSAGE.invalidChar,
        }),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

/**
 * Validating Country page updating request
 */
async function checkUpdateRequest(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.nameRequired,
        "any.required": moduleConst.MESSAGE.nameRequired,
      }),
      code: joi
        .string()
        .required()
        .pattern(regExValidator.countryCodeRegEx)
        .empty()
        .messages({
          "string.empty": moduleConst.MESSAGE.codeRequired,
          "any.required": moduleConst.MESSAGE.codeRequired,
          "string.pattern.base": moduleConst.MESSAGE.invalidCode,
        }),
      char: joi
        .string()
        .required()
        .pattern(regExValidator.countryCharRegEx)
        .empty()
        .messages({
          "string.empty": moduleConst.MESSAGE.charRequired,
          "any.required": moduleConst.MESSAGE.charRequired,
          "string.pattern.base": moduleConst.MESSAGE.invalidChar,
        }),
    });
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

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
  checkCreateRequest,
  checkUpdateRequest,
};
