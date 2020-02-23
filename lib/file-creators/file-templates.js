// Component File: ✅ Enhancer, ✅ Material
const materialComponentFile = (componentName) => (
  'import React from \'react\';\n\n' +
  'export type Props = {\n' +
  '\tclasses: any;\n' +
  '}\n\n' +
  `const ${componentName} = (props: Props) => {\n` +
  '\tconst { classes } = props;\n' +
  '\treturn (\n' +
  '\t\t<div className={classes.root}>\n' +
  '\t\t\tadd stuff here\n' +
  '\t\t</div>\n' +
  '\t);\n' +
  '};\n\n' +
  `export { ${componentName} };\n`
);

// Component File: ❌ Enhancer, ✅ Material
const noEnhancerMaterialComponentFile = (componentName) => (
  'import React, { memo } from \'react\';\n' +
  'import { withStyles } from \'@material-ui/core/styles\';\n\n' +
  'export type Props = {\n' +
  '\tclasses: any;\n' +
  '}\n\n' +
  `let ${componentName};\n` +
  `${componentName} = (props: Props) => {\n` +
  '\tconst { classes } = props;\n' +
  '\treturn (\n' +
  '\t\t<div className={classes.root}>\n' +
  '\t\t\tadd stuff here\n' +
  '\t\t</div>\n' +
  '\t);\n' +
  '};\n\n' +
  `${componentName} = withStyles(${componentName});\n` +
  `${componentName} = memo(${componentName});\n` +
  `export default ${componentName}\n`
);

// Component File: ✅ Enhancer, ❌ Material
const jssComponentFile = (componentName) => (
  'import React from \'react\';\n' +
  `import { useStyles } from './${componentName}.styles'\n\n` +
  'export type Props = {\n' +
  '}\n\n' +
  `const ${componentName} = (props: Props) => {\n` +
  'const classes = useStyles();\n' +
  '\treturn (\n' +
  '\t\t<div className={classes.root}>\n' +
  '\t\t\tadd stuff here\n' +
  '\t\t</div>\n' +
  '\t);\n' +
  '};\n\n' +
  `export { ${componentName} };\n`
);

// Component File: ❌ Enhancer, ❌ Material
const noEnhancerJssComponentFile = (componentName) => (
  'import React, { memo } from \'react\';\n' +
  `import { useStyles } from './${componentName}.styles'\n\n` +
  'export type Props = {\n' +
  '}\n\n' +
  `const ${componentName} = (props: Props) => {\n` +
  'const classes = useStyles();\n' +
  '\treturn (\n' +
  '\t\t<div className={classes.root}>\n' +
  '\t\t\tadd stuff here\n' +
  '\t\t</div>\n' +
  '\t);\n' +
  '};\n\n' +
  `export default memo(${componentName});\n`
);

const materialEnhancerFile = (componentName) => (
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

const jssEnhancerFile = (componentName) => (
  'import { memo, FunctionComponent } from \'react\';\n' +
  'import { compose } from \'redux\';\n' +
  `import { Props } from './${componentName}';\n\n` +
  'const enhance = compose<FunctionComponent<Props>>(\n' +
  '\tmemo,\n' +
  ');\n' +
  'export { enhance };\n'
);

const materialStyleSheet = () => (
  'export const styles = theme => ({\n' +
  '\troot: {\n' +
  '\t},\n' +
  '});\n'
);

const jssStyleSheet = () => (
  'import { createUseStyles } from \'react-jss\';\n\n' +
  'export const useStyles = createUseStyles({\n' +
  '\troot: {\n' +
  '\t},\n' +
  '});\n'
);


module.exports = {
  materialComponentFile,
  jssComponentFile,
  materialEnhancerFile,
  jssEnhancerFile,
  materialStyleSheet,
  jssStyleSheet,
  noEnhancerJssComponentFile,
  noEnhancerMaterialComponentFile
};
