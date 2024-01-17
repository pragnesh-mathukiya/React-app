const router = require("express").Router();
const emailController = require("./emailManagementController");
const validators = require("./emailManagementValidators");
const adminValidators = require("../admin/adminValidators");
const resHndlr = require("../../handlers/responseHandler");
// EMAIL TEMPLATE APIs

/**
 * getAllTemplateEntities()
 * Get All Template Entities - AdminPanel
 * @param {*} req
 * @param {*} res
 */
router.route("/getAllTemplateEntities")
  .get(adminValidators.checkToken, emailController.getAllTemplateEntities)

/**
 * createTemplate()
* Create Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/createTemplate")
  .post(adminValidators.checkToken, validators.checkCreateTemplateRequest, emailController.createTemplate)

/**
* getAllTemplates()
* Get All Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/getAllTemplates")
  .get(adminValidators.checkToken, emailController.getAllTemplates)

/**
* getTemplateDetails()
* Get Template Detail - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/getTemplateDetails/:templateId")
  .get(adminValidators.checkToken, emailController.getTemplateDetails)

/**
* updateTemplate()
* Update Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/updateTemplate/:templateId")
  .put(adminValidators.checkToken, validators.checkUpdateTemplateRequest, emailController.updateTemplate)

/**
* deleteTemplate()
* Delete Template - AdminPanel
* @param {*} req
* @param {*} res
*/
router.route("/deleteTemplate/:templateId")
  .delete(adminValidators.checkToken, emailController.deleteTemplate);

module.exports = router;
