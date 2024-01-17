const service = require("./contactUsService");
const resHndlr = require("../../handlers/responseHandler");

/**
 *  create()
 * * Send CONTACT US  - Minting
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
 *  get()
 * * Get All CONTACT US List  - adminPanel
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
 *  updateInquiry()
 * * Update Contact Us Inquiry - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function updateInquiry(req, res) {
  return service.updateInquiry(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

module.exports = {
  create,
  getAll,
  updateInquiry,
};
