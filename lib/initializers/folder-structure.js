const path = require('path');
const fs = require('fs-extra');

/**
 * List of all of the folders and subfolders needed to create the project structure
 * @param answers object of the user's choice for the cli questions
 */
const makeDirectory = (answers) => {
  console.log(answers);
  const directory = [
    'config', // for jest files
    'src',
    'src/assets',
    'src/assets/images',
    'src/assets/styles',
    'src/build', // to hold the main index.html and other files to serve
    'src/components',
    'src/constants',
    'src/containers',
    'src/pages',
    'src/util'
  ];
  if (answers.redux) {
    directory.push('src/redux');
  }
  return directory;
};

/**
 * Under the folder name given from the project name,
 * add all of the subfolders needed for the project structure
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 */
module.exports = (projectName, answers) => {
  const dir = makeDirectory(answers);
  return new Promise((resolve) => {
    dir.forEach((p) => {
      console.log(p);
      fs.mkdirSync(path.resolve(`${projectName}/${p}`));
    });
    resolve('hi');
  });

};