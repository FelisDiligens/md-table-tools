import "mocha";
import { expect } from "chai";
import dedent from 'dedent-js'; // https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
import { Table, TableCellMerge, TextAlignment } from "../../tables/table.js";

describe("Table", () => {
    describe("@constructor", () => {
        it("should create an empty table with rows and columns", () =>{
            let rowCount = 4;
            let columnCount = 5;

            // Create a new table:
            let table = new Table(rowCount, columnCount);

            // Row and column count should equal the inputted onces:
            expect(table.rowCount()).to.equal(rowCount);
            expect(table.columnCount()).to.equal(columnCount);

            // The indices should match:
            for (let index = 0; index < rowCount; index++)
                expect(table.getRow(index).index).to.equal(index);
            for (let index = 0; index < columnCount; index++)
                expect(table.getColumn(index).index).to.equal(index);

            // No cells yet (= empty table):
            expect(table.getCells()).to.be.an("array").that.is.empty;
        });
    });
});