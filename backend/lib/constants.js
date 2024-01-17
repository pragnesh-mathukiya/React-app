const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  INPROCESS: "inprocess",
  DONE: "done",
};

const PLATFORMTYPE = {
  ANDROID: "android",
  IOS: "ios"
}

const SUPPORT_TICKET_STATUS = {
  OPEN: "OPEN",
  COMPLETED: "COMPLETED",
  INPROGRESS: "INPROGRESS",
};

const DELIVERY_STATUS = {
  DELIVERED: "DELIVERED",
  REVISION: "REVISION",
  COMPLETED: "COMPLETED",
};

const PLATFORM = {
  MINT: "mint",
  WEB: "web",
  MOBILE: "mobile",
};

const DB_MODEL_REF = {
  USERS: "users",
  ADMINS: "admins",
  EMAILTEMPLATES: "emailtemplates",
  CMS_PAGES: "cmspages",
  CONTACTUS: "contactUs",
  NOTIFICATIONS: "notifications",
  SUPPORT_TICKETS: "supporttickets",
  THIRD_PARTY_SERVICE: "thirdpartyservices",
  PROJECTS: "projects",
  FREQUENTLY_ASK_QUESTION: "faqs",
  CHATS: "chats",
  COUNTRIES: "countries",
  CLUBS: "clubs",

  SMART_CONTRACT: "smartcontract",
  RARITY: "rarities",
  WHITELISTED_ADDRESS: "whitelistedaddresses",
  SETTINGS: "settings",
  ROLE: "roles",
  PERMISSION: "permissions",
  CONFIG: "configs",
  USERTEMP: "usertemps",
  SMSTEMPLATES: "smstemplates",
  BADGE: "badge",
  REPORT: "report",
  VIDEOS: "videos",
  REACTIONS: "reactions",
  EVENTVIDEOS: "eventvideos",
  PUSHNOTIFICATION: "pushnotifications",
  COMMENTS: "comments",
  HASHTAG: "hashtags",
  PAYMENT: "payments",
  BOOKMARK: "bookmark",
  CRONSTASTICS: 'crontStastics'
};

const CMS = {
  ABOUTUS: "ABOUTUS",
  FEATURES: "FEATURES",
  CONTACTUS: "CONTACTUS",
  TEAM: "TEAM",
  TERMSANDCONDITIONS: "TERMSANDCONDITIONS",
  PRIVACYPOLICY: "PRIVACYPOLICY",
  FAQ: "FAQ",
  FOOTERLINKS: "FOOTERLINKS",
};

const CODE = {
  Success: 200,
  FRBDN: 403,
  INTRNLSRVR: 500,
  DataNotFound: 404,
  BadRequest: 400,
  ReqTimeOut: 408,
  UnAuthorized: 401,
};

const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Not Specified",
};

const EMAIL_TEMPLATES = {
  // USER_EMAIL_VERIFICATION_MAIL: "Email verification link for user",
  // USER_EMAIL_VERIFICATION_MAIL_FORGOT_PASSWORD:
  //   "Email verification link for user forgot password",
  // USER_CHANGED_PASSWORD: "User Change password",
  // USER_RESET_PASSWORD: "User Reset password",
  ADMIN_FORGOT_PASSWORD: "Admin Forgot Password",
  ADMIN_RESET_PASSWORD: "Admin Reset password",
  ADMIN_CHANGE_PASSWORD: "Admin Change Password",
  // USER_NEW_REGISTER_WELCOME: "Welcome mail",
  NEW_ADMIN_CREATED_BY_SUPERADMIN: "Welcome new admin created by super admin",
  CONTACT_US_QUERY: "Contact us",
  // TEST_EMAIL: "Test email",
};

