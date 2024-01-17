/*#################################            Load modules start            ########################################### */

const router = require("express").Router();
const adminController = require("./adminController");
const validators = require("./adminValidators");
const resHndlr = require("../../handlers/responseHandler");
/*#################################            Load modules end            ########################################### */

// ADMIN PROFILE APIs

/**
 *  addSubAdmin()
 * * Add Sub Admin - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/addSubAdmin")
  .post(validators.checkToken, validators.checkAddProfileRequest, adminController.addSubAdmin);

/**
 *  getUserDetails()
 * *  Get user details - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/getUserDetails/:id/:userId")
  .get(validators.checkToken, adminController.getUserDetails)

/**
 *  getUserCounts()
 * * get all user count - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/getUserCounts")
  .get(validators.checkToken, adminController.getUserCounts)

/**
 *  countForDashboard()
 * * Dashbiard API - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/countForDashboard")
  .get(validators.checkToken, adminController.countForDashboard)

/**
 *  login()
 * * Admin Login - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/login").
  post(validators.checkLoginRequest, adminController.login)

/**
 *  logout()
 * * Log out - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/logout/:activityId")
  .get(validators.checkToken, adminController.logout)

/**
 *  getProfile()
 * * Get profile data - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/getProfile/:id")
  .get(validators.checkToken, adminController.getProfile)

/**
 *  updateProfile()
 * * Update profile - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/updateProfile/:id")
  .post(validators.checkToken, validators.checkUpdateProfileRequest, adminController.updateProfile)

/**
 *  forgotPassword()
 * * forgot password - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/forgotPassword")
  .post(validators.checkForgotPasswordRequest, adminController.forgotPassword)

/**
 *  setNewPassword()
 * * set new password - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/setNewPassword/:passwordToken")
  .post(validators.checkPasswordTokenRequest, validators.checkSetNewPasswordRequest, adminController.setNewPassword)

/**
 *  resetPassword()
 * * Change Password - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/resetPassword")
  .post(validators.checkToken, validators.checkResetPasswordRequest, adminController.resetPassword)

// ADMIN Add Subadmin - adminPanel
// router.route("/addSubAdmin")
//   .post(validators.checkToken, validators.checkUpdateProfileRequest, adminController.addSubAdmin)

/**
 *  getAll()
 * * get all Sub admin - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/getAll")
  .get(validators.checkToken, adminController.getAll);

/**
 *  updateStatus()
 * * Update admin status - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/updateStatus/:id")
  .post(validators.checkToken, validators.validateId, adminController.updateStatus)

module.exports = router;
