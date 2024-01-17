var ObjectId = require("mongoose").Types.ObjectId;
const constants = require("../../constants");
let BaseDao = require("../../dao/BaseDao");
const cmsSchema = require("./cmsModel");
const moduleConst = require("./cmsConstants");
const resHndlr = require("../../handlers/responseHandler");

/**
 *  create()
 * * Create CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  let cms = global['writeUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsDao = new BaseDao(cms);

  let cmsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsReadDao = new BaseDao(cmsRead);

  let details = req.body;
  let query = {
    name: {
      $regex: details.name,
      $options: "i",
    },
    isDeleted: false,
    platform: details.platform,
  };
  let result = await cmsReadDao.findOne(query);
  if (result) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.alreadyExists, {});
  } else {
    details.createdOn = new Date().getTime();
    let createdData = await cmsDao.save(details);
    if (!createdData) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.createIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.createdSuccess, createdData);
    }
  }
}

/**
 *  getDetails()
 * * Get Details for CMS View or Edit  - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getDetails(req, res) {

  let cmsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsReadDao = new BaseDao(cmsRead);

  let { id } = req.params;

  let query = {
    _id: id,
  };
  let result = await cmsReadDao.findOne(query);
  if (result) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, result);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  }
}

/**
 *  updateDetails()
 * * Update CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function updateDetails(req, res) {

  let cms = global['writeUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsDao = new BaseDao(cms);

  let cmsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsReadDao = new BaseDao(cmsRead);

  let { id } = req.params;
  let details = req.body;

  let query = {
    _id: id,
  };
  let data = await cmsReadDao.findOne(query);
  if (!data) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    if (data.name !== req.body.name) {
      let checkQuery = {
        name: {
          $regex: req.body.name,
          $options: "i",
        },
        _id: { $ne: ObjectId(data._id) },
        isDeleted: false,
      };

      let checkData = await cmsReadDao.findOne(checkQuery);
      if (checkData) {
        return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.alreadyExists, {});
      }
    }

    details.updatedOn = new Date().getTime();
    let update = {};
    update["$set"] = details;

    let options = {
      new: true,
    };
    let updatedData = await cmsDao.update(query, update, options);
    if (!updatedData) {
      return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.updateIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.updatedSuccess, updatedData);
    }
  }
}

/**
 *  deleteDetails()
 * * Delete CMS  - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function deleteDetails(req, res) {
  let cms = global['writeUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsDao = new BaseDao(cms);

  let cmsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsReadDao = new BaseDao(cmsRead);

  let { id } = req.params;
  let query = {
    _id: id,
  };
  let data = await cmsReadDao.findOne(query);
  if (!data) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    data.isDeleted = true;
    data.updatedOn = new Date().getTime();
    let update = {};
    update["$set"] = data;

    let options = {
      new: true,
    };
    let updatedDetails = await cmsDao.update(query, update, options);
    if (!updatedDetails) {
      return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.deleteIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.deletedSuccess, {});
    }
  }
}

/**
 *  getAll()
 * * Get All CMS List  - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAll(req, res) {

  let cmsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsReadDao = new BaseDao(cmsRead);

  let queryParams = req.query;
  let query = {
    isDeleted: false,
  };
  let data = await cmsReadDao.find(query);
  let totalRecords = data.length;
  let skip = 0;
  let limit = 10;
  if (queryParams.skip) {
    skip = queryParams.skip;
  }
  if (queryParams.limit) {
    limit = queryParams.limit;
  }
  data = data
    .slice(parseInt(skip) * parseInt(limit))
    .slice(0, parseInt(limit));

  if (data) {

    let respObj = {
      recordsTotal: totalRecords,
      recordsFiltered: data.length,
      records: data,
    };

    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  getCMSByType()
 * * get CMS by its Type for Minting Web and User
 * @param {*} req
 * @param {*} res
 */
async function getCMSByType(req, res) {

  let cmsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsReadDao = new BaseDao(cmsRead);

  let data = await cmsReadDao.findOne(
    {
      slug: req.params.cmcType,
      platform: req.params.platform,
      status: constants.STATUS.ACTIVE,
    },
    {
      _id: 1,
      platform: 1,
      name: 1,
      description: 1,
    }
  );

  if (data) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, data);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  getCMSDetails()
 * * get CMS Detail
 */
async function getCMSDetails(title) {

  let cmsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
  let cmsReadDao = new BaseDao(cmsRead);

  let query = {
    name: title,
  };

  let data = await cmsReadDao.findOne(query);
  if (data) {
    return data.description;
  } else {
    return "";
  }
}

module.exports = {
  create,
  getDetails,
  updateDetails,
  deleteDetails,
  getAll,
  getCMSByType,
  getCMSDetails,
};
