const router = require("express").Router();
const faqsController = require("./faqsController");
const validators = require("./faqsValidators");
const adminValidators = require("../admin/adminValidators");
const resHndlr = require("../../handlers/responseHandler");

// FAQ APIs

/**
 * create()
 * Create FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/create")
  .post(adminValidators.checkToken, validators.checkCreateRequest, faqsController.create)

/**
 * getDetails()
 * Get details to View or Edit FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getDetails/:id")
  .get(adminValidators.checkToken, adminValidators.validateId, faqsController.getDetails)

/**
 * updateDetails()
 * Update FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/updateDetails/:id")
  .put(adminValidators.checkToken, adminValidators.validateId, validators.checkUpdateRequest, faqsController.updateDetails)

/**
 * deleteDetails()
 * Delete FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/delete/:id")
  .delete(adminValidators.checkToken, adminValidators.validateId, faqsController.deleteDetails)

/**
 * getAll()
 * Get All FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getAll")
  .get(adminValidators.checkToken, faqsController.getAll)

/**
 * getAllFAQs()
 * Get All FAQ for Minting , Web , User
 * @param {*} req
 * @param {*} res
 */
router.route("/faq")
  .get(faqsController.getAllFAQs)

module.exports = router;
