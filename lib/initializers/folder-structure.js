const path = require('path');
const fs = require('fs-extra');

const makeDirectory = (answers) => {
  console.log(answers);
  const directory = [
    'config', // for jest files
    'src',
    'src/assets',
    'src/build',
    'src/components',
    'src/constants',
    'src/containers',
    'src/pages',
    'src/util'
  ];
  if (answers.redux) {
    directory.push('src/redux');
  }
  return directory;
}


module.exports = (projectName, answers) => {
  const dir = makeDirectory(answers);
  dir.forEach((p) => {
    fs.mkdirSync(path.resolve(`${projectName}/${p}`));
  });
};