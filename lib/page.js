/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const {
  generateItemName,
  createIndexFile,
  createPageComponentFile,
  createEnhancerFile,
  createStyleSheet,
} = require('./util');

const createPageIndexFile = (pageName, root) => {
  fs.writeFileSync(
    path.join(root, 'index.ts'),
    `import ${pageName} from './component';\n\n` +
    `export { ${pageName} };\n`
  );
  console.log(chalk.green(logSymbols.success, 'Page index file created successfully'));
};

const createComponent = (pageName, root) => {
  const componentFolder = `${root}/component`;
  if (fs.existsSync(componentFolder)) {
    throw chalk.bgRed('Folder already exists\n\n');
  } else {
    fs.mkdirSync(componentFolder);
  }
  createPageComponentFile(pageName, componentFolder);
  createEnhancerFile(pageName, componentFolder);
  createStyleSheet(pageName, componentFolder);
  createIndexFile(pageName, componentFolder);
};

const createWrapper = (pageName, root) => {
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
  console.log(chalk.green(logSymbols.success, 'Wrapper structure created successfully'));
};
const initiatePage = (pageName, options) => {
  console.log(options);
  const formattedPageName = generateItemName(pageName);
  const root = path.resolve(`src/pages/${formattedPageName}`);
  if (fs.existsSync(root)) {
    throw chalk.bgRed('Page already exists!!! :(\n\n');
  } else {
    console.log(chalk.bold.magentaBright('Creating new page named:', `${formattedPageName}\n`));
    // creating new directory
    fs.mkdirSync(root);
  }

  createPageIndexFile(formattedPageName, root);
  createComponent(formattedPageName, root);
  createWrapper(formattedPageName, root);
  console.log(chalk.cyanBright(`\nPage ${formattedPageName} created!`));
};

module.exports = { initiatePage };
