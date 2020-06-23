const fs = require('fs-extra');
const path = require('path');
const logger = require('../util/logger');
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
  logger.stepSuccess('Index file created successfully');
};

/**
 * 
 * @param {string} componentName user given name of the component - formatted
 * @param {string} root path to the component folder
 * @param {*} options 
 */
const createEnhancerFile = (componentName, root, options) => {
  const { useMaterial } = options;
  fs.writeFileSync(
    path.join(root, `${componentName}.enhancer.ts`),
    useMaterial
      ? templates.materialEnhancerFile(componentName) : templates.jssEnhancerFile(componentName)
  );
  logger.stepSuccess('Enhancer file created successfully');
};

/**
 * 
 * @param {string} componentName user given name of the component - formatted
 * @param {string} root path to the component folder
 * @param {*} options 
 */
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
  logger.stepSuccess('Component file created successfully');
};

/**
 * 
 * @param {string} componentName user given name of the component - formatted
 * @param {string} root path to the component folder
 * @param {*} options 
 */
const createStyleSheet = (componentName, root, options) => {
  const { useMaterial } = options;
  fs.writeFileSync(
    path.join(root, `${componentName}.styles.ts`),
    useMaterial
      ? templates.materialStyleSheet() : templates.jssStyleSheet()
  );
  logger.stepSuccess('Stylesheet created successfully');
};

/**
 * 
 * @param {string} componentName user given name of the component - formatted
 * @param {string} root path to the component folder
 * @param {*} options 
 */
const createStorybookFile = (componentName, root, options) => {
  fs.writeFileSync(
    path.join(root, `test/${componentName}.stories.tsx`),
    templates.storybookTestFile(componentName, options)
  );
  logger.stepSuccess('Storybook test created successfully');
};

module.exports = {
  createIndexFile,
  createEnhancerFile,
  createComponentFile,
  createStyleSheet,
  createStorybookFile,
};