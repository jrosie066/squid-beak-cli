const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const { generateItemName } = require('../util/format');
const pageFileCreator = require('./page-files');
const updater = require('../shared/update');

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
      logger.heading(`\nCreating new page named: ${formattedPageName}\n`);
      // creating new directory
      fs.mkdirSync(root);
      if (options.useWrapper) {
        pageFileCreator.createPageWrapper(formattedPageName, root);
      }
      // NOTE: may want to not have this index file and componenet folder geenerated
      // with no wrapper denoted
      pageFileCreator.createPageIndexFile(formattedPageName, root);
      pageFileCreator.createPageComponent(formattedPageName, root, options);
      updater.updateRoutes(formattedPageName);
      resolve(`\nPage ${formattedPageName} created!`);
    }
  });

};

module.exports = initiatePage;