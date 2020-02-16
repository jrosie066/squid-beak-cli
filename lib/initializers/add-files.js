const path = require('path');
const fs = require('fs-extra');

const _addGitKeep = (projectName, route) => {
  cp.sync(path.resolve(__dirname, '../files/.gitkeep'), path.resolve(projectName, route));
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

const copyFiles = (projectName, answers) => {
  filesToAdd.forEach(file => {
    console.log(file);
    fs.copySync(path.resolve(__dirname, `../files/${file}`), projectName + `/src/${file}`);
  });
};

module.exports = copyFiles;