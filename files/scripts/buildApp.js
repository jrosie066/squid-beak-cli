/* eslint-disable @typescript-eslint/no-require-imports */
const webpack = require('webpack');
const chalk = require('chalk');
const appPaths = require('../config/paths');
const Spinner = require('cli-spinner').Spinner;

const logOutput = [];
const createSpinner = (msg) => {
  const spinnerObj = new Spinner(chalk.magenta(msg));
  spinnerObj.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
  return spinnerObj;
};

const cascade = () => {
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

// NOTE: not sure what this is for
const displayOutputLogs = () => {
  if (logOutput.length > 0) {
    logOutput.forEach((item) => {
      console.log('buildAll: ', item);
    });
  }
};

const getConfig = () => {
  const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
  const path = require('path');
  const webpackProdConfig = require(appPaths.webpackProd);
  const cloneDeep = require('lodash/cloneDeep');
  const config = cloneDeep(webpackProdConfig({ ...process.env }));
  if (!config && config.entry && checkRequiredFiles([`${config.context}/${config.entry[0]}`])) {
    throw new Error('missing required configs');
  }
  return config;
};

const init = (previousFileSizes) => {
  console.log(chalk.magenta('\n----------------INITIATING BUILD -------------------\n'));
  const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
  const config = getConfig();
  const compiler = webpack(config);
  // cascade();
  const spinner = createSpinner('Hold on while we build your app 👽👽👽👽');
  spinner.start();
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI
        && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== false)
        && messages.warnings.length
      ) {
        console.log(`\n Treating warnings as errors because of process.env.CI = true.
              \n Most CI servers set it automatically. \n`);
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      spinner.stop(true);
      console.log(chalk.magentaBright('\n\nBuild successfull'));
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
};

const runBuild = () => {
  const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
  const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = FileSizeReporter;
  const buildPath = getConfig().output.path;
  const printBuildError = require('react-dev-utils/printBuildError');
  // These sizes are pretty large. We'll warn for bundles exceeding them.
  const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
  const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
  return measureFileSizesBeforeBuild(buildPath)
    .then(previousFileSizes => init(previousFileSizes))
    .then(
      ({ stats, previousFileSizes, warnings }) => {
        if (warnings.length) {
          console.log(chalk.yellowBright('Compiled with warnings\n'));
          console.log(chalk.gray(warnings.join('\n\n')));
        } else {
          console.log(chalk.green('Woo hoo! Compiled successfully 👍'));
        }
        console.log(chalk.cyan('File sizes after gzip: \n'));
        printFileSizesAfterBuild(
          stats,
          previousFileSizes,
          buildPath,
          WARN_AFTER_BUNDLE_GZIP_SIZE,
          WARN_AFTER_CHUNK_GZIP_SIZE
        );
      },
      (err) => {
        printBuildError(err);
        console.error(chalk.red('Dang it! Failed to compile 😖\n'), err);
        throw new Error(err);
      }
    );

};

const build = () => {
  runBuild();
  displayOutputLogs();
};

module.exports = {
  build,
};
