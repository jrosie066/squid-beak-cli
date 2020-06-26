const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const sharedFiles = require('../shared/shared-files');
const lintRoller = require('../util/lint-roller');
const promiseFs = require('../util/promise-fs');

/**
 * Helper function to bundle calls needed to make a component with the enhancer pattern
 * @param {string} componentName Pascal cased name of the component
 * @param {string} root absolute path the component will be created
 * @param {object} options command line options
 */
const _setupComponentWithEnhancer = (componentName, root, options) => {
  sharedFiles.createComponentFile(componentName, root, options);
  sharedFiles.createEnhancerFile(componentName, root, options);
  sharedFiles.createStyleSheet(componentName, root, options);
  sharedFiles.createIndexFile(componentName, root, options);
};

/**
 * Helper function to bundle calls needed to make a component
 * @param {string} componentName Pascal cased name of the component
 * @param {string} root absolute path the component will be created
 * @param {object} options command line options
 */
const _setupComponentNoEnhancer = (componentName, root, options) => {
  sharedFiles.createComponentFile(componentName, root, options);
  sharedFiles.createStyleSheet(componentName, root, options);
};

/**
 * Helper function to set up folder and storybook file
 * @param {string} componentName Pascal cased name of the component
 * @param {string} root absolute path the component will be created
 * @param {object} options command line options
 */
const _createStoryBookFiles = (componentName, root, options) => {
  // add storybook file
  fs.mkdirSync(`${root}/test`, { recursive: true });
  sharedFiles.createStorybookFile(componentName, root, options);
};

/**
 * Given a name and options create componet folder structure
 * and starter files if the component name doesn't already exist
 * 
 * @param {string} componentName Pascal cased name of the component
 * @param {object} options command line options
 */
const createComponent = (componentName, options) => {
  const { newPath } = options;
  // determine if user has entered own path
  const componentPath = path ? `${newPath}/${componentName}` : `src/components/${componentPath}`;
  let root = path.resolve(componentPath);

  return new Promise((resolve, reject) => {
    // return error if path already exists
    if (fs.existsSync(root)) {
      reject({
        remove: false,
        message: `\n\nError! Component ${componentName} already exists!!! 🤨\n\n`
      });
    } else {
      logger.heading(`\nCreating new component named: ${componentName}\n`);
      promiseFs.mkDir(root, { recursive: true }).then(() => {
        // set up component file pattern
        if (options.useEnhancer) {
          _setupComponentWithEnhancer(componentName, root, options);
        } else {
          _setupComponentNoEnhancer(componentName, root, options);
        }
        if (options.useStorybook) {
          _createStoryBookFiles(componentName, root, options);
        }
        lintRoller(componentPath).then(() => {
          resolve(`\nComponent ${componentName} created!`);
        }).catch(err => {
          logger.error(err);
          reject({
            remove: false,
            message: `\nError creating component: ${componentName}`
          });
        });
      }).catch(() => {
        reject({
          remove: true,
          message: 'There was an error creating this path',
        });
      });
    }
  });
};
module.exports = {
  createComponent,
  _setupComponentWithEnhancer,
  _createStoryBookFiles,
  _setupComponentNoEnhancer
};