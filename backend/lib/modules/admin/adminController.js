/*#################################            Load modules start            ########################################### */
const service = require("./adminService");
const resHandlr = require("../../handlers/responseHandler");
const constants = require("../../constants");
const adminConst = require("./adminConstants").MESSAGE;
/*#################################            Load modules end            ########################################### */

/**
 * create admin
 * @param {String} req,
 * @param {String} res
 */
function addSubAdminOld(req, res) {
  return service.addSubAdmin(req, res).then(
    (data) => {
      if (data == 1) {
        return resHandlr.requestResponse(
          constants.CODE.BadRequest,
          adminConst.emailAlreadyExist,
          {}
        );
      } else if (data == 2) {
        return resHandlr.requestResponse(
          constants.CODE.BadRequest,
          adminConst.contactNumberAlreadyExists,
          {}
        );
      } else if (data == 3) {
        return resHandlr.requestResponse(
          constants.CODE.internalServerError,
          constants.MESSAGE.internalServerError,
          {}
        );
      } else {
        return resHandlr.requestResponse(
          constants.CODE.Success,
          adminConst.adminAdded,
          data
        );
      }
    },
    (error) => {
      return resHandlr.requestResponse(
        constants.CODE.internalServerError,
        constants.MESSAGE.internalServerError,
        {}
      );
    }
  );
}

/**
 *  getUserDetails()
 * * Get user details - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function getUserDetails(req, res) {
  return service.getUserDetails(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  getUserCounts()
 * * get all user count - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function getUserCounts(req, res) {
  return service.getUserCounts(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  countForDashboard()
 * * Dashbiard API - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function countForDashboard(req, res) {
  return service.countForDashboard(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHandlr.sendError(res, err);
  });
}

/**
 * Get all user activities
 * @param {String} id mongo id of admin
 * @param {String} userId mongo id of user
 * @param {Object} queryParams pagination
 */
function getAllUserActivities(id, userId, queryParams) {
  return service
    .getAllUserActivities(id, userId, queryParams)
    .then((data) => data);
}

/**
 *  login()
 * * Admin Login - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function login(req, res) {
  return service.login(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  logout()
 * * Log out - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function logout(req, res) {
  return service.logout(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  getProfile()
 * * Get profile data - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function getProfile(req, res) {
  return service.getProfile(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Get Profile Error :-", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  updateProfile()
 * * Update profile - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function updateProfile(req, res) {
  return service.updateProfile(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Update Profile Error :-", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  forgotPassword()
 * * forgot password - ADMINPANEL
 * * Recover password by email
 * @param {*} req
 * @param {*} res
 */
function forgotPassword(req, res) {
  return service.forgotPassword(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Forgot Password Error :-", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  setNewPassword()
 * * set new password - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function setNewPassword(req, res) {
  return service.setNewPassword(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Set New Password Error :-", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  resetPassword()
 * * Reset Password - ADMINPANEL
 * @param {string} id mongo id of admin
 * @param {string} oldPassword old password to verify
 * @param {string} newPassword new password to reset
 */
function resetPassword(req, res) {
  // change password
  return service.resetPassword(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Reset Password Error :-", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  addSubAdmin()
 * * create Sub Admin - ADMINPANEL
 * * @param {*} req
 * * @param {*} res
 */
function addSubAdmin(req, res) {
  return service.addSubAdmin(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Add Sub Admin Error :-", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  getAll()
 * * get all Sub admin - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function getAll(req, res) {
  return service.getAll(req, res).then((result) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("get All Sub Admin Error :-", err);
    resHandlr.sendError(res, err);
  });
}

/**
 *  updateStatus()
 * * Update admin status - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function updateStatus(req, res) {
  return service.updateStatus(req, res).then((data) => {
    resHandlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Update Admin Status Error :-", err);
    resHandlr.sendError(res, err);
  });
}

module.exports = {
  getUserDetails,
  getUserCounts,
  countForDashboard,
  getAllUserActivities,
  login,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  setNewPassword,
  resetPassword,
  addSubAdmin,
  getAll,
  updateStatus,
  addSubAdminOld
};
