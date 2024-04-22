/*
  Project: Web Analyzer (https://github.com/battleoverflow/webanalyzer)
  Author(s): battleoverflow (https://github.com/battleoverflow)
  License: MIT

  battleoverflow (c) 2022 - 2024
*/

const link = require("linkinator")
const fs = require("fs")
const axios = require("axios")
const program = require("commander")

// CLI arguments
program
  .option(
    "-u, --url <value>",
    "Provide a URL for parsing broken links and collecting web info"
  )
  .option(
    "-f, --file",
    "Save website data to a file in JSON format (default: report.json)"
  )
  .option(
    "-o, --output <value>",
    "Specify the name of the JSON or HTML file for extracted data (don't specify an extension)"
  )
  .option(
    "-v, --verbose",
    "Output link information in a file and display the data in terminal"
  )
  .option(
    "-d, --debug",
    "Debug logs (more in-depth information about the domain/tools being used)"
  )
  .option(
    "-w, --web",
    "Saves website data to a file in HTML format (default: report.html)"
  )
  .option(
    "-b, --broken",
    "Scans provided URL for broken links, returning a status code"
  )
  .parse(process.argv)

const cmdArguments = program.opts()

// TODO: Better error handling for network request
export async function fetchUrl(url: string) {
  // Request for broken links
  const jsonData = await link.check({
    path: url
  })

  // Domain specific request
  const getRequest = {
    url: url,
    method: "GET"
  }

  let linkStatement = ""

  // Assigns broken link string
  jsonData.passed
    ? (linkStatement = "Passed (No broken links were found)")
    : (linkStatement = "Failed (Broken links were found)")

  if (cmdArguments.broken) {
    if (cmdArguments.file) {
      // Compiles link information and exports to a JSON file
      fs.writeFile(
        cmdArguments.output != null
          ? `${cmdArguments.output}.json`
          : "report.json",
        JSON.stringify(jsonData.links, null, 2),
        (err: any) => {
          if (err) throw err
          console.log(
            `JSON data successfully written to ${cmdArguments.output}.json`
          )
        }
      )

      // Reads link information and parses JSON data
      fs.readFile(
        cmdArguments.output != null
          ? `${cmdArguments.output}.json`
          : "report.json",
        "UTF8",
        function (err: any, res: string) {
          if (err) throw err
          if (cmdArguments.verbose) console.log(jsonData.links)
        }
      )
    }

    console.log(`\nBroken Link Status: ${linkStatement}`)
  }

  if (cmdArguments.web) {
    axios(getRequest).then(
      (response: {
        data: any
        status: any
        statusText: any
        headers: any
        config: any
      }) => {
        if (cmdArguments.file) {
          // TODO: Make the output prettier
          let htmlContent = response.data

          // Writes HTML content to a file
          fs.writeFile(
            cmdArguments.output != null
              ? `${cmdArguments.output}.html`
              : "report.html",
            htmlContent,
            (err: any) => {
              if (err) throw err
              console.log(
                `HTML data successfully written to ${cmdArguments.output}.html`
              )
            }
          )
        }

        // Status code
        if (cmdArguments.verbose) console.log(`Status Code: ${response.status}`)

        // Axios response information
        if (cmdArguments.debug)
          console.log(`Axios Configuration:\n ${response.config}`)

        // Header information
        if (cmdArguments.debug || cmdArguments.verbose) {
          console.log("Request Header(s):\n")
          console.log(response.headers)
        }

        console.log(`\nWebsite Status: ${response.statusText}`)
      }
    )
  }

  if (cmdArguments.verbose) {
    let urlAddress = new URL(url)
    let hostName = urlAddress.host
    let pathName = urlAddress.pathname

    console.log(`\nURL: ${urlAddress}`)
    console.log(`Hostname: ${hostName}`)
    console.log(`Full path: ${pathName}\n`)
  }
}
