"use strict";
const mongoose = require("mongoose");
// plugin bluebird promise in mongoose
mongoose.Promise = require("bluebird");

// Connect to Db
function connectDb(env, callback) {
  let dbName = env.mongo.dbName;
  let dbUrl = env.mongo.dbUrl;
  let dbReadUrl = env.mongo.dbReadUrl;
  let dbOptions = env.mongo.options;

  if (env.isProd) {
    dbUrl = dbUrl + dbName;
    dbReadUrl = dbReadUrl + dbName;
  } else {
    dbUrl = dbUrl + dbName;
    dbReadUrl = dbReadUrl + dbName;
    mongoose.set("debug", false);
  }
  console.info("1. Configuring db in: " + env.TAG + " mode");
  console.info("2. Connecting to Write: " + dbUrl);
  console.info("3. Connecting to Read: " + dbReadUrl);

  mongoose.Promise = global.Promise;

  global['writeUserConnection'] = mongoose.createConnection(dbUrl,
    dbOptions)

  /** Read Connection  */
  global['readUserConnection'] = mongoose.createConnection(dbReadUrl,
    dbOptions)

  global['writeUserConnection'].on('error', function (error) {
    console.log(`MongoDB :: connection write ${dbName} ${JSON.stringify(error)}`);
    global['writeUserConnection'].close().catch(() => console.log(`MongoDB :: failed to close connection write`, dbName));
  });

  global['writeUserConnection'].on('connected', function () {
    console.log(`MongoDB :: connected write`, dbName);
  });

  global['writeUserConnection'].on('disconnected', function () {
    console.log(`MongoDB :: disconnected write`, dbName);
  });

  global['readUserConnection'].on('error', function (error) {
    console.log(`MongoDB :: connection read Tapcha ${JSON.stringify(error)}`);
    global['readUserConnection'].close().catch(() => console.log(`MongoDB :: failed to close connection read`, dbName));
  });

  global['readUserConnection'].on('connected', function () {
    console.log(`MongoDB :: connected read`, dbName);
  });

  global['readUserConnection'].on('disconnected', function () {
    console.log(`MongoDB :: disconnected read `, dbName);
  });

  callback();

  // mongoose.connect(dbUrl, dbOptions);

  // mongoose.connection.on("connected", function () {
  //   console.info("3. DB connected with : ", dbName);
  //   callback();
  // });

  // mongoose.connection.on("error", function (err) {
  //   console.info("3. DB connection error: " + err);
  //   callback(err);
  // });

  // mongoose.connection.on("disconnected", function () {
  //   console.info("4. DB connection disconnected");
  //   callback("DB connection disconnected");
  // });

}

module.exports = connectDb;
