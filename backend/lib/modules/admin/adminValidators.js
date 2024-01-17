/*#################################            Load modules start            ########################################### */

var ObjectId = require("mongoose").Types.ObjectId;
const jwtHandler = require("../../middleware/jwtHandler");
const constants = require("../../constants");
const resHandlr = require("../../handlers/responseHandler");
const joi = require("joi");
const regExValidator = require("../../utils/regulerExpression");
const adminConst = require("./adminConstants");
/*#################################            Load modules end            ########################################### */

/**
 * Validating login request
 */
function checkLoginRequest(req, res, next) {
  let error = [];
  let {
    email,
    contactNumber,
    password,
    device,
    browser,
    ipaddress,
    date,
    country,
    state,
  } = req.body;
  if ((!email && !contactNumber) || !password) {
    error.push({
      code: constants.CODE.BadRequest,
      message: constants.MESSAGE.InvalidDetails,
    });
  }
  if (error.length > 0) {
    return resHandlr.requestResponse(
      constants.CODE.BadRequest,
      constants.MESSAGE.InvalidDetails
    );
  } else {
    next();
  }
}

/**
 * Validating notification update status
 */
function checkNotificationStatusUpdateRequest(req, res, next) {
  let error = [];
  let { id } = req.params;
  let details = req.body;
  if (
    !id ||
    !ObjectId.isValid(id) ||
    !details ||
    Object.keys(details).length == 0
  ) {
    error.push({
      code: constants.CODE.BadRequest,
      message: constants.MESSAGE.InvalidDetails,
    });
  }

  if (error.length > 0) {
    return resHandlr.requestResponse(
      constants.CODE.BadRequest,
      constants.MESSAGE.InvalidDetails
    );
  } else {
    next();
  }
}

/**
 * Validate JWT token
 */
function checkToken(req, res, next) {
  req.token = req.headers["authorization"];
  if (!req.token) {
    return resHandlr.sendError(
      res,
      resHandlr.requestResponse(
        constants.CODE.BadRequest,
        constants.MESSAGE.TOKEN_NOT_PROVIDED,
        {}
      )
    );
  } else {
    return jwtHandler.verifyAdminToken(req.token).then((result) => {
      //todo check with admin user token
      if (result) {
        req._id = result._id;
        req.email = result.email;
        req.tokenPayload = result;
        next();
      } else {
        return resHandlr.sendError(
          res,
          resHandlr.requestResponse(
            constants.CODE.UnAuthorized,
            constants.MESSAGE.TOKEN_NOT_PROVIDED,
            {}
          )
        );
      }
    });
  }
}

