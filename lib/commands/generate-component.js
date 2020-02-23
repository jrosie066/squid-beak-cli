const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const { generateItemName } = require('../util/format');
const sharedFiles = require('../file-creators/shared-files');

const createComponent = (name, options) => {
  const componentName = generateItemName(name);
  let root = path.resolve(`src/components/${componentName}`);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(root)) {
      reject(logger.error('Component already exists!!! 🤨\n\n'));
    } else {
      console.log(logger.info('Creating new component named:', `${componentName}\n`));
      fs.mkdirSync(root);
      if (options.useEnhancer) {
        sharedFiles.createComponentFile(componentName, root, options);
        sharedFiles.createEnhancerFile(componentName, root, options);
        sharedFiles.createStyleSheet(componentName, root, options);
        sharedFiles.createIndexFile(componentName, root, options);
      } else {
        sharedFiles.createComponentFile(componentName, root, options);
        sharedFiles.createStyleSheet(componentName, root, options);
      }

      resolve(logger.success(`\nComponent ${componentName} created!`));
    }
  });
};
module.exports = createComponent;