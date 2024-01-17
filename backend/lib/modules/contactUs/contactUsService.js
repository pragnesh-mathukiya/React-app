const constants = require("../../constants");
const mailHandler = require("../../middleware/email");
let BaseDao = require("../../dao/BaseDao");
const contactUsSchema = require("./contactUsModel");
const resHndlr = require("../../handlers/responseHandler");
const moduleConst = require("./contactUsConstants");

/**
 *  create()
 * * Send CONTACT US  - Minting
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  let contactUs = global['writeUserConnection'].model(constants.DB_MODEL_REF.CONTACTUS, contactUsSchema);
  let contactUsDao = new BaseDao(contactUs);

  let details = req.body;
  details.createdOn = new Date().getTime();
  details.isResolved = false;
  // let obj = new CONTACTUS(details);

  let createdData = await contactUsDao.save(details);
  if (!createdData) {
    return resHndlr.requestResponse(constants.CODE.INTRNLSRVR, moduleConst.MESSAGE.createIssue, {});
  } else {
    // let mailQuery = {
    //   type: constants.TEMPLATE_TYPES.EMAIL,
    //   status: constants.STATUS.ACTIVE,
    //   mailName: constants.EMAIL_TEMPLATES.CONTACT_US_QUERY,
    // };
    // let adminObj = {
    //   fullName: createdData.name,
    //   email: process.env.supportEmailId,
    //   message: createdData.message,
    // };
    // let mailSent = await mailHandler.SEND_MAIL(adminObj, mailQuery);

    return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.createdSuccess, createdData);
  }
}

/**
 *  get()
 * * Get All CONTACT US List  - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function getAll(req, res) {
  let contactUsRead = global['readUserConnection'].model(constants.DB_MODEL_REF.CONTACTUS, contactUsSchema);
  let contactUsReadDao = new BaseDao(contactUsRead);

  let queryParams = req.query;

  let query = {};
  query["isDeleted"] = false;
  if (queryParams.search) {
    query["$or"] = [
      { email: { $regex: queryParams.search, $options: "i" } },
      { name: { $regex: queryParams.search, $options: "i" } },
      { message: { $regex: queryParams.search, $options: "i" } },
    ];
  }

  let filterStartDate = req.query.searchStartDate && req.query.searchStartDate != 'undefined' ? req.query.searchStartDate : "";
  let filterEndDate = req.query.searchEndDate && req.query.searchEndDate != 'undefined' ? req.query.searchEndDate : "";

  if (filterStartDate && filterEndDate) {
    // start date and end date get
    let startDate = new Date(filterStartDate + "T00:00:00.000Z").getTime();
    let endDate = new Date(filterEndDate + "T23:59:59.000Z").getTime();

    query["createdOn"] = { $gte: startDate, $lte: endDate }
  }

  let total = await contactUsReadDao.count(query);

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
        message: 1,
        status: 1,
        platform: 1,
        isDeleted: 1,
        createdOn: 1,
        updatedOn: 1,
        isResolved: 1,
      },
    },
  ];

  return contactUsReadDao.aggregate(aggregateQuery).then((data) => {
    let respObj = {
      recordsTotal: total,
      recordsFiltered: data.length,
      records: data,
    };

    return resHndlr.requestResponse(constants.CODE.Success, constants.MESSAGE.Success, respObj);
  });
}

/**
 *  updateInquiry()
 * * Update Contact Us Inquiry - adminPanel
 * @param {*} req
 * @param {*} res
 */
async function updateInquiry(req, res) {
  let contactUs = global['writeUserConnection'].model(constants.DB_MODEL_REF.CONTACTUS, contactUsSchema);
  let contactUsDao = new BaseDao(contactUs);

  let { id } = req.params;
  let isResolved = req.body.isResolved;

  let query = {
    _id: id,
    isDeleted: false,
  };

  let update = {
    $set: {
      isResolved: isResolved,
      updatedOn: new Date()
    }
  };

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

  let updatedData = await contactUsDao.findOneAndUpdate(query, update, options)
  if (updatedData) {
    return resHndlr.requestResponse(constants.CODE.Success, moduleConst.MESSAGE.inquiryResolved, updatedData);
  } else {
    return resHndlr.requestResponse(constants.CODE.DataNotFound, constants.MESSAGE.dataNotFound, null);
    return 1;
  }
}

module.exports = {
  create,
  getAll,
  updateInquiry,
};
