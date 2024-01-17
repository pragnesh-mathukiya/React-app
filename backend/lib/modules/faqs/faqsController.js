const service = require("./faqsService");
const resHndlr = require("../../handlers/responseHandler");

/**
 * create()
 * Create FAQ - adminPanel
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
 * getDetails()
 * Get details to View or Edit FAQ - adminPanel
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
 * Update FAQ - adminPanel
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
 * deleteDetails()
 * Delete FAQ - adminPanel
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
 * getAll()
 * Get All FAQ - adminPanel
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
 * getAllFAQs()
 * Get All FAQ for Minting , Web , User
 * @param {*} req
 * @param {*} res
 */
function getAllFAQs(req, res) {
  return service.getAllFAQs(req, res).then((result) => {
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
  getAllFAQs,
};
