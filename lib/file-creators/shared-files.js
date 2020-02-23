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
    `import { ${componentName} } from './${componentName}';\n` +
    `import { enhance } from './${componentName}.enhancer';\n\n` +
    `export default enhance(${componentName});\n`
  );
  console.log(logger.success(logSymbols.success, 'Index file created successfully'));
};

const createEnhancerFile = (componentName, root, options) => {
  const { useMaterial } = options;
  fs.writeFileSync(
    path.join(root, `${componentName}.enhancer.ts`),
    useMaterial
      ? templates.materialEnhancerFile(componentName) : templates.jssEnhancerFile(componentName)
  );
  console.log(logger.success(logSymbols.success, 'Enhancer file created successfully'));
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
  console.log(logger.success(logSymbols.success, 'Component file created successfully'));
};

const createStyleSheet = (componentName, root, options) => {
  const { useMaterial } = options;
  fs.writeFileSync(
    path.join(root, `${componentName}.styles.ts`),
    useMaterial
      ? templates.materialStyleSheet() : templates.jssStyleSheet()
  );
  console.log(logger.success(logSymbols.success, 'Stylesheet created successfully'));
};

module.exports = {
  createIndexFile,
  createEnhancerFile,
  createComponentFile,
  createStyleSheet
};