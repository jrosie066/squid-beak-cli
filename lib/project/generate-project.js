const inquirer = require('inquirer');
const logger = require('../util/logger');
const { createProjectStructure } = require('./project-structure');
const { copyFiles } = require('./add-files-to-project');
const cmdAsync = require('../util/cmd-async');
const installer = require('./package-installs');
const samples = require('./add-samples');

const componentLibraryChoices = [
  { name: 'Material-UI' },
  { name: 'Ant-Design' },
  { name: 'None' },
];
const eslintChoices = [
  { name: 'AirBnb' },
  { name: 'Alloy' },
  { name: 'Google' },
];
const questions = [
  { type: 'list', name: 'componentLibrary', message: 'Pick a componenet library:', choices: componentLibraryChoices },
  { type: 'list', name: 'eslint', message: 'Eslint Style Guide?', choices: eslintChoices },
  { type: 'confirm', name: 'redux', message: 'Do you want to use redux' },
  { type: 'confirm', name: 'storybook', message: 'Do you want to set up Storybook?' },
  { type: 'confirm', name: 'structure', message: 'Do you want to set up a folder structure' }
];

/**
 * Kicks off creating base project structure.
 * Adds skeleton folder structure and root level configureation files
 * @param {string} projectName user given project name
 */
const generateProject = async (projectName) => {
  logger.heading(`\nGenerating project: ${projectName}`);
  logger.hr();
  // ask users questions
  const answers = await inquirer.prompt(questions);
  // set up the folders needed
  try {
    // Set up folder structure
    const msg = await createProjectStructure(projectName, answers);
    logger.stepSuccess(msg);
    // add the configuration files and other initial project files
    const copyMsg = await copyFiles(projectName, answers);
    logger.stepSuccess(copyMsg);
    await cmdAsync(
      `cd ${projectName}
        git init`);
    logger.stepSuccess('Git Added');
    await samples.addSampleComponent(projectName, answers);
    await samples.addSamplePage(projectName, answers);
    if (answers.storybook) {
      await installer.installStorybook();
    }
    if (answers.redux) {
      await installer.installRedux();
    }
    await installer.installAll(projectName);
    logger.info('\nAll Done  👍');
    logger.info(`Created New React Project: ${projectName}`);
  } catch (err) {
    logger.error(err);
  }
};
module.exports = generateProject;
