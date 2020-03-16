const Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');

/**
 * Instantiates a new terminal loading spinner with a customized message
 * @param {string} msg message want displayed next loading spinner
 */
const createSpinner = (msg) => {
  const spinnerObj = new Spinner(chalk.magenta(msg));
  spinnerObj.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
  return spinnerObj;
};

module.exports = createSpinner;