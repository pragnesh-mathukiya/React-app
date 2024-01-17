let BaseDao = require("../../dao/BaseDao");
const configSchema = require("./configModel");
const constants = require("../../constants");
const moduleConst = require("./configConstants");
const resHndlr = require("../../handlers/responseHandler");


/**
 * Add/Edit Config  - adminPanel
 * @param {Object} details config details
 */
async function setConfig(req, res) {
  let config = global['writeUserConnection'].model(constants.DB_MODEL_REF.CONFIG, configSchema);
  let configDao = new BaseDao(config);

  let configRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CONFIG, configSchema);
  let configReadDao = new BaseDao(configRead);

  // Get Config detail Like Email , Sms
  let configDetail = await configReadDao.findOne();
  let query = {};

  if (configDetail) {
    let update = {};

    query = {
      _id: configDetail._id,
    };

    if (req.body.type == "email") {
      update = {
        $set: {
          email: {
            smtpHost: req.body.smtpHost,
            smtpPort: req.body.smtpPort,
            smtpEmail: req.body.smtpEmail,
            smtpPassword: req.body.smtpPassword,
          },
        },
      };
    } else if (req.body.type == "sms") {
      update = {
        $set: {
          sms: {
            smsAccountSid: req.body.smsAccountSid,
            smsAuthToken: req.body.smsAuthToken,
            smsFrom: req.body.smsFrom,
          },
        },
      };
    } else {
      update = {};
    }

    let options = {
      upsert: true,
      new: true,
    };

    let updatedData = await configDao.findByIdAndUpdate(query, update, options);
    if (!updatedData) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.createIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.createdSuccess, updatedData);
    }
  } else {
    let obj = {};

    if (req.body.type == "email") {
      obj = {
        email: {
          smtpHost: req.body.smtpHost,
          smtpPort: req.body.smtpPort,
          smtpEmail: req.body.smtpEmail,
          smtpPassword: req.body.smtpPassword,
        },
      };
    } else if (req.body.type == "sms") {
      obj = {
        sms: {
          smsAccountSid: req.body.smsAccountSid,
          smsAuthToken: req.body.smsAuthToken,
          smsFrom: req.body.smsFrom,
        },
      };
    } else {
      obj = {};
    }

    let data = await configDao.save(obj);
    if (!data) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.createIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.createdSuccess, data);
    }
  }
}

/**
 * Get Config detail  - adminPanel
 * @param params : config details
 */
async function getConfig(req, res) {
  let configRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CONFIG, configSchema);
  let configReadDao = new BaseDao(configRead);

  let data = await configReadDao.findOne({});
  if (data) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, data);
  } else {
    return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.dataNotFound, {});
  }
}

module.exports = {
  setConfig,
  getConfig,
};
