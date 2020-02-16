const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const { generateItemName } = require('../util/format');
const sharedFiles = require('../file-creators/shared-files');

const createComponent = (name) => {
  const componentName = generateItemName(name);
  let root = path.resolve(`src/components/${componentName}`);

  console.log(logger.info('Creating new component named:', `${componentName}\n`));
  if (fs.existsSync(root)) {
    throw logger.error('Component already exists!!! :(\n\n');
  } else {
    console.log(logger.info('Creating new component named:', `${componentName}\n`));
    fs.mkdirSync(root);
  }

  sharedFiles.createComponentFile(componentName, root);
  sharedFiles.createEnhancerFile(componentName, root);
  sharedFiles.createStyleSheet(componentName, root);
  sharedFiles.createIndexFile(componentName, root);

  console.log(logger.success(`\nComponent ${componentName} created!`));
};
module.exports = { createComponent };