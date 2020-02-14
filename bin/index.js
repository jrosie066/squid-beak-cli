#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const path = require('path');
const pathExists = require('path-exists');
const testQuestions = require('../lib/index');
const generateProject = require('../lib/commands/generateProject');

/**
 * List of potential commands
 * - generate page
 * - generate component
 * - create project
 * 
 */
program
  .command('page [name]') // sub-command name
  .description('Generate React Page') // command description
  .option('-nw, --no-wrapper', 'Do not use wrapper pattern with page')
  .option('-m, --material', 'Do not use wrapper pattern with page')
  // function to execute when command is uses
  .action(function (name, args) {
    console.log(args.wrapper);
    const useWrapper = args.wrapper;
    const useMaterial = args.material;
    const options = {
      useWrapper, useMaterial
    };
    testQuestions();
    // initiatePage(name, options);
  });

program
  .command('generate <projectName>')
  .alias('g')
  .description('Create new React Project')
  .action((projectName) => {
    // check if project folder already exists
    if (pathExists.sync(path.resolve(process.cwd(), projectName))) {
      console.log(chalk.yellow.bold(`Error! Directory ${projectName} already exist.`));
      process.exit(1);
    } else {
      generateProject(projectName);
    }
  });
program.parse(process.argv);