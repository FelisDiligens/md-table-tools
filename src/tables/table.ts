export enum TextAlignment {
    left,
    center,
    right,
    default
}

export enum TableCellMerge {
    above,
    left,
    none
}

export class TableCell {
    public text: string;
    public table: Table;
    public row: TableRow;
    public column: TableColumn;
    public merged: TableCellMerge;

    public constructor(table: Table, row: TableRow, column: TableColumn) {
        this.text = "";
        this.table = table;
        this.row = row;
        this.column = column;
        this.merged = TableCellMerge.none;
    }

    public isHeaderCell(): boolean {
        return this.row.isHeader;
    }

    public getTextAlignment(): TextAlignment {
        return this.column.textAlign;
    }

    public setText(text: string) {
        this.text = text;
    }

    public getColspan(): number {
        if (this.merged == TableCellMerge.none) {
            let col = this.table.indexOfColumn(this.column) + 1;
            if (col > this.table.columnCount())
                return 1;

            let colspan = 1;
            let cells = this.table.getCellsInRow(this.row);
            for (; col < this.table.columnCount(); col++) {
                if (cells[col].merged == TableCellMerge.left)
                    colspan++;
                else
                    break;
            }
            return colspan;
        }
        return 1;
    }

    public getRowspan(): number {
        if (this.merged == TableCellMerge.none) {
            let row = this.table.indexOfRow(this.row) + 1;
            if (row > this.table.rowCount())
                return 1;

            let rowspan = 1;
            let cells = this.table.getCellsInColumn(this.column);
            for (; row < this.table.rowCount(); row++) {
                if (cells[row].merged == TableCellMerge.above)
                    rowspan++;
                else
                    break;
            }
            return rowspan;
        }
        return 1;
    }
}

export class TableRow {
    public isHeader: boolean;
    public startsNewSection: boolean;

    public constructor() {
        this.isHeader = false;
        this.startsNewSection = false;
    }
}

export class TableColumn {
    public textAlign: TextAlignment;

    public constructor() {
        this.textAlign = TextAlignment.default;
    }
}

export class Table {
    private cells: Array<TableCell>;
    private rows: Array<TableRow>;
    private columns: Array<TableColumn>;
    public caption: string;

    public constructor(rowNum: number = 0, colNum: number = 0) {
        this.cells = [];
        this.rows = [...Array(rowNum)].map((_, i) => new TableRow());
        this.columns = [...Array(colNum)].map((_, i) => new TableColumn());
        this.caption = "";
    }

    /**
     * Adds a TableRow to the table.
     * @param index Insert row at index. -1 means it's appended.
     * @param row (optional)
     * @returns The added row.
     */
    public addRow(index: number = -1, row: TableRow = new TableRow()): TableRow {
        if (index < 0)
            this.rows.push(row);
        else
            this.rows.splice(index, 0, row);
        return row;
    }

    /**
     * Adds a TableColumn to the table.
     * @param index Insert column at index. -1 means it's appended.
     * @param col (optional)
     * @returns The added column.
     */
    public addColumn(index: number = -1, col: TableColumn = new TableColumn()): TableColumn {
        if (index < 0)
            this.columns.push(col);
        else
            this.columns.splice(index, 0, col);
        return col;
    }

    /** Get the row at index. Negative index counts back from the end. */
    public getRow(index: number): TableRow {
        return this.rows.at(index);
    }

    /** Get the index of the row. */
    public indexOfRow(row: TableRow): number {
        return this.rows.indexOf(row);
    }

    /** Get the column at index. Negative index counts back from the end. */
    public getColumn(index: number): TableColumn {
        return this.columns.at(index);
    }

    /** Get the index of the column. */
    public indexOfColumn(col: TableColumn): number {
        return this.columns.indexOf(col);
    }

    /** Removes the given column. Also removes all cells within the column. */
    public removeColumn(col: TableColumn) {
        let columnCells = this.getCellsInColumn(col);
        this.cells = this.cells.filter(cell => !columnCells.includes(cell));
        this.columns = this.columns.filter(c => c != col);
    }

    /** Removes the given row. Also removes all cells within the row. */
    public removeRow(row: TableRow) {
        let rowCells = this.getCellsInRow(row);
        this.cells = this.cells.filter(cell => !rowCells.includes(cell));
        this.rows = this.rows.filter(r => r != row);
    }

    public moveColumn(col: TableColumn, newIndex: number) {
        throw new Error("Not implemented");
    }

    public moveRow(row: TableRow, newIndex: number) {
        throw new Error("Not implemented");
    }

    /** Returns a list of all rows that are headers. */
    public getHeaderRows(): Array<TableRow> {
        return this.rows.filter(r => r.isHeader);
    }

    /** Returns a list of all rows that aren't headers. */
    public getNormalRows(): Array<TableRow> {
        return this.rows.filter(r => !r.isHeader);
    }

    public getRows(): Array<TableRow> {
        return this.rows;
    }

    public getColumns(): Array<TableColumn> {
        return this.columns;
    }

    public getCells(): Array<TableCell> {
        return this.cells;
    }

    /** Returns all cells within the given row. */
    public getCellsInRow(rowObj: TableRow) {
        return this.cells.filter(cell => cell.row == rowObj);
    }

    /** Returns all cells within the given column. */
    public getCellsInColumn(columnObj: TableColumn) {
        return this.cells.filter(cell => cell.column == columnObj);
    }

    /** Return the cell at row and column. */
    public getCellByObjs(rowObj: TableRow, columnObj: TableColumn): TableCell {
        for (const cell of this.cells) {
            if (cell.row == rowObj && cell.column == columnObj)
                return cell;
        }

        let newCell = new TableCell(this, rowObj, columnObj);
        this.cells.push(newCell);
        return newCell;
    }

    /** Return the cell at row and column. */
    public getCellByIndices(row: number, column: number): TableCell {
        return this.getCellByObjs(
            this.rows.at(row),
            this.columns.at(column)
        );
    }

    public rowCount(): number {
        return this.rows.length;
    }

    public columnCount(): number {
        return this.columns.length;
    }

    /** Tries to find invalid configurations and sanitize them. */
    public sanitize() {
        for (const cell of this.getCellsInColumn(this.columns[0]))
            if (cell.merged == TableCellMerge.left)
                cell.merged = TableCellMerge.none;

        for (const cell of this.getCellsInRow(this.getHeaderRows()[0]))
            if (cell.merged == TableCellMerge.above)
                cell.merged = TableCellMerge.none;

        for (const cell of this.getCellsInRow(this.getNormalRows()[0]))
            if (cell.merged == TableCellMerge.above)
                cell.merged = TableCellMerge.none;
    }
}

