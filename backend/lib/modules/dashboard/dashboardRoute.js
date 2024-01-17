const router = require("express").Router();
const controller = require("./dashboardController");
const adminValidators = require("../admin/adminValidators");

/**
 *  dashboardDetail()
 * * Get Dashboard Detail
 * @param {*} req
 * @param {*} res
 */
router.route("/dashboardDetail")
  .get(adminValidators.checkToken, controller.dashboardDetail);

module.exports = router;
