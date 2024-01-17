const service = require("./roleService");
const resHndlr = require("../../handlers/responseHandler");

/**
 * getDetails()
 * Get details to View or Edit Role - adminPanel
 * @param {*} req
 * @param {*} res
 */
function getDetails(req, res) {
  return service.getDetails(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 * updateDetails()
 * Update Role details - adminPanel
 * @param {*} req
 * @param {*} res
 */
function updateDetails(req, res) {
  return service.updateDetails(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 * getAll()
 * Get All Role - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAll(req, res) {
  return service.getAll(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 * getAllPermission()
 * Get All Permissions - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAllPermission(req, res) {
  return service.getAllPermission(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

module.exports = {
  getDetails,
  updateDetails,
  getAll,
  getAllPermission,
};
