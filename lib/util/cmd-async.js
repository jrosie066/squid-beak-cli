const Promise = require('bluebird');
const cmd = require('node-cmd');

/**
 * Promisify the node command function to run terminal commands
 */
const cmdAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

module.exports = cmdAsync;

 