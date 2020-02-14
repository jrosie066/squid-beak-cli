/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.substring(1);
};

const generateItemName = (name) => {
  if (name.includes('-')) {
    const splitName = name.split('-');
    return splitName.map(name => capitalizeName(name)).join('');
  }
  return capitalizeName(name);
};

const createIndexFile = (componentName, root) => {
  fs.writeFileSync(
    path.join(root, 'index.ts'),
    `import { ${componentName} } from './${componentName}';\n` +
    `import { enhance } from './${componentName}.enhancer';\n\n` +
    `export default enhance(${componentName});\n`
  );
  console.log(chalk.green(logSymbols.success, 'Index file created successfully'));
};

const createEnhancerFile = (componentName, root) => {
  fs.writeFileSync(
    path.join(root, `${componentName}.enhancer.ts`),
    'import { withStyles } from \'@material-ui/core/styles\';\n' +
    'import { memo, FunctionComponent } from \'react\';\n' +
    'import { compose } from \'redux\';\n' +
    `import { styles } from './${componentName}.styles';\n` +
    `import { Props } from './${componentName}';\n\n` +
    'const enhance = compose<FunctionComponent<Props>>(\n' +
    '\tmemo,\n' +
    '\twithStyles(styles),\n' +
    ');\n' +
    'export { enhance };\n'
  );
  console.log(chalk.green(logSymbols.success, 'Enhancer file created successfully'));
};

const createPageComponentFile = (componentName, root) => {
  fs.writeFileSync(
    path.join(root, `${componentName}.tsx`),
    'import React from \'react\';\n\n' +
    'export type Props = {\n' +
    '\tclasses: any;\n' +
    '}\n\n' +
    `const ${componentName} = (props: Props) => {\n` +
    '\tconst { classes } = props;\n' +
    '\treturn (\n' +
    '\t\t<div className={classes.root}>\n\t\tadd stuff here\t\t</div>\n' +
    '\t);\n' +
    '};\n\n' +
    `export { ${componentName} };\n`
  );
  console.log(chalk.green(logSymbols.success, 'Component file created successfully'));
};

const createStyleSheet = (componentName, root) => {
  fs.writeFileSync(
    path.join(root, `${componentName}.styles.ts`),
    'export const styles = theme => ({\n' +
    '\troot: {\n' +
    '\t},\n' +
    '});\n'
  );
  console.log(chalk.green(logSymbols.success, 'Stylesheet created successfully'));
};

module.exports = {
  capitalizeName,
  generateItemName,
  createIndexFile,
  createEnhancerFile,
  createPageComponentFile,
  createStyleSheet,
};
