<img src="assets/webanalyzer_logo.png" alt="Web Analyzer by Stellata">

Web Analyzer is a web analysis CLI built using TypeScript to allow immediate retrieval of website information without a GUI or any type of third-party installation. Currently allows for broken link detection, JSON and HTML export and extraction, website data aggregation, and much more.

### Install

Web Analyzer can easily be installed using npm:

```bash
npm install @stellata/webanalyzer
```

Available arguments:

```
-h, --help              "Help menu"
-u, --url <value>       "Provide a URL for parsing broken links and collecting web info"
-f, --file              "Save website data to a file in JSON format (default: report.json)"
-o, --output            "Specify the name of the JSON or HTML file for extracted data (don't specify an extension)"
-v, --verbose           "Output link information in a file and display the data in terminal"
-d, --debug             "Debug logs (more in-depth information about the domain/tools being used)"
-w, --web               "Saves website data to a file in HTML format (default: report.html)"
-b, --broken            "Scans provided URL for broken links, returning a status code"
```

### Examples

You can run this command to gather broken links on your website and export them to a JSON file:

```bash
webanalyzer -u https://example.com -f -o example_report -b
```

If you need to quickly export the HTML source code instead, you can run the same command as above, but by including the `-w` flag:

```bash
webanalyzer -u https://example.com -f -o example_report -b -w
```

NOTE: Depending on your system and how you installed webanalyzer, you may need to use `npx` alongside the CLI utility in the examples above.
