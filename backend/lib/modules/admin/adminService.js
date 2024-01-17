/*#################################            Load modules start            ########################################### */

const admConst = require("./adminConstants");
const responseHandler = require("../../handlers/responseHandler");
const constants = require("../../constants");
const appUtils = require("../../appUtils");
const jwtHandler = require("../../middleware/jwtHandler");
var ObjectId = require("mongoose").Types.ObjectId;
const mailHandler = require("../../middleware/email");
let BaseDao = require("../../dao/BaseDao");
const mongoose = require("mongoose");
const imageUpload = require("../../utils/imageUpload");
const userSchema = require("../../generic/models/userModel");
const appUtil = require("../../appUtils");
const { deleteObject } = require("../../utils/refrence");
const vFileNameGenerator = require('../../utils/vfileNameGenerator')
/*#################################            Load modules end            ########################################### */

/**
 *  getUserDetails()
 * * Get user details - ADMINPANEL
 * * @param {String} id mongo id of admin
 * * @param {String} userId mongo id of user to fetch details
 * @param {*} req
 * @param {*} res
 */
async function getUserDetails(req, res) {
  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let { id, userId } = req.params;
  if (!id || !ObjectId.isValid(id) || !userId || !ObjectId.isValid(userId)) {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.InvalidDetails, {});
  } else {
    let adminQuery = {
      _id: id,
    };
    let userQuery = {
      _id: userId,
    };
    let results = await Promise.all([
      adminReadDao.findOne(adminQuery),
      adminReadDao.findOne(userQuery, {
        _id: 1,
        name: 1,
        email: 1,
        profilePicture: 1,
        isLoggedOut: 1,
        createdAt: 1,
        status: 1,
        document: 1,
        adminVerification: 1,
        loginActivity: 1,
        roleId: 1,
      }),
    ])

    if (!results[0] || !results[1]) {
      return responseHandler.requestResponse(constants.CODE.DataNotFound, admConst.MESSAGE.invalidCredentials, {});
    } else {
      return responseHandler.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, results[1]);
    }
  }
}

/**
 *  getUserCounts()
 * * get all user count - ADMINPANEL
 * @param {String} id mongo id of admin
 * @param {*} req
 * @param {*} res
 */
async function getUserCounts(req, res) {
  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let userQuery = {
    roleId: 3,
    isDeleted: false,
    status: constants.STATUS.ACTIVE,
  };
  let totalUsers = await adminReadDao.getUserCounts(userQuery);
  if (totalUsers) {
    return responseHandler.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, totalUsers);
  } else {
    return responseHandler.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  countForDashboard()
 * * Dashbiard API - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function countForDashboard(req, res) {
  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let userQuery = {
    status: constants.STATUS.ACTIVE,
  };
  let result = await Promise.all([adminReadDao.count(userQuery)])
  let details = {
    totalUsers: result[0],
  };

  if (details) {
    return responseHandler.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, details);
  } else {
    return responseHandler.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, {});
  }
}
/**
 * Remove system activity
 * @param {String} id mongo id of admin
 * @param {String} userId mongo id of user whose activity is to be removed
 * @param {String} activityId mongo id of system activity to be removed
 */
function removeActivity(id, userId, activityId) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);
  if (
    !id ||
    !ObjectId.isValid(id) ||
    !userId ||
    !ObjectId.isValid(userId) ||
    !activityId ||
    !ObjectId.isValid(activityId)
  ) {
    return responseHandler.responseMapping(
      constants.CODE.BadRequest,
      constants.MESSAGE.InvalidDetails
    );
  } else {
    let adminQuery = {
      _id: id,
    };

    let userQuery = {
      _id: userId,
    };

    return Promise.all([
      adminReadDao.findOne(adminQuery),
      adminReadDao.findOne(userQuery, {}),
    ])
      .then((results) => {
        if (!results[0]) {
          return responseHandler.responseMapping(
            constants.CODE.DataNotFound,
            constants.MESSAGE.InvalidCredentials
          );
        } else if (!results[1]) {
          return responseHandler.responseMapping(
            constants.CODE.ReqTimeOut,
            admConst.MESSAGE.UserNotFound
          );
        } else {
          userQuery["loginActivity._id"] = activityId;
          let updateObj = {
            "loginActivity.$.status": constants.STATUS.INACTIVE,
          };

          let update = {};
          update["$set"] = updateObj;

          let options = {
            new: true,
          };

          return adminDao
            .findOneAndUpdate(userQuery, update, options)
            .then((userUpdated) => {
              if (userUpdated) {
                return responseHandler.responseMappingWithData(
                  constants.CODE.Success,
                  admConst.MESSAGE.ActivityRemoved,
                  userUpdated
                );
              } else {
                return responseHandler.responseMapping(
                  constants.CODE.INTRNLSRVR,
                  constants.MESSAGE.internalServerError
                );
              }
            })
            .catch((err) => {
              return responseHandler.responseMapping(
                constants.CODE.INTRNLSRVR,
                constants.MESSAGE.internalServerError
              );
            });
        }
      })
      .catch((err) => {
        return responseHandler.responseMapping(
          constants.CODE.INTRNLSRVR,
          constants.MESSAGE.internalServerError
        );
      });
  }
}

