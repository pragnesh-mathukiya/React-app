const service = require("./emailManagementService");
const resHndlr = require("../../handlers/responseHandler");

/**
 * getAllTemplateEntities()
 * Get All Template Entities - AdminPanel
 * @param {*} req
 * @param {*} res
 */
function getAllTemplateEntities(req, res) {
  return service.getAllTemplateEntities(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
 * createTemplate()
* Create Template - AdminPanel
* @param {*} req
* @param {*} res
*/
function createTemplate(req, res) {
  return service.createTemplate(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
* getAllTemplates()
* Get All Template - AdminPanel
* @param {*} req
* @param {*} res
*/
function getAllTemplates(req, res) {
  return service.getAllTemplates(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
* getTemplateDetails()
* Get Template Detail - AdminPanel
* @param {*} req
* @param {*} res
*/
function getTemplateDetails(req, res) {
  return service.getTemplateDetails(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
* updateTemplate()
* Update Template - AdminPanel
* @param {*} req
* @param {*} res
*/
function updateTemplate(req, res) {
  return service.updateTemplate(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Err: ", err);
    resHndlr.sendError(res, err);
  });
}

/**
* deleteTemplate()
* Delete Template - AdminPanel
* @param {*} req
* @param {*} res
*/
function deleteTemplate(req, res) {
  return service.deleteTemplate(req, res).then((result) => {
    resHndlr.sendSuccess(res, result);
  }).catch((err) => {
    console.log("Delete Email Template Error :-", err);
    resHndlr.sendError(res, err);
  });
}

module.exports = {
  getAllTemplateEntities,
  createTemplate,
  getAllTemplates,
  getTemplateDetails,
  updateTemplate,
  deleteTemplate,
};
