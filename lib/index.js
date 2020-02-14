#!/usr/bin/env node
'use strict';

const { initiatePage } = require('./page');

let pageName;

const program = require('commander')
  .version(require('../../../package.json').version)
  .arguments('<component-directory>')
  .action(function (name) {
    pageName = name;
  })
  .option('-nw, --no-wrapper', 'Create a page structure with no wrapper')
  .option('-m, --material', 'Use Material-UI component library')
  .parse(process.argv);

initiatePage(pageName);
