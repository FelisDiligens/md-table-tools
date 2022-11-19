import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { MinifiedMultiMarkdownTableRenderer, MultiMarkdownTableParser, PrettyMultiMarkdownTableRenderer } from "../../tables/multiMarkdownTable.js";
import { Table, TableCaption, TableCaptionPosition, TableCellMerge, TextAlignment } from "../../tables/table.js";

`
Stage | Direct Products | ATP Yields
----: | --------------: | ---------:
Glycolysis | 2 ATP ||
^^ | 2 NADH | 3--5 ATP |
Pyruvaye oxidation | 2 NADH | 5 ATP |
Citric acid cycle | 2 ATP ||
^^ | 6 NADH | 15 ATP |
^^ | 2 FADH2 | 3 ATP |
**30--32** ATP |||
[Net ATP yields per hexose]
`;

`
|--|--|--|--|--|--|--|--|
|♜|  |♝|♛|♚|♝|♞|♜|
|  |♟|♟|♟|  |♟|♟|♟|
|♟|  |♞|  |  |  |  |  |
|  |♗|  |  |♟|  |  |  |
|  |  |  |  |♙|  |  |  |
|  |  |  |  |  |♘|  |  |
|♙|♙|♙|♙|  |♙|♙|♙|
|♖|♘|♗|♕|♔|  |  |♖|
`;

`
|  one  | two, and a half | three and a quarter |       |       |
| ----: | :-------------: | :-----------------: | :---: | :---- |
|  four |      five       |                     |       | six   |
|||||
|  hell                  ||       hath no       | fury  |       |
[Title]
`;

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

                expect(table.columnCount()).to.equal(3);
                expect(table.rowCount()).to.equal(6);
                expect(table.getHeaderRows()).to.be.an( "array" ).that.has.a.lengthOf(2);
                expect(table.getNormalRows()).to.be.an( "array" ).that.has.a.lengthOf(4);
                expect(table.getColumn(0).textAlign).to.equal(TextAlignment.default);
                expect(table.getColumn(1).textAlign).to.equal(TextAlignment.center);
                expect(table.getColumn(2).textAlign).to.equal(TextAlignment.right);
                expect(table.getCell(2, 2).merged).to.equal(TableCellMerge.left);
                expect(table.getCell(5, 2).merged).to.equal(TableCellMerge.left);
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


let exampleTable = new Table(6, 3);
exampleTable.getColumn(1).textAlign = TextAlignment.center;
exampleTable.getColumn(2).textAlign = TextAlignment.right;
exampleTable.caption = new TableCaption("Prototype table", "", TableCaptionPosition.bottom);

exampleTable.getRow(0).isHeader = true;
exampleTable.getCell(0, 1).setText("Grouping");
exampleTable.getCell(0, 2).merged = TableCellMerge.left;

exampleTable.getRow(1).isHeader = true;
exampleTable.getCell(1, 0).setText("First Header");
exampleTable.getCell(1, 1).setText("Second Header");
exampleTable.getCell(1, 2).setText("Third Header");

exampleTable.getCell(2, 0).setText("Content");
exampleTable.getCell(2, 1).setText("*Long Cell*");
exampleTable.getCell(2, 2).merged = TableCellMerge.left;

exampleTable.getCell(3, 0).setText("Content");
exampleTable.getCell(3, 1).setText("**Cell**");
exampleTable.getCell(3, 2).setText("Cell");

exampleTable.getCell(4, 0).setText("New section");
exampleTable.getCell(4, 1).setText("More");
exampleTable.getCell(4, 2).setText("Data");
exampleTable.getRow(4).startsNewSection = true;

exampleTable.getCell(5, 0).setText("And more");
exampleTable.getCell(5, 1).setText("With an escaped '\\|'");
exampleTable.getCell(5, 2).merged = TableCellMerge.left;

exampleTable.update();

describe("PrettyMultiMarkdownTableRenderer", () => {
    let mmdRenderer: PrettyMultiMarkdownTableRenderer;

    before(() => {
        mmdRenderer = new PrettyMultiMarkdownTableRenderer();
    });

    describe(".render()", () => {
        it("should pretty format the example table", () =>{
            expect(
                mmdRenderer.render(exampleTable)
            ).to.equal(
                dedent`|              |          Grouping           ||
                       | First Header | Second Header | Third Header |
                       |--------------|:-------------:|-------------:|
                       | Content      |         *Long Cell*         ||
                       | Content      |   **Cell**    |         Cell |
                       
                       | New section  |     More      |         Data |
                       | And more     |    With an escaped '\\|'     ||
                       [Prototype table]`)
        });
    });
});

describe("MinifiedMultiMarkdownTableRenderer", () => {
    let mmdRenderer: MinifiedMultiMarkdownTableRenderer;

    before(() => {
        mmdRenderer = new MinifiedMultiMarkdownTableRenderer();
    });

    describe(".render()", () => {
        it("should make a minified table and leave out unnecessary pipes and spaces", () =>{
            expect(
                mmdRenderer.render(exampleTable)
            ).to.equal(
                dedent`| |Grouping||
                       First Header|Second Header|Third Header
                       -|:-:|-:
                       Content|*Long Cell*||
                       Content|**Cell**|Cell
                       
                       New section|More|Data
                       And more|With an escaped '\\|'||
                       [Prototype table]`)
        });
    });
});