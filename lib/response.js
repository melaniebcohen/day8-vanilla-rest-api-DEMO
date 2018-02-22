'use strict'

// THIS FILE: Be able to handle the writing of the head & the message we send back to the user when they make a request

module.exports = exports = {};

// you could combine these two - sendMsg with res, status, data, msg

exports.sendJSON = function(res, status, data) {
  res.writeHead(status, { 'Content-Type' : 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
}

exports.sendText = function(res, status, msg) {
  res.writeHead(status, { 'Content-Type' : 'text/plain' });
  res.write(msg);
  res.end();
}