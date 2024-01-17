const constants = require("../../constants");
const resHndlr = require("../../handlers/responseHandler");
let BaseDao = require("../../dao/BaseDao");
const mongoose = require("mongoose");

const userSchema = require("../../generic/models/userModel");

/**
 *  dashboardDetail()
 * * Get Dashboard Detail
 * @param {*} req
 * @param {*} res
 */
async function dashboardDetail(req, res) {

  let userCount = await getUserCount();
  let respObj = {
    userCount: userCount,
    reportedUserCount: 0
  };

  return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
}

/**
 *  userCount()
 * * Get User Count
 */
async function getUserCount() {
  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  let userQuery = {
    isDeleted: false,
    roleId: constants.ACCOUNT_LEVEL.USER,
    status: constants.STATUS.ACTIVE
  }

  let userCount = await userReadDao.count(userQuery);
  return userCount ? userCount : 0;
}

module.exports = {
  dashboardDetail,
};
