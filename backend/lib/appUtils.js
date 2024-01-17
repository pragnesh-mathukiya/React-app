"use strict";

var promise = require("bluebird");
var bcrypt = require("bcryptjs");
const { hashTagRegEx } = require("./utils/regulerExpression");

function isValidEmail(email) {
  var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
  return new RegExp(pattern).test(email);
}

async function convertPass(password) {
  let pass = await bcrypt.hash(password, 10);
  return pass;
}

function verifyPassword(userPassword, isExistPassword) {
  return bcrypt.compare(userPassword, isExistPassword);
}
function generateSaltAndHashForPassword(password) {
  return bcrypt.hash(password, 10);
}
function generateRandomPassword() {
  return Math.random().toString(36).slice(-8);
}

function removeAllSpaces(string) {
  return string.replace(/\s/g, "");
}

function paginate(array, current_page, per_page_items) {
  // function paginator(items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items || 10,
    offset = (page - 1) * per_page,
    paginatedItems = array.slice(offset).slice(0, per_page_items);

  return paginatedItems;
  // }

  // pageNumber = parseInt(pageNumber) + 1;
  // return array.slice(pageNumber - 1 * pageSize, pageNumber * pageSize);
}

function hashTagFind(caption) {
  // var regexp = /\#\w\w+\b/g
  var regexp = hashTagRegEx;
  return caption.match(regexp);
}

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

module.exports = {
  verifyPassword,
  isValidEmail,
  generateSaltAndHashForPassword,
  convertPass,
  generateRandomPassword,
  removeAllSpaces,
  paginate,
  hashTagFind,
  percentage,
};
