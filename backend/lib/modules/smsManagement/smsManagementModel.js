/*#################################            Load modules start            ########################################### */

const mongoose = require("mongoose");
const constants = require("../../constants");
var Schema = mongoose.Schema;

/*#################################            Load modules end            ########################################### */

smsSchema = module.exports = new Schema(
  {
    smsTitle: { type: String, required: true },
    smsContent: { type: String, required: true },
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

// module.exports = mongoose.model(constants.DB_MODEL_REF.SMSTEMPLATES, smsSchema);