/** check mongoose data's mainId _id (ObjectId) is valid */
async function validateId(req, res, next) {
  try {
    const schema = joi.object({
      id: joi.string().length(24).required().messages({
        "string.length": constants.MESSAGE.invalidId,
        "string.empty": constants.MESSAGE.emptyId,
        "any.required": constants.MESSAGE.emptyId,
      }),
    });
    await schema.validateAsync(req.params, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

/**
 * Validating forgot password request
 */
async function checkForgotPasswordRequest(req, res, next) {
  try {
    const schema = joi.object({
      email: joi
        .string()
        .required()
        .pattern(regExValidator.emailRegEx)
        .empty()
        .messages({
          "string.empty": constants.MESSAGE.emailCantEmpty,
          "any.required": constants.MESSAGE.emailCantEmpty,
          "string.pattern.base": constants.MESSAGE.invalidEmail,
        }),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

/**
 * Validating set new password by recovery link
 */
async function checkSetNewPasswordRequest(req, res, next) {
  try {
    const schema = joi.object({
      password: joi.string().required().messages({
        "string.empty": constants.MESSAGE.passCantEmpty,
        "any.required": constants.MESSAGE.passCantEmpty,
      }),
    });
    // await schema.validateAsync(req.params, { allowUnknown: true })
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}
async function checkPasswordTokenRequest(req, res, next) {
  try {
    const schema = joi.object({
      passwordToken: joi.string().required().messages({
        "string.empty": constants.MESSAGE.passCantEmpty,
        "any.required": constants.MESSAGE.passCantEmpty,
      }),
    });
    await schema.validateAsync(req.params, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

/**
 * Validating reset password request
 */
async function checkResetPasswordRequest(req, res, next) {
  // change password
  try {
    const schema = joi.object({
      oldPassword: joi.string().required().messages({
        "string.empty": constants.MESSAGE.oldPassCantEmpty,
        "any.required": constants.MESSAGE.oldPassCantEmpty,
      }),
      newPassword: joi.string().required().messages({
        "string.empty": constants.MESSAGE.newPassCantEmpty,
        "any.required": constants.MESSAGE.newPassCantEmpty,
      }),
    });
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

/**
 * Validating update profile request
 */
async function checkUpdateProfileRequest(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": constants.MESSAGE.nameCantEmpty,
        "any.required": constants.MESSAGE.nameCantEmpty,
      }),
      email: joi
        .string()
        .required()
        .pattern(regExValidator.emailRegEx)
        .empty()
        .messages({
          "string.empty": constants.MESSAGE.emailCantEmpty,
          "any.required": constants.MESSAGE.emailCantEmpty,
          "string.pattern.base": constants.MESSAGE.invalidEmail,
        }),
      dailCode: joi.string().pattern(regExValidator.countryCodeRegEx).required().messages({
        "string.empty": constants.MESSAGE.dailCodeEmpty,
        "any.required": constants.MESSAGE.dailCodeEmpty,
        "string.pattern.base": constants.MESSAGE.invalidDailCode,
      }),
      mobileNo: joi.string().pattern(regExValidator.mobileNoRegEx).required().messages({
        "string.empty": constants.MESSAGE.mobileNoEmpaty,
        "any.required": constants.MESSAGE.mobileNoEmpaty,
        "string.pattern.base": constants.MESSAGE.invalidMobileNo,
      }),
    });
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

async function checkUpdateProfile(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": constants.MESSAGE.nameCantEmpty,
        "any.required": constants.MESSAGE.nameCantEmpty,
      }),
      email: joi
        .string()
        .required()
        .pattern(regExValidator.emailRegEx)
        .empty()
        .messages({
          "string.empty": constants.MESSAGE.emailCantEmpty,
          "any.required": constants.MESSAGE.emailCantEmpty,
          "string.pattern.base": constants.MESSAGE.invalidEmail,
        }),
      contactNumber: joi
        .string()
        .required()
        .pattern(regExValidator.phoneRegEx)
        .empty()
        .messages({
          "string.empty": constants.MESSAGE.contactCantEmpty,
          "any.required": constants.MESSAGE.contactCantEmpty,
          "string.pattern.base": constants.MESSAGE.invalidContact,
        }),

    });
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}
function validationErrorHandler(res, error) {
  resHandlr.sendError(
    res,
    resHandlr.requestResponse(
      constants.CODE.BadRequest,
      error.details ? error.details[0].message : "There is some issue in Id.",
      {}
    )
  );
}

async function checkAddProfileRequest(req, res, next) {
  try {
    const schema = joi.object({
      name: joi.string().required().empty().messages({
        "string.empty": constants.MESSAGE.nameCantEmpty,
        "any.required": constants.MESSAGE.nameCantEmpty,
      }),
      email: joi
        .string()
        .required()
        .pattern(regExValidator.emailRegEx)
        .empty()
        .messages({
          "string.empty": constants.MESSAGE.emailCantEmpty,
          "any.required": constants.MESSAGE.emailCantEmpty,
          "string.pattern.base": constants.MESSAGE.invalidEmail,
        }),
      dailCode: joi.string().pattern(regExValidator.countryCodeRegEx).required().messages({
        "string.empty": constants.MESSAGE.dailCodeEmpty,
        "any.required": constants.MESSAGE.dailCodeEmpty,
        "string.pattern.base": constants.MESSAGE.invalidDailCode,
      }),
      mobileNo: joi.string().pattern(regExValidator.mobileNoRegEx).required().messages({
        "string.empty": constants.MESSAGE.mobileNoEmpaty,
        "any.required": constants.MESSAGE.mobileNoEmpaty,
        "string.pattern.base": constants.MESSAGE.invalidMobileNo,
      }),
      status: joi.string().required(),
      permissions: joi.optional()
    });
    await schema.validateAsync(req.body, { allowUnknown: true });
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}


module.exports = {
  checkNotificationStatusUpdateRequest,
  // Authentication Validation
  checkLoginRequest,
  checkToken,
  validateId,
  checkResetPasswordRequest,
  checkSetNewPasswordRequest,
  checkPasswordTokenRequest,
  checkForgotPasswordRequest,
  checkUpdateProfileRequest,
  checkUpdateProfile,
  checkAddProfileRequest
};
