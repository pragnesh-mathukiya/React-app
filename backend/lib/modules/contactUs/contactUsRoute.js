const router = require("express").Router();
const contactUsController = require("./contactUsController");
const validators = require("./contactUsValidators");
const adminValidators = require("../admin/adminValidators");
const jwtHandler = require("../../middleware/jwtHandler");

// CONTACT US APIs

/**
 *  create()
 * * Create CONTACT US  - Minting
 * @param {*} req
 * @param {*} res
 */
router.route("/sendInquiry")
  .post(jwtHandler.verifyUsrToken, validators.checkCreateRequest, contactUsController.create)

/**
 *  get()
 * * Get All CONTACT US List  - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getAll")
  .get(adminValidators.checkToken, contactUsController.getAll)

/**
 *  updateInquiry()
 * * Update Contact Us Inquiry  - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/updateInquiry/:id")
  .put(adminValidators.checkToken, contactUsController.updateInquiry)

module.exports = router;
