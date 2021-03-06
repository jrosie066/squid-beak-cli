const chalk = require('chalk');
const logSymbols = require('log-symbols');

/**
 * Wrapper for chalk setting for console logging approriate 
 * message levels
 * @param {string} msg message to log
 */

const error = (msg) => console.log(chalk.bold.red(msg));
const warning = (msg) => console.log(chalk.yellow(msg));
const heading = (msg) => console.log(chalk.bold.magentaBright(msg));
const success = (msg) => console.log(chalk.hex('#7cfca7')(msg));
const info = (msg) => console.log(chalk.bold.hex('#8beffc')(msg));
const stepSuccess = (msg) => {
  success(`${logSymbols.success} ${msg}`);
};
const stepError = (msg) => {
  error(`${logSymbols.error} ${msg}`);
};
const hr = () => logger.heading('\n-----------------------------------\n');

const logger = {
  error,
  warning,
  heading,
  success,
  info,
  stepSuccess,
  stepError,
  hr
};
module.exports = logger;