/**
 *  login()
 * * Admin Login - ADMINPANEL
 * @param {Object} details admin login details
 */
async function login(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let details = req.body;
  let query = {};
  if (details.email) {
    query.email = details.email.toLowerCase();
  }

  let adminDetails = await adminReadDao.findOne(query);
  if (adminDetails) {
    console.log("Working ", details.password, adminDetails.password)
    let isValidPassword = await appUtils.verifyPassword(details.password, adminDetails.password);
    if (isValidPassword) {
      let prevLoginActivities = adminDetails.loginActivity;
      prevLoginActivities.push({
        device: details.device,
        date: details.date,
        browser: details.browser,
        ipaddress: details.ipaddress,
        country: details.country,
        state: details.state,
        status: constants.STATUS.ACTIVE,
      });
      let updateObj = {
        loginActivity: prevLoginActivities,
      };
      let adminObj = {
        _id: adminDetails._id,
        email: adminDetails.email.toLowerCase(),
        mobileDetails: adminDetails.mobileDetails
      };
      let token = await jwtHandler.genAdminToken(adminObj);
      updateObj.accessToken = token;
      let update = {};
      update["$set"] = updateObj;

      let options = {
        new: true,
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          status: 1,
          profilePicture: 1,
          isLoggedOut: 1,
          loginActivity: 1,
          walletAddress: 1,
          accessToken: 1,
          roleId: 1,
          mobileDetails: 1
        },
      };
      let adminUpdated = await adminDao.findOneAndUpdate(query, update, options);
      if (adminUpdated) {
        adminUpdated.accessToken = token;
        adminUpdated.permissions = adminDetails.permissions;
        return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.loginSuccess, adminUpdated);
      } else {
        return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.issueLogin, {});
      }
    } else {
      return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.invalidPassword, {});
    }
  } else {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  logout()
 * * Log out - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function logout(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let id = req._id;
  let { activityId } = req.params;
  let query = {
    _id: id,
  };
  let adminDetails = await adminReadDao.findOne(query);
  if (adminDetails) {
    let activities = adminDetails.loginActivity;
    let index = activities.findIndex((obj) => obj._id == activityId);
    if (index > -1) {
      activities.splice(index, 1);
      let updateObj = {
        loginActivity: activities,
        accessToken: "",
      };
      let update = {};
      update["$set"] = updateObj;

      let options = {
        new: true,
      };

      let adminUpdated = await adminDao.findOneAndUpdate(query, update, options);
      if (adminUpdated) {
        return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.logoutSuccess, {});
      } else {
        return resHandlr.requestResponse(constants.CODE.internalServerError, admConst.MESSAGE.issueLogout, {});
      }
    } else {
      return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.logoutSuccess, {});
    }
  } else {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  getProfile()
 * * Get profile data - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getProfile(req, res) {
  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let query = {
    _id: ObjectId(req.params.id),
  };
  let projection = {
    _id: 1,
    name: 1,
    email: 1,
    status: 1,
    profilePicture: 1,
    dailCode: "$mobileDetails.dailCode",
    mobileNo: "$mobileDetails.mobileNo",
    permissions: 1
  };

  let adminDetails = await adminReadDao.findOne(query, projection);
  if (adminDetails) {
    return responseHandler.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, adminDetails);
  } else {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  updateProfile()
 * * Update profile - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function updateProfile(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let { id } = req.params;
  let details = req.body;
  let query = {
    _id: id,
  };

  let adminData = await adminReadDao.findOne(query);

  if (adminData) {
    let emailQuery = {
      email: details.email,
      _id: { $ne: mongoose.Types.ObjectId(adminData._id) },
      isDeleted: false,
      roleId: { $in: [0, 1] }
    };
    let emailData = await adminReadDao.findOne(emailQuery)
    if (!emailData) {
      let contactNumberQuery = {
        "mobileDetails.dailCode": details.dailCode,
        "mobileDetails.mobileNo": details.mobileNo,
        _id: { $ne: mongoose.Types.ObjectId(adminData._id) },
        isDeleted: false,
        roleId: { $in: [0, 1] }
      };
      let contactData = await adminReadDao.findOne(contactNumberQuery);
      if (!contactData) {
        details.updatedOn = Date.now();

        let reponseImg = "";
        if (req.files && req.files != null) {
          let folderName = process.env.profileFolderName;

          let filemimetype = req.files.profilePicture.mimetype;
          let filetype = filemimetype.split("/");
          let imageSize = req.files.profilePicture.size;
          // first we check type
          if (filetype[0] != "image") {
            return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.profilePictureShouldBeImageType, {});
          }
          if (imageSize > process.env.image_max_size_bytes) {
            // flage size maximum 2000 bytes
            return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.imageSize, {});
          }
          reponseImg = await imageUpload.uploadDocs(req.files.profilePicture, folderName);

          //let uProfileName = vFileNameGenerator.extractFileName(reponseImg.Location);
          //let userProfile = vFileNameGenerator.videoFileNameGenerator(folderName, 8, uProfileName);
          // details.profilePicture = (reponseImg != "") ? vFileNameGenerator.videoFileNameGenerator(folderName, 8, req.files.profilePicture.name) : adminData.profilePicture;
          details.profilePicture = reponseImg;
        }
        let update = {};
        details["mobileDetails.dailCode"] = details.dailCode;
        details["mobileDetails.mobileNo"] = details.mobileNo;
        update["$set"] = details;

        let options = {
          new: true,
          projection: {
            _id: 1,
            name: 1,
            email: 1,
            status: 1,
            profilePicture: 1,
            isLoggedOut: 1,
            loginActivity: 1,
            walletAddress: 1,
            accessToken: 1,
            roleId: 1,
            permissions: 1,
            mobileDetails: 1
          },
        };
        let adminUpdated = await adminDao.findOneAndUpdate(query, update, options);
        if (adminUpdated) {
          return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.profileUpdated, adminUpdated);
        } else {
          return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.issueUpdate, {});
        }
      } else {
        return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.contactNumberAlreadyExists, {});
      }
    } else {
      return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.emailAlreadyExist, {});
    }
  } else {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.dataNotFound, {}); // data not found
  }
}

