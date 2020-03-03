// NOTE: refactor this page - it works its just ugly
const path = require('path');
const fs = require('fs-extra');
const promiseFs = require('../util/promise-fs');

/**
 * 
 * @param {string} projectName user given name for the project - will be the parent folder name for the project
 * @param {string} folder folder name to place the git keep in
 */
const addGitKeep = (projectName, folder) => {
  fs.copySync(path.resolve(__dirname, '../../files/.gitkeep'), projectName + `/${folder}`);
};

const getEslintFile = (type) => {
  return `eslint/${type}/.eslintrc`;
};
const filesToAddToMain = [
  'webpack.common.config.js',
  'webpack.dev.config.js',
  'webpack.production.config.js',
  'webpack.static.config.js',
  'tsconfig.json',
  'package.json',
  '.gitignore',
  'jest.config.js',
  // '.eslintrc',
  '.eslintignore',
  '.babelrc',
  'README.md'
];

const filestoAddStorybook = [
  'main.js',
];
const filesToAddToBuild = [
  'index.html',
];

// TODO: will probably need to dynamically create this
const filesToAddToContainers = [
  'Root.tsx',
];
// TODO: will probably need to dynamically create this
const filesToAddToSrc = [
  'index.tsx',
];

// TODO: will probably need to dynamically create this
const filestoAddToPages = [
  'routes.tsx',
];

/**
 * Take the project config files and copy them over to the new project structure
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 */
const copyFiles = async (projectName, answers) => {
  console.log(answers);
  try {
    const filePromises = [];
    if (answers.storybook) {
      const storybook = await filestoAddStorybook.map(async file => (
        await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/.storybook/${file}`)
      ));
      filePromises.push(storybook);
    }
    const promises = await filesToAddToMain.map(async file => (
      await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/${file}`)
    ));
    filePromises.push(promises);

    const containerPromises = await filesToAddToContainers.map(async file => (
      await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/containers/${file}`)
    ));
    filePromises.push(containerPromises);

    const buildPromises = await filesToAddToBuild.map(async file => (
      await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/build/${file}`)
    ));
    filePromises.push(buildPromises);

    const srcPromises = await filesToAddToSrc.map(async file => {
      return await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/${file}`);
    });
    filePromises.push(srcPromises);

    const pagePromises = await filestoAddToPages.map(async file => (
      await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/pages/${file}`)
    ));
    const eslint = await promiseFs.copyFile(path.resolve(__dirname, `../../files/${getEslintFile(answers.eslint)}`), projectName + '/.eslintrc');
    filePromises.push(pagePromises);
    filePromises.push(eslint);
    
    await Promise.all(filePromises);
    return 'Finished Adding Files';
  } catch (err) {
    console.log('ERROR', err);
    throw 'Error Adding Files';
  }
};

module.exports = {
  copyFiles,
  addGitKeep,
};