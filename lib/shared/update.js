const path = require('path');
const logger = require('../util/logger');
const promiseFs = require('../util/promise-fs');

const updateRoutes = async (pageName) => {
  const routeFile = path.resolve(process.cwd(), 'src/pages/routes.tsx');
  try {
    let data = await promiseFs.readFile(routeFile);
    data = data.toString();
    const addImport =
    `import {${pageName}} from './${pageName}';\n`;
    const importSearchItem = 'export';
    data = _insertIntoFile(data, addImport, importSearchItem);
    const route = pageName.toLowerCase();
    const addComponent =
      `  {
           component: ${pageName},
           path: '/${route}',
         },\r
      `;
    const componentSearchItem = '].';
    data = _insertIntoFile(data, addComponent, componentSearchItem);
    promiseFs.writeFile(routeFile, data);
    logger.stepSuccess('Routes successfully updated');
  } catch (err) {
    logger.error('Could not read/write the file');
    throw err;
  }
};

const updatePackageJson = async (pageName) => {
  const packageJsonFile = path.resolve(process.cwd(), './package.json');
  try {
    let data = await promiseFs.readFile(packageJsonFile);
    data = data.toString();
    const newItem = `${pageName}`;
    const replaceItem = 'react-starter';
    data = _replaceItemInFile(data, newItem, replaceItem);
    promiseFs.writeFile(packageJsonFile, data);
    logger.stepSuccess('Package Name successfully updated');
  } catch (err) {
    logger.error('Could not read/write packageJson file');
    throw err;
  }
};

const _insertIntoFile = (file, insertItem, searchItem) => {
  const position = file.search(searchItem);
  console.log(position);
  const updatedFile = [file.slice(0, position), insertItem, file.slice(position)].join('');
  return updatedFile;
};

const _replaceItemInFile = (file, newItem, oldItem) => {
  const updatedFile = file.replace(oldItem, newItem);
  return updatedFile;
};

module.exports = {
  updateRoutes,
  updatePackageJson
};