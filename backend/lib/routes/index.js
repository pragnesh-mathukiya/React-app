// Load user routes
const userBaseURL = process.env.userBaseURL;
const adminBaseURL = process.env.adminBaseURL;
const commonBaseURL = process.env.commonBaseURL;
const adminService = require("../modules/admin/adminService")
const admRouter = require("../modules/admin/adminRoute");
const commonRouter = require("../modules/common");
const emailManagementRouter = require("../modules/emailManagement/emailManagementRoute");
const cmsManagementRouter = require("../modules/cms/cmsRoute");
const userRouter = require("../modules/admin/user/userRoute");
const faqRouter = require("../modules/faqs/faqsRoute");
const countryRouter = require("../modules/countries/countriesRoute");
const contactUsRouter = require("../modules/contactUs/contactUsRoute");
const roleRouter = require("../modules/role/roleRoute");
const configRouter = require("../modules/config/configRoute");
const smsManagementRouter = require("../modules/smsManagement/smsManagementRoute");
const cmsService = require("../modules/cms/cmsService");
const dashboardRoute = require("../modules/dashboard/dashboardRoute");

//For Swagger API
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../../swagger.json");

//========================== Load Modules End ==============================================

module.exports = function (app) {
  adminService.createAdmin();
  app.get("/", (req, res) => {
    res.sendStatus(200);
  });
  app.use(adminBaseURL, admRouter);
  app.use(commonBaseURL, commonRouter);

  // For adminPanel API
  app.use(`${adminBaseURL}/emailManagement`, emailManagementRouter);
  app.use(`${adminBaseURL}/cms`, cmsManagementRouter);
  app.use(`${adminBaseURL}/user`, userRouter);
  app.use(`${adminBaseURL}/faqs`, faqRouter);
  app.use(`${adminBaseURL}/countries`, countryRouter);
  app.use(`${adminBaseURL}/contactUs`, contactUsRouter);
  app.use(`${adminBaseURL}/role`, roleRouter);
  app.use(`${adminBaseURL}/config`, configRouter);
  app.use(`${adminBaseURL}/smsManagement`, smsManagementRouter);
  app.use(`${adminBaseURL}/dashboard`, dashboardRoute);

  // For User side API
  app.use(`${userBaseURL}/faqs`, faqRouter);
  app.use(`${userBaseURL}/contactUs`, contactUsRouter);

  // For user and minting Website
  app.use(`${commonBaseURL}`, faqRouter);
  app.use(`${commonBaseURL}`, cmsManagementRouter);
  app.use(`${commonBaseURL}`, contactUsRouter);


  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/terms-and-conditions", async (req, res) => {
    let content = await cmsService.getCMSDetails(
      process.env.termsAndConditionTitle
    );
    res.render("tearms-and-conditions", {
      appName: process.env.appName,
      pageName: process.env.termAndConditionPageName,
      content: content,
    });
  });

  app.get("/privacy-policy", async (req, res) => {
    let content = await cmsService.getCMSDetails(
      process.env.privacyPolicyTitle
    );
    res.render("privacy-policy", {
      appName: process.env.appName,
      pageName: process.env.privacyPolicyPageName,
      content: content,
    });
  });
};
