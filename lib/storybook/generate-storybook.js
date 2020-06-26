const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const { generateItemName } = require('../util/format');

// TODO: need to finish
/**
 * Create a new storybook test for a given component name
 * @param {string} name name of test
 */
const createStorybookTest = (name) => {
  const testName = generateItemName(name);
  let root = path.resolve(`src/components/${testName}/tests`);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(root)) {
      reject(`\n\nError! Component ${name} already exists!!! 🤨\n\n`);
    } else {
      logger.info(`Creating new storybook test: ${testName}`);
      fs.mkdirSync(root);
    }
  });
};

module.exports = createStorybookTest;