/**
 *  forgotPassword()
 * * forgot password - ADMINPANEL
 * * Recover password by email
 * @param {*} req
 * @param {*} res
 */
async function forgotPassword(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let { email } = req.body;
  let query = {
    email: email.toLowerCase(),
  };
  let isExist = await adminReadDao.findOne(query);
  if (isExist) {
    let obj = {
      _name: isExist.name && isExist.name != null ? isExist.name : "",
      _roleId: isExist.roleId,
      _id: isExist._id,
      _email: isExist.email && isExist.email != null ? isExist.email : "",
    };
    let passwordToken = await jwtHandler.genAdminToken(obj);
    let updateObj = {
      passwordToken: passwordToken,
    };
    let update = {};
    update["$set"] = updateObj;

    let options = {
      new: true,
    };

    let updateDone = await adminDao.findOneAndUpdate(query, update, options);
    if (updateDone) {
      // let mailQuery = {
      //   type: constants.TEMPLATE_TYPES.EMAIL,
      //   mailName: constants.EMAIL_TEMPLATES.ADMIN_FORGOT_PASSWORD,
      //   status: constants.STATUS.ACTIVE,
      // };
      // let adminObj = {
      //   fullName: isExist.name,
      //   email: isExist.email,
      //   passwordToken:
      //     process.env.adminForgotPasswordLink + passwordToken,
      // };
      // console.log(
      //   "passwordToken ----------------------",
      //   adminObj.passwordToken
      // );
      // let mailSent = mailHandler.SEND_MAIL(adminObj, mailQuery);

      return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.resetPasswordMailSent, updateDone);
    } else {
      return responseHandler.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.forgotPasswordIssue, {});
    }
  } else {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  setNewPassword()
 * * set new password - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function setNewPassword(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let { passwordToken } = req.params;
  let { password } = req.body;
  let query = {
    passwordToken: passwordToken,
  };
  let isUserExists = await adminReadDao.findOne(query);
  if (isUserExists) {
    let newPass = await appUtils.generateSaltAndHashForPassword(password); //await appUtils.convertPass(password);

    let query = {
      _id: isUserExists._id,
    };
    let updateObj = {
      password: newPass,
      passwordToken: "",
    };
    let update = {};
    update["$set"] = updateObj;

    let options = {
      new: true,
    };
    let updateDone = await adminDao.findOneAndUpdate(query, update, options);
    if (updateDone) {
      // let mailQuery = {
      //   type: constants.TEMPLATE_TYPES.EMAIL,
      //   mailName: constants.EMAIL_TEMPLATES.ADMIN_RESET_PASSWORD,
      //   status: constants.STATUS.ACTIVE,
      // };
      // let adminObj = {
      //   fullName: updateDone.name,
      //   email: process.env.adminEmailId,
      //   passwordToken: passwordToken,
      // };
      // let mailSent = mailHandler.SEND_MAIL(adminObj, mailQuery);

      return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.passwordUpdateSuccess, {});
    } else {
      return responseHandler.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.setPasswordIssue, {});
    }
  } else {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.resetPasswordLinkExpired, {});
  }
}

