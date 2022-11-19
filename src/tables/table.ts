export enum TextAlignment {
    left = "left",
    center = "center",
    right = "right",
    default = "start"
}

export enum TableCellMerge {
    above,
    left,
    none
}

export enum TableCaptionPosition {
    top = "top",
    bottom = "bottom"
}

export class TableCaption {
    public constructor(
        public text = "",
        public label = "",
        public position = TableCaptionPosition.top) { }

    public getLabel(): string {
        // "If you have a caption, you can also have a label, allowing you to create anchors pointing to the table. If there is no label, then the caption acts as the label"
        if (typeof this.label === 'string' && this.label.trim() !== "")
            return this.label.trim().replace(/\s/g, "-");
        return this.text.trim().toLowerCase().replace(/\s/g, "-");
    }
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
        if (this.merged != TableCellMerge.left) {
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
        if (this.merged != TableCellMerge.above) {
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
    public cells: Array<TableCell>;

    public constructor(
        public index: number = 0,
        public isHeader: boolean = false,
        public startsNewSection: boolean = false) {
        this.cells = [];
    }

    public updateCells(table: Table) {
        if (table.columnCount() != this.cells.length)
            this.cells = table.getCells().filter(cell => cell.row == this);
        this.cells = this.cells.sort((a, b) => a.column.index - b.column.index);
    }
}

export class TableColumn {
    public cells: Array<TableCell>;

    public constructor(
        public index: number = 0,
        public textAlign: TextAlignment = TextAlignment.default) {
        this.cells = [];
    }

    public updateCells(table: Table) {
        if (table.rowCount() != this.cells.length)
            this.cells = table.getCells().filter(cell => cell.column == this);
        this.cells = this.cells.sort((a, b) => a.row.index - b.row.index);
    }
}

export class Table {
    private cells: Array<TableCell>;
    private rows: Array<TableRow>;
    private columns: Array<TableColumn>;
    public caption: TableCaption;

    public constructor(rowNum: number = 0, colNum: number = 0) {
        this.cells = [];
        this.rows = Array.from({length: rowNum}, (i: number) => new TableRow(i));
        this.columns = Array.from({length: colNum}, (i: number) => new TableColumn(i));
        this.caption = null;
    }

    /**
     * Adds a TableRow to the table.
     * @param index Insert row at index. -1 means it's appended.
     * @param row (optional)
     * @returns The added row.
     */
    public addRow(index: number = -1, row: TableRow = new TableRow()): TableRow {
        if (index < 0) {
            row.index = this.rows.push(row) - 1;
        } else {
            row.index = index;
            this.rows.splice(index, 0, row);
            // TODO !! Update the index of each row below.
            // TODO ?? this.update();
        }
        return row;
    }

    /**
     * Adds a TableColumn to the table.
     * @param index Insert column at index. -1 means it's appended.
     * @param col (optional)
     * @returns The added column.
     */
    public addColumn(index: number = -1, col: TableColumn = new TableColumn()): TableColumn {
        if (index < 0) {
            col.index = this.columns.push(col);
        } else {
            col.index = index;
            this.columns.splice(index, 0, col);
            // TODO !! Update the index of each column after.
            // TODO ?? this.update();
        }
        return col;
    }

    /** Get the row at index. Negative index counts back from the end. Returns undefined if out-of-bounds. */
    public getRow(index: number): TableRow {
        return this.rows.at(index);
    }

    /** Get the index of the row. -1 if it hasn't been found. */
    public indexOfRow(row: TableRow): number {
        return this.rows.indexOf(row);
    }

    /** Get the column at index. Negative index counts back from the end. Returns undefined if out-of-bounds. */
    public getColumn(index: number): TableColumn {
        return this.columns.at(index);
    }

    /** Get the index of the column. -1 if it hasn't been found. */
    public indexOfColumn(col: TableColumn): number {
        return this.columns.indexOf(col);
    }

    /** Removes the given column. Also removes all cells within the column. */
    public removeColumn(col: TableColumn) {
        let columnCells = this.getCellsInColumn(col);
        this.cells = this.cells.filter(cell => !columnCells.includes(cell));
        this.columns = this.columns.filter(c => c != col);
        // TODO ?? this.update();
    }

    /** Removes the given row. Also removes all cells within the row. */
    public removeRow(row: TableRow) {
        let rowCells = this.getCellsInRow(row);
        this.cells = this.cells.filter(cell => !rowCells.includes(cell));
        this.rows = this.rows.filter(r => r != row);
        // TODO ?? this.update();
    }

    public moveColumn(col: TableColumn, newIndex: number) {
        throw new Error("Not implemented");
        // TODO ?? this.update();
    }

    public moveRow(row: TableRow, newIndex: number) {
        throw new Error("Not implemented");
        // TODO ?? this.update();
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
        return rowObj.cells;
    }

    /** Returns all cells within the given column. */
    public getCellsInColumn(columnObj: TableColumn) {
        return columnObj.cells;
    }

    /** Returns the cell at row and column. */
    private getCellByObjs(rowObj: TableRow, columnObj: TableColumn): TableCell {
        // Intersection of row / column:
        for (const cell of rowObj.cells) {
            if (columnObj.cells.includes(cell))
                return cell;
        }

        let newCell = new TableCell(this, rowObj, columnObj);
        this.addCell(newCell);
        return newCell;
    }

    /**
     * Returns the cell at row and column.
     * @param row Either index or object reference.
     * @param column Either index or object reference.
     * @returns The cell at row and column.
     */
    public getCell(row: number | TableRow, column: number | TableColumn): TableCell {
        return this.getCellByObjs(
            typeof row === "number" ? this.rows.at(row) : row,
            typeof column === "number" ? this.columns.at(column) : column
        );
    }

    /** Be careful not to add a cell with row/column that already exist. Otherwise, the added cell will be overshadowed and not be used. */
    public addCell(cell: TableCell) {
        this.cells.push(cell);
        cell.row.cells.push(cell);
        cell.column.cells.push(cell);
    }

    public rowCount(): number {
        return this.rows.length;
    }

    public columnCount(): number {
        return this.columns.length;
    }

    /**
     * -> Ensures that all table cells exist.
     * -> Updates indices and sorts the cells within rows and columns.
     * -> Tries to find invalid configurations and sanitize them.
     * 
     * Use when altering the table.
     */
    public update(): Table {
        // Iterate over the entire table:
        let columnObj: TableColumn;
        let rowObj: TableRow;
        for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
            // Update the column's index:
            columnObj = this.columns[colIndex];
            columnObj.index = colIndex;

            for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                // Update the row's index:
                rowObj = this.rows[rowIndex];
                rowObj.index = rowIndex;

                // Use "getCellByObjs" to ensure that the cell gets created, if it doesn't exist already:
                this.getCellByObjs(rowObj, columnObj);
            }
        }

        // Update the column's 'cells' array:
        for (const column of this.columns)
            column.updateCells(this);

        // Update the row's 'cells' array:
        for (const row of this.rows)
            row.updateCells(this);

        this.sanitize();
        return this;
    }

    /** Tries to find invalid configurations and sanitize them. */
    private sanitize(): Table {
        if (this.getNormalRows().length > 0) {
            // Cannot merge cell above if in first row:
            for (const cell of this.getCellsInRow(this.getNormalRows()[0])) {
                if (cell.merged == TableCellMerge.above)
                    cell.merged = TableCellMerge.none;
            }
    
            this.getNormalRows()[0].startsNewSection = false;
        }

        for (const cell of this.cells) {
            // Cannot merge cell left if in first column:
            if (cell.column == this.columns[0] && cell.merged == TableCellMerge.left)
                cell.merged = TableCellMerge.none;

            // Cannot merge cell above if in first row:
            if ((cell.row == this.rows[0] || cell.row.startsNewSection) && cell.merged == TableCellMerge.above)
                cell.merged = TableCellMerge.none;
        }
        
        return this;
    }
}

