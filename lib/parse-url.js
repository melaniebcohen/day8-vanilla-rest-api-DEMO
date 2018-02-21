'use strict';

// THIS FILE: parse the URL and grab things like query string parameters

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  // now an object that contains all components of URL
  req.url.query = parseQuery(req.url.query);
  // now have key value pairs for all querystring components

  return Promise.resolve(req);
  // this is basically always going to resolve, we don't need to reject anything in here
}