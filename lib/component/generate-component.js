const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs-extra');
const logger = require('../util/logger');
const sharedFiles = require('../shared/shared-files');
const lintRoller = require('../util/lint-roller');

/**
 * Given a name and options create componet folder structure
 * and starter files if the component name doesn't already exist
 * 
 * @param {string} componentName Pascal cased name of the component
 * @param {object} options command line options
 */
const createComponent = (componentName, options) => {
  console.log(options);
  const { newPath } = options;
  const componentPath = path ? `${newPath}/${componentName}` : `src/components/${componentPath}`;
  let root = path.resolve(componentPath);
  console.log(root);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(root)) {
      reject({
        remove: false,
        message: `\n\nError! Component ${componentName} already exists!!! 🤨\n\n`
      });
    } else {
      logger.heading(`\nCreating new component named: ${componentName}\n`);
      fs.mkdirSync(root, { recursive: true });
      if (options.useEnhancer) {
        sharedFiles.createComponentFile(componentName, root, options);
        sharedFiles.createEnhancerFile(componentName, root, options);
        sharedFiles.createStyleSheet(componentName, root, options);
        sharedFiles.createIndexFile(componentName, root, options);
      } else {
        sharedFiles.createComponentFile(componentName, root, options);
        sharedFiles.createStyleSheet(componentName, root, options);
      }
      if (options.useStorybook) {
        // add storybook file
        fs.mkdirSync(`${root}/test`);
        sharedFiles.createStorybookFile(componentName, root, options);
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
    }
  });
};
module.exports = createComponent;