/**
  * * 30% user online send notification
     * Get online user cout
     * more then 30% user online send notification
     * update send notification time in user table
     * send notification
 */

const ObjectId = require("mongoose").Types.ObjectId;
let constants = require("../constants");
let { percentage } = require("../appUtils");
let BaseDao = require("../dao/BaseDao");
const userSchema = require("../generic/models/userModel");
const onlineNotiPer = process.env.onlineUsersPercentage;
const { sendNotification } = require("./sendNotification");

async function sendUserOnlineNotification(onlineUserCount) {
    // Connect DB
    let UserRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
    let userReadDao = new BaseDao(UserRead);

    let user = global['writeUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
    let userDao = new BaseDao(user);

    const onlineUsersCount = onlineUserCount - 1;
    let totalUserQuery = {
        isDeleted: false,
        status: constants.STATUS.ACTIVE,
        roleId: constants.ACCOUNT_LEVEL.USER,
    }

    // Get all users count
    let totalUser = await userReadDao.count(totalUserQuery);
    let onlineUserInPer = parseFloat(await percentage(onlineUsersCount, totalUser).toFixed(2));

    console.log("Online Users In Percentage: ", onlineUserInPer);

    if (onlineUserInPer && onlineUserInPer >= onlineNotiPer) {
        var date = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);
        let todayDate = new Date(date + "T00:00:00.000Z");

        let userQuery = {
            isDeleted: false,
            status: constants.STATUS.ACTIVE,
            roleId: constants.ACCOUNT_LEVEL.USER,
            $and: [
                { accessToken: { $ne: null } },
                { accessToken: { $ne: "" } }
            ],
            $or: [
                { onlineNotiDate: { $exists: false } },
                { onlineNotiDate: { $lt: todayDate } }
            ]
        }

        let projection = {
            fcmToken: 1,
            platform: 1,
            isNotification: 1,
        }

        // Send notification
        {
            let users = await userReadDao.find(userQuery, projection);
            if (users) {
                users.map(async (element) => {
                    await userDao.update({ _id: ObjectId(element._id) }, { $set: { onlineNotiDate: new Date() } });

                    let fcmTokenArr = [element.fcmToken];
                    let notificationUserId = element._id;
                    let fcmToken = fcmTokenArr;
                    let platformType = element.platform;
                    let isSendPushNotification = element.isNotification;

                    let notificationTitle = constants.NOTIFICATION_MESSAGE.USERS_ONLINE_NOTIFICATION_TITLE;
                    let notificationDescription = constants.NOTIFICATION_MESSAGE.USERS_ONLINE_NOTIFICATION_DESCRIPTION;

                    let notificationPayload = null;
                    let notificationDetails = {
                        notificationTitle,
                        notificationDescription,
                        notificationPayload,
                        fcmToken,
                        platformType,
                        isSendPushNotification,
                        notificationUserId,
                        notificationType: constants.NOTIFICATION_TYPE.VIDEO,
                        notificationAction: constants.NOTIFICATION_ACTION.CREATE_VIDEO,
                        notificationSendUserDetail: null
                    }

                    console.log("30% UserS Online Send Notification Save Object : ", notificationDetails);
                    await sendNotification(notificationDetails);
                })
            }
        }
    }
}

module.exports = {
    sendUserOnlineNotification
}