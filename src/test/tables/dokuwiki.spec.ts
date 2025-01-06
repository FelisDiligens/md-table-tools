import { expect } from "chai";
import dedent from "dedent-js"; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import "mocha";
import { Table, TableCaption, TableCaptionPosition, TableCellMerge, TextAlignment } from "../../tables/table.js";
import { DokuWikiTableParser, DokuWikiTableRenderer } from "../../tables/dokuWikiTable.js";

/******************** exampleTable *********************

 ^                Table with alignment             ^^^^
 ^                        ^ Left  ^  Center  ^  Right ^
 | A                      |       |    B     |      C |
 | Foobar\\ (merged cell) | span cell       ||      D |
 | :::                    | E     |     span cell    ||

> Table caption as block quote

*******************************************************/

let exampleTable = new Table(5, 4);
exampleTable.getColumn(1).textAlign = TextAlignment.left;
exampleTable.getColumn(2).textAlign = TextAlignment.center;
exampleTable.getColumn(3).textAlign = TextAlignment.right;
exampleTable.caption = new TableCaption("Table caption as block quote", "", TableCaptionPosition.bottom);

exampleTable.getRow(0).isHeader = true;
exampleTable.getCell(0, 0).setText("Table with alignment");
exampleTable.getCell(0, 0).textAlign = TextAlignment.center;
exampleTable.getCell(0, 1).merged = TableCellMerge.left;
exampleTable.getCell(0, 2).merged = TableCellMerge.left;
exampleTable.getCell(0, 3).merged = TableCellMerge.left;

exampleTable.getRow(1).isHeader = true;
exampleTable.getCell(1, 1).setText("Left");
exampleTable.getCell(1, 2).setText("Center");
exampleTable.getCell(1, 3).setText("Right");

exampleTable.getCell(2, 0).setText("A");
exampleTable.getCell(2, 2).setText("B");
exampleTable.getCell(2, 3).setText("C");

exampleTable.getCell(3, 0).setText("Foobar\n(merged cell)");
exampleTable.getCell(3, 1).setText("span cell");
exampleTable.getCell(3, 2).merged = TableCellMerge.left;
exampleTable.getCell(3, 3).setText("D");

exampleTable.getCell(4, 0).merged = TableCellMerge.above;
exampleTable.getCell(4, 1).setText("E");
exampleTable.getCell(4, 2).setText("span cell");
exampleTable.getCell(4, 3).merged = TableCellMerge.left;

exampleTable.update();