const TEMPLATE_ENTITIES = [
  {
    templateName: "Test email",
    templateEntities: ["fullName", "verificationLink"],
  },
  {
    templateName: "Email verification link for user",
    templateEntities: ["fullName", "verificationLink"],
  },
  {
    templateName: "Email verification link for user forgot password",
    templateEntities: ["fullName", "verificationLink"],
  },
  {
    templateName: "User Change password",
    templateEntities: ["fullName"],
  },
  {
    templateName: "User Reset password",
    templateEntities: ["fullName"],
  },
  {
    templateName: "Admin Forgot Password",
    templateEntities: ["fullName", "passwordToken"],
  },
  {
    templateName: "Admin Reset password",
    templateEntities: ["fullName"],
  },
  {
    templateName: "Admin Change Password",
    templateEntities: ["fullName"],
  },
  {
    templateName: "Welcome mail",
    templateEntities: ["fullName"],
  },
  {
    templateName: "Welcome new admin created by super admin",
    templateEntities: ["fullName", "email", "password"],
  },
  {
    templateName: "Contact us",
    templateEntities: ["fullName", "email", "message"],
  },
];

const TEMPLATE_TYPES = {
  EMAIL: "EMAIL",
  NOTIFICATION: "NOTIFICATION",
  BELL_NOTIFICATION: "BELL_NOTIFICATION",
  SMS: "SMS",
};

const FOOTERLINKS = {
  Facebook: "Facebook",
  Twitter: "Twitter",
  LinkedIn: "LinkedIn",
  Instagram: "Instagram",
  YouTube: "YouTube",
  Telegram: "Telegram",
};

const THIRD_PARTY_SERVICES = {
  MAIL_GATEWAY: "MAIL_GATEWAY",
  SMS_GATEWAY: "SMS_GATEWAY",
  PAYMENT_GATEWAY: "PAYMENT_GATEWAY",
};

const VERIFICATION_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

const PACKAGE_WORK_STATUS = {
  OPEN: "OPEN", // when package is created
  INPROGRESS: "INPROGRESS", // when any 1st collaborator starts work
  EXPIRED: "EXPIRED", // when submission is delayed
  COMPLETED: "COMPLETED", // when all user's submissions are approved
  DELIVERED: "DELIVERED", // when all user's have submitted their code and it is under review
  SUBMITTED: "SUBMITTED",
};

const USER_WORK_STATUS = {
  INPROGRESS: "INPROGRESS", // when any collaborator starts work
  SUBMITTED: "SUBMITTED", // when collaborator submits his/her work (individually)
  SUBMISSION_APPROVED: "SUBMISSION_APPROVED", // whole package submission approved
  SUBMISSION_REJECTED: "SUBMISSION_REJECTED", // whole package submission rejected
  SUBMISSION_REVISON: "SUBMISSION_REVISON",
};

const PROJECT_STATUS = {
  OPEN: "OPEN", // when project is created and ongoing
  COMPLETED: "COMPLETED", // when all packages are submitted and approved
  CLOSE: "CLOSE", // when project is closed and payment is also done
  INPROGRESS: "INPROGRESS", // when any package is in progress
};

const MASTER_TYPES = {
  PROJECT_TYPES: "Project Types",
  ISSUE_TYPES: "Issue Types",
  COLLABORATOR_LEVEL: "Collaborator Levels",
  SKILLS: "Skills",
  PROJECT_CATEGORY: "Project Categories",
  BLOCKCHAIN_NETWORK: "Blockchain Networks",
  OBSERVERS_ROLE: "Observers Roles",
  CARD_TYPES: "Card Types",
  REJECT_REASONS: "Reject reasons",
};

const FAQ_CATEGORIES = {
  GENERAL_QUESTION: "General Question",
  FANTACY_SPECIFIC_QUESTION: "Fantasy Specific Questions",
};

const NOTIFICATION_CATEGORIES = {
  PROJECT: "PROJECT",
  PAYMENT: "PAYMENT",
  CHAT: "CHAT",
  SUPPORT_TICKET: "SUPPORT_TICKET",
  CARD_COMMENT: "CARD_COMMENT",
  REVISION: "REVISION",
  PACKAGE_REQUEST: "PACKAGE_REQUEST",
};

