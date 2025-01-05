import { expect } from "chai";
import dedent from "dedent-js"; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import "mocha";
import { Table, TableCaption, TableCaptionPosition, TableCellMerge, TextAlignment } from "../../tables/table.js";
import { DokuWikiTableParser, DokuWikiTableRenderer } from "../../tables/dokuWikiTable.js";

let exampleTable = new Table(5, 4);
exampleTable.getColumn(1).textAlign = TextAlignment.left;
exampleTable.getColumn(2).textAlign = TextAlignment.center;
exampleTable.getColumn(3).textAlign = TextAlignment.right;
exampleTable.caption = new TableCaption("Table caption as block quote", "", TableCaptionPosition.bottom);

exampleTable.getRow(0).isHeader = true;
exampleTable.getCell(0, 0).setText("Table with alignment");
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

exampleTable.getCell(3, 0).setText("Foobar\\\\ (merged cell)");
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
                    dedent`^ Table with alignment                            ^^^^
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
                dedent`^ Table with alignment                            ^^^^
                       ^                        ^ Left  ^  Center  ^  Right ^
                       | A                      |       |    B     |      C |
                       | Foobar\\\\ (merged cell) | span cell       ||      D |
                       | :::                    | E     |     span cell    ||

                       > Table caption as block quote`
            );
        });
    });
});
