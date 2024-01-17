var ObjectId = require("mongoose").Types.ObjectId;
const constants = require("../../constants");
const resHndlr = require("../../handlers/responseHandler");
const moduleConst = require("./contactUsConstants");
const joi = require("joi");
const regExValidator = require("../../utils/regulerExpression");
/*
 * Validating CMS creating request
 */
async function checkCreateRequest(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.nameRequired,
        "any.required": moduleConst.MESSAGE.nameRequired,
      }),
      email: joi
        .string()
        .required()
        .pattern(regExValidator.emailRegEx)
        .empty()
        .messages({
          "string.empty": moduleConst.MESSAGE.emailRequired,
          "any.required": moduleConst.MESSAGE.emailRequired,
          "string.pattern.base": moduleConst.MESSAGE.invalidEmail,
        }),
      message: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.messageRequired,
        "any.required": moduleConst.MESSAGE.messageRequired,
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
      error.details ? error.details[0].message : "There is some issue in validation.",
      {}
    )
  );
}

module.exports = {
  checkCreateRequest,
};
