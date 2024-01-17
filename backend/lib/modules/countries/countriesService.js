var ObjectId = require("mongoose").Types.ObjectId;
const imageUpload = require("../../utils/imageUpload");
let BaseDao = require("../../dao/BaseDao");
const constants = require("../../constants");
const countrySchema = require("./countriesModel");
let folderName = process.env.generalFolderName;
const moduleConst = require("./countriesConstants");
const resHndlr = require("../../handlers/responseHandler");

/**
 *  create()
 * * Create Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  let Country = global['writeUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesDao = new BaseDao(Country);

  let CountryRead = global['readUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesReadDao = new BaseDao(CountryRead);

  let details = req.body;
  let query = {
    name: {
      $regex: details.name,
      $options: "i",
    },
    isDeleted: false,
  };
  let result = await countriesReadDao.findOne(query);
  if (result) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.alreadyExists, {});
  } else {
    let reponseImg = "";
    if (!req.files || req.files == null) {
      return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.flagRequired, {});
    } else {
      let filemimetype = req.files.flag.mimetype;
      let filetype = filemimetype.split("/");
      let imageSize = req.files.flag.size;
      // first we check type
      if (filetype[0] != "image") {
        return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.flagShouldBeImage, {});
      }
      if (imageSize > process.env.flag_max_size_bytes) {
        // flage size maximum 2000 bytes
        return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.flagSize, {});
      }
      reponseImg = await imageUpload.uploadDocs(req.files.flag, folderName);
    }
    details.flag = reponseImg.Location;
    details.createdOn = new Date().getTime();
    let obj = new Country(details);

    let createdData = await countriesDao.create(obj);
    if (!createdData) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.createIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.createdSuccess, createdData);
    }
  }
}

/**
 *  getDetails()
 * * Get Country details to View or Edit - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getDetails(req, res) {

  let CountryRead = global['readUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesReadDao = new BaseDao(CountryRead);

  let { id } = req.params;

  let query = {
    _id: id,
  };
  let result = await countriesReadDao.findOne(query);
  if (result) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, result);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  }
}

/**
 *  updateDetails()
 * * update Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function updateDetails(req, res) {
  let Country = global['writeUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesDao = new BaseDao(Country);

  let CountryRead = global['readUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesReadDao = new BaseDao(CountryRead);

  let { id } = req.params;
  let details = req.body;

  let query = {
    _id: id,
  };

  let result = await countriesReadDao.findOne(query);
  if (!result) {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    if (result.name !== req.body.name) {
      let checkQuery = {
        name: {
          $regex: req.body.name,
          $options: "i",
        },
        _id: { $ne: ObjectId(result._id) },
        isDeleted: false,
      };

      let checkData = await countriesReadDao.findOne(checkQuery);
      if (checkData) {
        return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.alreadyExists, {});
      }
    }
    let reponseImg = "";
    if (req.files && req.files != null) {
      let filemimetype = req.files.flag.mimetype;
      let filetype = filemimetype.split("/");
      let imageSize = req.files.flag.size;
      // first we check type
      if (filetype[0] != "image") {
        return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.flagShouldBeImage, {});
      }
      if (imageSize > process.env.flag_max_size_bytes) {
        // flage size maximum 2000 bytes
        return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.flagSize, {});
      }
      reponseImg = await imageUpload.uploadDocs(req.files.flag, folderName);
      details.flag = reponseImg.Location;
    }

    details.updatedOn = new Date().getTime();
    let update = {};
    update["$set"] = details;

    let options = {
      new: true,
    };

    let updatedData = await countriesDao.update(query, update, options);
    if (!updatedData) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.updateIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.updatedSuccess, updatedData);
    }
  }
}

/**
 *  deleteDetails()
 * * Delete Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function deleteDetails(req, res) {
  let Country = global['writeUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesDao = new BaseDao(Country);

  let CountryRead = global['readUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesReadDao = new BaseDao(CountryRead);

  let { id } = req.params;

  let query = {
    _id: id,
  };
  let data = await countriesReadDao.findOne(query);
  if (!data) {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    data.isDeleted = true;
    data.updatedOn = new Date().getTime();
    let update = {};
    update["$set"] = data;

    let options = {
      new: true,
    };
    let updatedDetails = await countriesDao.update(query, update, options);
    if (!updatedDetails) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.deleteIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.deletedSuccess, {});
    }
  }
}

/**
 *  getAll()
 * * Get All Country - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getAll(req, res) {

  let CountryRead = global['readUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesReadDao = new BaseDao(CountryRead);

  let queryParams = req.query;
  let query = {
    isDeleted: false,
  };

  let data = await countriesReadDao.find(query);
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
 *  getAllCountryDailCode()
 * * Get All Country Dail Code from - ADMINPANEL
 * @param {*} req
 * @param {*} res
 */
async function getAllCountryDailCode(req, res) {

  let CountryRead = global['readUserConnection'].model(constants.DB_MODEL_REF.COUNTRIES, countrySchema);
  let countriesReadDao = new BaseDao(CountryRead);

  let projection = {
    _id: 0,
    callingCode: 1
  }

  let daileCodeList = await countriesReadDao.find({}, projection);
  if (daileCodeList.length) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, daileCodeList);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, null);
  }
}

module.exports = {
  create,
  getDetails,
  updateDetails,
  deleteDetails,
  getAll,
  getAllCountryDailCode,
};
