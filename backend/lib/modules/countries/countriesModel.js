// Importing mongoose
var mongoose = require("mongoose");
const constants = require("../../constants");
const defaultFlagImage = process.env.defaultFlagImage;

countrySchema = module.exports = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  flag: { type: String, default: defaultFlagImage },
  char: { type: String },
  status: {
    type: String,
    enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
    default: constants.STATUS.ACTIVE,
  },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Number },
  updatedOn: { type: Number },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: constants.DB_MODEL_REF.USERS,
  },
});

// Export country module
// country = module.exports = mongoose.model(
//   constants.DB_MODEL_REF.COUNTRIES,
//   countrySchema
// );
