const Promise = require('bluebird');
const cmd = require('node-cmd');
 
const cmdAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

module.exports = cmdAsync;

 