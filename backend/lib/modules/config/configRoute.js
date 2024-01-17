const router = require("express").Router();
const resHndlr = require("../../handlers/responseHandler");
const validators = require("./configValidators");
const adminValidators = require("../admin/adminValidators");
const configController = require("./configController");

/**
 * Add / Edit  Config Value
 * @param {*} req
 * @param {*} res
 */
router.route("/setConfig")
  .post(adminValidators.checkToken, validators.checkConfig, configController.setConfig)

/**
 * Get Condfig Detail
 * @param {*} req
 * @param {*} res
 */
router.route("/getConfig")
  .get(adminValidators.checkToken, configController.getConfig)

module.exports = router;
