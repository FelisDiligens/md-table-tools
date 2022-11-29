import "mocha";
import { expect } from "chai";
import fs from "fs";
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
                test.description = lines.at(-1).trim();
            } else if (test.htmlOutput) {
                test.mdOutput = lines.join("\n");
            } else if (test.mdInput) {
                test.htmlOutput = lines.join("\n");
            } else if (test.description) {
                test.mdInput = lines.join("\n");
            } else {
                test.description = lines.at(-1).trim();
            }
            lines = [];
        } else {
            lines.push(line);
        }
    }
    tests.push(test);
    return tests;
}

const tests = parseTestFile();

describe("Mixed Multimarkdown test (HTMLTableParser, HTMLTableRenderer, MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer)", () => {
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

    describe("results should match the given tables from the *.txt file", () => {

        context("Multimd -> HTML", () => {
            for (const test of tests) {
                it(test.description, () => {
                    // Parse the table:
                    let intermediaryTable: Table;
                    expect(() => {
                        intermediaryTable = mmdParser.parse(test.mdInput);
                        intermediaryTable.update();
                    }).to.not.throw();

                    // Render the table:
                    let htmlOutput = htmlPrettyRenderer.render(intermediaryTable);
                    expect(
                        htmlOutput.replace(/[ \t]{2,}/g, " ")
                    ).to.equal(test.htmlOutput.replace(/[ \t]{2,}/g, " "));
                });
            }
        });

        context("Multimd -> Multimd", () => {
            for (const test of tests) {
                it(test.description, () => {
                    // Parse the table:
                    let intermediaryTable: Table;
                    expect(() => {
                        intermediaryTable = mmdParser.parse(test.mdInput);
                        intermediaryTable.update();
                    }).to.not.throw();

                    // Render the table:
                    let mdOutput = mmdPrettyRenderer.render(intermediaryTable);
                    expect(mdOutput).to.equal(test.mdOutput);
                });
            }
        });

        context("Multimd -> HTML -> HTML", () => {
            for (const test of tests) {
                it(test.description, () => {
                    let htmlOutput;
                    try {
                        // Parse the table:
                        let intermediaryTable: Table;
                        intermediaryTable = mmdParser.parse(test.mdInput);
                        intermediaryTable.update();
    
                        // Render the table:
                        htmlOutput = htmlPrettyRenderer.render(intermediaryTable);
                    } catch { }

                    if (htmlOutput) {
                        // Parse the html output and render it again:
                        expect(
                            htmlPrettyRenderer.render(
                                htmlParser.parse(htmlOutput)
                            ).replace(/[ \t]{2,}/g, " ")
                        ).to.equal(
                            test.htmlOutput.replace(/[ \t]{2,}/g, " ")
                        );
                    }
                });
            }
        });

        context("Multimd -> Multimd -> Multimd", () => {
            for (const test of tests) {
                it(test.description, () => {
                    let mdOutput;
                    try {
                        // Parse the table:
                        let intermediaryTable: Table;
                        intermediaryTable = mmdParser.parse(test.mdInput);
                        intermediaryTable.update();
    
                        // Render the table:
                        mdOutput = mmdPrettyRenderer.render(intermediaryTable);
                    } catch { }

                    if (mdOutput) {
                        // Parse the mmd output and render it again:
                        expect(
                            mmdPrettyRenderer.render(
                                mmdParser.parse(mdOutput)
                            )
                        ).to.equal(
                            test.mdOutput
                        );
                    }
                });
            }
        });
    });
});