const MESSAGE_TYPES = {
  TEXT: "TEXT",
  FILE: "FILE",
};

const MARK_AS_COMPLETED_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
};

let messages = {
  Success: "Get details successfully",
  TOKEN_NOT_PROVIDED:
    "Your login session seems to be expired. Please login again",
  internalServerError: "Internal server error. Please try after some time",
  InvalidCredentials:
    "An account with the provided details does not exist. Please try again with valid details",
  InvalidDetails: "Please provide valid details",
  statusTrue: true,
  statusFalse: false,
  dataNotFound: "Data not found",
  userNotFound: "User not found.",
  passwordMismatch: "Password mismatch",
  linkExpired: "Link expired",
  userInactive: "User is inactive.",
  userNotVerified: "User is not verified.",
  emailSended: "Check your mail to reset your password.",
  logoutSuccessfully: "Logout successfully",
  unAuthAccess: "Unauthorized access ",
  verifiedSuccessfully: "Verified Successfully",
  fileNotFound: "File not found.",
  emailCantEmpty: "Please enter Email Address",
  nameCantEmpty: "Please enter Name",
  passCantEmpty: "Password can't be empty",
  contactCantEmpty: "Please enter Contact number",
  passTokenCantEmpty: "Password token can't be empty",
  invalidPassword: "Password invalid.",
  invalidEmail: "Please enter valid Email Address",
  invalidContact: "Please enter valid Contact Number",
  oldPassCantEmpty: "Old Password can't be empty",
  newPassCantEmpty: "New Password can't be empty",
  newPassCantEmpty: "New Password can't be empty",
  emptyId: "Please enter id.",
  emptyUserId: "Please enter userId.",
  invalidId: "Please enter valid id.",
  invalisUserId: "Please enter valid userId.",
  emptyClubId: "Please enter club id.",
  invalidClubId: "Please enter valid club id.",
  emptyCountryId: "Please enter country id.",
  invalidCountryId: "Please enter valid country id.",
  addressCantEmpty: "Wallet address cant be empty.",
  invalidAddress: "Invalid wallet address.",
  invalidToken: "Invalid access token.",
  resetPasswordLinkExpired: "Your reset password link seems to be expired",
  forgotPasswordIssue: "There is issue with generate token for password forgot",
  setPasswordIssue: "There is issue with set new Password",
  updatedSuccess: "Updated Successfully",
  logoutIssue: "There is issue with logout",
  dailCodeEmpty: "Please enter dailcode",
  invalidDailCode: "Please enter valid dailcode",
  mobileNoEmpaty: "Please enter mobile number",
  invalidMobileNo: "Please enter valid mobile number",
  pageNoEmpty: "Please enter page number",
  countEmpty: "Please enter count",
  userNotExists: "User does not exist"
};

const ACCOUNT_LEVEL = {
  SUPERADMIN: 1,
  ADMIN: 2,
  USER: 3,
};

const ACCOUNT_TYPE = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
};

const UPLOAD_TYPE = {
  VIDEO: "video",
  IMAGE: "image",
};

const IMAGE_TYPE = {
  png: "png",
  PNG: "PNG",
  jpg: "jpg",
  JPG: "JPG",
  jpeg: "jpeg",
  JPEG: "JPEG",
  GIF: "gif",
  SVG: "svg"
}
const COMMENT_TYPE = {
  COMMENT: "comment",
  REPLAY: "replay"
}

const NOTIFICATION_SEND = {
  SUCCESS: "Success",
  FAIL: "Fail"
}

