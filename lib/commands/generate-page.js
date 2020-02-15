const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const { generateItemName } = require('../util/format');
const {
  createPageIndexFile,
  createPageComponent,
  createPageWrapper,
} = require('../file-creators/page-files');

const initiatePage = (pageName, options) => {
  console.log(options);
  const formattedPageName = generateItemName(pageName);
  // TODO: all user to override where the page will go
  const root = path.resolve(`src/pages/${formattedPageName}`);
  if (fs.existsSync(root)) {
    throw logger.error('Page already exists!!! :(\n\n');
  } else {
    console.log(logger.heading('Creating new page named:', `${formattedPageName}\n`));
    // creating new directory
    fs.mkdirSync(root);
  }
  createPageIndexFile(formattedPageName, root);
  createPageComponent(formattedPageName, root);
  createPageWrapper(formattedPageName, root);
  console.log(logger.info(`\nPage ${formattedPageName} created!`));
};

module.exports = initiatePage;