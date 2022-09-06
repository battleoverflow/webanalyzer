import * as readline from 'readline';
import * as link from 'linkinator';
import * as fs from 'fs';

const version = "0.0.5";

// TODO: Better error handling for network request
async function fetchUrl(url: string) {
    const resData = await link.check({
        path: url
    });

    let linkStatement = "";

    if (resData.passed) {
        linkStatement = "Passed";
    } else {
        linkStatement = "Failed";
    }

    fs.writeFile("web.json", JSON.stringify(resData, null, 2), function(err) {
        if (err) {
            throw err;
        }
        
        console.log('Successfully written to web.json');
    });

    // console.log(resData);
    console.log(`\nBroken Link Status: ${linkStatement}`);
}

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create a new readline method for accepting user input
rl.question(`Light [v${version}] > Enter URL: `, (url) => {
    switch (url.toLowerCase()) {
        case `${url}`:
            fetchUrl(url.toLowerCase()); // Returns all the broken links based on the provided webpage
            break;
        default:
            console.log("Unable to process request");
    }

    rl.close(); // Closes readline thread
})