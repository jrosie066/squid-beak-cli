const mainIndexFile = (pageName) => (
  `import ${pageName} from './component';\n\n` +
  `export { ${pageName} };\n`
);

const pageWrapper = (pageName, wrapperName) => (
  'import React from \'react\';\n\n' +
  'type Props = {\n' +
  '}\n\n' +
  // TODO: type component
  `const ${wrapperName} = (WrappedComponent: any) => {\n` +
  `\tconst ${pageName}PageWrapper = (props: Props) => {\n` +
  '\t\treturn <WrappedComponent {...props} />;\n' +
  '\t};\n' +
  `\treturn ${pageName}PageWrapper;\n` +
  '};\n' +
  `export { ${wrapperName} };\n`
);

// Page Enhancer: ✅ Wrapper, ✅ Material
const materialEnhancerFile = (componentName) => (
  'import { withStyles } from \'@material-ui/core/styles\';\n' +
  'import { memo, FunctionComponent } from \'react\';\n' +
  'import { compose } from \'redux\';\n' +
  `import { styles } from './${componentName}.styles';\n` +
  `import { ${componentName}Wrapper } from '../wrapper/${componentName}Wrapper';\n` +
  `import { Props } from './${componentName}';\n\n` +
  'const enhance = compose<FunctionComponent<Props>>(\n' +
  '\tmemo,\n' +
  '\twithStyles(styles),\n' +
  `\t${componentName}Wrapper\n` +
  ');\n' +
  'export { enhance };\n'
);

// Page Enhancer: ✅ Wrapper, ❌ Material
const jssEnhancerFile = (componentName) => (
  'import { memo, FunctionComponent } from \'react\';\n' +
  'import { compose } from \'redux\';\n' +
  `import { ${componentName}Wrapper } from '../wrapper/${componentName}Wrapper';\n` +
  `import { Props } from './${componentName}';\n\n` +
  'const enhance = compose<FunctionComponent<Props>>(\n' +
  '\tmemo,\n' +
  `\t${componentName}Wrapper\n` +
  ');\n' +
  'export { enhance };\n'
);

const noEnhancerMaterialWrapperComponentFile = (componentName) => (
  'import React, { memo } from \'react\';\n' +
  'import { withStyles } from \'@material-ui/core/styles\';\n' +
  `import { ${componentName}Wrapper} from '../wrapper/${componentName}Wrapper';\n\n` +
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
  `${componentName} = memo(${componentName});\n` +
  `${componentName} = withStyles(${componentName});\n` +
  `${componentName} = ${componentName}Wrapper(${componentName});\n` +
  `export default ${componentName};\n`
);

const noEnhancerJssWrapperComponentFile = (componentName) => (
  'import React, { memo } from \'react\';\n' +
  `import { useStyles } from './${componentName}.styles;'\n` +
  `import { ${componentName}Wrapper} from '../wrapper/${componentName}Wrapper';\n\n` +
  'export type Props = {\n' +
  '}\n\n' +
  `let ${componentName};\n` +
  `${componentName} = (props: Props) => {\n` +
  'const classes = useStyles();\n' +
  '\treturn (\n' +
  '\t\t<div className={classes.root}>\n' +
  '\t\t\tadd stuff here\n' +
  '\t\t</div>\n' +
  '\t);\n' +
  '};\n\n' +
  `${componentName} = memo(${componentName});\n` +
  `${componentName} = ${componentName}Wrapper(${componentName});\n` +
  `export default ${componentName};\n`
);

module.exports = {
  mainIndexFile,
  pageWrapper,
  materialEnhancerFile,
  jssEnhancerFile,
  noEnhancerMaterialWrapperComponentFile,
  noEnhancerJssWrapperComponentFile
};