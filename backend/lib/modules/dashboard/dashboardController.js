const service = require("./dashboardService");
const resHndlr = require("../../handlers/responseHandler");

/**
 *  dashboardDetail()
 * * Get Dashboard Detail
 * @param {*} req
 * @param {*} res
 */
async function dashboardDetail(req, res) {
  return service.dashboardDetail(req).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Error :-", err);
    resHndlr.sendError(res, err);
  });
}

module.exports = {
  dashboardDetail,
};
