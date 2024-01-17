const service = require("./configService");
const resHndlr = require("../../handlers/responseHandler");

/**
 * Add / Edit  Config Value
 * @param {*} req
 * @param {*} res
 */
function setConfig(req, res) {
  return service.setConfig(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 * Get Condfig Detail
 * @param {*} req
 * @param {*} res
 */
async function getConfig(req, res) {
  return service.getConfig(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

module.exports = {
  setConfig,
  getConfig,
};
