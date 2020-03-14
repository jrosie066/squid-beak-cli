const cmdAsync = require('../util/cmd-async');
const logger = require('../util/logger');
const createSpinner = require('../util/spinner');

// TODO: create base function for all of the common elements
const installAirbnbEslint = async (projectName) => {
  const spinner = createSpinner('Installing Airbnb. Please wait...');
  try {
    spinner.start();
    await cmdAsync(`
    cd ${projectName} &&
    npm install eslint-config-airbnb-typescript \
            eslint-plugin-import@^2.18.2 \
            eslint-plugin-jsx-a11y@^6.2.3 \
            eslint-plugin-react@^7.15.1 \
            eslint-plugin-react-hooks@^1.7.0 \
            @typescript-eslint/eslint-plugin@^2.19.0 \
            --save-dev
    `);
    spinner.stop(true);
    logger.stepSuccess('Finished installing Eslint');
  } catch (err) {
    logger.stepError('Could not install related eslint packages');
    logger.error(err);
  }
};

const installGoogleEslint = async (projectName) => {
  try {
    await cmdAsync(`
    cd ${projectName} &&
    npm install eslint-config-google \
            @typescript-eslint/eslint-plugin@^2.19.0 \
            --save-dev
    `);
    logger.stepSuccess('Finished installing Eslint');
  } catch (err) {
    logger.stepError('Could not install related eslint packages');
    logger.error(err);
  }
};

const installStorybook = async (projectName) => {
  const spinner = createSpinner('Installing Storybook. Please wait...');
  try {
    spinner.start();
    await cmdAsync(`
      cd ${projectName} &&
      npm install @storybook/preset-typescript \
      @storybook/addon-a11y \
      @storybook/addon-actions \
      @storybook/addon-links \
      @storybook/addons \
      @storybook/cli \
      @storybook/react \
    `);
    spinner.stop(true);
    logger.stepSuccess('Finished installing Storybook');
  } catch (err) {
    logger.stepError('Could not install related storybook packages');
    logger.error(err);
  }
};

const installMaterialUI = async (projectName) => {
  const spinner = createSpinner('Installing Material-UI. Please wait...');
  try {
    spinner.start();
    await cmdAsync(`
    cd ${projectName} && npm install @material-ui/core
    `);
    spinner.stop(true);
    logger.stepSuccess('Finished installing Material-UI');
  } catch (err) {
    logger.stepError('Could not install related material-ui packages');
    logger.error(err);
  }
};
const installRedux = async (projectName) => {
  const spinner = createSpinner('Installing Redux. Please wait...');
  try {
    spinner.start();
    // install redux dependencies
    await cmdAsync(`
      cd ${projectName} &&
      npm install redux \
      react-redux \
      redux-thunk \
    `);
    // install dev dependencies
    await cmdAsync('npm install @types/react-redux --save-dev');
    spinner.stop(true);
    logger.stepSuccess('Finished installing Redux');
  } catch (err) {
    logger.stepError('Could not install related redux packages');
    logger.error(err);
  }
};

const installAll = async (projectName) => {
  const spinner = createSpinner('Installing npm packages. Please wait...');
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

const lintProject = async (projectName) => {
  const spinner = createSpinner('Doing some clean up. Please wait...');
  try {
    spinner.start();
    await cmdAsync(`cd ${projectName} && npm run lint`);
    spinner.stop(true);
    logger.stepSuccess('Finished the clean up');
  } catch (err) {
    spinner.stop(true);
    throw err;
  }

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