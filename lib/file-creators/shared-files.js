const fs = require('fs-extra');
const path = require('path');
const logger = require('../util/logger');
const logSymbols = require('log-symbols');
const templates = require('./file-templates');

/**
 * Creates the main index file with the enhancer
 * @param {string} componentName user given name of the component - formatted
 * @param {string} root path to the component folder
 */
const createIndexFile = (componentName, root) => {
  fs.writeFileSync(
    path.join(root, 'index.ts'),
    templates.indexFile(componentName)
  );
  logger.success(`${logSymbols.success} Index file created successfully`);
};

const createEnhancerFile = (componentName, root, options) => {
  const { useMaterial } = options;
  fs.writeFileSync(
    path.join(root, `${componentName}.enhancer.ts`),
    useMaterial
      ? templates.materialEnhancerFile(componentName) : templates.jssEnhancerFile(componentName)
  );
  logger.success(`${logSymbols.success} Enhancer file created successfully`);
};

const createPageEnhancerFile = (componentName, root, options) => {
  const { useMaterial, useWrapper } = options;
  let component;
  if (useMaterial && useWrapper) {
    component = templates.pageWrapperMaterialEnhancerFile(componentName);
  } else if ( useMaterial && !useWrapper){
    component = templates.materialEnhancerFile(componentName);
  } else if (!useMaterial && useWrapper) {
    component = templates.pageWrapperJssEnhancerFile(componentName);
  } else {
    component = templates.jssEnhancerFile(componentName);
  }
  fs.writeFileSync(
    path.join(root, `${componentName}.enhancer.ts`),
    component
  );
  logger.success(`${logSymbols.success} Enhancer file created successfully`);
};

const createComponentFile = (componentName, root, options) => {
  const { useMaterial, useEnhancer } = options;
  let component;
  if (useEnhancer && useMaterial) {
    component = templates.materialComponentFile(componentName);
  } else if (useEnhancer && !useMaterial) {
    component = templates.jssComponentFile(componentName);
  } else if (!useEnhancer && useMaterial) {
    component = templates.noEnhancerMaterialComponentFile(componentName);
  } else {
    component = templates.noEnhancerJssComponentFile(componentName);
  }

  fs.writeFileSync(
    path.join(root, `${componentName}.tsx`),
    component
  );
  logger.success(`${logSymbols.success} Component file created successfully`);
};

const createStyleSheet = (componentName, root, options) => {
  const { useMaterial } = options;
  fs.writeFileSync(
    path.join(root, `${componentName}.styles.ts`),
    useMaterial
      ? templates.materialStyleSheet() : templates.jssStyleSheet()
  );
  logger.success(`${logSymbols.success} Stylesheet created successfully`);
};

const createStorybookFile = (componentName, root, options) => {
  fs.writeFileSync(
    path.join(root, `test/${componentName}.stories.js`),
    templates.storybookFile(componentName, options)
  );
  logger.success(`${logSymbols.success} Storybook test created successfully`);
};

module.exports = {
  createIndexFile,
  createEnhancerFile,
  createComponentFile,
  createStyleSheet,
  createStorybookFile,
  createPageEnhancerFile
};