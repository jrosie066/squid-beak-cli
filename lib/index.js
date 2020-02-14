#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer');

const componentTypes = [
  { name: 'Material-UI' },
  { name: 'Ant Design' },
  { name: 'None' }
]
const questions = [
  { type: 'confirm', name: 'wrapper', message: 'Do you want to have a HOC Wrapper?', default: true },
  { type: 'list', name: 'componentLibrary', message: 'Choose which type of component library to use', choices: componentTypes },

];

module.exports = () => {
  inquirer
  .prompt(questions)
  .then(answers => {
    console.log(answers)
  });
}

