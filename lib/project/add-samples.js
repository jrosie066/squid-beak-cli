const logger = require('../util/logger');
const cmdAsync = require('../util/cmd-async');

const addSampleComponent = async (projectName, answers) => {
  const command = answers.componentLibrary === 'Material-UI'
    ? 'squid-beak component Sample --material'
    : 'squid-beak component Sample';
  try {
    await cmdAsync(
      `cd ${projectName}
        squid-beak --version
        ${command}
      `);
    logger.stepSuccess('Sample Component Added');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addSampleComponent,
};
