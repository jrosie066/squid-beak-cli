const mainIndexFile = (pageName) => (
  `import ${pageName} from './component';\n\n` +
  `export { ${pageName} };\n`
);

exports = {
  mainIndexFile,
};