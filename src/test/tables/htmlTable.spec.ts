import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import "mocha";
import { HTMLTableParser, HTMLTableRenderer } from "../../tables/htmlTable.js";
import { Table, TableCellMerge, TextAlignment } from "../../tables/table.js";


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

        it("should correctly parse a complicated html table", () => {
            const table = htmlParser.parse(dedent`
            <table>
                <thead>
                    <tr>
                        <th style="text-align: center">Punkte</th>
                        <th colspan="3" style="text-align: left">Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: center">15</td>
                        <td style="text-align: left">1+</td>
                        <td rowspan="3">1</td>
                        <td rowspan="3">sehr gut</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">14</td>
                        <td style="text-align: left">1</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">13</td>
                        <td style="text-align: left">1-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">12</td>
                        <td style="text-align: left">2+</td>
                        <td rowspan="3">2</td>
                        <td rowspan="3">gut</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">11</td>
                        <td style="text-align: left">2</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">10</td>
                        <td style="text-align: left">2-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">9</td>
                        <td style="text-align: left">3+</td>
                        <td rowspan="3">3</td>
                        <td rowspan="3">befriedigend</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">8</td>
                        <td style="text-align: left">3</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">7</td>
                        <td style="text-align: left">3-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">6</td>
                        <td style="text-align: left">4+</td>
                        <td rowspan="3">4</td>
                        <td rowspan="3">ausreichend</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">5</td>
                        <td style="text-align: left">4</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">4</td>
                        <td style="text-align: left">4-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">3</td>
                        <td style="text-align: left">5+</td>
                        <td rowspan="3">5</td>
                        <td rowspan="3">mangelhaft</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">2</td>
                        <td style="text-align: left">5</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">1</td>
                        <td style="text-align: left">5-</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">0</td>
                        <td style="text-align: left">6</td>
                        <td>6</td>
                        <td>ungenügend</td>
                    </tr>
                </tbody>
            </table>`);
            
            expect(table.getRow(0).isHeader).to.be.true;
            expect(table.getColumn(0).textAlign).to.equal(TextAlignment.center);
            expect(table.getColumn(1).textAlign).to.equal(TextAlignment.left);
            expect(table.getCell(0, 0).text).to.equal("Punkte");
            expect(table.getCell(0, 1).text).to.equal("Note");
            expect(table.getCell(0, 2).merged).to.equal(TableCellMerge.left);
            expect(table.getCell(0, 3).merged).to.equal(TableCellMerge.left);
            expect(table.getCell(1, 0).text).to.equal("15");
            expect(table.getCell(1, 1).text).to.equal("1+");
            expect(table.getCell(1, 2).text).to.equal("1");
            expect(table.getCell(1, 3).text).to.equal("sehr gut");
            expect(table.getCell(2, 0).text).to.equal("14");
            expect(table.getCell(2, 1).text).to.equal("1");
            expect(table.getCell(2, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(2, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(3, 0).text).to.equal("13");
            expect(table.getCell(3, 1).text).to.equal("1-");
            expect(table.getCell(3, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(3, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(4, 0).text).to.equal("12");
            expect(table.getCell(4, 1).text).to.equal("2+");
            expect(table.getCell(4, 2).text).to.equal("2");
            expect(table.getCell(4, 3).text).to.equal("gut");
            expect(table.getCell(5, 0).text).to.equal("11");
            expect(table.getCell(5, 1).text).to.equal("2");
            expect(table.getCell(5, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(5, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(6, 0).text).to.equal("10");
            expect(table.getCell(6, 1).text).to.equal("2-");
            expect(table.getCell(6, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(6, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(7, 0).text).to.equal("9");
            expect(table.getCell(7, 1).text).to.equal("3+");
            expect(table.getCell(7, 2).text).to.equal("3");
            expect(table.getCell(7, 3).text).to.equal("befriedigend");
            expect(table.getCell(8, 0).text).to.equal("8");
            expect(table.getCell(8, 1).text).to.equal("3");
            expect(table.getCell(8, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(8, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(9, 0).text).to.equal("7");
            expect(table.getCell(9, 1).text).to.equal("3-");
            expect(table.getCell(9, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(9, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(10, 0).text).to.equal("6");
            expect(table.getCell(10, 1).text).to.equal("4+");
            expect(table.getCell(10, 2).text).to.equal("4");
            expect(table.getCell(10, 3).text).to.equal("ausreichend");
            expect(table.getCell(11, 0).text).to.equal("5");
            expect(table.getCell(11, 1).text).to.equal("4");
            expect(table.getCell(11, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(11, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(12, 0).text).to.equal("4");
            expect(table.getCell(12, 1).text).to.equal("4-");
            expect(table.getCell(12, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(12, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(13, 0).text).to.equal("3");
            expect(table.getCell(13, 1).text).to.equal("5+");
            expect(table.getCell(13, 2).text).to.equal("5");
            expect(table.getCell(13, 3).text).to.equal("mangelhaft");
            expect(table.getCell(14, 0).text).to.equal("2");
            expect(table.getCell(14, 1).text).to.equal("5");
            expect(table.getCell(14, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(14, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(15, 0).text).to.equal("1");
            expect(table.getCell(15, 1).text).to.equal("5-");
            expect(table.getCell(15, 2).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(15, 3).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(16, 0).text).to.equal("0");
            expect(table.getCell(16, 1).text).to.equal("6");
            expect(table.getCell(16, 2).text).to.equal("6");
            expect(table.getCell(16, 3).text).to.equal("ungenügend");
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