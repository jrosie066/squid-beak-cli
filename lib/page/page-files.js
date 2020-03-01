const path = require('path');
const fs = require('fs-extra');
const logger = require('../util/logger');
const sharedFiles = require('../shared/shared-files');
const pageTemplates = require('./page-templates');
const templates = require('../shared/file-templates');

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
    createPageEnhancerFile(pageName, componentFolder, options);
  }
  createPageComponentFile(pageName, componentFolder, options);
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

const createPageEnhancerFile = (componentName, root, options) => {
  const { useMaterial, useWrapper } = options;
  let component;
  if (useMaterial && useWrapper) {
    component = pageTemplates.materialEnhancerFile(componentName);
  } else if (useMaterial && !useWrapper) {
    component = templates.materialEnhancerFile(componentName);
  } else if (!useMaterial && useWrapper) {
    component = pageTemplates.jssEnhancerFile(componentName);
  } else {
    component = templates.jssEnhancerFile(componentName);
  }
  fs.writeFileSync(
    path.join(root, `${componentName}.enhancer.ts`),
    component
  );
  logger.stepSuccess('Enhancer file created successfully');
};

const createPageComponentFile = (componentName, root, options) => {
  const { useWrapper, useEnhancer, useMaterial } = options;
  if (useWrapper && !useEnhancer) {
    let component;
    if (useMaterial) {
      component = pageTemplates.noEnhancerMaterialWrapperComponentFile(componentName);
    } else {
      component = pageTemplates.noEnhancerJssWrapperComponentFile(componentName);
    }
    fs.writeFileSync(
      path.join(root, `${componentName}.tsx`),
      component
    );
    logger.stepSuccess('Component file created successfully');
  } else {
    sharedFiles.createComponentFile(componentName, root, options);
  }
};
module.exports = {
  createPageIndexFile,
  createPageComponent,
  createPageWrapper,
  createPageEnhancerFile,
  createPageComponentFile
};
