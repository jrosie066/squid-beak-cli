const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const sharedFiles = require('../shared/shared-files');
const pageTemplates = require('./page-templates');

const createPageIndexFile = (pageName, root) => {
  fs.writeFileSync(
    path.join(root, 'index.ts'),
    pageTemplates.mainIndexFile(pageName),
  );
  logger.stepSuccess('Page index file created successfully');
};

const createPageComponent = (pageName, root, options) => {
  const componentFolder = `${root}/component`;
  if (fs.existsSync(componentFolder)) {
    throw 'Folder already exists\n\n';
  } else {
    fs.mkdirSync(componentFolder);
  }
  const { useEnhancer } = options;
  if (useEnhancer) {
    sharedFiles.createIndexFile(pageName, componentFolder, options);
    sharedFiles.createPageEnhancerFile(pageName, componentFolder, options);
  }
  sharedFiles.createPageComponentFile(pageName, componentFolder, options);
  sharedFiles.createStyleSheet(pageName, componentFolder, options);
  
};

const createPageWrapper = (pageName, root) => {
  const wrapperFolder = `${root}/wrapper`;
  const wrapperName = `${pageName}Wrapper`;
  fs.mkdirSync(wrapperFolder);
  fs.writeFileSync(
    path.join(wrapperFolder, `${wrapperName}.tsx`),
    pageTemplates.pageWrapper(pageName, wrapperName),
  );
  logger.stepSuccess('Wrapper structure created successfully');
};
module.exports = {
  createPageIndexFile,
  createPageComponent,
  createPageWrapper,
};
