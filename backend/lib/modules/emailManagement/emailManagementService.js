const constants = require("../../constants");
var ObjectId = require("mongoose").Types.ObjectId;
let BaseDao = require("../../dao/BaseDao");
const emailSchema = require("./emailManagementModel");
const emailConst = require("./emailManagementConstants");
const resHndlr = require("../../handlers/responseHandler");

/**
 * getAllTemplateEntities()
 * Get All Template Entities - AdminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAllTemplateEntities(req, res) {
  let entities = constants.TEMPLATE_ENTITIES;
  if (entities) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, entities);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 * createTemplate()
* Create Template - AdminPanel
* @param {*} req
* @param {*} res
*/
async function createTemplate(req, res) {
  let template = global['writeUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateDao = new BaseDao(template);

  let templateRead = global['readUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateReadDao = new BaseDao(templateRead);

  let templateDetails = req.body;
  let mailQuery = {
    mailName: templateDetails.mailName,
    isDeleted: false
  };

  let templateExists = await templateReadDao.findOne(mailQuery);
  if (templateExists) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, emailConst.MESSAGE.TemplateAlreadyExists, {});
  } else {
    let filterAllowedTemplateFields = {
      _id: templateDetails._id,
      mailName: templateDetails.mailName,
      mailTitle: templateDetails.mailTitle,
      mailBody: templateDetails.mailBody,
      mailSubject: templateDetails.mailSubject,
      notificationMessage: templateDetails.notificationMessage,
      createdOn: new Date().getTime(),
    };

    let templateCreated = await templateDao.save(filterAllowedTemplateFields);
    if (templateCreated) {
      let allowedTemplateFields = {
        _id: templateCreated._id,
        type: constants.TEMPLATE_TYPES.EMAIL,
        mailName: templateCreated.mailName,
        mailTitle: templateCreated.mailTitle,
        mailBody: templateCreated.mailBody,
        mailSubject: templateCreated.mailSubject,
        notificationMessage: templateCreated.notificationMessage,
      };

      return resHndlr.requestResponse(constants.CODE.Success, emailConst.MESSAGE.TemplateCreatedSuccess, allowedTemplateFields);
    } else {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, constants.MESSAGE.internalServerError, {});
    }
  }
}

/**
* getAllTemplates()
* Get All Template - AdminPanel
* @param {*} req
* @param {*} res
*/
async function getAllTemplates(req, res) {
  let templateRead = global['readUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateReadDao = new BaseDao(templateRead);

  let queryParams = req.query;
  let tmpQuery = {
    isDeleted: false
  };
  if (queryParams.type) {
    tmpQuery.type = queryParams.type.toUpperCase();
  }
  if (queryParams.search) {
    tmpQuery["$or"] = [
      { mailTitle: { $regex: queryParams.search, $options: "i" } },
      { mailName: { $regex: queryParams.search, $options: "i" } },
      { mailSubject: { $regex: queryParams.search, $options: "i" } },
    ];
  }
  let totalTemplates = await templateReadDao.count(tmpQuery);
  let sortQuery = {};
  if (queryParams.column) {
    sortQuery[queryParams.column] = queryParams.dir == "asc" ? 1 : -1;
  } else {
    sortQuery["createdOn"] = -1;
  }
  console.log("tmpQuery", tmpQuery);
  let aggregateQuery = [
    {
      $match: tmpQuery, //need to check
    },
    {
      $sort: sortQuery,
    },
    {
      $skip: parseInt(queryParams.skip) * parseInt(queryParams.limit),
    },
    {
      $limit: parseInt(queryParams.limit),
    },
    {
      $project: {
        _id: 1,
        mailName: 1,
        mailTitle: 1,
        mailSubject: 1,
        mailBody: 1,
        status: 1,
        createdOn: 1,
        type: 1,
        notificationMessage: 1,
      },
    },
  ];

  let templates = await templateReadDao.aggregate(aggregateQuery);
  if (templates) {
    let respObj = {
      recordsTotal: totalTemplates,
      recordsFiltered: templates.length,
      records: templates,
    };
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, {});
  }
}

/**
* getTemplateDetails()
* Get Template Detail - AdminPanel
* @param {*} req
* @param {*} res
*/
async function getTemplateDetails(req, res) {

  let templateRead = global['readUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateReadDao = new BaseDao(templateRead);

  let { templateId } = req.params;
  let templateQuery = {
    _id: templateId,
  };
  let templateDetails = await templateReadDao.findOne(templateQuery);
  if (templateDetails) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, templateDetails);
  } else {
    return resHndlr.requestResponse(constants.CODE.ReqTimeOut, emailConst.MESSAGE.TemplateNotFound, {});
  }

}

/**
* updateTemplate()
* Update Template - AdminPanel
* @param {*} req
* @param {*} res
*/
async function updateTemplate(req, res) {
  let template = global['writeUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateDao = new BaseDao(template);

  let templateRead = global['readUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateReadDao = new BaseDao(templateRead);

  let { templateId } = req.params;
  let templateUpdatingDetails = req.body;
  let templateQuery = {
    _id: ObjectId(templateId),
    status: constants.STATUS.ACTIVE,
  };

  let templateDetails = await templateReadDao.findOne(templateQuery);
  if (templateDetails) {
    let filterTemplateUpdateFields = {
      mailTitle: templateUpdatingDetails.mailTitle,
      mailBody: templateUpdatingDetails.mailBody,
      mailSubject: templateUpdatingDetails.mailSubject,
      notificationMessage: templateUpdatingDetails.notificationMessage,
      updatedOn: new Date().getTime(),
    };
    let update = {};
    update["$set"] = filterTemplateUpdateFields;
    let options = {
      new: true,
    };

    let templateUpdated = await templateDao.findOneAndUpdate(templateQuery, update, options);
    if (templateUpdated) {
      return resHndlr.requestResponse(constants.CODE.Success, emailConst.MESSAGE.TemplateUpdated, templateUpdated);
    } else {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, constants.MESSAGE.internalServerError, {});
    }
  } else {
    return resHndlr.requestResponse(constants.CODE.ReqTimeOut, emailConst.MESSAGE.TemplateNotFound, {});
  }
}

/**
* deleteTemplate()
* Delete Template - AdminPanel
* @param {*} req
* @param {*} res
*/
async function deleteTemplate(req, res) {

  let template = global['writeUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateDao = new BaseDao(template);

  let { templateId } = req.params;
  let templateQuery = {
    _id: templateId,
  };

  let tempDetail = {
    $set: {
      isDeleted: true
    }
  }

  let updateDetail = await templateDao.findOneAndUpdate(templateQuery, tempDetail);
  if (updateDetail) {
    return resHndlr.requestResponse(constants.CODE.Success, emailConst.MESSAGE.templateDeleteSuccess, updateDetail);
  } else {
    return resHndlr.requestResponse(constants.CODE.ReqTimeOut, emailConst.MESSAGE.TemplateNotFound, {});
  }
}

module.exports = {
  getAllTemplateEntities,
  createTemplate,
  getAllTemplates,
  getTemplateDetails,
  updateTemplate,
  deleteTemplate,
};
