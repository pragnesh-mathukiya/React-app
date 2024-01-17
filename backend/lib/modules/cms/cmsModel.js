const mongoose = require("mongoose");
const constants = require("../../constants");

(slug = require("mongoose-slug-generator")), mongoose.plugin(slug);

cmsSchema = module.exports = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  slug: {
    type: String,
    slug: ["name", "platform"],
    unique: true,
  },
  platform: {
    type: String,
    enum: [
      constants.PLATFORM.WEB,
      constants.PLATFORM.MOBILE,
      constants.PLATFORM.MINT,
    ],
    default: constants.PLATFORM.WEB,
  },
  status: {
    type: String,
    enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
    default: constants.STATUS.ACTIVE,
  },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Number, default: 0 },
  updatedOn: { type: Number, default: 0 },
});

// module.exports = mongoose.model(constants.DB_MODEL_REF.CMS_PAGES, cmsSchema);
