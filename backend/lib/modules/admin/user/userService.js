const constants = require("../../../constants");
const imageUpload = require("../../../utils/imageUpload");
const userSchema = require("../../../generic/models/userModel");
let BaseDao = require("../../../dao/BaseDao");
var Promise = require("bluebird");
const mongoose = require("mongoose");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));

const resHandlr = require("../../../handlers/responseHandler");
const userConstants = require("./userConstants");
const { checkUserName } = require("../../../utils/userUtils");
// Importing events
const EventEmitter = require('events');
const resHndlr = require("../../../handlers/responseHandler");
const moduleConst = require("./userConstants");
const { deleteObject } = require("../../../utils/refrence");
var vFileNameGenerator = require("../../../utils/vfileNameGenerator");

/**
 * * Get all users - ADMINPANEL
 * * @param {Object} queryParams query params for sorting, paginations
 * * @param {Object} filters filters on country, registered dates to be applied
 */
async function getAll(req, res) {

  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  let queryParams = req.query;
  let query = {};
  query["roleId"] = constants.ACCOUNT_LEVEL.USER;
  query["isDeleted"] = false;
  if (queryParams.search) {
    query["$or"] = [
      { email: { $regex: queryParams.search, $options: "i" } },
      { userName: { $regex: queryParams.search, $options: "i" } },
    ];
  }
  if (queryParams.adminVerification) {
    query["adminVerification"] = queryParams.adminVerification;
  }

  let total = await userReadDao.count(query);

  let sortQuery = {};
  if (queryParams.column) {
    sortQuery[queryParams.column] = queryParams.dir == "asc" ? 1 : -1;
  } else {
    sortQuery["createdOn"] = -1;
  }

  let aggregateQuery = [
    {
      $match: query,
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
        name: 1,
        userName: 1,
        bio: 1,
        mobileDetails: 1,
        bio: 1,
        isDeleted: 1,
        dob: 1,
        status: 1,
        streaks: { $ifNull: ["$streaks.onePostPerDay", 0] }
      },
    },
  ];

  let data = await userReadDao.aggregate(aggregateQuery);
  if (data) {
    let respObj = {
      recordsTotal: total,
      recordsFiltered: data.length,
      records: data,
    };
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, userConstants.MESSAGE.dataNotFound, {});
  }
}

/**
 * * Update user - ADMINPANEL
 * * @param {String} id mongo _id user to be updated
 * * @param {Object} details user details to be updated
 */
