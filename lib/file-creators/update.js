const fs = require('fs');
const path = require('path');
const logger = require('../util/logger');

const updateRoutes = (pageName) => {
  const routeFile = path.resolve(process.cwd(), 'src/pages/routes.tsx');
  fs.readFile(routeFile, (err, data) => {
    if (err) throw err;
    data = data.toString();
    data = _insertImport(data, pageName);
    data = _insertComponent(data, pageName);
    fs.writeFile(routeFile, data, (err) => {
      if (err) {
        logger.error('There was an error writing to the routes file');
      }
      logger.stepSuccess('Routes successfully updated');
    });
  });
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
      },\r`;
  const position = file.search('].');
  const updatedFile = [file.slice(0, position), addComponent, file.slice(position)].join('');
  return updatedFile;
};

module.exports = {
  updateRoutes
};