module.exports = {
  environment: "development",
  port: process.env.port,
  protocol: "http",
  TAG: "development",
  mongo: {
    dbName: process.env.dbName,
    dbUrl: process.env.dbUrl,
    dbReadUrl: process.env.dbReadUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  user_secret: process.env.userSecret,
  admin_secret: process.env.adminSecret,
  isDev: true,
};
