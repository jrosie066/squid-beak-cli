const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');

/**
 * 
 * @param {string} projectName user given name for the project - will be the parent folder name for the project
 * @param {string} folder folder name to place the git keep in
 */
const addGitKeep = (projectName, folder) => {
  fs.copySync(path.resolve(__dirname, '../../files/.gitkeep'), projectName + `/${folder}`);
};

const filesToAdd = [
  'webpack.common.config.js',
  'webpack.dev.config.js',
  'webpack.production.config.js',
  'webpack.static.config.js',
  'tsconfig.json',
  'package.json',
  '.gitignore',
  'jest.config.js',
  '.eslintrc',
  '.eslintignore',
  '.babelrc',
  'README.md'
];

/**
 * Take the project config files and copy them over to the new project structure
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 */
const copyFiles = (projectName, answers) => {
  return new Promise((resolve) => {
    filesToAdd.forEach(file => {
      console.log(file);
      fs.copySync(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/${file}`);
    });
    resolve(logger.info('finished adding files'));
  });
};

module.exports = {
  copyFiles,
  addGitKeep,
};