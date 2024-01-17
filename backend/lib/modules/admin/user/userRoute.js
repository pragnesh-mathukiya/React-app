const router = require("express").Router();
const userController = require("./userController");
const adminValidators = require("../adminValidators");
const validators = require("./userValidators");
// MANAGE USERS APIs

/**
 *  getAll()
 * * get all user - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router
  .route("/getAll").get(adminValidators.checkToken, userController.getAll);

/**
 *  update()
 * * upadate User From - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router.route("/update/:id")
  .put(adminValidators.checkToken, validators.checkUpdateRequest, userController.update)

/**
 *  deleteDetails()
 * * Delete User From - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router
  .route("/delete/:id").delete(adminValidators.checkToken, adminValidators.validateId, userController.deleteDetails)

/**
 *  updateUserStatus()
 * * upadate User status From - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router
  .route("/updateUserStatus/:id").put(adminValidators.checkToken, userController.updateUserStatus)


/**
 *  getUserdetailById()
 * * Get User Detail By Id from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router
  .route("/getUserDetailById/:id").get(adminValidators.checkToken, userController.getUserDetailById)

/**
 *  getDeletedUserList()
 * * Get Deleted User List from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router
  .route("/getDeletedUserList").get(adminValidators.checkToken, userController.getDeletedUserList)

/**
 *  userDetails()
 * * Get User Details From - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
router
  .route("/userDetails/:id").get(adminValidators.checkToken, userController.userDetails);

module.exports = router;
