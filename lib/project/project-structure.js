const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const addFiles = require('./add-files-to-project');
/**
 * List of all of the folders and subfolders needed to create the project structure
 * @param answers object of the user's choice for the cli questions
 */
const makeDirectory = (answers) => {
  const directory = [
    'config', // for jest files
    'scripts', // for build file
    'src',
    'src/assets',
    'src/assets/images',
    'src/assets/styles',
    'src/build', // to hold the main index.html and other files to serve
    'src/components',
    'src/constants',
    'src/containers',
    'src/pages',
    'src/pages/SamplePage',
    'src/pages/SamplePage/component',
    'src/util'
  ];
  if (answers.redux) {
    const redux = [
      'src/redux',
      'src/redux/tests',
    ];
    directory.push(...redux);
  }
  if (answers.storybook) {
    directory.push('.storybook');
  }
  return directory;
};

/**
 * Under the folder name given from the project name,
 * add all of the subfolders needed for the project structure
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 * @return a promise after all of the folders are created
 */
const createFolderStructure = (projectName, answers) => {
  const dir = makeDirectory(answers);
  return new Promise((resolve) => {
    dir.forEach((p) => {
      fs.mkdirSync(path.resolve(`${projectName}/${p}`));
      addFiles.addGitKeep(projectName, p); // TODO: try to get this to work
    });
    resolve();
  });

};
/**
 * Given the project name and the user's answers to the cli questions
 * log out status and create the folder structure skeleton
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 */
const createProjectStructure = (projectName, answers) => {
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(projectName)) {
      reject('Project with this name already exists\n\n');
    } else {
      logger.hr();
      logger.heading('Creating Project Structure');
      fs.mkdirSync(path.resolve(projectName));
      await createFolderStructure(projectName, answers);
      resolve('Project Structure Creation Finished');
    }
  });
};

module.exports = {
  createProjectStructure,
  createFolderStructure
};