const path = require('path');
const fs = require('fs-extra');

/**
 * 
 * @param {string} projectName user given name for the project - will be the parent folder name for the project
 * @param {string} folder folder name to place the git keep in
 */
const addGitKeep = (projectName, folder) => {
  fs.copySync(path.resolve(__dirname, '../../files/.gitkeep'), projectName + `/${folder}`);
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
  '.eslintrc',
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
const copyFiles = (projectName, answers) => {
  return new Promise((resolve) => {
    if (answers.storybook) {
      filestoAddStorybook.forEach(file => {
        fs.copySync(path.resolve(__dirname, `../../files/${file}`), projectName + `/.storybook/${file}`);
      });
    }
    filesToAddToMain.forEach(file => {
      fs.copySync(path.resolve(__dirname, `../../files/${file}`), projectName + `/${file}`);
    });
    filesToAddToContainers.forEach(file => {
      fs.copySync(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/containers/${file}`);
    });
    filesToAddToBuild.forEach(file => {
      fs.copySync(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/build/${file}`);
    });
    filesToAddToSrc.forEach(file => {
      fs.copySync(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/${file}`);
    });
    filestoAddToPages.forEach(file => {
      fs.copySync(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/pages/${file}`);
    });
    resolve('Finished Adding Files 👍');
  });
};

module.exports = {
  copyFiles,
  addGitKeep,
};