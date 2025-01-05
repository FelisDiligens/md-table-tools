import {
    Table,
    TableCaption,
    TableCaptionPosition,
    TableCell,
    TableCellMerge,
    TableRow,
    TextAlignment,
} from "./table.js";
import { TableParser } from "./tableParser.js";
import { TableRenderer } from "./tableRenderer.js";
import stringWidth from "string-width";

/*
    Syntax: https://www.dokuwiki.org/wiki:syntax#tables
*/

const rowRegex = /^[\|\^](.+)[\|\^]$/;

enum ParsingState {
    BeforeTable,
    Row,
    AfterTable,
}

/**
 * Not all features of DokuWiki's tables are implemented due to the way the intermediary data is laid out (the library focuses on MultiMarkdown's feature set).
 *
 * These features are not supported:
 * - Vertical table headers
 * - Mixed table rows (`^` header cells and `|` normal cells in the same row)
 * - Independent (from column) cell alignment (left, center, right)
 */
export class DokuWikiTableParser implements TableParser {
    parse(table: string): Table {
        let parsedTable = new Table();
        let state = ParsingState.BeforeTable;
        let beforeTable = [];
        let afterTable = [];

        // Parse line by line:
        for (let line of table.trim().split("\n")) {
            // Check if we are in the table:
            if (state == ParsingState.BeforeTable && line.match(rowRegex)) {
                state = ParsingState.Row;
            }

            // Check if we are no longer in the table:
            if (state != ParsingState.BeforeTable && state != ParsingState.AfterTable && !line.match(rowRegex)) {
                state = ParsingState.AfterTable;
            }

            // If not inside table:
            if (state == ParsingState.BeforeTable) {
                beforeTable.push(line);
                continue; // Skip the rest
            } else if (state == ParsingState.AfterTable) {
                afterTable.push(line);
                continue; // Skip the rest
            }

            // Parse row:
            if (state == ParsingState.Row) {
                let tableRow = new TableRow();
                parsedTable.addRow(-1, tableRow);

                // Very cheaply "detect" header row:
                if (line.includes("^")) {
                    tableRow.isHeader = true;
                }

                // Parse each character:
                let cellContent = "";
                let colIndex = 0;
                let spaces = 0;
                let leftHasSpaces = false;
                let rightHasSpaces = false;
                let foundCellContent = false;
                for (let char of line.trim().substring(1, line.length)) {
                    if (char == "|" || char == "^") {
                        let tableColumn = parsedTable.getColumn(colIndex);
                        if (!tableColumn) tableColumn = parsedTable.addColumn();
                        let cell = new TableCell(parsedTable, tableRow, tableColumn);
                        parsedTable.addCell(cell);

                        if (foundCellContent && spaces >= 2) {
                            rightHasSpaces = true;
                        }

                        if (tableColumn.textAlign == TextAlignment.default) {
                            if (leftHasSpaces && rightHasSpaces) {
                                tableColumn.textAlign = TextAlignment.center;
                            } else if (leftHasSpaces) {
                                tableColumn.textAlign = TextAlignment.right;
                            } else if (rightHasSpaces) {
                                tableColumn.textAlign = TextAlignment.left;
                            }
                        }

                        if (cellContent.trim() == ":::") {
                            cell.merged = TableCellMerge.above;
                        } else if (cellContent === "") {
                            cell.merged = TableCellMerge.left;
                        } else {
                            cell.setText(cellContent.trim().replace(/\\\\ /g, "\n"));
                        }

                        cellContent = "";
                        colIndex++;

                        spaces = 0;
                        leftHasSpaces = false;
                        rightHasSpaces = false;
                        foundCellContent = false;
                    } else if (char == " ") {
                        spaces++;
                        cellContent += char;
                    } else {
                        if (!foundCellContent && spaces >= 2) {
                            leftHasSpaces = true;
                        }
                        cellContent += char;
                        spaces = 0;
                        foundCellContent = true;
                    }
                }

                // Insert empty cells if missing:
                for (; colIndex < parsedTable.columnCount(); colIndex++) {
                    let cell = new TableCell(parsedTable, tableRow, parsedTable.getColumn(colIndex));
                    parsedTable.addCell(cell);
                }
            }
        }

        parsedTable.beforeTable = beforeTable.join("\n");
        parsedTable.afterTable = afterTable.join("\n");

        return parsedTable.update();
    }
}

/**
 * Not all features are implemented because some features from MultiMarkdown are missing in DokuWiki's syntax (afaik):
 *
 * These features are not supported:
 * - Table captions
 * - Multiline rows
 */
