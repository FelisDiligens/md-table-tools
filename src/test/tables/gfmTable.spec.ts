import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { GitHubFlavoredMarkdownTableParser, GitHubFlavoredMarkdownTableRenderer } from "../../tables/gfmTable.js";
import { Table, TextAlignment } from "../../tables/table.js";


describe("GitHubFlavoredMarkdownTableParser", () => {
    let gfmParser: GitHubFlavoredMarkdownTableParser;

    before(() => {
        gfmParser = new GitHubFlavoredMarkdownTableParser();
    });

    describe(".parse()", () => {
        context("when parsing valid tables", () => {
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
    let table: Table;

    before(() => {
        gfmPrettyRenderer = new GitHubFlavoredMarkdownTableRenderer(true);
        gfmMinifiedRenderer = new GitHubFlavoredMarkdownTableRenderer(false);

        table = new Table(2, 3);
        table.getRow(0).isHeader = true;
        table.getColumn(0).textAlign = TextAlignment.left;
        table.getColumn(1).textAlign = TextAlignment.center;
        table.getColumn(2).textAlign = TextAlignment.right;
        table.getCell(0, 0).setText("Left");
        table.getCell(0, 1).setText("Center");
        table.getCell(0, 2).setText("Right");
        table.getCell(1, 0).setText("ab");
        table.getCell(1, 1).setText("cd");
        table.getCell(1, 2).setText("ef");
    });

    describe(".render() - pretty", () => {
        it("should make a pretty table and align text", () =>{
            expect(
                gfmPrettyRenderer.render(table)
            ).to.equal(
                dedent`| Left | Center | Right |
                       |:-----|:------:|------:|
                       | ab   |   cd   |    ef |`
            );
        });
    });

    describe(".render() - minified", () => {
        it("should make a minified table and leave out unnecessary pipes and spaces", () =>{
            expect(
                gfmMinifiedRenderer.render(table)
            ).to.equal(
                dedent`Left|Center|Right
                       :-|:-:|-:
                       ab|cd|ef`
            );
        });
    });
});