// Importing mongoose
var mongoose = require("mongoose");
const constants = require("../../constants");
var Schema = mongoose.Schema;

permissionSchema = module.exports = new Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  level: { type: Number, default: 2 },
  status: {
    type: String,
    enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
    default: constants.STATUS.ACTIVE,
  },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Number, default: Date.now() },
});

// Export permission module
// permission = module.exports = mongoose.model(
//   constants.DB_MODEL_REF.PERMISSION,
//   PermissionSchema
// );
