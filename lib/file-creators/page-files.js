const path = require('path');
const fs = require('fs-extra');
const logSymbols = require('log-symbols');
const logger = require('../util/logger');
const sharedFiles = require('./shared-files');

const createPageIndexFile = (pageName, root) => {
  fs.writeFileSync(
    path.join(root, 'index.ts'),
    `import ${pageName} from './component';\n\n` +
    `export { ${pageName} };\n`
  );
  console.log(logger.success(logSymbols.success, 'Page index file created successfully'));
};

const createPageComponent = (pageName, root) => {
  const componentFolder = `${root}/component`;
  if (fs.existsSync(componentFolder)) {
    throw logger.error('Folder already exists\n\n');
  } else {
    fs.mkdirSync(componentFolder);
  }
  sharedFiles.createComponentFile(pageName, componentFolder);
  sharedFiles.createEnhancerFile(pageName, componentFolder);
  sharedFiles.createStyleSheet(pageName, componentFolder);
  sharedFiles.createIndexFile(pageName, componentFolder);
};

const createPageWrapper = (pageName, root) => {
  const wrapperFolder = `${root}/wrapper`;
  const wrapperName = `${pageName}Wrapper`;
  fs.mkdirSync(wrapperFolder);
  fs.writeFileSync(
    path.join(wrapperFolder, `${wrapperName}.tsx`),
    'import React from \'react\';\n\n' +
    'type Props = {\n' +
    '}\n\n' +
    // TODO: type component
    `const ${wrapperName} = (WrappedComponent: any) => {\n` +
    `\tconst ${pageName}PageWrapper = (props: Props) => {\n` +
    '\t\treturn <WrappedComponent {...props} />;\n' +
    '\t};\n' +
    `\treturn ${pageName}PageWrapper;\n` +
    '}\n' +
    `export { ${wrapperName} };\n`
  );
  console.log(logger.success(logSymbols.success, 'Wrapper structure created successfully'));
};
module.exports = {
  createPageIndexFile,
  createPageComponent,
  createPageWrapper,
};
