const cmd = require('node-cmd');
const logger = require('../util/logger');

module.exports = exports = function (projectName) {
  console.log(logger.info('\n------------------------\n'));
  console.log(logger.info('Installing npm packages. Please wait.'));
  cmd.run(`cd ${projectName} && npm install`);
};