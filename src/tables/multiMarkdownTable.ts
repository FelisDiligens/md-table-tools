import { Table, TableCell, TableCellMerge, TableColumn, TableRow, TextAlignment } from "./table";
import { ParsingError, TableParser } from "./tableParser";
import { TableRenderer } from "./tableRenderer";

const cellRegex = /\|[^|]*\|/;
const rowRegex = /^\|([^\|]*\|[^\|]*)+\|$/;
const separatorRegex = /^\|([\-=:\.\+\s]+\|[\-=:\.\+\s]+)+\|$/; // Matches: | -- | -- |
const captionRegex = /^\[.*\]$/;

enum ParsingState {
    Header,
    Separator,
    Row,
    Caption
}

export class MultiMarkdownTableParser implements TableParser {
    parse(table: string): Table {
        // Prepare/format all lines:
        let lines = table.split("\n").map(line => {
            // Remove spaces from start and end:
            line = line.trim();

            // Empty line?
            if (line === "")
                return "";

            // Add '|' to the start and end of the line if necessary (and not if it's a caption):
            if (!line.match(captionRegex)) {
                if (!line.startsWith("|") && !line.endsWith("|"))
                    line = `|${line}|`;

                if (!line.match(rowRegex))
                    throw new ParsingError(`Invalid row: ${line}`);
            }

            return line;
        });

        // First find the table header/row separator to determine how many columns the table has:
        let separators = lines.filter(line => line.match(separatorRegex));
        if (separators.length > 1)
            throw new ParsingError("Too many separator lines. (Only 1 allowed)");
        else if (separators.length == 0)
            throw new ParsingError("Invalid table: Separator line missing.");
        let columnCount = (separators[0].match(/\|/g) || []).length - 1;
        
        // Initalize table with 0 rows and the determined amount of columns:
        let parsedTable = new Table(0, columnCount);
        let state = ParsingState.Header;

        // Now parse line by line:
        for (let line of lines) {
            // Ignore empty lines:
            if (line === "")
                continue;

            /*
                Determine parsing state:
            */

            // Is separator?
            if (state == ParsingState.Header && line.match(separatorRegex)) {
                state = ParsingState.Separator;
            }
            // If separator has been parsed last iteration:
            else if (state == ParsingState.Separator) {
                state = ParsingState.Row;
            }
            // Is caption?
            else if (state == ParsingState.Row && line.match(captionRegex)) {
                state = ParsingState.Caption;
            }

            /*
                Parse line depending on parsing state:
            */
            
            if (state == ParsingState.Header || state == ParsingState.Row) {
                let tableRow = new TableRow();
                tableRow.isHeader = state == ParsingState.Header;
                parsedTable.addRow(-1, tableRow);

                // Parse each character:
                let cellContent = "";
                let col = 0;
                let pipeEscaped = false;
                for (let char of line.substring(1, line.length)) {
                    if (!pipeEscaped && char == "|") {
                        let cell = parsedTable.getCellByObjs(tableRow, parsedTable.getColumn(col));
                        if (cellContent.trim() == "^^") {
                            cell.merged = TableCellMerge.above;
                        } else if (cellContent === "") {
                            cell.merged = TableCellMerge.left;
                        } else {
                            cell.setText(cellContent.trim());
                        }

                        cellContent = "";
                        col++;
                    } else if (!pipeEscaped && char == "\\") {
                        pipeEscaped = true;
                    } else {
                        if (pipeEscaped)
                            cellContent += "\\";
                        cellContent += char;
                        pipeEscaped = false;
                    }
                }
            }
            else if (state == ParsingState.Separator) {
                let col = 0;
                let alignment = TextAlignment.default;
                let separator = false;
                for (let char of line.substring(1, line.length)) {
                    if (char == "|") {
                        parsedTable.getColumn(col).textAlign = alignment;

                        alignment = TextAlignment.default;
                        separator = false;
                        col++;
                    } else if (char == ":" || char == "." || char == "+") {
                        if (!separator) {
                            alignment = TextAlignment.left;
                        } else {
                            if (alignment == TextAlignment.left)
                                alignment = TextAlignment.center;
                            else
                                alignment = TextAlignment.right;
                        }
                    } else if (char == "-" || char == "=") {
                        separator = true;
                        if (alignment == TextAlignment.right)
                            throw new ParsingError("Invalid separator");
                    }
                }
            }
            else if (state == ParsingState.Caption) {
                parsedTable.caption = line.substring(1, line.length - 1).trim();
            }
            else {
                throw new ParsingError(`Not implemented ParsingState: ${state}`);
            }
        }

        return parsedTable;
    }
}

