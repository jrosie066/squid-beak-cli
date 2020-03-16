const fs = require('fs');
const fsX = require('fs-extra');
const Promise = require('bluebird');

/**
 * Promisify the file system async functions
 */

const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);
const copyFile = Promise.promisify(fsX.copy);
module.exports = {
  readFile,
  writeFile,
  copyFile
};