const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const sharedFiles = require('../shared/shared-files');
const pageTemplates = require('./page-templates');
const templates = require('../shared/file-templates');

/**
 * Write a new index file to system
 * Main index file for exporting the page
 * @param {string} pageName use given page name
 * @param {string} root root folder for file
 */
const createPageMain = (pageName, root, options) => {
  const { useEnhancer } = options;
  if (useEnhancer) {
    createPageEnhancerFile(pageName, root, options);
    fs.writeFileSync(
      path.join(root, 'index.ts'),
      pageTemplates.indexWithEnhancerFile(pageName),
    );
  } else {
    fs.writeFileSync(
      path.join(root, 'index.ts'),
      pageTemplates.indexFileNoEnhancer(pageName),
    );
  }

  logger.stepSuccess('Page index file created successfully');
};

/**
 * Create folder structure for component portion
 * of the page structure. Add the appropriate files
 * @param {string} pageName use given page name
 * @param {string} root root folder for file
 * @param {object} options 
 */
const createPageComponent = (pageName, root, options) => {
  const componentFolder = `${root}/component`;
  if (fs.existsSync(componentFolder)) {
    throw 'Folder already exists\n\n';
  } else {
    fs.mkdirSync(componentFolder);
  }
  createPageComponentFile(pageName, componentFolder, options);
  sharedFiles.createStyleSheet(pageName, componentFolder, options);
};

/**
 * Write new higher order component to system
 * Functional component for page functions
 * @param {string} pageName use given page name
 * @param {string} root root folder for file
 */
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

/**
 * Write enhancer file to the system
 * A file to combine all of the HOCs to wrap the presentional 
 * component
 * @param {string} pageName use given page name
 * @param {string} root root folder for file
 * @param {*} options 
 */
const createPageEnhancerFile = (pageName, root, options) => {
  const { useMaterial, useWrapper } = options;
  let component;
  if (useMaterial && useWrapper) {
    component = pageTemplates.materialEnhancerFile(pageName);
  } else if (useMaterial && !useWrapper) {
    component = templates.materialEnhancerFile(pageName);
  } else if (!useMaterial && useWrapper) {
    component = pageTemplates.jssEnhancerFile(pageName);
  } else {
    component = templates.jssEnhancerFile(pageName);
  }
  fs.writeFileSync(
    path.join(root, `${pageName}.enhancer.ts`),
    component
  );
  logger.stepSuccess('Enhancer file created successfully');
};

/**
 * Write a new component file to system
 * Presentational component for a page with option to allow 
 * enhancer pattern to be created as well
 * @param {string} pageName use given page name
 * @param {string} root root folder for file
 * @param {object} options 
 */
const createPageComponentFile = (pageName, root, options) => {
  const { useWrapper, useEnhancer, useMaterial } = options;
  if (useWrapper && !useEnhancer) {
    let component;
    if (useMaterial) {
      component = pageTemplates.noEnhancerMaterialWrapperComponentFile(pageName);
    } else {
      component = pageTemplates.noEnhancerJssWrapperComponentFile(pageName);
    }
    fs.writeFileSync(
      path.join(root, `${pageName}.tsx`),
      component
    );
    logger.stepSuccess('Component file created successfully');
  } else {
    sharedFiles.createComponentFile(pageName, root, options);
  }
};
module.exports = {
  createPageMain,
  createPageComponent,
  createPageWrapper,
  createPageEnhancerFile,
  createPageComponentFile
};
