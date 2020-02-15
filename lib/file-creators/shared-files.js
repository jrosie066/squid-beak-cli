const fs = require('fs-extra');
const path = require('path');
const logger = require('../util/logger');
const logSymbols = require('log-symbols');


const createIndexFile = (componentName, root) => {
  fs.writeFileSync(
    path.join(root, 'index.ts'),
    `import { ${componentName} } from './${componentName}';\n` +
    `import { enhance } from './${componentName}.enhancer';\n\n` +
    `export default enhance(${componentName});\n`
  );
  console.log(logger.success(logSymbols.success, 'Index file created successfully'));
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
  console.log(logger.success(logSymbols.success, 'Enhancer file created successfully'));
};
const createComponentFile = (componentName, root) => {
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
  console.log(logger.success(logSymbols.success, 'Component file created successfully'));
};

const createStyleSheet = (componentName, root) => {
  fs.writeFileSync(
    path.join(root, `${componentName}.styles.ts`),
    'export const styles = theme => ({\n' +
    '\troot: {\n' +
    '\t},\n' +
    '});\n'
  );
  console.log(logger.success(logSymbols.success, 'Stylesheet created successfully'));
};

module.exports = {
  createIndexFile,
  createEnhancerFile,
  createComponentFile,
  createStyleSheet
};