const NOTIFICATION_MESSAGE = {
  DAILY_VIDEO_REMINDER_TITLE: "Reminder to post video",
  DAILY_VIDEO_REMINDER_DESCRIPTION: "Please upload a video for the day in app and see what your friends are up to!",
  EVENT_REMINDER_TITLE: "Event special",
  EVENT_REMINDER_DESCRIPTION: "Its {username}'s {eventName} today, post a video to surprise your buddy.",
  COMMENT_TITLE: "Comment notify",
  COMMENT_DESCRIPTION: "{userName} commented: {comment}.",
  REPLAY_TITLE: "Comment notify",
  REPLAY_DESCRIPTION: "{userName} commented: {comment}.",
  REACTION_TITLE: "Liked post",
  REACTION_DESCRIPTION: "{userName} liked your post.",
  FRIEND_REQUEST_TITLE: "New Request",
  FRIEND_REQUEST_DESCRIPTION: "{userName} requested to follow you.",
  TAG_IN_VIDEO_TITLE: "Tagged notify",
  TAG_IN_VIDEO_DESCRIPTION: "{userName} mentioned you in a video.",
  LIKE_COMMENT_TITLE: "Liked comment.",
  LIKE_COMMENT_DESCRIPTION: "{userName} liked your comment.",
  LIKE_COMMENT_REPLY_TITLE: "Liked comment",
  LIKE_COMMENT_REPLY_DESCRIPTION: "{userName} liked your comment.",
  ACCEPT_FRIEND_REQUEST_TITLE: "Request accepted",
  ACCEPT_FRIEND_REQUEST_DESCRIPTION: "{userName} is added to your friend connection.",
  USERS_ONLINE_NOTIFICATION_TITLE: "Tapcha Magic",
  USERS_ONLINE_NOTIFICATION_DESCRIPTION: "YAY! App users are online, upload your current status to connect them.",
}

const NOTIFICATION_ACTION = {
  CREATE_VIDEO: "createVideo",
  VIEW_REACTION: "viewReaction",
  VIEW_COMMENT: "viewComments",
  VIEW_REPLIES: "viewReplies",
  VIEW_VIDEO: "viewVideo",
  VIEW_REQUEST: "viewRequests",
  VIEW_CONNECTION: "viewConnections",
}

const NOTIFICATION_TYPE = {
  BIRTHDAY: "birthday",
  ANNIVERSARY: "anniversary",
  SPECIALEVENT: "specialEvent",
  DAILYPOST: "dailyPost",
  VIDEO_COMMENT: "videoComment",
  COMMENT_REPLY: "commentReply",
  VIDEO_REACTION: "videoReaction",
  FRIENDREQUEST: "friendRequest",
  VIDEO: "video",
  USERTAGGED: "userTagged",
};

const connectionTypes = {
  NEW: "newUser",
  NONE: "none",
  REQUEST: "request",
  FRIEND: "friend",
  CLOSEFRIEND: "closeFriend",
  DISCOVERY: "discovery",
  REQUESTED: "requested",
  CFMVIDEO: "cfmVideo",
  DMVIDEO: "dmVideo",
  BDVIDEO: "bdmVideo",
  ENTVIDEO: "emVideo"
};

const deleteBy = {
  USER: "user",
  ADMIN: "admin",
};


module.exports = Object.freeze({
  TOKEN_EXPIRATION_TIME: 24 * 60,
  DB_MODEL_REF,
  STATUS,
  SUPPORT_TICKET_STATUS,
  CMS,
  EMAIL_TEMPLATES,
  CODE,
  TEMPLATE_ENTITIES,
  TEMPLATE_TYPES,
  FOOTERLINKS,
  THIRD_PARTY_SERVICES,
  VERIFICATION_STATUS,
  PACKAGE_WORK_STATUS,
  PROJECT_STATUS,
  MASTER_TYPES,
  USER_WORK_STATUS,
  NOTIFICATION_CATEGORIES,
  MESSAGE_TYPES,
  MARK_AS_COMPLETED_STATUS,
  DELIVERY_STATUS,
  MESSAGE: messages,
  GENDER,
  ACCOUNT_LEVEL,
  ACCOUNT_TYPE,
  UPLOAD_TYPE,
  FAQ_CATEGORIES,
  PLATFORM,
  COMMENT_TYPE,
  NOTIFICATION_SEND,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_ACTION,
  NOTIFICATION_TYPE,
  PLATFORMTYPE,
  IMAGE_TYPE,
  connectionTypes,
  deleteBy,
});
