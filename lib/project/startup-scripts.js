const cmdAsync = require('../util/cmd-async');
const logger = require('../util/logger');
const createSpinner = require('../util/spinner');

const runStepCommand = async (projectName, stepName, command) => {
  const spinner = createSpinner(`${stepName}. Please wait...`);
  try {
    spinner.start();
    await cmdAsync(`cd ${projectName} && ${command}`);
    spinner.stop(true);
    logger.stepSuccess(`Finished ${stepName}`);
  } catch (err) {
    spinner.stop(true);
    logger.stepError(`Error running ${stepName} commands`);
    logger.error(err);
    throw err;
  }
};
// TODO: create base function for all of the common elements
const installAirbnbEslint = async (projectName) => {
  const stepName = 'Installing Airbnb Eslint';
  const command = 'npm install eslint-config-airbnb-typescript \
  eslint-plugin-import@^2.18.2 \
  eslint-plugin-jsx-a11y@^6.2.3 \
  eslint-plugin-react@^7.15.1 \
  eslint-plugin-react-hooks@^1.7.0 \
  @typescript-eslint/eslint-plugin@^2.19.0 \
  --save-dev';
  await runStepCommand(projectName, stepName, command);
};

const installGoogleEslint = async (projectName) => {
  const stepName = 'Installing Google Eslint';
  const command = 'npm install eslint-config-google \
  @typescript-eslint/eslint-plugin@^2.19.0 \
  --save-dev';
  
  await runStepCommand(projectName, stepName, command);
};

const installStorybook = async (projectName) => {
  const stepName = 'Installing Storybook';
  const command = 'npm install @storybook/preset-typescript \
  @storybook/addon-a11y \
  @storybook/addon-actions \
  @storybook/addon-links \
  @storybook/addons \
  @storybook/cli \
  @storybook/react';
  await runStepCommand(projectName, stepName, command);
};

const installMaterialUI = async (projectName) => {
  const stepName = 'Installing Material-UI';
  const command = 'npm install @material-ui/core';
  await runStepCommand(projectName, stepName, command);
};

const installRedux = async (projectName) => {
  const stepName = 'Installing Redux';
  let command = 'npm install redux \
  react-redux \
  redux-thunk';
  await runStepCommand(projectName, stepName, command);
  command = 'npm install @types/react-redux --save-dev';
  await runStepCommand(projectName, stepName, command);
};

const installAll = async (projectName) => {
  const stepName = 'Installing Dependencies';
  let command = 'npm install';
  await runStepCommand(projectName, stepName, command);
};

const lintProject = async (projectName) => {
  const stepName = 'Doing Some Clean Up';
  let command = 'npm run lint';
  await runStepCommand(projectName, stepName, command);
};

module.exports = {
  installAirbnbEslint,
  installAll,
  installStorybook,
  installRedux,
  installGoogleEslint,
  installMaterialUI,
  lintProject
};