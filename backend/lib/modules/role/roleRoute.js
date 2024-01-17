const router = require("express").Router();
const roleController = require("./roleController");
const validators = require("./roleValidator");
const adminValidators = require("../admin/adminValidators");
const resHndlr = require("../../handlers/responseHandler");

// Role APIs

/**
 * getDetails()
 * Get details to View or Edit Role - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getDetails/:id")
  .get(adminValidators.checkToken, roleController.getDetails)

/**
 * updateDetails()
 * Update Role details - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/updateDetails/:id")
  .post(adminValidators.checkToken, validators.checkUpdateRequest, roleController.updateDetails)

/**
 * getAll()
 * Get All Role - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getAll")
  .get(adminValidators.checkToken, roleController.getAll)

/**
 * getAllPermission()
 * Get All Permissions - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getAllPermission")
  .get(adminValidators.checkToken, roleController.getAllPermission)

module.exports = router;