/**
 *  resetPassword()
 * * Reset Password - ADMINPANEL
 * @param {string} id mongo id of admin
 * @param {string} oldPassword old password to verify
 * @param {string} newPassword new password to reset
 */
async function resetPassword(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  //  change password
  let id = req._id;
  let { oldPassword, newPassword } = req.body;
  let query = {
    _id: id,
  };
  let adminDetails = await adminReadDao.findOne(query);
  if (adminDetails) {
    let isPasswordMatch = await appUtils.verifyPassword(oldPassword, adminDetails.password);
    if (isPasswordMatch) {
      let newPass = await appUtils.generateSaltAndHashForPassword(
        newPassword
      ); //await appUtils.convertPass(password);
      let updateObj = {
        password: newPass,
      };
      let update = {};
      update["$set"] = updateObj;

      let options = {
        new: true,
      };

      let updateDone = await adminDao.findOneAndUpdate(query, update, options);
      if (updateDone) {
        // let mailQuery = {
        //   type: constants.TEMPLATE_TYPES.EMAIL,
        //   mailName: constants.EMAIL_TEMPLATES.ADMIN_CHANGE_PASSWORD,
        //   status: constants.STATUS.ACTIVE,
        // };
        // let adminObj = {
        //   fullName: updateDone.name,
        //   email: process.env.adminEmailId,
        // };
        // let mailSent = mailHandler.SEND_MAIL(adminObj, mailQuery);

        return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.passwordUpdateSuccess, updateDone);
      } else {
        return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.internalServerError, {});
      }
    } else {
      return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.OldPasswordNotMatch, {});
    }
  } else {
    return responseHandler.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, {});
  }
}

/**
 *  addSubAdmin()
 * * create Sub Admin - ADMINPANEL
 * * @param {string} id mongo id of admin
 * * @param {object} details admin profile updating details
 */
async function addSubAdmin(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let details = req.body;
  let emailQuery = {
    email: {
      $regex: details.email,
      $options: "i",
    },
    isDeleted: false,
    "roleId": { $in: [1, 2] } // superAdmin , admin
  };
  let contactNumberQuery = {
    "mobileDetails.dailCode": details.dailCode,
    "mobileDetails.mobileNo": details.mobileNo,
    isDeleted: false,
    "roleId": { $in: [1, 2] } // superAdmin , admin
  };

  let emailData = await adminReadDao.findOne(emailQuery);
  if (emailData) {
    return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.emailAlreadyExist, {});
  } else {
    let contactData = await adminReadDao.findOne(contactNumberQuery);
    if (contactData) {
      return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.contactNumberAlreadyExists, {});
    } else {
      let password = await appUtils.generateRandomPassword();
      hashPassword = await appUtils.generateSaltAndHashForPassword(
        password
      );

      let adminDetails = {
        name: details.name,
        password: hashPassword,
        mobileDetails: {
          dailCode: details.dailCode,
          mobileNo: details.mobileNo
        },
        email: details.email,
        createdOn: new Date(),
        status: details.status,
        roleId: details.roleId
          ? details.roleId
          : constants.ACCOUNT_LEVEL.ADMIN,
        permissions: details.permissions,
      };

      let reponseImg = "";
      if (req.files && req.files != null) {
        let folderName = process.env.profileFolderName;

        let filemimetype = req.files.profilePicture.mimetype;
        let filetype = filemimetype.split("/");
        let imageSize = req.files.profilePicture.size;
        // first we check type
        if (filetype[0] != "image") {
          return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.profilePictureShouldBeImageType, {});
        }
        if (imageSize > process.env.image_max_size_bytes) {
          // flage size maximum 2000 bytes
          return responseHandler.requestResponse(constants.CODE.BadRequest, admConst.MESSAGE.imageSize, {});
        }
        reponseImg = await imageUpload.uploadDocs(req.files.profilePicture, folderName);
        details.profilePicture = reponseImg;
      }

      let result = await adminDao.save(adminDetails);
      if (result) {
        // let mailQuery = {
        //   type: constants.TEMPLATE_TYPES.EMAIL,
        //   status: constants.STATUS.ACTIVE,
        //   mailName:
        //     constants.EMAIL_TEMPLATES.NEW_ADMIN_CREATED_BY_SUPERADMIN,
        // };
        // let adminObj = {
        //   fullName: result.name,
        //   email: process.env.adminEmailId, //result.email,
        //   password: password,
        // };
        // console.log("Admin Password :-", password);
        // let mailSent = mailHandler.SEND_MAIL(adminObj, mailQuery);

        return responseHandler.requestResponse(constants.CODE.Success, admConst.MESSAGE.adminAdded, result);
      } else {
        return responseHandler.requestResponse(constants.CODE.internalServerError, admConst.MESSAGE.issueCreate, {});
      }
    }
  }
}

