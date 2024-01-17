const mongoose = require("mongoose");
const constants = require("../../constants");
pushNotificationSchema = module.exports = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: constants.DB_MODEL_REF.USERS,
    // },
    // title: { type: String },
    // description: {
    //   type: String,
    // },
    notificationData: {
      type: Object,
    },
    // type: {
    //   type: String,
    //   enum: [
    //     constants.NOTIFICATION_TYPE.BIRTHDAY,
    //     constants.NOTIFICATION_TYPE.ANNIVERSARY,
    //     constants.NOTIFICATION_TYPE.SPECIALEVENT,
    //     constants.NOTIFICATION_TYPE.DAILYPOST,
    //     constants.NOTIFICATION_TYPE.VIDEO_COMMENT,
    //     constants.NOTIFICATION_TYPE.COMMENT_REPLY,
    //     constants.NOTIFICATION_TYPE.VIDEO_REACTION,
    //     constants.NOTIFICATION_TYPE.FRIENDREQUEST,
    //     constants.NOTIFICATION_TYPE.VIDEO
    //   ],
    // },
    // isSend: {
    //   type: String,
    //   enum: [
    //     constants.NOTIFICATION_SEND.SUCCESS,
    //     constants.NOTIFICATION_SEND.FAIL,
    //   ],
    // },
    // failerReason: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdOn: {
      type: Date,
      default: new Date(),
    },
    updatedOn: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timeStamp: true,
  }
);

// module.exports = mongoose.model(
//   constants.DB_MODEL_REF.PUSHNOTIFICATION,
//   pushNotificationSchema
// );
