/*#################################            Load modules start            ########################################### */

const mongoose = require("mongoose");
const constants = require("../../constants");
var Schema = mongoose.Schema;

/*#################################            Load modules end            ########################################### */

emailSchema = module.exports = new Schema(
  {
    type: {
      type: String,
      enum: [
        constants.TEMPLATE_TYPES.EMAIL,
        constants.TEMPLATE_TYPES.NOTIFICATION,
        constants.TEMPLATE_TYPES.BELL_NOTIFICATION,
      ],
    },
    mailName: {
      type: String,
      required: true,
      enum: [
        constants.EMAIL_TEMPLATES.NEW_VERIFICATION_CODE,
        constants.EMAIL_TEMPLATES.LOGIN,
        constants.EMAIL_TEMPLATES.USER_FORGOT_PASSWORD,
        constants.EMAIL_TEMPLATES.USER_RESET_PASSWORD,
        constants.EMAIL_TEMPLATES.CHANGE_EMAIL_ADDRESS,
        constants.EMAIL_TEMPLATES.NEW_SUPPORT_TICKET,
        constants.EMAIL_TEMPLATES.SUPPORT_TICKET_STATUS_CHANGE,
        constants.EMAIL_TEMPLATES.NOTIFY_CONTACT_NUMBER_CHANGE_REQUEST,
        constants.EMAIL_TEMPLATES.NOTIFY_SMS_VERIFICATION_CODE,
        constants.EMAIL_TEMPLATES.NOTIFY_FOR_NEW_USER_CREATED,
        constants.EMAIL_TEMPLATES.TWO_FACTOR_AUTHENTICATION_ENABLED,
        constants.EMAIL_TEMPLATES.TWO_FACTOR_AUTHENTICATION_DISABLED,
        constants.EMAIL_TEMPLATES.INVITE_FRIENDS,
        constants.EMAIL_TEMPLATES.NEW_USER_CREATED_BY_ADMIN,
        constants.EMAIL_TEMPLATES.NEW_PROJECT_CREATED,
        constants.EMAIL_TEMPLATES.NEW_JOIN_REQUEST,
        constants.EMAIL_TEMPLATES.JOIN_REQUEST_APPROVED,
        constants.EMAIL_TEMPLATES.JOIN_REQUEST_REJECTED,
        constants.EMAIL_TEMPLATES.PROJECT_APPROVED_BY_ADMIN,
        constants.EMAIL_TEMPLATES.PROJECT_REJECTED_BY_ADMIN,
        constants.EMAIL_TEMPLATES.NOTIFY_PROJECT_APPROVED_BY_ADMIN,
        constants.EMAIL_TEMPLATES.NOTIFY_PROJECT_REJECTED_BY_ADMIN,
        constants.EMAIL_TEMPLATES.NOTIFY_BONUS_RECEIVED,
        constants.EMAIL_TEMPLATES.NOTIFY_PAYMENT_RECEIVED,
        constants.EMAIL_TEMPLATES.NOTIFY_NEW_DISPUTE,
        constants.EMAIL_TEMPLATES.NOTIFY_UPDATE_PROJECT,
        constants.EMAIL_TEMPLATES.NOTIFY_NEW_MESSAGE,
        constants.EMAIL_TEMPLATES.INVITE_OBSERVER,
        constants.EMAIL_TEMPLATES.NOTIFY_USER_COMMENT,
        ,
        constants.EMAIL_TEMPLATES.NOTIFY_USER_MENTIONED_COMMENT,
        constants.EMAIL_TEMPLATES.NOTIFY_OBSERVER_REMOVE_PACKAGE,
        constants.EMAIL_TEMPLATES.NOTIFY_COLLABORATOR_REVISION,
        constants.EMAIL_TEMPLATES.NOTIFY_INITIATOR_ACCEPT_REQUEST,
        constants.EMAIL_TEMPLATES.NOTIFY_INITIATOR_REJECT_REQUEST,

        constants.EMAIL_TEMPLATES.USER_EMAIL_VERIFICATION_MAIL,
        constants.EMAIL_TEMPLATES.USER_EMAIL_VERIFICATION_MAIL_FORGOT_PASSWORD,
        constants.EMAIL_TEMPLATES.USER_CHANGED_PASSWORD,
        constants.EMAIL_TEMPLATES.USER_RESET_PASSWORD,
        constants.EMAIL_TEMPLATES.ADMIN_FORGOT_PASSWORD,
        constants.EMAIL_TEMPLATES.ADMIN_RESET_PASSWORD,
        constants.EMAIL_TEMPLATES.ADMIN_CHANGE_PASSWORD,
        constants.EMAIL_TEMPLATES.USER_NEW_REGISTER_WELCOME,
        constants.EMAIL_TEMPLATES.NEW_ADMIN_CREATED_BY_SUPERADMIN,
        constants.EMAIL_TEMPLATES.CONTACT_US_QUERY,
      ],
    },
    mailTitle: {
      type: String,
      required: function () {
        return this.type == constants.TEMPLATE_TYPES.EMAIL ? true : false;
      },
    },
    mailBody: {
      type: String,
      required: function () {
        return this.type == constants.TEMPLATE_TYPES.EMAIL ? true : false;
      },
    },
    mailSubject: {
      type: String,
      required: function () {
        return this.type == constants.TEMPLATE_TYPES.EMAIL ? true : false;
      },
    },
    notificationMessage: {
      type: String,
      required: function () {
        return this.type == constants.TEMPLATE_TYPES.NOTIFICATION
          ? true
          : false;
      },
    },
    createdOn: { type: Number },
    updatedOn: { type: Number },
    status: {
      type: String,
      enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
      default: constants.STATUS.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model(
//   constants.DB_MODEL_REF.EMAILTEMPLATES,
//   emailSchema
// );
