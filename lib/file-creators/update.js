const path = require('path');
const logger = require('../util/logger');
const promiseFs = require('../util/promise-fs');

const updateRoutes = async (pageName) => {
  const routeFile = path.resolve(process.cwd(), 'src/pages/routes.tsx');
  try {
    let data = await promiseFs.readFile(routeFile);
    data = data.toString();
    data = _insertImport(data, pageName);
    data = _insertComponent(data, pageName);
    console.log(data);
    promiseFs.writeFile(routeFile, data);
    logger.stepSuccess('Routes successfully updated');
  } catch (err) {
    logger.error('Could not read/write the file');
    logger.error(err);
    throw err; // TODO: not sure I want to do
  }
};

const _insertImport = (file, pageName) => {
  // TODO: remove newline above the import
  const addImport =
    `import {${pageName}} from './${pageName}';\n\n`;
  const position = file.search('export');
  const updatedFile = [file.slice(0, position), addImport, file.slice(position)].join('');
  return updatedFile;
};

const _insertComponent = (file, pageName) => {
  const route = pageName.toLowerCase();
  const addComponent =
    `  {
         component: ${pageName},
         path: '/${route}',
       },\r
    `;
  const position = file.search('].');
  const updatedFile = [file.slice(0, position), addComponent, file.slice(position)].join('');
  return updatedFile;
};

module.exports = {
  updateRoutes
};