describe("DokuWikiTableParser", () => {
    let dokuWikiParser: DokuWikiTableParser;

    before(() => {
        dokuWikiParser = new DokuWikiTableParser();
    });

    describe(".parse()", () => {
        it("should parse the example table just fine", () => {
            let table: Table;
            expect(() => {
                table = dokuWikiParser.parse(
                    dedent`^                Table with alignment             ^^^^
                           ^                        ^ Left  ^  Center  ^  Right ^
                           | A                      |       |    B     |      C |
                           | Foobar\\ (merged cell) | span cell       ||      D |
                           | :::                    | E     |     span cell    ||`
                );
            }).to.not.throw();

            expect(table.columnCount()).to.equal(4);
            expect(table.rowCount()).to.equal(5);
            expect(table.getHeaderRows()).to.be.an("array").that.has.a.lengthOf(2);
            expect(table.getNormalRows()).to.be.an("array").that.has.a.lengthOf(3);
            expect(table.getCell(0, 0).textAlign).to.equal(TextAlignment.center);
            expect(table.getColumn(1).textAlign).to.equal(TextAlignment.left);
            expect(table.getColumn(2).textAlign).to.equal(TextAlignment.center);
            expect(table.getColumn(3).textAlign).to.equal(TextAlignment.right);
            expect(table.getCell(0, 1).merged).to.equal(TableCellMerge.left);
            expect(table.getCell(0, 2).merged).to.equal(TableCellMerge.left);
            expect(table.getCell(0, 3).merged).to.equal(TableCellMerge.left);
            expect(table.getCell(3, 2).merged).to.equal(TableCellMerge.left);
            expect(table.getCell(4, 0).merged).to.equal(TableCellMerge.above);
            expect(table.getCell(4, 3).merged).to.equal(TableCellMerge.left);
        });

        it("should parse header cells independent from row", () => {
            let table: Table;
            expect(() => {
                table = dokuWikiParser.parse(
                    dedent`|              ^ Heading 1            ^ Heading 2          ^
                           ^ Heading 3    | Row 1 Col 2          | Row 1 Col 3        |
                           ^ Heading 4    | no colspan this time |                    |
                           ^ Heading 5    | Row 2 Col 2          | Row 2 Col 3        |`
                );
            }).to.not.throw();

            expect(table.columnCount()).to.equal(3);
            expect(table.rowCount()).to.equal(4);

            expect(table.getCell(0, 0).isHeader).to.equal(false);
            expect(table.getCell(0, 1).isHeader).to.equal(true);
            expect(table.getCell(0, 2).isHeader).to.equal(true);

            expect(table.getCell(1, 0).isHeader).to.equal(true);
            expect(table.getCell(1, 1).isHeader).to.equal(false);
            expect(table.getCell(1, 2).isHeader).to.equal(false);

            expect(table.getCell(2, 0).isHeader).to.equal(true);
            expect(table.getCell(2, 1).isHeader).to.equal(false);
            expect(table.getCell(2, 2).isHeader).to.equal(false);

            expect(table.getCell(3, 0).isHeader).to.equal(true);
            expect(table.getCell(3, 1).isHeader).to.equal(false);
            expect(table.getCell(3, 2).isHeader).to.equal(false);
        });

        it("should parse cell alignment independent from column", () => {
            let table: Table;
            expect(() => {
                table = dokuWikiParser.parse(
                    dedent`^           Table with alignment           ^^^
                           |         right|    center    |left          |
                           |left          |         right|    center    |
                           | xxxxxxxxxxxx | xxxxxxxxxxxx | xxxxxxxxxxxx |`
                );
            }).to.not.throw();

            expect(table.columnCount()).to.equal(3);
            expect(table.rowCount()).to.equal(4);

            expect(table.getCell(0, 0).textAlign).to.equal(TextAlignment.center);

            expect(table.getCell(1, 0).textAlign).to.equal(TextAlignment.right);
            expect(table.getCell(1, 1).textAlign).to.equal(TextAlignment.center);
            expect(table.getCell(1, 2).textAlign).to.equal(TextAlignment.left);

            expect(table.getCell(2, 0).textAlign).to.equal(TextAlignment.left);
            expect(table.getCell(2, 1).textAlign).to.equal(TextAlignment.right);
            expect(table.getCell(2, 2).textAlign).to.equal(TextAlignment.center);

            expect(table.getCell(3, 0).textAlign).to.equal(TextAlignment.default);
            expect(table.getCell(3, 1).textAlign).to.equal(TextAlignment.default);
            expect(table.getCell(3, 2).textAlign).to.equal(TextAlignment.default);
        });
    });
});

describe("DokuWikiTableRenderer", () => {
    let dokuWikiRenderer: DokuWikiTableRenderer;

    before(() => {
        dokuWikiRenderer = new DokuWikiTableRenderer();
    });

    describe(".render()", () => {
        it("should pretty format the example table", () => {
            expect(dokuWikiRenderer.render(exampleTable)).to.equal(
                dedent`^                Table with alignment             ^^^^
                       ^                        ^ Left  ^  Center  ^  Right ^
                       | A                      |       |    B     |      C |
                       | Foobar\\\\ (merged cell) | span cell       ||      D |
                       | :::                    | E     |     span cell    ||

                       > Table caption as block quote`
            );
        });
    });
});
