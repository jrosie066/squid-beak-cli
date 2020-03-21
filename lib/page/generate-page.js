const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const pageFileCreator = require('./page-files');
const updater = require('../shared/update');
const lintRoller = require('../util/lint-roller');

/**
 * For the command generate [page], given the user's desired page name
 * create the skeleton for the page file structure
 * adds a main index file, a component folder/files and wrapper folder/files
 * updates the routes file and lint-rolls the files
 * @param {string} pageName 
 * @param {object} options 
 */
const initiatePage = (pageName, options) => {
  // TODO: all user to override where the page will go
  const root = path.resolve(`src/pages/${pageName}`);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(root)) {
      reject('Page already exists!!! 🤨\n\n');
    } else {
      logger.heading(`\nCreating new page named: ${pageName}\n`);
      // creating new directory
      fs.mkdirSync(root);
      if (options.useWrapper) {
        pageFileCreator.createPageWrapper(pageName, root);
      }
      // NOTE: may want to not have this index file and componenet folder geenerated
      // with no wrapper denoted
      pageFileCreator.createPageMain(pageName, root, options);
      pageFileCreator.createPageComponent(pageName, root, options);
      // tried doing Promise.all here but it messed with the logging and spinner
      updater.updateRoutes(pageName).then(() => {
        lintRoller(`src/pages/${pageName}`).then(() => {
          resolve(`\nPage ${pageName} created!`);
        })
          .catch(err => {
            logger.error(err);
            resolve('Clean up done with some errors');
          });
      }).catch(err => {
        reject(err);
      });
    }
  });

};

module.exports = initiatePage;