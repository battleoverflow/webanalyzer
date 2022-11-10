/*
*
*   Project: Light - Web Analyzer
*   File: fetchUrl.ts
*   Stellata (c) 2022
*
*/

// const chalk = require("chalk");
const link = require("linkinator");
const fs = require("fs");
const axios = require("axios");
const program = require("commander");

// CLI arguments
program
    .option("-u, --url <value>", "Provide a URL for parsing broken links and collecting web info")
    .option("-f, --file", "Save JSON data to a file (report.json)")
    .option("-v, --verbose", "Output link information in a file and display the data in terminal")
    .option("-d, --debug", "Debug logs (more in-depth information about the domain/tools being used)")
    .option("-w, --web", "Sends a web request to download content from the url")
    .option("-b, --broken", "Search the url for broken links")
    .parse(process.argv);

const cmdArguments = program.opts();

// TODO: Better error handling for network request
export async function fetchUrl(url: string) {

    // Request for broken links
    const jsonData = await link.check({
        path: url
    });

    // Domain specific request
    const getRequest = {
        url: url,
        method: "GET"
    };

    let linkStatement = "";

    if (jsonData.passed) {
        linkStatement = "Passed (No broken links were found)";
    } else {
        linkStatement = "Failed (Broken links were found)";
    }

    if (cmdArguments.broken) {

        if (cmdArguments.file) {
            // Writes link information in JSON to a report.json file
            fs.writeFile("report.json", JSON.stringify(jsonData.links, null, 2), function(err: any) {
                if (err) {
                    throw err;
                }
                
                console.log("JSON data successfully written to report.json");
            });

            // Reads link information and parses JSON data
            fs.readFile("report.json", "UTF8", function(err: any, res: string) {
                if (err) {
                    throw err;
                }
    
                if (cmdArguments.verbose) {    
                    console.log(jsonData.links);                
                    
                    // let obj = JSON.parse(res);
            
                    // for (let i = 0; i < obj.length; i++) {
                    //     console.log(`\nURL (Child): ${obj[i].url} (Status Code: ${obj[i].status})`);
                    //     console.log(`URL (Parent): ${obj[i].parent}`);
                    // }
                }
            });
        }

        console.log(`\nBroken Link Status: ${linkStatement}`);
    }

    if (cmdArguments.web) {

        axios(getRequest).then((response: {
            data: any;
            status: any;
            statusText: any;
            headers: any;
            config: any;
        }) => {

            if (cmdArguments.file) {
                let htmlContent = response.data; // TODO: Make the output prettier

                // Writes HTML content to a file
                fs.writeFile("report.html", htmlContent, function(err: any) {
                    if (err) {
                        throw err;
                    }

                    console.log("HTML data successfully written to report.html");
                });
            }

            if (cmdArguments.verbose) {
                console.log(`Status Code: ${response.status}`); // Status code
            }
            
            if (cmdArguments.debug) {
                console.log(`Axios Configuration:\n ${response.config}`); // Axios response information
            }
            
            if (cmdArguments.debug || cmdArguments.verbose) {
                console.log("Request Header(s):\n");
                console.log(response.headers); // Header information
            }

            console.log(`\nWebsite Status: ${response.statusText}`);
        });
    }

    if (cmdArguments.verbose) {
        // console.log(jsonData.links);
    
        let urlAddress = new URL(url);
        let hostName = urlAddress.host;
        let pathName = urlAddress.pathname;

        console.log(`\nURL: ${urlAddress}`);
        console.log(`Hostname: ${hostName}`);
        console.log(`Full path: ${pathName}\n`);
    }
}