const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.yellow;
const heading = chalk.bold.magentaBright;
const success = chalk.green;
const info = chalk.cyan;

const logger = {
  error,
  warning,
  heading,
  success,
  info,
};
module.exports = logger;