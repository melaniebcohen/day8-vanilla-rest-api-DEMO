'use strict';

// THIS FILE: will start our server

const http = require('http');
const Note = require('./model/note.js')
const Router = require('./lib/router.js')
const noteRouter = require('./route/note-route.js')
const storage = require('./lib/storage.js')
const PORT = process.env.PORT || 3000
const router = new Router();
// require('./route/note-route.js')(router) // alternate way of pulling in note-route.js

noteRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`)
});