var Promise = require("bluebird");
const mongoose = require("mongoose");
const constants = require("../constants");
const resHandlr = require("../handlers/responseHandler");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));

var genUsrToken = function (user) {
  var options = { expiresIn: process.env.tokenExpirationSec };
  return jwt
    .signAsync(user, process.env.userSecret, options)
    .then(function (jwtToken) {
      return jwtToken;
    })
    .catch(function (err) {
      throw new exceptions.tokenGenException();
    });
};

var genUsrVerificationToken = function (user) {
  var options = { expiresIn: process.env.verificationExpSec };
  return jwt
    .signAsync(user, process.env.userSecret, options)
    .then(function (jwtToken) {
      return jwtToken;
    })
    .catch(function (err) {
      throw new exceptions.tokenGenException();
    });
};

var genAdminToken = function (admin, setExpire) {
  var options = { expiresIn: process.env.tokenExpirationSec };
  return jwt
    .signAsync(admin, process.env.adminSecret, options)
    .then(function (jwtToken) {
      return jwtToken;
    })
    .catch(function (err) {
      throw new exceptions.tokenGenException();
    });
};

var verifyAdminToken = function (acsTokn) {
  return jwt
    .verifyAsync(acsTokn, process.env.adminSecret)
    .then(function (tokenPayload) {
      this.tokenPayload = tokenPayload;
      return tokenPayload;
    })
    .catch(function (err) {
      return false;
    });
};

// /**for verify User Token */
var verifyUsrToken = function (req, res, next) {
  let BaseDao = require("../dao/BaseDao");
  const userSchema = require("../generic/models/userModel");

  let User = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
  const userDao = new BaseDao(User);

  let token = req.headers["authorization"];

  if (!token) {
    return resHandlr.sendSuccess(
      res,
      resHandlr.requestResponse(
        constants.CODE.UnAuthorized,
        constants.MESSAGE.invalidToken,
        null
      )
    );
  }

  return jwt
    .verifyAsync(token, process.env.userSecret)
    .then((jwtToken) => {
      // req._email = jwtToken._email;
      req._id = jwtToken._id;
      req.roleId = jwtToken.roleId;
      req.mobileDetails = jwtToken.mobileDetails;
      return userDao
        .findOne(
          {
            _id: mongoose.Types.ObjectId(jwtToken._id),
          },
          {}
        )
        .then((result) => {
          if (!result || (result && result == null)) {
            return resHandlr.sendSuccess(
              res,
              resHandlr.requestResponse(
                constants.CODE.UnAuthorized,
                constants.MESSAGE.unAuthAccess,
                null
              )
            );
          }

          if (result && result.accessToken != token) {
            return resHandlr.sendSuccess(
              res,
              resHandlr.requestResponse(
                constants.CODE.UnAuthorized,
                constants.MESSAGE.unAuthAccess,
                null
              )
            );
          }

          next();
        });
    })
    .catch(function (err) {
      return resHandlr.sendSuccess(
        res,
        resHandlr.requestResponse(
          constants.CODE.UnAuthorized,
          constants.MESSAGE.unAuthAccess,
          null
        )
      );
    });
};

module.exports = {
  genUsrToken,
  verifyUsrToken,
  genAdminToken,
  verifyAdminToken,
  genUsrVerificationToken,
};