async function update(req, res) {
  let user = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userDao = new BaseDao(user);

  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  let { id } = req.params;
  let bodyDetails = req.body;
  let details = {
    name: bodyDetails.name,
    userName: bodyDetails.userName,
    bio: bodyDetails.bio,
    dob: bodyDetails.dob,
    specialDates: JSON.parse(bodyDetails.specialDates),
    mobileDetails: {
      mobileNo: bodyDetails.mobileNo,
      dailCode: bodyDetails.dailCode,
    },
    status: bodyDetails.status,
  }

  let query = {
    _id: id,
    isDeleted: false,
  };

  let isUserNameExist = await checkUserName(id, bodyDetails.userName);
  if (isUserNameExist) {
    return resHandlr.requestResponse(constants.CODE.BadRequest, userConstants.MESSAGE.UserNameAlreadyExists, {});
  }

  let result = await userReadDao.findOne(query, {})
  if (!result) {
    return resHandlr.requestResponse(constants.CODE.DataNotFound, userConstants.MESSAGE.dataNotFound, {});
  } else {
    details.updatedOn = new Date();
    details.location = result.location;
    details.location["address"] = bodyDetails.address;

    if (bodyDetails && (bodyDetails.mobileNo != result.mobileDetails.mobileNo || bodyDetails.dailCode != result.mobileDetails.dailCode)) {
      details.accessToken = "";
    }
    let bucketName = process.env.bucket;
    let folderName = process.env.profileFolderName;
    let reponseImg = "";
    if (req.files && req.files == null) {
      return resHandlr.requestResponse(constants.CODE.BadRequest, userConstants.MESSAGE.profileRequire, {});
    } else {
      if (req.files) {

        let filemimetype = req.files.profilePicture.mimetype;
        let filetype = filemimetype.split("/");
        let imageSize = req.files.profilePicture.size;
        // first we check type
        if (filetype[0] != constants.UPLOAD_TYPE.IMAGE) {
          return resHandlr.requestResponse(constants.CODE.BadRequest, userConstants.MESSAGE.profileShouldBeImage, {});
        }

        if (filetype[1] == constants.IMAGE_TYPE.GIF || filetype[1] == constants.IMAGE_TYPE.SVG) {
          return resHandlr.requestResponse(constants.CODE.BadRequest, userConstants.MESSAGE.profileValidImage, {});
        }

        if (imageSize > process.env.image_max_size_bytes) {
          // image size maximum 10mb
          return resHandlr.requestResponse(constants.CODE.BadRequest, userConstants.MESSAGE.profileSize, {});
        }
        reponseImg = await imageUpload.uploadDocs(req.files.profilePicture, folderName);

        // Delete Old Image File
        if (result.profilePicture) {
          await deleteObject(bucketName, result.profilePicture);
        }
      }
    }
    // let userProfile;
    // if (reponseImg != "") {
    //   let uProfileName = vFileNameGenerator.extractFileName(reponseImg.Location);
    //   userProfile = vFileNameGenerator.videoFileNameGenerator('adminprofile', 8, uProfileName)
    // } else {
    //   userProfile = result.profilePicture;
    // }

    details.profilePicture = (reponseImg != "") ? vFileNameGenerator.videoFileNameGenerator(folderName, 8, req.files.profilePicture.name) : result.profilePicture;

    if (bodyDetails.status === constants.STATUS.INACTIVE) {
      details.accessToken = "";
      details.fcmToken = "";
    }

    let update = {};
    update["$set"] = details;

    let options = {
      new: true,
      projection: {
        _id: 1,
        name: 1,
        userName: 1,
        bio: 1,
        dob: 1,
      },
    };

    let updatedData = await userDao.findOneAndUpdate(query, update, options)
    if (updatedData) {
      return resHandlr.requestResponse(constants.CODE.Success, userConstants.MESSAGE.updatedSuccess, updatedData);
    } else {
      return resHandlr.requestResponse(constants.CODE.INTRNLSRVR, userConstants.MESSAGE.updateIssue, {});
    }
  }
}

/**
 * * Delete user - ADMINPANEL
 * * @param {String} id mongo _id of user to be deleted
 */
async function deleteDetails(req, res) {
  let user = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userDao = new BaseDao(user);

  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  //Token Base User Detail Get
  let userData = await jwt.verifyAsync(req.headers["authorization"], process.env.adminSecret);
  let { id } = req.params;

  let query = {
    _id: id,
  };
  let data = await userReadDao.findOne(query, {})
  if (!data) {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    data.updatedOn = new Date();
    data.isDeleted = true;
    data.deleteDetails.deleteRequestStatus = true;
    data.deleteDetails.deletedBy = mongoose.Types.ObjectId(userData._id);
    data.deleteDetails.deleteReason = req.body.reason;
    data.deleteDetails.deletedDate = Date.now();
    data.accessToken = "";
    data.fcmToken = "";
    data.myConnections = [];

    let update = {};
    update["$set"] = data;

    let options = {
      new: true,
    };

    let updateData = await userDao.findOneAndUpdate(query, update, options);
    if (!updateData) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.deleteIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.deletedSuccess, {});
    }
  }
}

/**
 * * Update user status - ADMINPANEL
 * * @param {String} id mongo _id user to be updated
 * * @param {Object} details user status to be updated
 */
async function updateUserStatus(req, res) {
  let user = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userDao = new BaseDao(user);

  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  let { id } = req.params;
  let details = {
    status: req.body.status,
  };

  let query = {
    _id: id,
    isDeleted: false,
  };

  let result = await userReadDao.findOne(query, {});
  if (!result) {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    if (details.status == constants.STATUS.INACTIVE) {
      details.accessToken = "";
      details.fcmToken = "";
    }

    details.updatedOn = new Date();

    let update = {};
    update["$set"] = details;

    let options = {
      new: true,
      projection: {
        _id: 0,
        name: 1,
        userName: 1,
        bio: 1,
        dob: 1,
        status: 1,
      },
    };

    let updatedData = await userDao.findOneAndUpdate(query, update, options);
    if (updatedData) {
      if (details.status == constants.STATUS.INACTIVE) {
        return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.userInactiveSucess, updatedData);
      } else {
        return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.userActiveSucess, updatedData);
      }
    } else {
      return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
    }
  }
}

