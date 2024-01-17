let BaseDao = require("../../dao/BaseDao");
const constants = require("../../constants");
const roleSchema = require("./roleModel");
const permissionSchema = require("./permissionModel");
const moduleConst = require("./roleConstants");
const resHndlr = require("../../handlers/responseHandler");

/**
 * getDetails()
 * Get details to View or Edit Role - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getDetails(req, res) {
  let { id } = req.params;

  let query = {
    _id: id,
  };

  let RoleRead = global['readUserConnection'].model(constants.DB_MODEL_REF.ROLE, roleSchema);
  let roleReadDao = new BaseDao(RoleRead);

  let result = await roleReadDao.findOne(query);
  if (result) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, result);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  }
}

/**
 * updateDetails()
 * Update Role details - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function updateDetails(req, res) {
  let RoleRead = global['readUserConnection'].model(constants.DB_MODEL_REF.ROLE, roleSchema);
  let roleReadDao = new BaseDao(RoleRead);
  let Role = global['writeUserConnection'].model(constants.DB_MODEL_REF.ROLE, roleSchema);
  let roleDao = new BaseDao(RoleRead);

  let { id } = req.params;
  let details = req.body;

  let query = {
    _id: id,
  };
  let result = await roleReadDao.findOne(query);
  if (!result) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    if (result.name !== req.body.name) {
      let checkQuery = {
        name: {
          $regex: req.body.name,
          $options: "i",
        },
        _id: { $ne: result._id },
        isDeleted: false,
      };

      let checkData = await roleReadDao.findOne(checkQuery);
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
    let updatedData = await roleDao.update(query, update, options);
    if (!updatedData) {
      return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.updateIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.updatedSuccess, updatedData);
    }
  }
}

/**
 * getAll()
 * Get All Role - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAll(req, res) {
  let RoleRead = global['readUserConnection'].model(constants.DB_MODEL_REF.ROLE, roleSchema);
  let roleReadDao = new BaseDao(RoleRead);

  let queryParams = req.query;
  let query = {
    isDeleted: false,
  };
  let data = await roleReadDao.find(query);
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

  let respObj = {
    recordsTotal: totalRecords,
    recordsFiltered: data.length,
    records: data,
  };

  return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
}

/**
 * getAllPermission()
 * Get All Permissions - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAllPermission(req, res) {

  let permissionRead = global['readUserConnection'].model(constants.DB_MODEL_REF.PERMISSION, permissionSchema);
  let permissionReadDao = new BaseDao(permissionRead);

  let query = {
    isDeleted: false,
  };

  let data = await permissionReadDao.find(query);
  return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, data);
}
module.exports = {
  getDetails,
  updateDetails,
  getAll,
  getAllPermission,
};
