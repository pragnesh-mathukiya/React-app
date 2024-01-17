const constants = require("../../../constants");
const resHndlr = require("../../../handlers/responseHandler");
const joi = require("joi");
const moduleConst = require("./userConstants");
const regExValidator = require("../../../utils/regulerExpression");

/**
 * Validating user updating request
 */
async function checkUpdateRequest(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.nameRequired,
        "any.required": moduleConst.MESSAGE.nameRequired,
      }),
      userName: joi.string().pattern(regExValidator.userNameRegEx).required().empty().messages({
        "string.empty": moduleConst.MESSAGE.userNameRequired,
        "any.required": moduleConst.MESSAGE.userNameRequired,
      }),
      // email: joi
      //   .string()
      //   .required()
      //   .pattern(regExValidator.emailRegEx)
      //   .empty()
      //   .messages({
      //     "string.empty": constants.MESSAGE.emailCantEmpty,
      //     "any.required": constants.MESSAGE.emailCantEmpty,
      //     "string.pattern.base": constants.MESSAGE.invalidEmail,
      //   }),
      bio: joi.string().optional().allow(""),
      // gender: joi
      //   .string()
      //   .required()
      //   .valid(constants.GENDER.MALE, constants.GENDER.FEMALE)
      //   .messages({
      //     "any.required": moduleConst.MESSAGE.genderRequired,
      //     "*": moduleConst.MESSAGE.invalidGender,
      //   }),
      // country: joi.string().length(24).required().messages({
      //   "string.length": constants.MESSAGE.invalidCountryId,
      //   "string.empty": constants.MESSAGE.emptyCountryId,
      //   "any.required": constants.MESSAGE.emptyCountryId,
      // }),
      dob: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.dobRequired,
        "any.required": moduleConst.MESSAGE.dobRequired,
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
  checkUpdateRequest,
};
