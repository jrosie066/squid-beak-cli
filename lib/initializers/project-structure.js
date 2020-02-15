const cmd = require('node-cmd');
const logger = require('../util/logger');
const createFolderStructure = require('../initializers/folder-structure');
// const fs = require('fs-extra');

module.exports = function (projectName) {
  console.log(logger.info('\n------------------------\n'));
  console.log(logger.info('Creating Project Structure'));
  // cmd.get(`git clone git@github.com:jrosie066/react-starter.git ${projectName}`, function(err, data){
  //   console.log(data);
  //   console.log(err);
  //   console.log('Cloned Starter Directory');
  // });
  cmd.get(`mkdir ${projectName}`, (err, data) => {
    console.log(data);
    console.log(err);
    createFolderStructure(projectName);
    console.log('Created Folder Structure');
  });
};