/**
 *  getAll()
 * * get all Sub admin - ADMINPANEL
 * @param {*} req
 * @param {*} res
 * @param {Object} queryParams query params for sorting, paginations
 * @param {Object} filters filters on country, registered dates to be applied
 */
async function getAll(req, res) {
  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let queryParams = req.query;
  let query = {};
  query["roleId"] = constants.ACCOUNT_LEVEL.ADMIN;
  query["isDeleted"] = false;
  if (queryParams.search) {
    query["$or"] = [
      { email: { $regex: queryParams.search, $options: "i" } },
      { name: { $regex: queryParams.search, $options: "i" } },
    ];
  }

  let total = await adminReadDao.count(query);

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
        email: 1,
        status: 1,
        profilePicture: 1,
        permissions: 1,
        dailCode: "$mobileDetails.dailCode",
        mobileNo: "$mobileDetails.mobileNo",
      },
    },
  ];

  let data = await adminReadDao.aggregate(aggregateQuery);
  let respObj = {
    recordsTotal: total,
    recordsFiltered: data.length,
    records: data,
  };

  return responseHandler.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
}

/**
 *  updateStatus()
 * * Update admin status - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function updateStatus(req, res) {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let { id } = req.params;
  let query = {
    _id: id,
  };

  let data = await adminReadDao.findOne(query);
  if (!data) {
    return responseHandler.requestResponse(constants.CODE.BadRequest, constants.MESSAGE.dataNotFound, {});
  } else {
    data.status =
      data.status == constants.STATUS.ACTIVE
        ? constants.STATUS.INACTIVE
        : constants.STATUS.ACTIVE;
    data.updatedOn = Date.now();
    let update = {};
    update["$set"] = data;

    let options = {
      new: true,
    };

    let updatedDetails = await adminDao.findOneAndUpdate(query, update, options);
    if (!updatedDetails) {
      return responseHandler.requestResponse(constants.CODE.DataNotFound, admConst.MESSAGE.updateStatusIssue, {});
    } else {
      if (updatedDetails.status == constants.STATUS.ACTIVE) {
        return responseHandler.requestResponse(constants.CODE.DataNotFound, admConst.MESSAGE.updateStatusActive, {});
      } else {
        return responseHandler.requestResponse(constants.CODE.DataNotFound, admConst.MESSAGE.updateStatusInctive, {});
      }
    }
  }
}

/**
 *  createAdmin()
 * * Create Default Admin
 */
async function createAdmin() {
  let admin = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminDao = new BaseDao(admin);

  let adminRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  let adminReadDao = new BaseDao(adminRead);

  let countData = await adminReadDao.countDocuments({ 'roleId': 1 })

  if (countData == 0) {
    let adminObj = {
      name: process.env.adminFullName,
      password: process.env.adminPassword,
      mobileDetails: {
        mobileNo: process.env.adminMobileNumber,
        dailCode: process.env.adminDailCode
      },
      email: process.env.adminEmailId,
      roleId: 1, // SUPER ADMIN
      profilePicture: process.env.adminProfilePicture,
      createdOn: new Date().getTime(),
    };

    let convertedPass = await appUtil.convertPass(adminObj.password);
    adminObj.password = convertedPass;
    console.log('countData :-', countData)

    let data = adminDao.save(adminObj)

    if (data) {
      console.log("admin created successfully.");
    } else {
      console.log('Error to create admin');
    }
  }
}

module.exports = {
  getUserCounts,
  getUserDetails,
  addSubAdmin,
  countForDashboard,
  login,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  setNewPassword,
  resetPassword,
  getAll,
  updateStatus,
  createAdmin
};
