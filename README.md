<!-- TODO: Write better README -->

# Light - Web Analyzer
Light is a TypeScript CLI created for parsing web content to locate broken links, access relevant information, and check website stability

Build:
```bash
npm run build
```

Displays a help menu for the CLI
Run:
```bash
node lib/index.js -h
```

Available arguments:
```
-h, --help              "Help menu"
-u, --url <value>       "Provide a URL for parsing broken links and collecting web info"
-f, --file              "Save JSON data to a file (report.json)"
-v, --verbose           "Output link information in a file and display the data in terminal"
-d, --debug             "Debug logs (more in-depth information about the domain/tools being used)"
-w, --web               "Sends a web request to download content from the url"
-b, --broken            "Search the url for broken links"
-V, --version           "Light version information"
```