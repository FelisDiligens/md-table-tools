import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { HTMLTableParser, HTMLTableRenderer } from "../../tables/htmlTable.js";
import { Table } from "../../tables/table.js";


describe("HTMLTableParser", () => {
    let htmlParser: HTMLTableParser;

    before(() => {
        htmlParser = new HTMLTableParser();
    });

    describe(".parse()", () => {
        context("when parsing invalid tables", () => {
            it("should throw an error on missing <table> tag", () =>{
                expect(() => {
                    htmlParser.parse(dedent`
                    <thead>
                        <tr>
                            <td>Header</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Body</td>
                        </tr>
                    </tbody>
                    `);
                }).to.throw();
            });
        });
    });
});

describe("HTMLTableRenderer", () => {
    let htmlPrettyRenderer: HTMLTableRenderer;
    let htmlRenderer: HTMLTableRenderer;

    before(() => {
        htmlPrettyRenderer = new HTMLTableRenderer(true, " ".repeat(4));
        htmlRenderer = new HTMLTableRenderer(false);
    });

    describe(".render()", () => {
        it("should render a given table properly", () =>{
            const table = new Table(2, 1);
            table.getRow(0).isHeader = true;
            table.getCell(0, 0).setText("Header");
            table.getCell(1, 0).setText("Body");

            expect(htmlPrettyRenderer.render(table)).to.equal(dedent`<table>
                <thead>
                    <tr>
                        <th>Header</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Body</td>
                    </tr>
                </tbody>
            </table>`);
        });

        it("should not have a <thead> if there are no header rows", () =>{
            const table = new Table(2, 1);
            table.getCell(0, 0).setText("Body");
            table.getCell(1, 0).setText("Also body");

            expect(htmlPrettyRenderer.render(table)).to.not.include("<thead>");
        });

        it("should not have a <tbody> if there are no data rows", () =>{
            const table = new Table(2, 1);
            table.getRow(0).isHeader = true;
            table.getRow(1).isHeader = true;
            table.getCell(0, 0).setText("Header");
            table.getCell(1, 0).setText("Also header");

            expect(htmlPrettyRenderer.render(table)).to.not.include("<tbody>");
        });
    });
});