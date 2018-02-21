'use strict';

// THIS FILE: NOT building routes themselves, but holding the method names
// Going to be dealing with GET POST PUT DELETE methods, need to parse both URL and JSON
// Router constructor with a routes property, which contains its own sub object

const parseURL = require('./parse-url.js');
const parseJSON = require('./parse-json.js')

const Router = module.exports = function() {
  this.routes = {
    // 'this' is used because we're in a constructor
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  }
}

// prototype methods:
Router.prototype.get = function(endpoint, callback) {
  // app.get(/api/cats, function(data) {})
  // gives routers access to the get method
  // when we call our GET method, we look at the routes property on our object

  this.routes.GET[endpoint] = callback;
  // endpoint is passed in (ex: /api/cats), now a property on GET
  // that property has a value of this callback
}

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
}

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
}

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
}

/* WHITEBOARD:
  {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  }
  
  var notes = new Router();
  notes.routes prints out GET, POST, PUT, DELETE objects
  
  notes.routes.get = {
    '/api/cats' : callback;
  }
*/