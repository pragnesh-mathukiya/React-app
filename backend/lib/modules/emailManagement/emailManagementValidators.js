var ObjectId = require("mongoose").Types.ObjectId;
const mapper = require("../../handlers/responseHandler");
const constants = require("../../constants");

/**
 * Validating email template creating request
 */
function checkCreateTemplateRequest(req, res, next) {
  let error = [];
  let { type, mailName } = req.body;

  if (!type || !mailName) {
    error.push({
      code: constants.CODE.BadRequest,
      message: constants.MESSAGE.InvalidDetails,
    });
  } else {
    if (type == constants.TEMPLATE_TYPES.EMAIL) {
      let { mailTitle, mailBody, mailSubject } = req.body;

      if (!mailTitle || !mailBody || !mailSubject) {
        error.push({
          code: constants.CODE.BadRequest,
          message: constants.MESSAGE.InvalidDetails,
        });
      }
    } else {
      let { notificationMessage } = req.body;
      if (
        !notificationMessage ||
        Object.keys(notificationMessage).length == 0
      ) {
        error.push({
          code: constants.CODE.BadRequest,
          message: constants.MESSAGE.InvalidDetails,
        });
      }
    }
  }
  if (error.length > 0) {
    res.json(
      mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    );
  } else {
    next();
  }
}

/**
 * Validating template updating request
 */
function checkUpdateTemplateRequest(req, res, next) {
  let error = [];
  let { templateId } = req.params;
  let templateDetails = req.body;

  if (
    !templateId ||
    !ObjectId.isValid(templateId) ||
    !templateDetails ||
    Object.keys(templateDetails).length == 0
  ) {
    error.push({
      code: constants.CODE.BadRequest,
      message: constants.MESSAGE.InvalidDetails,
    });
  }
  if (error.length > 0) {
    res.json(
      mapper.responseMapping(
        constants.CODE.BadRequest,
        constants.MESSAGE.InvalidDetails
      )
    );
  } else {
    next();
  }
}

module.exports = {
  checkCreateTemplateRequest,
  checkUpdateTemplateRequest,
};
