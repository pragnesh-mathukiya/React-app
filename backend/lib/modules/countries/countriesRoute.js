const router = require("express").Router();
const countryController = require("./countriesController");
const validators = require("./countriesValidators");
const adminValidators = require("../admin/adminValidators");
const resHndlr = require("../../handlers/responseHandler");

// Country APIs

/**
 *  create()
 * * Create Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/create")
  .post(adminValidators.checkToken, validators.checkCreateRequest, countryController.create)

/**
 *  getDetails()
 * * Get Country details to View or Edit - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/getDetails/:id")
  .get(adminValidators.checkToken, adminValidators.validateId, countryController.getDetails)

/**
 *  updateDetails()
 * * update Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/updateDetails/:id")
  .put(adminValidators.checkToken, adminValidators.validateId, validators.checkUpdateRequest, countryController.updateDetails)

/**
 *  deleteDetails()
 * * Delete Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/delete/:id")
  .delete(adminValidators.checkToken, adminValidators.validateId, countryController.deleteDetails)

/**
 *  getAll()
 * * Get All Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/getAll")
  .get(adminValidators.checkToken, countryController.getAll)

/**
 *  getAllCountryDailCode()
 * * Get All Country Dail Code from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/getAllCountryDailCode")
  .get(adminValidators.checkToken, countryController.getAllCountryDailCode)

module.exports = router;
