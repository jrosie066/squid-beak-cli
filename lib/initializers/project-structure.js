const cmd = require('node-cmd');
const logger = require('../util/logger');
const createFolderStructure = require('../initializers/folder-structure');
// const fs = require('fs-extra');

/**
 * Given the project name and the user's answers to the cli questions
 * log out status and create the folder structure skeleton
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 */
const createProjectStructure = (projectName, answers) => {
  console.log(logger.info('\n------------------------\n'));
  console.log(logger.info('Creating Project Structure'));
  cmd.get(`mkdir ${projectName}`, (err, data) => {
    console.log(data);
    console.log(err);
    createFolderStructure(projectName, answers);
    console.log(logger.info('Project Structure Creation Finished'));
  });
};
module.exports = createProjectStructure;