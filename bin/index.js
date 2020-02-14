#!/usr/bin/env node
const program = require('commander');
const { initiatePage } = require('../lib/page');
const print = (name) => { console.log(name, 'hi') };

program
  .command('page [name]') // sub-command name
  .description('Generate React Page') // command description
  // function to execute when command is uses
  .action(function (name) {
    initiatePage(name);
  });
program.parse(process.argv);