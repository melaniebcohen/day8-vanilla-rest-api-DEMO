'use strict';

// THIS FILE: will start our server & will contain our routes

// http gives us access to req/res object
const http = require('http');
const PORT = process.env.PORT || 3000

// pass information (req, res) from router file into this function
const server = http.createServer();

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`)
});