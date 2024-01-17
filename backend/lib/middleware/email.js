require("dotenv").config;
const nodemailer = require("nodemailer");
const constants = require("../constants");
const configService = require("../modules/config/configService");

const EMAIL_CONST = {
  email: process.env.smtpEmail,
  password: process.env.smtpPassword,
  host: process.env.smtpHost,
  port: process.env.smtpPort,
};

const projectName = process.env.appName;

async function getTemplateData(templateDetails) {
  let BaseDao = require("../dao/BaseDao");
  const emailSchema = require("../modules/emailManagement/emailManagementModel");
  let templateRead = global['readUserConnection'].model(constants.DB_MODEL_REF.EMAILTEMPLATES, emailSchema);
  let templateReadDao = new BaseDao(templateRead);

  let mailQuery = templateDetails;
  mailQuery.status = constants.STATUS.ACTIVE;
  return await templateReadDao.findOne(mailQuery);
}

async function sendEmail(mailOptions) {
  let configDetail = await configService.getConfig();

  if (configDetail && configDetail.data && configDetail.data.email) {
    let emailConfig = configDetail.data.email;

    let EMAIL_CONFIG = {
      pool: true,
      host: emailConfig.smtpHost,
      port: emailConfig.smtpPort,
      secure: true,
      service: 'gmail',
      auth: {
        user: emailConfig.smtpEmail, // generated ethereal user
        pass: emailConfig.smtpPassword, // generated ethereal password
      },
    };

    let transporter = nodemailer.createTransport(EMAIL_CONFIG);
    return await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error In Send Email: ", error)
        return error;
      } else {
        console.log("Send Email");
        return json({
          message: "Send mail",
        });
      }
    });
  } else {
    return "";
  }
}

/**
 * [createMailOption preparing a mail option model]
 * @param  {[type]} subject [subject of the mail]
 * @param  {[type]} html    [html content]
 * @param  {[type]} toMail  [reciever of the mail]
 * @return {[type]}         [object]
 */
function createMailOption(subject, html, toMail, sender) {
  let mailOptions = {
    from: sender, // sender address
    to: toMail, // list of receivers
    subject: projectName + " - " + subject, // Subject line
    text: projectName, // plain text body
    html: html, // html body
  };
  return mailOptions;
}

function value(cn) {
  return cn.replace(/\${(\w+)}/, "$1");
}
async function sending_logic(mailBodyDetails, templateDetails) {
  if (templateDetails && Object.keys(templateDetails).length > 0) {
    let mailBody = templateDetails.mailBody;
    let idx = mailBody.match(new RegExp(/\${\w+}/g));
    if (idx && idx.length > 0) {
      idx.map((val, id) => {
        mailBody = mailBody.replace(
          /\${(\w+)}/,
          mailBodyDetails[value(idx[id])]
        );
        return val;
      });
    }
    mailBody = mailBody.replace(/{fullName}/gi, mailBodyDetails.fullName);
    mailBody = mailBody.replace(/{message}/gi, mailBodyDetails.message);
    let returnedValue = await createMailOption(
      templateDetails.mailSubject,
      mailBody,
      mailBodyDetails.email,
      EMAIL_CONST.email
    );
    return sendEmail(returnedValue);
  } else {
    return true;
  }
}

async function SEND_MAIL(mailBodyDetails, templateObj) {
  if (process.env.nodeEnv == "dev" || process.env.nodeEnv == "prod" || process.env.nodeEnv == "production") {
    let templateDetails = await getTemplateData(templateObj);
    if (templateDetails) {
      return sending_logic(mailBodyDetails, templateDetails);
    } else {
      console.log("Template not found. Mail not sent..!");
    }
  }
  return true; // do not send mail when working in local
}
module.exports = {
  SEND_MAIL,
};
