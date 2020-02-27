const inquirer = require('inquirer');
const logger = require('../util/logger');
const { createProjectStructure } = require('../initializers/project-structure');
const { copyFiles } = require('../initializers/add-files');

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
  { type: 'list', name: 'eslintStandard', message: 'Eslint Style Guide?', choices: eslintChoices },
  { type: 'confirm', name: 'redux', message: 'Do you want to use redux' },
  { type: 'confirm', name: 'storybook', message: 'Do you want to set up Storybook?' },
];

/**
 * Kicks off creating base project structure.
 * Adds skeleton folder structure and root level configureation files
 * @param {string} projectName user given project name
 */
const generateProject = async (projectName) => {
  logger.heading(`\nGenerating project: ${projectName}`);
  logger.heading('\n---------------------------\n');
  // ask users questions
  const answers = await inquirer.prompt(questions);
  // set up the folders needed
  try {
    // TODO: may not need this try catch as its in the command
    const msg = await createProjectStructure(projectName, answers);
    logger.success(msg);
  } catch (err) {
    logger.error(err);
  }
  // add the configuration files
  await copyFiles(projectName, answers);
};
module.exports = generateProject;
