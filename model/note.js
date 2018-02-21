'use strict';

// THIS FILE: constructor that has properties that allow us to instantiate a new object and have access to its properties
// dealing with a specific type of data - note not notes

const uuidv4 = require('uuid/v4');

module.exports = function(name, content) {
  if (!name) throw new Error('expected name');
  if (!content) throw new Error('expected content');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
}