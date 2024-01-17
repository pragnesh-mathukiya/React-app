const router = require("express").Router();
const smsController = require("./smsManagementController");
const validators = require("./smsManagementValidators");
const adminValidators = require("../admin/adminValidators");
const resHndlr = require("../../handlers/responseHandler");
// SMS TEMPLATE APIs

/**
 * getAllTemplateEntities()
 * Get All Template Entities - AdminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getAllTemplateEntities")
  .get(adminValidators.checkToken, smsController.getAllTemplateEntities)

/**
* createTemplate()
* Create Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/createTemplate")
  .post(adminValidators.checkToken, validators.checkCreateTemplateRequest, smsController.createTemplate)

/**
* getAllTemplates()
* Get All Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/getAllTemplates")
  .get(adminValidators.checkToken, smsController.getAllTemplates)

/**
* getTemplateDetails()
* Get Template Detail - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/getTemplateDetails/:templateId")
  .get(adminValidators.checkToken, smsController.getTemplateDetails)

/**
* updateTemplate()
* Update Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/updateTemplate/:templateId")
  .put(adminValidators.checkToken, validators.checkUpdateTemplateRequest, smsController.updateTemplate)

/**
* deleteTemplate()
* Delete Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/deleteTemplate/:templateId")
  .delete(adminValidators.checkToken, smsController.deleteTemplate)

module.exports = router;
