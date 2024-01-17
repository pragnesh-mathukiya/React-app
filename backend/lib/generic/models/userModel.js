const mongoose = require("mongoose");
const constants = require("../../constants");
userSchema = module.exports = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, lowercase: true },
    password: { type: String },
    profilePicture: { type: String, default: null },
    country: {
      type: mongoose.Types.ObjectId,
      ref: constants.DB_MODEL_REF.COUNTRIES,
    },
    profileId: { type: String },
    // contactNumber: { type: String },
    isVerified: { type: Boolean, default: false },
    walletAddress: { type: String, default: "" },
    dob: { type: String },
    // anniversaryDate: { type: String, default: null },
    // specialEventDate: { type: String, default: null },
    specialDates: [
      {
        label: { type: String },
        date: { type: String }
      }
    ],
    gender: {
      type: String,
      enum: [
        constants.GENDER.MALE,
        constants.GENDER.FEMALE,
        constants.GENDER.OTHER,
      ],
      default: constants.VERIFICATION_STATUS.MALE,
    },
    passwordToken: { type: String, default: null },
    status: {
      type: String,
      enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
      default: constants.STATUS.ACTIVE,
    },
    loginActivity: [
      {
        date: { type: Number },
        device: { type: String },
        browser: { type: String },
        ipaddress: { type: String },
        country: { type: String },
        state: { type: String },
        isLoggedOut: { type: Boolean, default: false },
        loggedOutAt: { type: Number },
        status: {
          type: String,
          enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
          default: constants.STATUS.ACTIVE,
        },
      },
    ],
    blockUser: [
      { type: mongoose.Types.ObjectId, ref: constants.DB_MODEL_REF.USERS },
    ],

    createdOn: { type: Date },
    updatedOn: { type: Date },
    isDeleted: { type: Boolean, default: false },
    deleteDetails: {
      deleteRequestStatus: { type: Boolean, default: false },
      deletedBy: {
        type: mongoose.Types.ObjectId,
        enum: [constants.deleteBy.USER, constants.deleteBy.ADMIN],
      },
      deleteReason: { type: String },
      deletedDate: { type: Date },
    },
    roleId: { type: Number },
    device: { type: String },
    deviceType: { type: String },
    accessToken: { type: String },
    fcmToken: { type: String },
    platform: {
      type: String,
      enum: [constants.PLATFORMTYPE.ANDROID, constants.PLATFORMTYPE.IOS],
      default: constants.PLATFORMTYPE.ANDROID,
    },
    permissions: [],
    userName: { type: String },
    bio: { type: String },
    location: {
      country: { type: String, default: null },
      state: { type: String, default: null },
      city: { type: String, default: null },
      address: { type: String, default: "" },
      type: { type: String, default: "Point" },
      coordinates: [] // list the longitude first, and then latitude.
    },
    otpDetails: {
      otp: { type: String },
      otpTime: { type: Number, default: 0 },
      otpCounter: { type: Number, default: 0 },
    },
    mobileDetails: {
      mobileNo: { type: String },
      dailCode: { type: String },
    },
    myConnections: [
      {
        connectionId: { type: mongoose.Types.ObjectId },
        connectionType: {
          type: String,
          enum: [
            constants.connectionTypes.NONE,
            constants.connectionTypes.NEW,
            constants.connectionTypes.REQUEST,
            constants.connectionTypes.REQUESTED,
            constants.connectionTypes.FRIEND,
            constants.connectionTypes.CLOSEFRIEND,
          ],
        },
      },
    ],
    isPrivateAccount: { type: Boolean, default: false },
    isNotification: { type: Boolean, default: true },
    isDailyJournal: { type: Boolean, default: true },
    isReminder: { type: Boolean, default: false },
    streaks: {
      onePostPerDay: { type: Number, default: 0 },
      fivePostPerDay: { type: Number, default: 0 }
    },
    badge: [
      {
        badgeId: { type: mongoose.Types.ObjectId, ref: constants.DB_MODEL_REF.BADGE },
        achievedDate: { type: Date }
      }],
    isReminderDate: { type: Date, default: new Date() },
    onlineNotiDate: { type: Date },
    custPaymentId: {
      stripId: { type: String, default: null },
      paypalId: { type: String, default: null },
    }
  },
  {
    timeStamp: true,
  }
);
