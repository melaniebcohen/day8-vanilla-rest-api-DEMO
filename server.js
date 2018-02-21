'use strict';

// THIS FILE: will start our server & will contain our routes

// http gives us access to req/res object
const http = require('http');
const Note = require('./model/note.js') // constructor
const Router = require('./lib/router.js') // constructor
const storage = require('./lib/storage.js')
const PORT = process.env.PORT || 3000
const router = new Router();

// use the methods attached to this router directly
// '/api/note', function(req,res) = endpoint, callback
router.get('/api/note', function(req,res) {
  // we already have a parsed url because there is a query property on the url with an id...?
  if (req.url.query.id) {
    storage.fetchItem('note', req.url.query.id)
    // if Promise is resolved
    .then( note => {
      res.writeHead(200, {
        'Content-Type':'text/plain'
      })
      // res.JSON is part of express, we don't have access here
      res.write(JSON.stringify(note));
      res.end();
    })
    // if promise did not work
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type':'text/plain'
      })
      res.write('Route not found.')
      res.end();
    })
    return;
  }
  res.writeHead(400, {
    'Content-Type':'text/plain'
  })
  res.write('bad request');
  res.end();
})

router.post('/api/note', function(req, res) {
  try {
    // note data model accepts name & content
    var note = new Note(req.body.name, req.body.content)
    // schemaName & item, note refers to newly instantiated note ^
    storage.createItem('note', note);
    res.writeHead(200, {
      'Content-Type':'text/plain'
    })
    res.write(JSON.stringify(note))
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type':'text/plain'
    })
    res.write('bad request')
    res.end();
  }
})

// pass information (req, res) from router file into this function
// this returns a function with req & res
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`)
});