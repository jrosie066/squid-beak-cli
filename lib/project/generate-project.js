const inquirer = require('inquirer');
const logger = require('../util/logger');
const { createProjectStructure } = require('./project-structure');
const { copyFiles } = require('./add-files-to-project');
const cmdAsync = require('../util/cmd-async');
const installer = require('./startup-scripts');
const { EslintLibrary, ComponentLibrary } = require('../shared/constants');
// const samples = require('./add-samples');

const componentLibraryChoices = [
  { name: ComponentLibrary.MATERIAL_UI },
  { name: ComponentLibrary.ANT_DESIGN },
  { name: ComponentLibrary.NONE },
];
const eslintChoices = [
  { name: EslintLibrary.AIRBNB },
  { name: EslintLibrary.ALLOY },
  { name: EslintLibrary.GOOGLE },
];
const questions = [
  { type: 'list', name: 'componentLibrary', message: 'Pick a componenet library:', choices: componentLibraryChoices },
  { type: 'list', name: 'eslint', message: 'Pick an Eslint Style Guide', choices: eslintChoices },
  { type: 'confirm', name: 'redux', message: 'Do you want to use redux?' },
  { type: 'confirm', name: 'storybook', message: 'Do you want to set up Storybook?' },
  { type: 'confirm', name: 'structure', message: 'Do you want to set up a folder structure?' }
];


const _setUpEslint = async (eslintOption, projectName) => {
  switch (eslintOption) {
  case EslintLibrary.GOOGLE:
    await installer.installGoogleEslint(projectName);
    break;
  case EslintLibrary.AIRBNB:
    await installer.installAirbnbEslint(projectName);
    break;
  case EslintLibrary.ALLOY:
    await installer.installAlloyEslint(projectName);
    break;
  default:
    logger.error('no library given');
  }
};

const _setUpComponentLibrary = async (eslintOption, projectName) => {
  switch (eslintOption) {
  case ComponentLibrary.MATERIAL_UI:
    await installer.installMaterialUI(projectName);
    break;
  case ComponentLibrary.ANT_DESIGN:
    logger.info('sorry this feature isn\'t implemented yet');
    break;
  case ComponentLibrary.NONE:
    logger.info('skipping component library set up');
    break;
  default: logger.error('no library given');

  }
};
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
    if (answers.storybook) {
      await installer.installStorybook(projectName);
    }
    if (answers.redux) {
      await installer.installRedux(projectName);
    }
    await _setUpEslint(answers.eslint, projectName);
    await _setUpComponentLibrary(answers.componentLibrary, projectName);
    await installer.installAll(projectName);
    // TODO: not working
    // await samples.addSampleComponent(projectName, answers);
    await installer.lintProject(projectName);
    logger.info('\nAll Done  👍');
    logger.info(`Created New React Project: ${projectName}`);
  } catch (err) {
    logger.error(err);
  }
};


module.exports = generateProject;
