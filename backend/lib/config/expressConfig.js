"use strict";

//===============================Load Modules Start========================

const express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

module.exports = function (app, env) {
  app.use(cors());
  app.options("*", cors());
  app.use(fileUpload());

  app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(morgan("dev"));

  // use queryString lib to parse urlencoded bodies
  app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
  /**
   * add swagger to our project
   */
  app.use("/apiDocs", express.static(app.locals.rootDir + "/api/dist"));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,authorization,accessToken," +
        "app_version,platform,ios_version,countryISO,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST,GET,PUT,DELETE,OPTIONS"
    );
    next();
  });
};
