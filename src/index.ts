#!/usr/bin/env node

/*
*
*   index.ts | BSD 2-Clause License
*    
*   Authors: { 
*        Hifumi1337 (https://github.com/Hifumi1337)
*   };
*    
*   Project Owner: https://github.com/Stellata-Project
*
*/

const chalk = require('chalk');
const clear = require('clear');
const program = require('commander');
const link = require('linkinator');
const fs = require('fs');


clear();

// CLI arguments
program
  .version('0.0.7')
  .description("Light CLI")
  // Runs the Linkinator package to locate all broken links on the url
  .option('-u, --url <value>', 'Provide a URL for parsing broken links')
  // Boolean to check if the data should be saved to a file
  .option('-f, --file', 'Save JSON data to a file (report.json)')
  // Displays relevant output + writes to a file (requires -f)
  .option('-v, --verbose', 'Output link information in a file and display the data in terminal')
  .parse(process.argv);

const cmdArguments = program.opts();

// TODO: Better error handling for network request
async function fetchUrl(url: string) {
    const jsonData = await link.check({
        path: url
    });

    let linkStatement = "";

    if (jsonData.passed) {
        linkStatement = "Passed (No broken links were found)";
    } else {
        linkStatement = "Failed (Broken links were found)";
    }

    if (cmdArguments.file) {
        // Writes link information in JSON to a report.json file
        fs.writeFile('report.json', JSON.stringify(jsonData.links, null, 2), function(err: any) {
            if (err) {
                throw err;
            }
            
            console.log('Successfully written to report.json');
        });

        // Reads link information and parses JSON data
        fs.readFile('report.json', "UTF8", function(err: any, res: string) {
            if (err) {
                throw err;
            }

            if (cmdArguments.verbose) {
                let obj = JSON.parse(res);
        
                for (let i = 0; i < obj.length; i++) {
                    console.log(`\nURL (Child): ${obj[i].url}`);
                    console.log(`URL (Parent): ${obj[i].parent}`);
                    console.log(`Status Code: ${obj[i].status}\n`);
                }
            }
        });
    } else {
        // Outputs raw JSON data to the terminal
        console.log(jsonData.links);
    }
    
    console.log(`\nBroken Link Status: ${linkStatement}`);
}

if (cmdArguments.url) { 
    // console.log(cmdArguments.url);
    fetchUrl(cmdArguments.url.toLowerCase());
}

// Checks if a proper argument is given (if not, displays a help menu)
if (!process.argv.slice(2).length) {
    program.outputHelp();
}