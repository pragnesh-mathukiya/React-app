const configService = require("../modules/config/configService");
/**
 * Send Sms to user
 * @param user user details
 * @param content sms content
 */
async function sendSMS(mobileObj, content) {
  let mobile = mobileObj ? mobileObj.dailCode + "_" + mobileObj.mobileNo : "";
  if (mobile != "") {
    let configDetail = await configService.getConfig();

    if (configDetail && configDetail.data && configDetail.data.sms) {
      let smsConfig = configDetail.data.sms;

      const client = require("twilio")(
        smsConfig.smsAccountSid,
        smsConfig.smsAuthToken
      );

      if (process.env.whiteListMobileSendSMS == 'true') {
        let userMobile = [];
        let found = false;
        found = userMobile.find(function (mobile_no) {
          return mobile_no == mobile;
        });

        if (found) {
          return "Success";
        }
      }

      return client.messages.create({
        body: content,
        from: smsConfig.smsFrom,
        to: mobile,
      }).then(async (message) => {
        return message.sid;
      }).catch(async (err) => {
        console.log("Some error", err);
        return "";
      });

    } else {
      return "";
    }
  } else {
    return "";
  }
}

module.exports = {
  sendSMS,
};
