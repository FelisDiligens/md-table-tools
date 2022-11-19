import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { MinifiedMultiMarkdownTableRenderer, MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer } from "../../tables/multiMarkdownTable.js";
import { Table, TableCaptionPosition, TableCellMerge, TextAlignment } from "../../tables/table.js";


describe("MultiMarkdownTableParser", () => {
    let mmdParser: MultiMarkdownTableParser;

    before(() => {
        mmdParser = new MultiMarkdownTableParser();
    });

    describe(".parse()", () => {
        context("when parsing valid tables", () => {
            it("should parse the example table just fine", () =>{
                let table: Table;
                expect(() => {
                    table = mmdParser.parse(dedent`
                    |             |          Grouping           ||
                    First Header  | Second Header | Third Header |
                     ------------ | :-----------: | -----------: |
                    Content       |          *Long Cell*        ||
                    Content       |   **Cell**    |         Cell |
                    
                    New section   |     More      |         Data |
                    And more      | With an escaped '\\|'         ||
                    [Prototype table]
                    `);
                }).to.not.throw();

                expect(table.getHeaderRows()).to.be.an( "array" ).that.has.a.lengthOf(2);
                expect(table.getNormalRows()).to.be.an( "array" ).that.has.a.lengthOf(4);
                expect(table.getColumn(0).textAlign).to.equal(TextAlignment.default);
                expect(table.getColumn(1).textAlign).to.equal(TextAlignment.center);
                expect(table.getColumn(2).textAlign).to.equal(TextAlignment.right);
                expect(table.getCellByIndices(2, 2).merged).to.equal(TableCellMerge.left);
                expect(table.getCellByIndices(5, 2).merged).to.equal(TableCellMerge.left);
                expect(table.getRow(4).startsNewSection).to.be.true;
                expect(table.caption.text).to.equal("Prototype table");
                expect(table.caption.position).to.equal(TableCaptionPosition.bottom);
            });

            it("should parse a table without header", () =>{
                let table: Table;
                expect(() => {
                    table = mmdParser.parse(dedent`
                    |-----|-----|-----|
                    | jkl | mno | pqr |
                    `);
                }).to.not.throw();

                expect(table.getHeaderRows()).to.be.an( "array" ).that.is.empty;
                expect(table.getNormalRows()).to.be.an( "array" ).that.has.a.lengthOf(1);
            });

            it("should parse a header-only table", () =>{
                let table: Table;
                expect(() => {
                    table = mmdParser.parse(dedent`
                    | abc | def | ghi |
                    |-----|-----|-----|
                    `);
                }).to.not.throw();

                expect(table.getHeaderRows()).to.be.an( "array" ).that.has.a.lengthOf(1);
                expect(table.getNormalRows()).to.be.an( "array" ).that.is.empty;
            });
        });

        context("when parsing invalid tables", () => {
            it("should throw an error on missing cells", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    | abc     | def  | ghi |
                    |---------|------|-----|
                    | missing | cell |
                    `);
                }).to.throw();
            });

            it("should throw an error on excess cells", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    | abc    | def  | ghi   |
                    |--------|------|-------|
                    | excess | cell | right | here! |
                    `);
                }).to.throw();
            });

            it("should throw an error on missing delimiter row", () =>{
                expect(() => {
                    mmdParser.parse(dedent`
                    | abc | def | ghi |
                    | jkl | mno | pqr |
                    `);
                }).to.throw();
            });
        });
    });
});

describe("PrettyMultiMarkdownTableRenderer", () => {
    let mmdRenderer: PrettyMultiMarkdownTableRenderer;

    before(() => {
        mmdRenderer = new PrettyMultiMarkdownTableRenderer();
    });
});

describe("MinifiedMultiMarkdownTableRenderer", () => {
    let mmdRenderer: MinifiedMultiMarkdownTableRenderer;

    before(() => {
        mmdRenderer = new MinifiedMultiMarkdownTableRenderer();
    });
});