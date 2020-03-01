#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const pathExists = require('path-exists');
const generateProject = require('../lib/project/generate-project');
const initiatePage = require('../lib/page/generate-page');
const logger = require('../lib/util/logger');
const createComponent = require('../lib/component/generate-component');
const logSymbols = require('log-symbols');
const updater = require('../lib/shared/update');

/**
 * List of potential commands
 * - generate page
 * - generate component
 * - create project
 * 
 */
// error on unknown commands
program.on('command:*', function () {
  const errorMsg = `${logSymbols.error} Invalid command: ${program.args.join(' ')}`;
  logger.error(errorMsg);
  process.exit(1);
});

/**
 * Generate Page
 */
program
  .command('page [name]') // sub-command name
  .description('Generate React Page') // command description
  .option('-w, --no-wrapper', 'Do not use wrapper pattern with page')
  .option('-e, --no-enhancer', 'Do not use enhancer pattern')
  .option('-m, --material', 'Use material-ui styling on page', false)
  // function to execute when command is uses
  .action(function (name, args) {
    const options = {
      useMaterial: args.material,
      useWrapper: args.wrapper,
      useEnhancer: args.enhancer,
    };
    initiatePage(name, options)
      .then(msg => {
        logger.info(msg);
      })
      .catch(err => {
        logger.error(err);
      });
  });

// generate component
program
  .command('component [name]')
  .alias('c')
  .description('Generate React Componenet') // command description
  // function to execute when command is uses
  .option('-m, --material', 'Use Material UI styles', false)
  .option('-n, --no-enhancer', 'Do not use enhancer pattern with component', false)
  .action((name, args) => {
    const options = {
      useMaterial: args.material,
      useEnhancer: args.enhancer,
    };
    console.log(options);
    createComponent(name, options)
      .then((msg) => {
        logger.info(msg);
      })
      .catch((err) => {
        logger.error(err);
      });
  });
program
  .command('init [projectName]')
  .alias('i')
  .description('Create new React Project')
  .action(async (projectName) => {
    // check if project folder already exists
    if (pathExists.sync(path.resolve(process.cwd(), projectName))) {
      logger.error(`Error! Directory ${projectName} already exist.`);
      process.exit(1);
    } else {
      await generateProject(projectName);
    }
  });

// Leaving in for future testing needs
program
  .command('test')
  .action(() => {
    updater.updateRoutes('Test');
  });
program.parse(process.argv);