export class DokuWikiTableRenderer implements TableRenderer {
    render(table: Table): string {
        const headerRows = table.getHeaderRows();
        const normalRows = table.getNormalRows();
        const columnWidths = this.determineColumnWidths(table);

        let result: string[] = [];

        if (table.beforeTable.trim() !== "") {
            result.push(table.beforeTable);
        }

        // DokuWiki has no table caption -- insert "caption" (if position is top):
        if (table.caption && table.caption.position == TableCaptionPosition.top) {
            result.push(this.renderCaption(table.caption));
        }

        // Header:
        if (headerRows.length > 0) {
            for (const row of headerRows) {
                result.push(this.renderRow(table, row, true, columnWidths));
            }
        }

        // Rows:
        for (const row of normalRows) {
            result.push(this.renderRow(table, row, false, columnWidths));
        }

        // DokuWiki has no table caption -- insert "caption" (if position is bottom):
        if (table.caption && table.caption.position == TableCaptionPosition.bottom) {
            result.push(this.renderCaption(table.caption));
        }

        if (table.afterTable.trim() !== "") {
            result.push(table.afterTable);
        }

        return result.join("\n");
    }

    private renderCaption(caption: TableCaption): string {
        let result: string = "";
        if (caption.position == TableCaptionPosition.bottom) {
            result += "\n";
        }
        result += "> " + caption.text;
        if (caption.position == TableCaptionPosition.top) {
            result += "\n";
        }
        return result;
    }

    private renderRow(table: Table, row: TableRow, isHeader: boolean, columnWidths: number[]): string {
        let result: string[] = [];

        table.getCellsInRow(row).forEach((cell, i) => {
            let colspan = cell.getColspan();
            let cellWidth = columnWidths[i];
            if (colspan > 1) {
                for (let col = i + 1; col < i + colspan; col++) {
                    cellWidth += columnWidths[col];
                }
                cellWidth += colspan * 2 - 2;
            }
            result.push(this.renderCell(cell, colspan, cellWidth));
        });

        // "Table rows have to start and end with a | for normal rows or a ^ for headers."
        if (isHeader) {
            return `^${result.join("^")}^`;
        } else {
            return `|${result.join("|")}|`;
        }
    }

    private renderCell(cell: TableCell, colspan: number = 1, cellWidth: number = -1): string {
        if (cell.merged == TableCellMerge.left) {
            return "";
        }

        // `:::` => merge cell above
        // `\\ ` => insert a newline
        let text = cell.merged == TableCellMerge.above ? ":::" : cell.text.replace(/\r?\n/g, "\\\\ ");
        const textLength = stringWidth(text);

        switch (cell.getTextAlignment()) {
            case TextAlignment.center:
                return `${" ".repeat(
                    Math.max(0, Math.floor((cellWidth - textLength + colspan - 1) / 2))
                )} ${text} ${" ".repeat(Math.max(0, Math.ceil((cellWidth - textLength - colspan + 1) / 2)))}`;
            case TextAlignment.right:
                return `${" ".repeat(Math.max(0, cellWidth - textLength))} ${text} `;
            case TextAlignment.left:
            case TextAlignment.default:
            default:
                return ` ${text} ${" ".repeat(Math.max(0, cellWidth - textLength))}`;
        }
    }

    private determineColumnWidths(table: Table): number[] {
        let columnWidths: number[] = Array.from({ length: table.columnCount() }, () => 0);

        for (let colIndex = table.columnCount() - 1; colIndex >= 0; colIndex--) {
            const column = table.getColumn(colIndex);
            let colWidth = 0;
            for (const cell of table.getCellsInColumn(column)) {
                let colspan = cell.getColspan();
                let cellWidth =
                    cell.merged == TableCellMerge.above ? 3 : stringWidth(cell.text.replace(/\r?\n/g, "\\\\ "));

                // Is alignment spacing needed?
                switch (cell.getTextAlignment()) {
                    case TextAlignment.center:
                        // "Add two spaces at least at both ends for centered text"
                        cellWidth += 2;
                        break;
                    case TextAlignment.right:
                    case TextAlignment.left:
                        // "Add two spaces on the left to align right, two spaces on the right to align left"
                        cellWidth += 1;
                        break;
                    case TextAlignment.default:
                    default:
                        break;
                }

                if (colspan == 1) {
                    colWidth = Math.max(cellWidth, colWidth);
                } else {
                    let leftoverWidth = columnWidths
                        .slice(colIndex + 1, colIndex + colspan)
                        .reduce((pv, cv) => pv + cv);
                    colWidth = Math.max(cellWidth - leftoverWidth, colWidth);
                }
            }
            columnWidths.splice(colIndex, 1, colWidth);
        }

        return columnWidths;
    }
}
