var ObjectId = require("mongoose").Types.ObjectId;
const constants = require("../../constants");
let BaseDao = require("../../dao/BaseDao");
const faqSchema = require("./faqsModel");
const moduleConst = require("./faqsConstants");
const resHndlr = require("../../handlers/responseHandler");

/**
 * create()
 * Create FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  let faq = global['writeUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqDao = new BaseDao(faq);

  let faqRead = global['readUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqReadDao = new BaseDao(faqRead);

  let details = req.body;
  let query = {
    question: details.question,
    category: details.category,
    isDeleted: false,
  };
  let result = await faqReadDao.findOne(query);
  if (result) {
    return resHndlr.requestResponse(constants.CODE.BadRequest, moduleConst.MESSAGE.alreadyExists, {});
  } else {
    details.createdOn = new Date().getTime();
    let createdData = await faqDao.save(details);
    if (!createdData) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.createIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.createdSuccess, createdData);
    }
  }
}

/**
 * getDetails()
 * Get details to View or Edit FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getDetails(req, res) {

  let faqRead = global['readUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqReadDao = new BaseDao(faqRead);

  let { id } = req.params;
  let query = {
    _id: id,
  };
  let result = await faqReadDao.findOne(query);
  if (result) {
    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, result);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  }
}

/**
 * updateDetails()
 * Update FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function updateDetails(req, res) {
  let faq = global['writeUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqDao = new BaseDao(faq);

  let faqRead = global['readUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqReadDao = new BaseDao(faqRead);

  let { id } = req.params;
  let details = req.body;
  let query = {
    _id: ObjectId(id),
  };
  let result = await faqReadDao.findOne(query);
  if (!result) {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, moduleConst.MESSAGE.dataNotFound, {});
  } else {
    if (result.question !== req.body.question) {
      let checkQuery = {
        question: req.body.question,
        _id: { $ne: ObjectId(result._id) },
        category: req.body.category,
        isDeleted: false,
      };

      let checkData = await faqReadDao.findOne(checkQuery);
      if (checkData) {
        return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.alreadyExists, {});
      }
    }

    details.updatedOn = new Date().getTime();
    let update = {};
    update["$set"] = details;

    let options = {
      new: true,
    };

    let updatedData = await faqDao.update(query, update, options);
    if (!updatedData) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.updateIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.updatedSuccess, updatedData);
    }
  }
}

/**
 * deleteDetails()
 * Delete FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function deleteDetails(req, res) {
  let faq = global['writeUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqDao = new BaseDao(faq);

  let faqRead = global['readUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqReadDao = new BaseDao(faqRead);

  let { id } = req.params;
  let query = {
    _id: id,
  };
  let data = await faqReadDao.findOne(query);
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
    let updatedDetails = await faqDao.update(query, update, options);
    if (!updatedDetails) {
      return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.deleteIssue, {});
    } else {
      return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.deletedSuccess, {});
    }
  }
}

/**
 * getAll()
 * Get All FAQ - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAll(req, res) {

  let faqRead = global['readUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqReadDao = new BaseDao(faqRead);

  let queryParams = req.query;
  let query = {
    isDeleted: false,
  };
  let data = await faqReadDao.find(query);
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
 * getAllFAQs()
 * Get All FAQ for Minting , Web , User
 * ! Commented code not used but infuture used. If commented code uncomment after category wise data show.
 * @param {*} req
 * @param {*} res
 */
async function getAllFAQs(req, res) {

  let faqRead = global['readUserConnection'].model(constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION, faqSchema);
  let faqReadDao = new BaseDao(faqRead);

  let aggregateQuery = [
    {
      $match: {
        isDeleted: false,
        status: constants.STATUS.ACTIVE,
      },
    },
    {
      $project: {
        _id: 0,
        question: 1,
        answer: 1,
        // category: 1,
      },
    },
    // {
    //   $sort: {
    //     category: -1,
    //   },
    // },
    // {
    //   $group: {
    //     _id: "$category",
    //     faqs: { $push: "$$ROOT" },
    //     category: { $first: "$category" },
    //   },
    // },
    // {
    //   $sort: {
    //     category: -1,
    //   },
    // },
  ];

  let data = await faqReadDao.aggregate(aggregateQuery);
  return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, data);
}

module.exports = {
  create,
  getDetails,
  updateDetails,
  deleteDetails,
  getAll,
  getAllFAQs,
};
