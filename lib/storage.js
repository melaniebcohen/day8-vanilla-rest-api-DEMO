'use strict';

const Promise = require('bluebird'); 
// reassigns the Promise object to Bluebird's version
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' })
// Now when we use readFile or writeFile (any fs method), Prom will promisify that call... will return a promise

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));

  let json = JSON.stringify(item);
  // when we call createItem, the note object will be stringified so we can pass it into json file
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err) )
}

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`, JSON)
  .then( data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      console.error(err);
      return Promise.reject;
    }
  })
  .catch( err => Promise.reject(err) )
}