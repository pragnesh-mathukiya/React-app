/*#################################            Load modules start            ########################################### */

const router = require("express").Router();
const responseHandler = require("../../handlers/responseHandler");
const constants = require("../../constants");

router.route("/getEnvironments").get((req, res) => {
  let obj = {
    appName: process.env.appName,
    userBaseURL: process.env.userBaseURL,
    adminBaseURL: process.env.adminBaseURL,
    commonBaseURL: process.env.commonBaseURL,
    flag_max_size_kb: process.env.flag_max_size_kb,
    flag_max_size_bytes: process.env.flag_max_size_bytes,
    image_max_size_mb: process.env.image_max_size_mb,
    image_max_size_bytes: process.env.image_max_size_bytes,
  };
  res.send(
    responseHandler.responseMappingWithData(
      constants.CODE.Success,
      constants.MESSAGE.Success,
      obj
    )
  );
});

module.exports = router;
