#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const pathExists = require('path-exists');
const generateProject = require('../lib/project/generate-project');
const initiatePage = require('../lib/page/generate-page');
const logger = require('../lib/util/logger');
const { createComponent } = require('../lib/component/generate-component');
const remove = require('../lib/util/remove');
const createStorybookTest = require('../lib/storybook/generate-storybook');
const { generateItemName } = require('../lib/util/format');

/* SET VERISON */
program
  .version('0.1.0');

/**
 * HANDLE UNKNOWN COMMANDS
 */
program.on('command:*', function () {
  const errorMsg = `
  YA DONE MESSED UP AA RON\n
  "${program.args.join(' ')}" is not a command\n`;
  logger.error(errorMsg);
  logger.info(' use --help to see commands\n');
  process.exit(1);
});

/**
 * GENERATE PAGE
 */
program
  .command('page <name>') // sub-command name
  .alias('p')
  .description('Generate React Page') // command description
  .option('-w, --no-wrapper', 'Do not use wrapper pattern with page')
  .option('-e, --no-enhancer', 'Do not use enhancer pattern')
  .option('-m, --material', 'Use material-ui styling on page', false)
  .option('-p, --path <path>', 'Path where you want to add the page')
  // function to execute when command is uses
  .action(function (name, args) {
    const options = {
      useMaterial: args.material,
      useWrapper: args.wrapper,
      useEnhancer: args.enhancer,
      newPath: args.path,
    };
    const formattedPageName = generateItemName(name);
    initiatePage(formattedPageName, options)
      .then(msg => {
        logger.info(msg);
      })
      .catch(async err => {
        const { remove: shouldRemove, message } = err;
        logger.error(message);
        if (shouldRemove) {
          await remove(`src/components/${formattedPageName}`);
        }
        process.exit(1);
      });
  });

/**
 * GENERATE COMPONENT
 * 
 */
program
  .command('component <name>')
  .alias('c')
  .description('Generate React Componenet')
  .option('-m, --material', 'Use Material UI styles', false)
  .option('-s, --no-storybook', 'Do not use storybook test', false)
  .option('-e, --no-enhancer', 'Do not use enhancer pattern with component', false)
  .option('-p, --path <path>', 'Path where you want to add the component')
  .action((name, args) => {
    const options = {
      useMaterial: args.material,
      useEnhancer: args.enhancer,
      useStorybook: args.storybook,
      newPath: args.path,
    };
    const componentName = generateItemName(name);
    createComponent(componentName, options)
      .then((msg) => {
        logger.info(msg);
      })
      .catch(async err => {
        const { remove: shouldRemove, message } = err;
        logger.error(message);
        if (shouldRemove) {
          await remove(`src/components/${componentName}`);
        }
        process.exit(1);
      });
  });

/**
 * GENERATE PROJECT
 */
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
      try {
        await generateProject(projectName);
      } catch (err) {
        await remove(`src/pages/${projectName}`);
      }
    }
  });

/**
 * GENERATE STORYBOOK TEST
 */
program
  .command('storybook <name>')
  .alias('sb')
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
    console.log('CWD', process.cwd());
    console.log('DIR', __dirname);
  });
program.parse(process.argv);
