const fs = require('fs');
const Promise = require('bluebird');

const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

module.exports = {
  readFile,
  writeFile
};