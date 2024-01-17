const service = require("./cmsService");
const resHndlr = require("../../handlers/responseHandler");
const constants = require("../../constants");

/**
 *  create()
 * * Create CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
function create(req, res) {
  return service.create(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 *  getDetails()
 * * Get Details for CMS View or Edit  - adminPanel
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
 *  updateDetails()
 * * Update CMS  - adminPanel
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
 *  deleteDetails()
 * * Delete CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
function deleteDetails(req, res) {
  return service.deleteDetails(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 *  getAll()
 * * Get All CMS List  - adminPanel
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
 *  getCMSByType()
 * * get CMS by its Type for Minting Web and User
 * @param {*} req
 * @param {*} res
 */
function getCMSByType(req, res) {
  return service.getCMSByType(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

module.exports = {
  create,
  getDetails,
  updateDetails,
  deleteDetails,
  getAll,
  getCMSByType,
};
