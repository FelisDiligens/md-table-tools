import "mocha";
import { expect } from "chai";
import { Table, TableCellMerge, TextAlignment } from "../../tables/table.js";

describe("Table", () => {
    describe("@constructor", () => {
        it("should create an empty table with rows and columns", () => {
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

    describe(".removeRow()", () => {
        it("should remove the row including it's cells", () => {
            let table = new Table(5, 5);
            table.getCell(3, 3).setText("Test");

            // Remove row:
            table.removeRow(3);
            
            expect(table.getRows()).to.be.an("array").with.a.lengthOf(4);
            expect(table.getCell(3, 3).text).to.not.equal("Test");
        });
    });

    describe(".removeColumn()", () => {
        it("should remove the column including it's cells", () => {
            let table = new Table(5, 5);
            table.getCell(3, 3).setText("Test");

            // Remove column:
            table.removeColumn(3);
            
            expect(table.getColumns()).to.be.an("array").with.a.lengthOf(4);
            expect(table.getCell(3, 3).text).to.not.equal("Test");
        });
    });

    describe(".moveRow()", () => {
        it("should move a row to a new index", () => {
            let table = new Table(4, 5);
            table.getCell(2, 3).setText("Test");

            // Move row forward:
            table.moveRow(2, 3);
            
            expect(table.getCell(3, 3).text).to.equal("Test");
            expect(table.getRow(3).index).to.equal(3);
            expect(table.getRows()).to.be.an("array").with.a.lengthOf(4);

            // Move row backward:
            table.moveRow(3, 1);

            expect(table.getCell(1, 3).text).to.equal("Test");
            expect(table.getRow(1).index).to.equal(1);
            expect(table.getRows()).to.be.an("array").with.a.lengthOf(4);
        });
    });

    describe(".moveColumn()", () => {
        it("should move a column to a new index", () => {
            let table = new Table(4, 5);
            table.getColumn(3).textAlign = TextAlignment.center;
            table.getCell(3, 3).setText("Test");

            // Move column forward:
            table.moveColumn(3, 4);

            expect(table.getCell(3, 4).text).to.equal("Test");
            expect(table.getColumn(4).textAlign).to.equal(TextAlignment.center);
            expect(table.getColumn(4).index).to.equal(4);
            expect(table.getColumns()).to.be.an("array").with.a.lengthOf(5);

            // Move column backward:
            table.moveColumn(4, 1);

            expect(table.getCell(3, 1).text).to.equal("Test");
            expect(table.getColumn(1).textAlign).to.equal(TextAlignment.center);
            expect(table.getColumn(1).index).to.equal(1);
            expect(table.getColumns()).to.be.an("array").with.a.lengthOf(5);
        });
    });
});