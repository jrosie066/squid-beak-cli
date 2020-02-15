const path = require('path');
const fs = require('fs-extra');

const directory = [
  'config', // for jest files
  'src'
];

module.exports = (projectName, answers) => {
  directory.forEach((p) => {
    fs.mkdirSync(path.resolve(`${projectName}/${p}`));
  });
};