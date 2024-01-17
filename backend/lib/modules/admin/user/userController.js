const service = require("./userService");
const resHndlr = require("../../../handlers/responseHandler");

/**
 *  getAll()
 * * get all user - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function getAll(req, res) {
  return service.getAll(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 *  update()
 * * Update user - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function update(req, res) {
  return service.update(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Update Profile Error :-", err);
    resHndlr.sendError(res, err);
  });
}

/**
 *  deleteDetails()
 * * Delete user - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function deleteDetails(req, res) {
  return service.deleteDetails(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Delete Profile Error :-", err);
    resHndlr.sendError(res, err);
  });
}

/**
 *  updateUserStatus()
 * * Update user status - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function updateUserStatus(req, res) {
  return service.updateUserStatus(req, res).then((data) => {
    resHndlr.sendSuccess(res, data);
  }).catch((err) => {
    resHndlr.sendError(res, err);
  });
}

/**
 *  getUserdetailById()
 * * Get User Detail By Id from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getUserDetailById(req, res) {
  return await service.getUserDetailById(req, res).then(async (result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Get User Error :-", err);
    resHndlr.sendError(res, err);
  });
}

/**
 *  getDeletedUserList()
 * * Get Deleted User List from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getDeletedUserList(req, res) {
  return await service.getDeletedUserList(req, res).then(async (result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Get Delete User Error :-", err);
    resHndlr.sendError(res, err);
  });
}

/**
 *  userDetails()
 * * Get User Details From - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function userDetails(req, res) {
  return await service.userDetails(req).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("User Details Error:-", err);
    resHndlr.sendError(res, err);
  });
}

module.exports = {
  getAll,
  update,
  deleteDetails,
  updateUserStatus,
  getUserDetailById,
  getDeletedUserList,
  userDetails,
};
