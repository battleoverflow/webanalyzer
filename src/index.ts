#!/usr/bin/env node

/*
  Project: Web Analyzer (https://github.com/battleoverflow/webanalyzer)
  Author(s): battleoverflow (https://github.com/battleoverflow)
  License: MIT

  battleoverflow (c) 2022 - 2024
*/

import { exit } from "process"
import { fetchUrl } from "./fetchUrl"

const clear = require("clear")
const program = require("commander")

clear()

// CLI arguments
program
  .version("0.1.13")
  .description(
    "Web Analyzer is a web analysis CLI built using TypeScript to allow immediate retrieval of website information without a GUI or any type of third-party installation."
  )
  .option(
    "-u, --url <value>",
    "Provide a URL for parsing broken links and collecting web info"
  )
  .option(
    "-f, --file",
    "Save website data to a file in JSON format (default: report.json)"
  )
  .parse(process.argv)

const cmdArguments = program.opts()

function runProgram() {
  if (cmdArguments.url != null) {
    fetchUrl(cmdArguments.url.toLowerCase())
  } else {
    console.log("[ERROR] Missing URL")
    exit()
  }
}

runProgram()

// Checks if a proper argument is given (if not, displays a help menu)
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
