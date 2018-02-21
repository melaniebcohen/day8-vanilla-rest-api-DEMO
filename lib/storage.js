'use strict';

// THIS FILE: contains two methods - get item & fetch item

const storage = {};

// export multiple functions
module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  // set up a method that can be used to create a new item and add it to our storage object
  // this function will be called with a Promise so we can get back data

  // validation checks:
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  if (!storage[schemaName]) storage[schemaName] = {};
  // we expect schemaname (cats, notes, etc) to be passed in
  // ^ if there's not an object, create the item (line 17)

  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
}

exports.fetchItem = function(schemaName, id) {
  // go into that object and fetch objects
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    // retrieve item - find storage.notes
    var schema = storage[schemaName];
    if (!schema) return reject(new Error('schema not found'));
    
    // notes[id]
    var item = schema[id];
    if (!item) return reject(new Error('item not found'));

    resolve(item);
  });
}

/* WHITEBOARD
  var storage = {}

  line 17 - if (!storage[schemaName]) storage[schemaName] = {};
    storage = {
      notes: {}
    }

  line 21 - storage[schemaName][item.id] = item;
    storage = {
      notes: {
        a3cb1dfp: {
          name: 'cool note',
          content: 'stuff',
          id: 'a3cb1dfp'
        }
      }
    }
*/