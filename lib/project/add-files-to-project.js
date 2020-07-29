// NOTE: refactor this page - it works its just ugly
const path = require('path');
const fs = require('fs-extra');
const promiseFs = require('../util/promise-fs');

const filesToAddToMain = [
  'webpack.common.config.js',
  'webpack.dev.config.js',
  'webpack.production.config.js',
  'webpack.static.config.js',
  'tsconfig.json',
  'package.json',
  // '.gitignore',
  'jest.config.js',
  'index.d.ts',
  '.eslintignore',
  '.babelrc',
  'README.md'
];

const filestoAddStorybook = [
  'main.js',
];

/**
 * Copy a .gitkeep file to a given folder
 * @param {string} projectName user given name for the project - will be the parent folder name for the project
 * @param {string} folder folder name to place the git keep in
 */
const addGitKeep = (projectName, folder) => {
  fs.copySync(path.resolve(__dirname, '../../files/.gitkeep'), projectName + `/${folder}/.gitkeep`);
  // promiseFs.copyFile(path.resolve(__dirname, '../../files/.gitkeep'), projectName + `/${folder}/.gitkeep`);
};

/**
 * Return folder path for the given eslint styleguide
 * @param {string} styleGuideName 
 */
const getEslintFile = (styleGuideName) => {
  return `eslint/${styleGuideName}/.eslintrc`;
};

/**
 * Given the answer options, generate a list of the files to add
 * to the "src" folder in the project structure
 * @param {object} answers 
 */
const _getFilesToAddToSrc = (answers) => {
  const files = [
    'index.tsx',
    'serviceWorker.js',
    'build/index.html',
    'containers/Root.tsx',
    'pages/routes.tsx',
    'constants/route-paths.ts',
    'build/favicon.ico',
    'assets/styles/global.styles.js',
    'assets/styles/theme.ts',
    'assets/images/dark-squid-logo@2x.png',
    'pages/SamplePage/index.ts',
    'pages/SamplePage/SamplePage.enhancer.ts',
    'pages/SamplePage/component/SamplePage.styles.ts',
    'pages/SamplePage/component/SamplePage.tsx',
  ];
  if (answers.redux) {
    files.push('redux/sample.ts', 'redux/types.ts');
  }
  return files;
};

const filesToAddToScripts = [
  'scripts/index.js',
  'scripts/buildApp.js',
];

/**
 * Take the project config files and copy them over to the new project structure
 * @param projectName user given name for the project - will be the parent folder name for the project
 * @param answers object of the user's choice for the cli questions
 */
const copyFiles = async (projectName, answers) => {
  try {
    const filePromises = [];
    if (answers.storybook) {
      const storybook = await filestoAddStorybook.map(async file => (
        await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/.storybook/${file}`)
      ));
      filePromises.push(...storybook);
    }
    const promises = await filesToAddToMain.map(async file => (
      await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/${file}`)
    ));
    filePromises.push(...promises);

    const filesToAddToSrc = _getFilesToAddToSrc(answers);

    const srcPromises = await filesToAddToSrc.map(async file => {
      return await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/src/${file}`);
    });
    filePromises.push(...srcPromises);

    const eslint = async () => await promiseFs.copyFile(path.resolve(__dirname, `../../files/${getEslintFile(answers.eslint)}`), projectName + '/.eslintrc');
    filePromises.push(eslint());

    const script = await filesToAddToScripts.map(async file => (
      await promiseFs.copyFile(path.resolve(__dirname, `../../files/${file}`), projectName + `/${file}`)
    ));
    filePromises.push(...script);

    await Promise.all(filePromises);
    return 'Finished Adding Files';
  } catch (err) {
    console.log(err);
    throw 'Error Adding Files';
  }
};

module.exports = {
  copyFiles,
  addGitKeep,
  _getFilesToAddToSrc
};