import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { GitHubFlavoredMarkdownTableParser, GitHubFlavoredMarkdownTableRenderer } from "../../tables/gfmTable.js";
import { Table, TableCellMerge, TextAlignment } from "../../tables/table.js";


describe("GitHubFlavoredMarkdownTableParser", () => {
    let gfmParser: GitHubFlavoredMarkdownTableParser;

    before(() => {
        gfmParser = new GitHubFlavoredMarkdownTableParser();
    });

    describe(".parse()", () => {
        context("when parsing valid tables", () => {
            it("should parse a table without issues", () =>{
                let table: Table;
                expect(() => {
                    table = gfmParser.parse(
                        dedent`#|#|#|#|#|#
                               -|-|-|-|-|-
                               #||#|#|#|#
                               #||#|#|#||
                               #|#|#|#|#||
                               #|#|#|#|#||
                               #|#|#|#|#||
                               #|#|#|#|#|#`);
                }).to.not.throw();

                expect(table.rowCount()).to.equal(7);
                expect(table.columnCount()).to.equal(6);
            });

            it("should ignore missing and excess cells", () =>{
                let table: Table;
                expect(() => {
                    table = gfmParser.parse(dedent`
                    | abc | def |
                    | --- | --- |
                    | bar |
                    | bar | baz | boo |
                    `);
                }).to.not.throw();

                // The second cell in row 2 should exist:
                expect(table.getCellsInRow(table.getRow(1)).length).to.equal(2);

                // The third cell in row 3 should be ignored:
                expect(table.columnCount()).to.equal(2);
            });
        });

        context("when parsing invalid tables", () => {
            it("should throw an error if header row doesn't match the delimiter row in the number of cells", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    | abc | def |
                    | --- |
                    | bar |
                    `);
                }).to.throw();
            });

            it("should throw an error on missing delimiter row", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    | abc | def | ghi |
                    | jkl | mno | pqr |
                    `);
                }).to.throw();
            });

            it("should throw an error on a table without header", () =>{
                expect(() => {
                    gfmParser.parse(dedent`
                    |-----|-----|-----|
                    | jkl | mno | pqr |
                    `);
                }).to.throw();
            });
        });
    });
});

describe("GitHubFlavoredMarkdownTableRenderer", () => {
    let gfmPrettyRenderer: GitHubFlavoredMarkdownTableRenderer;
    let gfmMinifiedRenderer: GitHubFlavoredMarkdownTableRenderer;
    let tableOne: Table;
    let tableTwo: Table;

    before(() => {
        gfmPrettyRenderer = new GitHubFlavoredMarkdownTableRenderer(true);
        gfmMinifiedRenderer = new GitHubFlavoredMarkdownTableRenderer(false);

        tableOne = new Table(2, 3);
        tableOne.getRow(0).isHeader = true;
        tableOne.getColumn(0).textAlign = TextAlignment.left;
        tableOne.getColumn(1).textAlign = TextAlignment.center;
        tableOne.getColumn(2).textAlign = TextAlignment.right;
        tableOne.getCell(0, 0).setText("Left");
        tableOne.getCell(0, 1).setText("Center");
        tableOne.getCell(0, 2).setText("Right");
        tableOne.getCell(1, 0).setText("ab");
        tableOne.getCell(1, 1).setText("cd");
        tableOne.getCell(1, 2).setText("ef");

        tableTwo = new Table(7, 6);
        tableTwo.getRow(0).isHeader = true;
        tableTwo.getCell(0, 0).setText("#");
        tableTwo.getCell(0, 1).setText("#");
        tableTwo.getCell(0, 2).setText("#");
        tableTwo.getCell(0, 3).setText("#");
        tableTwo.getCell(0, 4).setText("#");
        tableTwo.getCell(0, 5).setText("#");
        tableTwo.getCell(1, 0).setText("#");
        tableTwo.getCell(1, 1).merged = TableCellMerge.left; // This should be ignored.
        tableTwo.getCell(1, 2).setText("#");
        tableTwo.getCell(1, 3).setText("#");
        tableTwo.getCell(1, 4).setText("#");
        tableTwo.getCell(1, 5).setText("#");
        tableTwo.getCell(2, 0).setText("#");
        tableTwo.getCell(2, 1).merged = TableCellMerge.left; // This should be ignored.
        tableTwo.getCell(2, 2).setText("#");
        tableTwo.getCell(2, 3).setText("#");
        tableTwo.getCell(2, 4).setText("#");
        tableTwo.getCell(3, 0).setText("#");
        tableTwo.getCell(3, 1).setText("#");
        tableTwo.getCell(3, 2).setText("#");
        tableTwo.getCell(3, 3).setText("#");
        tableTwo.getCell(3, 4).setText("#");
        tableTwo.getCell(3, 5).merged = TableCellMerge.above; // This should be ignored.
        tableTwo.getCell(4, 0).setText("#");
        tableTwo.getCell(4, 1).setText("#");
        tableTwo.getCell(4, 2).setText("#");
        tableTwo.getCell(4, 3).setText("#");
        tableTwo.getCell(4, 4).setText("#");
        tableTwo.getCell(5, 0).setText("#");
        tableTwo.getCell(5, 1).setText("#");
        tableTwo.getCell(5, 2).setText("#");
        tableTwo.getCell(5, 3).setText("#");
        tableTwo.getCell(5, 4).setText("#");
        tableTwo.getCell(6, 0).setText("#");
        tableTwo.getCell(6, 1).setText("#");
        tableTwo.getCell(6, 2).setText("#");
        tableTwo.getCell(6, 3).setText("#");
        tableTwo.getCell(6, 4).setText("#");
        tableTwo.getCell(6, 5).setText("#");
        tableTwo.update();
    });

    describe(".render() - pretty", () => {
        it("should make a pretty table and align text (#1)", () =>{
            expect(
                gfmPrettyRenderer.render(tableOne)
            ).to.equal(
                dedent`| Left | Center | Right |
                       |:-----|:------:|------:|
                       | ab   |   cd   |    ef |`
            );
        });
        it("should make a pretty table and ignore merged cells (#2)", () =>{
            expect(
                gfmPrettyRenderer.render(tableTwo)
            ).to.equal(
                dedent`| # | # | # | # | # | # |
                       |---|---|---|---|---|---|
                       | # |   | # | # | # | # |
                       | # |   | # | # | # |   |
                       | # | # | # | # | # |   |
                       | # | # | # | # | # |   |
                       | # | # | # | # | # |   |
                       | # | # | # | # | # | # |`
            );
        });
    });

    describe(".render() - minified", () => {
        it("should make a minified table and leave out unnecessary pipes and spaces (#1)", () =>{
            expect(
                gfmMinifiedRenderer.render(tableOne)
            ).to.equal(
                dedent`Left|Center|Right
                       :-|:-:|-:
                       ab|cd|ef`
            );
        });
        it("should make a minified table and leave out unnecessary pipes and spaces (#2)", () =>{
            expect(
                gfmMinifiedRenderer.render(tableTwo)
            ).to.equal(
                dedent`#|#|#|#|#|#
                       -|-|-|-|-|-
                       #||#|#|#|#
                       #||#|#|#||
                       #|#|#|#|#||
                       #|#|#|#|#||
                       #|#|#|#|#||
                       #|#|#|#|#|#`
            );
        });
    });
});