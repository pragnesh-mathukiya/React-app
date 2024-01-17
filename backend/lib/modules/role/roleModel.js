// Importing mongoose
var mongoose = require("mongoose");
const constants = require("../../constants");
var Schema = mongoose.Schema;

roleSchema = module.exports = new Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: constants.DB_MODEL_REF.PERMISSION,
    },
  ],
  status: {
    type: String,
    enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE],
    default: constants.STATUS.ACTIVE,
  },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Number },
  modifyOn: { type: Number },
});

// Export role module
// role = module.exports = mongoose.model(constants.DB_MODEL_REF.ROLE, roleSchema);

createRole();

async function createRole() {
  /** for create mongoose connections */
  let RoleRead = global['readUserConnection'].model(constants.DB_MODEL_REF.ROLE, roleSchema);
  let Role = global['writeUserConnection'].model(constants.DB_MODEL_REF.ROLE, roleSchema);

  RoleRead.find().then(async (result) => {
    if (!result[0]) {
      let arr = [
        {
          _id: constants.ACCOUNT_LEVEL.SUPERADMIN,
          name: constants.ACCOUNT_TYPE.SUPERADMIN,
          slug: constants.ACCOUNT_TYPE.SUPERADMIN,
          status: constants.STATUS.ACTIVE,
          isDeleted: false,
          createdOn: Date.now(),
        },
        {
          _id: constants.ACCOUNT_LEVEL.ADMIN,
          name: constants.ACCOUNT_TYPE.ADMIN,
          slug: constants.ACCOUNT_TYPE.ADMIN,
          status: constants.STATUS.ACTIVE,
          isDeleted: false,
          createdOn: Date.now(),
        },

        {
          _id: constants.ACCOUNT_LEVEL.USER,
          name: constants.ACCOUNT_TYPE.USER,
          slug: constants.ACCOUNT_TYPE.USER,
          status: constants.STATUS.ACTIVE,
          isDeleted: false,
          createdOn: Date.now(),
        },
      ];

      Role.collection.insert(arr, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log("Roles created  successfully.");
        }
      });
    }
  });
}
