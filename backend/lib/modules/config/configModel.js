const mongoose = require("mongoose");
const constants = require("../../constants");

(slug = require("mongoose-slug-generator")), mongoose.plugin(slug);

configSchema = module.exports = mongoose.Schema({
  email: {
    smtpHost: {
      type: String,
    },
    smtpPort: {
      type: Number,
      default: 0,
    },
    smtpEmail: {
      type: String,
    },
    smtpPassword: {
      type: String,
    },
  },
  sms: {
    smsAccountSid: {
      type: String,
    },
    smsAuthToken: {
      type: String,
    },
    smsFrom: {
      type: String,
    },
  },
});

// module.exports = mongoose.model(constants.DB_MODEL_REF.CONFIG, configSchema);
