#!/usr/bin/env node

/*
*
*   Project: Light - Web Analyzer
*   File: index.ts
*   Stellata (c) 2022
*
*/

import { fetchUrl } from './fetchUrl';

const clear = require('clear');
const program = require('commander');

clear();

// CLI arguments
program
  .version('0.1.9')
  .description("Light is a TypeScript CLI created for parsing web content to locate broken links, access relevant information, and check website stability")
  .option('-u, --url <value>', 'Provide a URL for parsing broken links and collecting web info')
  .option('-f, --file', 'Save JSON data to a file (report.json)')
  .parse(process.argv);

const cmdArguments = program.opts();

function runProgram() {
    fetchUrl(cmdArguments.url.toLowerCase());
}

runProgram();

// Checks if a proper argument is given (if not, displays a help menu)
if (!process.argv.slice(2).length) {
    program.outputHelp();
}