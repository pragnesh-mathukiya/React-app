const constants = require("../../constants");
const resHndlr = require("../../handlers/responseHandler");
const joi = require("joi");
const moduleConst = require("./faqsConstants");

/*
 * Validating FAQ creating request
 */

async function checkCreateRequest(req, res, next) {
  try {
    const schema = joi.object({
      question: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.questionRequired,
        "any.required": moduleConst.MESSAGE.questionRequired,
      }),
      answer: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.answerRequired,
        "any.required": moduleConst.MESSAGE.answerRequired,
      }),
      category: joi
        .string()
        .required()
        .valid(
          constants.FAQ_CATEGORIES.GENERAL_QUESTION,
          constants.FAQ_CATEGORIES.FANTACY_SPECIFIC_QUESTION
        )
        .messages({
          "any.required": moduleConst.MESSAGE.requiredCategory,
          "*": moduleConst.MESSAGE.invalidCategory,
        }),
    });
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

/**
 * Validating FAQ updating request
 */
async function checkUpdateRequest(req, res, next) {
  try {
    const schema = joi.object({
      question: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.questionRequired,
        "any.required": moduleConst.MESSAGE.questionRequired,
      }),
      answer: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.answerRequired,
        "any.required": moduleConst.MESSAGE.answerRequired,
      }),
      category: joi
        .string()
        .required()
        .valid(
          constants.FAQ_CATEGORIES.GENERAL_QUESTION,
          constants.FAQ_CATEGORIES.FANTACY_SPECIFIC_QUESTION
        )
        .messages({
          "any.required": moduleConst.MESSAGE.requiredCategory,
          "*": moduleConst.MESSAGE.invalidCategory,
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
