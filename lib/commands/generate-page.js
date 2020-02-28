const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const { generateItemName } = require('../util/format');
const pageFileCreator = require('../file-creators/page-files');

/**
 * For the command generate [page], given the user's desired page name
 * create the skeleton for the page file structure
 * adds a main index file, a component folder/files and wrapper folder/files
 * @param {string} pageName 
 * @param {object} options 
 */
const initiatePage = (pageName, options) => {
  const formattedPageName = generateItemName(pageName);
  // TODO: all user to override where the page will go
  const root = path.resolve(`src/pages/${formattedPageName}`);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(root)) {
      reject('Page already exists!!! 🤨\n\n');
    } else {
      logger.heading(`Creating new page named: ${formattedPageName}\n`);
      // creating new directory
      fs.mkdirSync(root);
      if (options.useWrapper) {
        pageFileCreator.createPageWrapper(formattedPageName, root);
      }
      pageFileCreator.createPageIndexFile(formattedPageName, root);
      pageFileCreator.createPageComponent(formattedPageName, root, options);
      resolve(`\nPage ${formattedPageName} created!`);
    }
  });

};

module.exports = initiatePage;