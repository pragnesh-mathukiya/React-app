const constants = require("../../constants");
var ObjectId = require("mongoose").Types.ObjectId;
let BaseDao = require("../../dao/BaseDao");
const smsSchema = require("./smsManagementModel");
const smsConst = require("./smsManagementConstants");
const resHndlr = require("../../handlers/responseHandler");

/**
 * getAllTemplateEntities()
 * Get All Template Entities - AdminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAllTemplateEntities(req, res) {
  let entities = constants.TEMPLATE_ENTITIES;
  return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, entities);
}

/**
* createTemplate()
* Create Template - AdminPanel
* @param {*} req
* @param {*} res
*/
async function createTemplate(req, res) {
  let sms = global['writeUserConnection'].model(constants.DB_MODEL_REF.SMSTEMPLATES, smsSchema);
  let smsDao = new BaseDao(sms);
  let smsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.SMSTEMPLATES, smsSchema);
  let smsReadDao = new BaseDao(smsRead);

  let templateDetails = req.body;
  let mailQuery = {
    smsTitle: templateDetails.smsTitle,
    isDeleted: false
  };

  let templateExists = await smsReadDao.findOne(mailQuery);
  if (templateExists) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, smsConst.MESSAGE.TemplateAlreadyExists, {});
  } else {
    let filterAllowedTemplateFields = {
      smsTitle: templateDetails.smsTitle,
      smsContent: templateDetails.smsContent,
      createdOn: new Date().getTime(),
    };
    console.log(filterAllowedTemplateFields)

    let templateCreated = await smsDao.save(filterAllowedTemplateFields);
    if (templateCreated) {
      let allowedTemplateFields = {
        _id: templateCreated._id,
        smsTitle: templateCreated.smsTitle,
        smsContent: templateCreated.smsContent,
      };
      return resHndlr.requestResponse(constants.CODE.Success, smsConst.MESSAGE.TemplateCreatedSuccess, allowedTemplateFields);
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
  let smsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.SMSTEMPLATES, smsSchema);
  let smsReadDao = new BaseDao(smsRead);

  let queryParams = req.query;
  let tmpQuery = {
    isDeleted: false
  };
  if (queryParams.type) {
    tmpQuery.type = queryParams.type.toUpperCase();
  }
  if (queryParams.search) {
    tmpQuery["$or"] = [
      { smsTitle: { $regex: queryParams.search, $options: "i" } },
      { smsContent: { $regex: queryParams.search, $options: "i" } },
    ];
  }
  let totalTemplates = await smsReadDao.count(tmpQuery);
  let sortQuery = {};
  if (queryParams.column) {
    sortQuery[queryParams.column] = queryParams.dir == "asc" ? 1 : -1;
  } else {
    sortQuery["createdOn"] = -1;
  }
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
        smsTitle: 1,
        smsContent: 1,
        status: 1,
        createdOn: 1,
      },
    },
  ];

  let templates = await smsReadDao.aggregate(aggregateQuery);
  if (templates) {
    let respObj = {
      recordsTotal: totalTemplates,
      recordsFiltered: templates.length,
      records: templates,
    };
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
  } else {
    return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, constants.MESSAGE.internalServerError, {});
  }
}

/**
* getTemplateDetails()
* Get Template Detail - AdminPanel
* @param {*} req
* @param {*} res
*/
async function getTemplateDetails(req, res) {
  let { templateId } = req.params;
  let templateQuery = {
    _id: templateId,
  };
  let templateDetails = await templateDao.findOne(templateQuery);
  if (templateDetails) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, templateDetails);
  } else {
    return resHndlr.requestResponse(constants.CODE.ReqTimeOut, smsConst.MESSAGE.TemplateNotFound, {});
  }
}

/**
* updateTemplate()
* Update Template - AdminPanel
* @param {*} req
* @param {*} res
*/
async function updateTemplate(req, res) {
  let smsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.SMSTEMPLATES, smsSchema);
  let smsReadDao = new BaseDao(smsRead);

  let sms = global['writeUserConnection'].model(constants.DB_MODEL_REF.SMSTEMPLATES, smsSchema);
  let smsDao = new BaseDao(sms);

  let { templateId } = req.params;
  let templateUpdatingDetails = req.body;
  let templateQuery = {
    _id: ObjectId(templateId),
    status: constants.STATUS.ACTIVE,
  };

  let templateDetails = await smsReadDao.findOne(templateQuery);
  if (templateDetails) {
    let filterTemplateUpdateFields = {
      smsTitle: templateUpdatingDetails.smsTitle,
      smsContent: templateUpdatingDetails.smsContent,
      updatedOn: new Date().getTime(),
    };
    let update = {};
    update["$set"] = filterTemplateUpdateFields;
    let options = {
      new: true,
    };
    let templateUpdated = await smsDao.findOneAndUpdate(templateQuery, update, options);
    if (templateUpdated) {
      return resHndlr.requestResponse(constants.CODE.Success, smsConst.MESSAGE.TemplateUpdated, templateUpdated);
    } else {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, constants.MESSAGE.internalServerError, {});
    }
  } else {
    return resHndlr.requestResponse(constants.CODE.ReqTimeOut, smsConst.MESSAGE.TemplateNotFound, {});
  }
}

/**
* deleteTemplate()
* Delete Template - AdminPanel
* @param {*} req
* @param {*} res
*/
async function deleteTemplate(req, res) {
  let sms = global['writeUserConnection'].model(constants.DB_MODEL_REF.SMSTEMPLATES, smsSchema);
  let smsDao = new BaseDao(sms);

  let { templateId } = req.params;
  let templateQuery = {
    _id: templateId,
  };

  let tempDetail = {
    $set: {
      isDeleted: true
    }
  }

  let updateDetail = await smsDao.findOneAndUpdate(templateQuery, tempDetail);
  if (updateDetail) {
    return resHndlr.requestResponse(constants.CODE.Success, smsConst.MESSAGE.templateDeleteSuccess, updateDetail);
  } else {
    return resHndlr.requestResponse(constants.CODE.ReqTimeOut, smsConst.MESSAGE.TemplateNotFound, {});
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
