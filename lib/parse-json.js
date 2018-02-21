'use strict';

// THIS FILE: Basically a custom body-parser
// Function that accepts the request, intercepts the request, and passes it off

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    // when we call this function, it will return a Promise (newly instantiated Promise object with two states of our request - resolve and reject)

    if (req.method === 'POST' || req.method === 'PUT') {
      var body = '';

      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req)
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })

      req.on('error', err => {
        console.error(err);
        reject(err);
      })

      return;
    }
    // if request is not POST or PUT, we automatically resolve this
    resolve();
  })
}