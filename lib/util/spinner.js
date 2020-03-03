const Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');

const createSpinner = (msg) => {
  const spinnerObj = new Spinner(chalk.magenta(msg));
  spinnerObj.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
  return spinnerObj;
};

module.exports = createSpinner;