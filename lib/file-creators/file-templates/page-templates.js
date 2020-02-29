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

module.exports = {
  mainIndexFile,
  pageWrapper,
  materialEnhancerFile,
  jssEnhancerFile
};