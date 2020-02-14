#!/usr/bin/env node
const program = require('commander');
// const { initiatePage } = require('../lib/page');
const testQuestions = require('../lib/index');
const print = (name) => { console.log(name, 'hi') };

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
    }
    testQuestions();
    // initiatePage(name, options);
  });
program.parse(process.argv);