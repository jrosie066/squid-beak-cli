const cmd = require('node-cmd');
const logger = require('../util/logger');
const createFolderStructure = require('../initializers/folder-structure');
const cmdAsync = require('../util/cmd-async');

/**
 * Given the project name and the user's answers to the cli questions
 * log out status and create the folder structure skeleton
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 */
const createProjectStructure = async (projectName, answers) => {
  console.log(logger.heading('\n------------------------\n'));
  console.log(logger.heading('Creating Project Structure'));
  await cmdAsync(`mkdir ${projectName}`);
  await createFolderStructure(projectName, answers);
  console.log(logger.success('Project Structure Creation Finished'));
};
module.exports = createProjectStructure;