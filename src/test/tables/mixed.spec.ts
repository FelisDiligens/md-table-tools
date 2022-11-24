import "mocha";
import { expect } from "chai";
import fs from "fs";
import readline from "readline";
import path from "path";
import { HTMLTableParser, HTMLTableRenderer } from "../../tables/htmlTable.js";
import { MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer } from "../../tables/multiMarkdownTable.js";
import { Table } from "../../tables/table.js";

interface TableTest {
    description: string,
    mdInput: string,
    htmlOutput: string
    mdOutput: string,
}

function parseTestFile() {
    let tests: TableTest[] = [];
    let lines: string[] = [];
    let test = {} as TableTest;
    //const file_name = path.join(__dirname, "valid-tables.txt");
    const data = fs.readFileSync("./src/test/tables/valid-tables.txt", "utf8");
    for (const line of data.split(/\r?\n/g)) {
        if (line.trim() === ".") {
            if (test.mdOutput) {
                tests.push(test);
                test = {} as TableTest;
                test.description = lines.join("\n");
            } else if (test.htmlOutput) {
                test.mdOutput = lines.join("\n");
            } else if (test.mdInput) {
                test.htmlOutput = lines.join("\n");
            } else if (test.description) {
                test.mdInput = lines.join("\n");
            } else {
                test.description = lines.join("\n");
            }
            lines = [];
        } else {
            lines.push(line);
        }
    }
    return tests;
}

const tests = parseTestFile();

describe("Mixed (HTMLTableParser, HTMLTableRenderer, MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer)", () => {
    let htmlParser: HTMLTableParser;
    let htmlPrettyRenderer: HTMLTableRenderer;
    let mmdParser: MultiMarkdownTableParser;
    let mmdPrettyRenderer: PrettyMultiMarkdownTableRenderer;

    before(() => {
        htmlParser = new HTMLTableParser();
        htmlPrettyRenderer = new HTMLTableRenderer(true, " ".repeat(4));
        mmdParser = new MultiMarkdownTableParser();
        mmdPrettyRenderer = new PrettyMultiMarkdownTableRenderer();
    });

    describe("Multimd -> HTML -> HTML/Multimd", () => {

        context("results should match the given tables from the *.txt file", () => {
            for (const test of tests) {
                it(test.description, () => {
                    // Parse the table:
                    let intermediaryTable: Table;
                    expect(() => {
                        intermediaryTable = mmdParser.parse(test.mdInput);
                    }).to.not.throw();

                    // Render the table:
                    let htmlOutput = htmlPrettyRenderer.render(intermediaryTable);
                    let mdOutput = mmdPrettyRenderer.render(intermediaryTable);
                    expect(htmlOutput).to.equal(test.htmlOutput);
                    expect(mdOutput).to.equal(test.mdOutput);

                    // Parse the html output and render it again:
                    expect(
                        htmlPrettyRenderer.render(
                            htmlParser.parse(htmlOutput)
                        )
                    ).to.equal(test.htmlOutput);
                    expect(
                        mmdPrettyRenderer.render(
                            htmlParser.parse(htmlOutput)
                        )
                    ).to.equal(test.mdOutput);
                });
            }
        });
    });
});