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
      reject('Component already exists!!! 🤨\n\n');
    } else {
      const initMsg = `Creating new component named: ${componentName}\n`;
      logger.info(initMsg);
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
      // add storybook file
      fs.mkdirSync(`${root}/test`);
      sharedFiles.createStorybookFile(componentName, root, options);
      resolve(`\nComponent ${componentName} created!`);
    }
  });
};
module.exports = createComponent;