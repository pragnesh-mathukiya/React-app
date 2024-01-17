var ObjectId = require("mongoose").Types.ObjectId;
const constants = require("../../constants");
const resHndlr = require("../../handlers/responseHandler");
const moduleConst = require("./cmsConstants");
const joi = require("joi");

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
      description: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.descriptionRequired,
        "any.required": moduleConst.MESSAGE.descriptionRequired,
      }),
    });
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

/**
 * Validating CMS updating request
 */
async function checkUpdateRequest(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.nameRequired,
        "any.required": moduleConst.MESSAGE.nameRequired,
      }),
      description: joi.string().required().empty().messages({
        "string.empty": moduleConst.MESSAGE.descriptionRequired,
        "any.required": moduleConst.MESSAGE.descriptionRequired,
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
