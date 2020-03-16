const cmdAsync = require('../util/cmd-async');
const logger = require('../util/logger');
const createSpinner = require('../util/spinner');

/**
 * Run the eslint lint roller on a given folder
 * Show loading spinner during flow and log step
 * @param {string} folder folder to lint
 */
const lintRoller = async (folder) => {
  const spinner = createSpinner('Doing some cleanup. Please wait...');
  try {
    spinner.start();
    await cmdAsync(`FOLDER=${folder} npm run lint`);
    spinner.stop(true);
    logger.stepSuccess('Finished Cleanup');
  } catch (err) {
    spinner.stop(true);
    logger.stepError('Error running cleanup');
    throw err;
  }
};

module.exports = lintRoller;