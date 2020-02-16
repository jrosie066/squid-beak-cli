const inquirer = require('inquirer');
const logger = require('../util/logger');
const createProjectStructure = require('../initializers/project-structure');
const copyFiles = require('../initializers/add-files');

const componentLibraryChoices = [
  { name: 'Material-UI' },
  { name: 'Ant-Design' },
  { name: 'None' },
];
const eslintChoices = [
  { name: 'AirBnb' },
  { name: 'Alloy' },
  { name: 'Google' },
];
const questions = [
  { type: 'list', name: 'componentLibrary', message: 'Pick a componenet library:', choices: componentLibraryChoices },
  { type: 'list', name: 'eslintStandard', message: 'Eslint Style Guide?', choices: eslintChoices },
  { type: 'confirm', name: 'redux', message: 'Do you want to use redux'},
];

const generatePage = (projectName) => {
  console.log(logger.heading(`\nGenerating project: ${projectName}`));
  console.log(logger.heading('\n---------------------------\n'));
  inquirer.prompt(questions)
    .then((answers) => {
      console.log(answers);
      console.log(projectName);
      createProjectStructure(projectName, answers);
      console.log(logger.info('Folder Structure complete'));
      copyFiles(projectName, answers);
    });
};
module.exports = generatePage;
