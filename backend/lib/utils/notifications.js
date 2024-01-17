let FCM = require('fcm-node')
let serverKey = process.env.firebaseServerKey
let fcm = new FCM(serverKey);
let constants = require("../constants");

/**
 * notificationHandler
 * @param {Array} token user's token
 * @param {Object} notification {title, body}
 * @param {Object} data which you want to pass in notification payload
 */
module.exports = async (tokens, platformType, notificationTitle, notificationDescription, notificationType, notificationAction, notificationPayload, notificationSendUserDetail) => {

  var message = {
    registration_ids: tokens,
    priority: "high",
    content_available: true,
    mutable_content: true,
    data: {
      title: notificationTitle,
      body: notificationDescription,
      type: notificationType,
      action: notificationAction,
      payload: notificationPayload,
      user: notificationSendUserDetail
    }
  }

  console.log("NOTI01: Notification Message: ", message);

  // if (platformType == constants.PLATFORMTYPE.IOS) {
  //   message["notification"] = {
  //     title: notificationTitle,
  //     body: notificationDescription,
  //     sound: "default",
  //   }
  // }

  return await new Promise((resolve, reject) => {
    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!", err);
        resolve(err);
      } else {
        console.log("Successfully sent with response: ", response);
        resolve(response);
      }
    });
  });
}



