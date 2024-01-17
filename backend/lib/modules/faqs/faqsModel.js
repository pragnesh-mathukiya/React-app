const mongoose = require("mongoose");
const constants = require("../../constants");

faqSchema = module.exports = mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
    default: constants.STATUS.ACTIVE,
  },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Number, default: 0 },
  updatedOn: { type: Number, default: 0 },
});

// module.exports = mongoose.model(
//   constants.DB_MODEL_REF.FREQUENTLY_ASK_QUESTION,
//   faqSchema
// );