export class MultiMarkdownTableRenderer implements TableRenderer {
    /*public prettify: boolean;

    public constructor(prettify: boolean = true) {
        this.prettify = prettify;
    }*/

    determineColumnWidth(table: Table, column: TableColumn): number {
        let width = 0;
        for (const cell of table.getCellsInColumn(column))
            width = Math.max(cell.merged == TableCellMerge.above ? 2 : cell.text.length, width);
        return width;
    }

    determineColumnWidths(table: Table): number[] {
        return table.getColumns().map(column => this.determineColumnWidth(table, column));
    }

    render(table: Table): string {
        const headerRows = table.getHeaderRows();
        const normalRows = table.getNormalRows();
        const columnWidths = this.determineColumnWidths(table);

        let result: string[] = [];

        if (headerRows.length > 0)
            for (const row of headerRows)
                result.push(this.renderRow(table, row, columnWidths));

        result.push(this.renderSeparator(table, columnWidths));

        for (const row of normalRows)
            result.push(this.renderRow(table, row, columnWidths));
            
        if (table.caption && table.caption.length > 0)
            result.push(`[${table.caption}]`)

        return result.join("\n");
    }

    renderSeparator(table: Table, columnWidths: number[]): string {
        let result: string[] = [];
        table.getColumns().forEach((col, i) => {
            let width = columnWidths[i];
            switch (col.textAlign) {
                case TextAlignment.left:
                    result.push(`:${"-".repeat(width + 1)}`);
                    break;
                case TextAlignment.center:
                    result.push(`:${"-".repeat(width)}:`);
                    break;
                case TextAlignment.right:
                    result.push(`${"-".repeat(width + 1)}:`);
                    break;
                case TextAlignment.default:
                default:
                    result.push("-".repeat(width + 2));
                    break;
            }
        });
        return `|${result.join("|")}|`;
    }

    renderRow(table: Table, row: TableRow, columnWidths: number[]): string {
        let result: string[] = [];
        table.getCellsInRow(row).forEach((cell, i) => {
            let cellWidth = columnWidths[i];
            let colspan = cell.getColspan();
            if (colspan > 1) {
                for (let col = i + 1; col < i + colspan; col++)
                    cellWidth += columnWidths[col];
                cellWidth += colspan + Math.floor((colspan - 1) / 2);
            }
            result.push(this.renderCell(cell, cellWidth));
        });
        return `|${result.join("|")}|`;
    }

    renderCell(cell: TableCell, cellWidth: number): string {
        if (cell.merged == TableCellMerge.left)
            return "";

        let text = cell.merged == TableCellMerge.above ? "^^" : cell.text;

        switch (cell.getTextAlignment()) {
            case TextAlignment.center:
                return `${" ".repeat(Math.max(0, Math.floor((cellWidth - text.length) / 2)))} ${text} ${" ".repeat(Math.max(0, Math.ceil((cellWidth - text.length) / 2)))}`;
            case TextAlignment.right:
                return `${" ".repeat(Math.max(0, cellWidth - text.length))} ${text} `;
            case TextAlignment.left:
            case TextAlignment.default:
            default:
                return ` ${text} ${" ".repeat(Math.max(0, cellWidth - text.length))}`;
        }
    }
}