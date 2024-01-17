const router = require("express").Router();
const cmsController = require("./cmsController");
const validators = require("./cmsValidators");
const adminValidators = require("../admin/adminValidators");
const resHndlr = require("../../handlers/responseHandler");

// CMS APIs

/**
 *  create()
 * * Create CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/create")
  .post(adminValidators.checkToken, validators.checkCreateRequest, cmsController.create)

/**
 *  getDetails()
 * * Get Details for CMS View or Edit  - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getDetails/:id")
  .get(adminValidators.checkToken, adminValidators.validateId, cmsController.getDetails)

/**
 *  updateDetails()
 * * Update CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/updateDetails/:id")
  .put(adminValidators.checkToken, adminValidators.validateId, validators.checkUpdateRequest, cmsController.updateDetails)

/**
 *  deleteDetails()
 * * Delete CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/delete/:id")
  .delete(adminValidators.checkToken, adminValidators.validateId, cmsController.deleteDetails)

/**
 *  getAll()
 * * Get All CMS List  - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getAll")
  .get(adminValidators.checkToken, cmsController.getAll)

/**
 *  getCMSByType()
 * * get CMS by its Type for Minting Web and User
 * * platform : web / mint / mobile
 * * cmcType : slug for cms created
 * @param {*} req
 * @param {*} res
 */
router.route("/getCMSByType/:platform/:cmcType")
  .get(cmsController.getCMSByType)

module.exports = router;
