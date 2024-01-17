let BaseDao = require("../dao/BaseDao");
const userSchema = require("../generic/models/userModel");
const constants = require("../constants");

// check userName exist or not
async function checkUserName(userId, userName) {
    let userRead = global['readUserConnection'].model(constants.DB_MODEL_REF.USERS, userSchema);
    let userReadDao = new BaseDao(userRead);

    let query = {
        _id: { $ne: userId },
        userName: userName,
    }

    let userDetails = await userReadDao.findOne(query);
    if (userDetails) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    checkUserName,
};