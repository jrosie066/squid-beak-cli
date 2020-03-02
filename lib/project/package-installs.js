const cmdAsync = require('../util/cmd-async');
const logger = require('../util/logger');
const Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');

const installAirbnbEslint = async () => {
  try {
    cmdAsync(`
    npm install eslint-config-airbnb-typescript \
            eslint-plugin-import@^2.18.2 \
            eslint-plugin-jsx-a11y@^6.2.3 \
            eslint-plugin-react@^7.15.1 \
            eslint-plugin-react-hooks@^1.7.0 \
            @typescript-eslint/eslint-plugin@^2.19.0 \
            --save-dev
    `);
  } catch (err) {
    logger.stepError('Could not install related eslint packages');
    logger.error(err);
  }
};

const installAll = async (projectName) => {
  const spinner = new Spinner( chalk.magenta('Installing npm packages. Please wait.'));
  spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
 
  try {
    //TODO: get a stack trace
    spinner.start();
    await cmdAsync(`cd ${projectName} && npm install`);
    spinner.stop(true);
    logger.stepSuccess('Finished installing dependencies');
  } catch (err) {
    logger.error('Error installing packages');
    logger.error(err);
  }
};

module.exports = {
  installAirbnbEslint,
  installAll
};