"use strict";

var res = require("dotenv").config();

//Import Config
const config = require("./lib/config");
const path = require("path");

config.dbConfig(config.cfg, (err) => {
  if (err) {
    return;
  }
  // load external modules
  const express = require("express");
  // init express app
  const app = express();
  // config express
  config.expressConfig(app);

  app.use(express.static(path.join(__dirname, 'public'))); 
  app.set('view engine', 'ejs'); 

  if (err) return res.json(err);
  // attach the routes to the app
  require("./lib/routes")(app);
  // start server
  const server = app.listen(process.env.port, () => {
    console.log(`Express server listening on ${process.env.port}`);
  });
});
