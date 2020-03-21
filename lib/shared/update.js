const path = require('path');
const logger = require('../util/logger');
const promiseFs = require('../util/promise-fs');

/**
 * When adding a new page to allow user to use the page need to add it to the router.
 * This adds the component with a route of the page name (lower case) to the route list
 * @param {string} pageName page to be added to the routes file
 */
const updateRoutes = async (pageName) => {
  const routeFile = path.resolve(process.cwd(), 'src/pages/routes.tsx');
  try {
    let data = await promiseFs.readFile(routeFile);
    data = data.toString();
    const addImport =
    `import ${pageName} from './${pageName}';\n`;
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

/**
 * When creating a new project need to have the name in the package.json
 * reflect that project name. Read the file, replace the existing project name
 * and replace with the given project name
 * @param {string} pageName 
 */
const updatePackageJson = async (projectName) => {
  const packageJsonFile = path.resolve(process.cwd(), './package.json');
  try {
    let data = await promiseFs.readFile(packageJsonFile);
    data = data.toString();
    const newItem = `${projectName}`;
    const replaceItem = 'react-starter';
    data = _replaceItemInFile(data, newItem, replaceItem);
    promiseFs.writeFile(packageJsonFile, data);
    logger.stepSuccess('Package Name successfully updated');
  } catch (err) {
    logger.error('Could not read/write packageJson file');
    throw err;
  }
};

/**
 * Given the file contents split the string on the given spot and insert 
 * the new item into the string
 * @param {string} file stringified version of the file
 * @param {string} insertItem what is getting inserted into the file
 * @param {string} searchItem item in file used as reference to splice the file string
 */
const _insertIntoFile = (file, insertItem, searchItem) => {
  const position = file.search(searchItem);
  const updatedFile = [file.slice(0, position), insertItem, file.slice(position)].join('');
  return updatedFile;
};

/**
 * A string replacer function to change out specific value
 * in the file
 * @param {string} file stringified version of the file
 * @param {string} newItem item replacing 
 * @param {string} oldItem item to replace
 */
const _replaceItemInFile = (file, newItem, oldItem) => {
  const updatedFile = file.replace(oldItem, newItem);
  return updatedFile;
};

module.exports = {
  updateRoutes,
  updatePackageJson
};