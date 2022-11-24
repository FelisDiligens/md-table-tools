import { Table, TableCaptionPosition, TableCellMerge, TextAlignment } from "./table.js";
import { TableRenderer } from "./tableRenderer.js";

/** More of a useless class... it generates JavaScript code that describes the given table. Only used for testing. */
export class CodeTableRenderer implements TableRenderer {
    render(table: Table): string {
        let result = [];
        //result.push(`import { Table, TableCaptionPosition, TableCellMerge, TextAlignment } from 'md-table-tools';`);
        result.push(`var table = new Table(${table.rowCount()}, ${table.columnCount()});`);

        if (table.beforeTable.trim() !== "") {
            result.push(`table.beforeTable = ${JSON.stringify(table.beforeTable)};`);
        }

        if (table.afterTable.trim() !== "") {
            result.push(`table.afterTable = ${JSON.stringify(table.afterTable)};`);
        }

        if (table.caption) {
            result.push(`table.caption = new TableCaption(${JSON.stringify(table.caption.text)}, ${table.caption.label && table.caption.label !== "" ? JSON.stringify(table.caption.label) : '""'}, TableCaptionPosition.${table.caption.position == TableCaptionPosition.bottom ? "bottom" : "top"});`);
        }
        
        for (let row of table.getHeaderRows()) {
            result.push(`table.getRow(${row.index}).isHeader = true;`);
        }

        for (let row of table.getRows()) {
            if (row.startsNewSection)
                result.push(`table.getRow(${row.index}).startsNewSection = true;`);
        }

        for (let column of table.getColumns()) {
            switch (column.textAlign) {
                case TextAlignment.left:
                    result.push(`table.getColumn(${column.index}).textAlign = TextAlignment.left;`);
                    break;
                case TextAlignment.center:
                    result.push(`table.getColumn(${column.index}).textAlign = TextAlignment.center;`);
                    break;
                case TextAlignment.right:
                    result.push(`table.getColumn(${column.index}).textAlign = TextAlignment.right;`);
                    break;
            }
        }

        for (let cell of table.getCells()) {
            switch (cell.merged) {
                case TableCellMerge.above:
                    result.push(`table.getCell(${cell.row.index}, ${cell.column.index}).merged = TableCellMerge.above;`);
                    break;
                case TableCellMerge.left:
                    result.push(`table.getCell(${cell.row.index}, ${cell.column.index}).merged = TableCellMerge.left;`);
                    break;
                default:
                    if (cell.text.trim() !== "")
                        result.push(`table.getCell(${cell.row.index}, ${cell.column.index}).setText(${JSON.stringify(cell.text)});`);
                    break;
            }
        }

        result.push(`table.update();`);
        return result.join("\n");
    }
}