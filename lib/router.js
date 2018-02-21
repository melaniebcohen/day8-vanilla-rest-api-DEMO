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

Router.prototype.route = function() {
  // goal here is to use route call as a way of passing that into our createServer call
  // will return a function that accepts req or res, that can be modified or handled

  // basically making http.createServer((req,res) => { }))
  return (req, res) => {
    // method that accepts an array of Promises - all Promises need to be resolved
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
    .then( () => { // do something if that shit worked
      // this.routes will point to the instantiated object
      // [req.method][req.url.pathname] are in brackets because they have dots in their name, not chaining
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        // when we call our route method from http.createServer(), it will return a function with req/res
        // this is basically handling things like parsing our URL, JSON, allowing us to call any associated paths
        this.routes[req.method][req.url.pathname](req,res);
        return;
      }
    })
  }
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