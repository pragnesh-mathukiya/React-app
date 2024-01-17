const service = require("./countriesService");
const resHndlr = require("../../handlers/responseHandler");

/**
 *  create()
 * * Create Country - ADMINPANEL
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
 * * Get Country details to View or Edit - ADMINPANEL
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
 * * update Country - ADMINPANEL
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
 * * Delete Country - ADMINPANEL
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
 * * Get All Country - ADMINPANEL
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
 *  getAllCountryDailCode()
 * * Get All Country Dail Code from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
function getAllCountryDailCode(req, res) {
  return service.getAllCountryDailCode(req, res).then((result) => {
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
  getAllCountryDailCode,
};
