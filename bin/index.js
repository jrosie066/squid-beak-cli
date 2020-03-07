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
const createStorybookTest = require('../lib/storybook/generate-storybook');
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
  .command('page <name>') // sub-command name
  .alias('p')
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
        process.exit(1);
      });
  });

// generate component
program
  .command('component <name>')
  .alias('c')
  .description('Generate React Componenet') // command description
  // function to execute when command is uses
  .option('-m, --material', 'Use Material UI styles', false)
  .option('-s, --no-storybook', 'Do no use storybook test', false)
  .option('-e, --no-enhancer', 'Do not use enhancer pattern with component', false)
  .action((name, args) => {
    const options = {
      useMaterial: args.material,
      useEnhancer: args.enhancer,
      useStorybook: args.storybook
    };
    createComponent(name, options)
      .then((msg) => {
        logger.info(msg);
      })
      .catch((err) => {
        logger.error(err);
      });
  });
program
  .command('project <projectName>')
  .alias('i')
  .description('Create new React Project')
  .action(async (projectName) => {
    // check if project folder already exists
    if (pathExists.sync(path.resolve(process.cwd(), projectName))) {
      logger.error(`Error! Directory ${projectName} already exists!!! 🤨\n\n`);
      process.exit(1);
    } else {
      await generateProject(projectName);
    }
  });

program
  .command('sb <name>')
  .description('Create new React Component Storybook Test')
  .action(async (name) => {
    createStorybookTest(name);
  });

const log = () => {
  const id = setInterval(() => {
    console.log('..');
    console.group();
    console.log('..');
    console.group();
    console.log('..');
    console.groupEnd();
    setTimeout(() => {
      console.log('..');
      console.groupEnd();
      console.log('..');
      console.groupEnd();
    }, 100);
  }, 500);
  setTimeout(() => {
    clearInterval(id);
  }, 2000);
};
// Leaving in for future testing needs
program
  .command('test')
  .action(() => {
    log();
  });
program.parse(process.argv);
