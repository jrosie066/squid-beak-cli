const chalk = require('chalk');
const logSymbols = require('log-symbols');

const error = (msg) => console.log(chalk.bold.red(msg));
const warning = (msg) => console.log(chalk.yellow(msg));
const heading = (msg) => console.log(chalk.bold.magentaBright(msg));
const success = (msg) => console.log(chalk.green(msg));
const info = (msg) => console.log(chalk.cyan(msg));
const stepSuccess = (msg) => {
  success(`${logSymbols.success} ${msg}`);
};
const stepError = (msg) => {
  error(`${logSymbols.success} ${msg}`);
};

const logger = {
  error,
  warning,
  heading,
  success,
  info,
  stepSuccess,
  stepError,
};
module.exports = logger;