/**
 *  getUserdetailById()
 * * Get User Detail By Id from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getUserDetailById(req, res) {

  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  let userId = req.params.id;
  let query = {
    _id: mongoose.Types.ObjectId(userId)
  }
  let projections = {
    name: 1,
    userName: 1,
    profilePicture: 1,
    bio: 1,
    dob: 1,
    status: 1,
    mobileDetails: 1,
    location: 1,
    specialDates: 1,
    streaks: 1
  }

  let userDetail = await userReadDao.findOne(query, projections);
  if (userDetail) {
    return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.getUserDetailSuccess, userDetail);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  }
}

/**
 *  getDeletedUserList()
 * * Get Deleted User List from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getDeletedUserList(req, res) {

  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  let queryParams = req.query;

  let userQuery = {
    isDeleted: true,
    roleId: constants.ACCOUNT_LEVEL.USER
  }

  let query = {};

  if (queryParams.search) {
    query["$or"] = [
      { userName: { $regex: queryParams.search, $options: "i" } },
      { deletedByUserName: { $regex: queryParams.search, $options: "i" } },
    ];
  }

  let total = await userReadDao.count(userQuery);

  let sortQuery = {};
  if (queryParams.column) {
    sortQuery[queryParams.column] = queryParams.dir == "asc" ? 1 : -1;
  } else {
    sortQuery["deletedDate"] = -1;
  }

  let aggregateQuery = [
    {
      $match: userQuery,
    },
    {
      $project: {
        userName: 1,
        deleteDetails: 1,
        deletedBy: "$deleteDetails.deletedBy"
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: "deletedBy",
        foreignField: "_id",
        as: 'deletedByUserDetail'
      }
    },
    { $unwind: "$deletedByUserDetail" },
    {
      $lookup: {
        from: 'roles',
        localField: "deletedByUserDetail.roleId",
        foreignField: "_id",
        as: 'deletedByUserRoleDetail'
      }
    },
    { $unwind: "$deletedByUserRoleDetail" },
    {
      $project: {
        userName: 1,
        deletedByUserName: "$deletedByUserDetail.name",
        deletedUserRole: "$deletedByUserRoleDetail.name",
        deletedReason: "$deleteDetails.deleteReason",
        deletedDate: "$deleteDetails.deletedDate"
      },
    },
    {
      $match: query,
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
  ];

  let userDetail = await userReadDao.aggregate(aggregateQuery);
  if (userDetail) {
    let respObj = {
      recordsTotal: total,
      recordsFiltered: userDetail.length,
      records: userDetail,
    };
    return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.getDeltedUserDetailSuccess, respObj);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  }
}

/**
 *  userDetails()
 * * Get User Details From - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function userDetails(req, res) {

  let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let userReadDao = new BaseDao(userRead);

  let _id = mongoose.Types.ObjectId(req.params.id);

  let query = {
    _id: _id,
    isDeleted: false
  }

  let project = {
    name: 1,
    userName: 1,
    streaks: "$streaks.onePostPerDay",
    profilePicture: 1,
    dob: 1,
    specialDates: 1,
    bio: 1,
    mobileDetails: 1,
    createdOn: 1,
    location: { $ifNull: ["$location.address", "-"] },
    status: 1,
  }

  let userData = await userReadDao.findOne(query, project);
  if (userData) {
    return resHandlr.requestResponse(constants.CODE.Success, userConstants.MESSAGE.getUserDetailSuccess, userData);
  } else {
    return resHandlr.requestResponse(constants.CODE.Success, constants.MESSAGE.dataNotFound, null);
  }
}

module.exports = {
  getAll,
  update,
  deleteDetails,
  updateUserStatus,
  getUserDetailById,
  getDeletedUserList,
  userDetails,
};
