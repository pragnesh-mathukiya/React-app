let BaseDao = require("../dao/BaseDao");
const pushNotificationSchema = require("../modules/pushNotification/pushNotificationModel");
const notification = require("./notifications");
const constants = require("../constants");

async function sendNotification(notificationDetails) {
    let pushNotification = global['writeUserConnection'].model(constants.DB_MODEL_REF.PUSHNOTIFICATION, pushNotificationSchema);
    let pushNotificationDao = new BaseDao(pushNotification);

    let { notificationTitle, notificationDescription, notificationPayload, fcmToken, platformType, isSendPushNotification, notificationUserId, notificationType, notificationAction, notificationSendUserDetail } = notificationDetails;

    let sendNotification;
    let sendNotificationRes;

    if (fcmToken && fcmToken[0] != '' && isSendPushNotification) {
        sendNotification = await notification(fcmToken, platformType, notificationTitle, notificationDescription, notificationType, notificationAction, notificationPayload, notificationSendUserDetail);
        sendNotificationRes = sendNotification && sendNotification != "InvalidServerResponse" ? JSON.parse(sendNotification) : sendNotification;
    }

    let isSendNotification = sendNotificationRes && sendNotificationRes.success && sendNotificationRes.success > 0 ? constants.NOTIFICATION_SEND.SUCCESS : constants.NOTIFICATION_SEND.FAIL;
    let notificationFailerReason = sendNotificationRes && sendNotificationRes.failure && sendNotificationRes.failure > 0 ? sendNotificationRes.results[0].error : sendNotification == "InvalidServerResponse" ? sendNotification : "";
    let pushNotificationDetail = {
        userId: notificationUserId,
        title: notificationTitle,
        action: notificationAction,
        body: notificationDescription,
        payload: notificationPayload,
        type: notificationType,
        isSend: isSendNotification,
        failerReason: notificationFailerReason,
    }
    if (notificationSendUserDetail && notificationSendUserDetail.id) {
        pushNotificationDetail['fromUserId'] = notificationSendUserDetail.id;
    }
    await pushNotificationDao.save({ createdOn: new Date(), updatedOn: new Date(), notificationData: pushNotificationDetail });
    return isSendNotification;
}

// Module Export
module.exports = { sendNotification }
