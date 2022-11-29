import { Table, TableCaption, TableCaptionPosition, TableCell, TableCellMerge, TableColumn, TableRow, TextAlignment } from "./table.js";
import { ParsingError, TableParser } from "./tableParser.js";
import { TableRenderer } from "./tableRenderer.js";

/*
    Specification: https://github.github.com/gfm/#tables-extension-
*/

const rowRegex = /^\|(.+)\|$/
const separatorRegex = /^\|(\s*:?\-+:?\s*\|)+$/;

enum ParsingState {
    HeaderRow,
    DelimiterRow,
    DataRows
}

export class GitHubFlavoredMarkdownTableParser implements TableParser {
    public parse(table: string): Table {
        // Prepare/format all lines:
        let lines = table.split("\n").map(line => {
            // Remove spaces from start and end:
            line = line.trim();

            // Empty line?
            if (line === "")
                return "";

            // Add '|' to the start and end of the line if necessary:
            if (!line.startsWith("|"))
                line = "|" + line;

            if (!line.endsWith("|"))
                line = line + "|";

            if (!line.match(rowRegex))
                throw new ParsingError(`Invalid row: ${line}`);

            return line;
        });

        // First find the table header/row separator to determine how many columns the table has:
        let separators = lines.filter(line => line.match(separatorRegex));
        if (separators.length > 1)
            throw new ParsingError("Too many delimiter rows. (Only 1 allowed)");
        else if (separators.length == 0)
            throw new ParsingError("Invalid table: Delimiter row missing.");
        let columnCount = (separators[0].match(/\|/g) || []).length - 1;
        
        // Initalize table with 0 rows and the determined amount of columns:
        let parsedTable = new Table(0, columnCount);
        let state = ParsingState.HeaderRow;

        // Now parse line by line:
        for (let line of lines) {
            /*
                Determine parsing state:
            */

            // Ignore empty lines:
            if (line === "")
                continue;

            // Is delimiter row too early?
            if (state == ParsingState.HeaderRow && line.match(separatorRegex)) {
                throw new ParsingError("Header row missing.");
            }

            /*
                Parse line depending on parsing state:
            */
            
            if (state == ParsingState.HeaderRow || state == ParsingState.DataRows) {
                let tableRow = new TableRow();
                tableRow.isHeader = state == ParsingState.HeaderRow;
                parsedTable.addRow(-1, tableRow);

                // Parse each character:
                let cellContent = "";
                let col = 0;
                let slashEscaped = false;
                let fenceEscaped = false;
                for (let char of line.substring(1, line.length)) {
                    if (!slashEscaped && !fenceEscaped && char == "|") {
                        // Ignore excess cells:
                        if (col < parsedTable.columnCount()) {
                            let cell = new TableCell(parsedTable, tableRow, parsedTable.getColumn(col));
                            parsedTable.addCell(cell);
                            cell.setText(
                                cellContent
                                .trim()
                                .replace(/(<[bB][rR]\s*\/?>)/g, "\n")
                            );
                        // except when in the header row:
                        } else if (state == ParsingState.HeaderRow) {
                            throw new ParsingError("Header row doesn't match the delimiter row in the number of cells.");
                        }

                        cellContent = "";
                        col++;
                    } else if (!slashEscaped && char == "\\") {
                        slashEscaped = true;
                    } else {
                        if (!slashEscaped && char == "\`")
                            fenceEscaped = !fenceEscaped;
                        if (slashEscaped)
                            cellContent += "\\";
                        cellContent += char;
                        slashEscaped = false;
                    }
                }

                // Insert empty cells if missing:
                for (; col < parsedTable.columnCount(); col++) {
                    let cell = new TableCell(parsedTable, tableRow, parsedTable.getColumn(col));
                    parsedTable.addCell(cell);
                }

                // If the header row has been parsed, parse the delimiter row next:
                if (state == ParsingState.HeaderRow)
                    state = ParsingState.DelimiterRow;
            }
            else if (state == ParsingState.DelimiterRow) {
                let col = 0;
                let alignment = TextAlignment.default;
                let separator = false;
                for (let char of line.substring(1, line.length)) {
                    if (char == "|") {
                        parsedTable.getColumn(col).textAlign = alignment;

                        alignment = TextAlignment.default;
                        separator = false;
                        col++;
                    } else if (char == ":") {
                        if (!separator) {
                            alignment = TextAlignment.left;
                        } else {
                            if (alignment == TextAlignment.left)
                                alignment = TextAlignment.center;
                            else
                                alignment = TextAlignment.right;
                        }
                    } else if (char == "-") {
                        separator = true;
                        if (alignment == TextAlignment.right)
                            throw new ParsingError("Invalid delimiter row");
                    } else if (!char.match(/\s/g)) {
                        throw new ParsingError(`Unexpected character in delimiter row: '${char}'`);
                    }
                }

                // Once the delimiter row has been parsed, parse the data rows next:
                state = ParsingState.DataRows;
            }
            else {
                throw new ParsingError(`Not implemented ParsingState: ${state}`);
            }
        }

        return parsedTable;
    }
}

export class GitHubFlavoredMarkdownTableRenderer implements TableRenderer {
    public constructor(
        public prettify = true) { }

    public render(table: Table): string {
        const headerRow = table.getHeaderRows()[0];
        const dataRows = table.getNormalRows();
        const columnWidths: number[] = this.prettify ? this.determineColumnWidths(table) : null;

        let result: string[] = [];

        // Header row:
        result.push(this.renderRow(table, headerRow, columnWidths));

        // Delimiter row:
        result.push(this.renderDelimiterRow(table, columnWidths));

        // Data rows:
        for (const row of dataRows)
            result.push(this.renderRow(table, row, columnWidths));

        return result.join("\n");
    }

    private renderDelimiterRow(table: Table, columnWidths: number[]): string {
        let result: string[] = [];

        table.getColumns().forEach((col, i) => {
            let width = this.prettify ? columnWidths[i] : null;
            switch (col.textAlign) {
                case TextAlignment.left:
                    result.push(this.prettify ? `:${"-".repeat(width + 1)}` : ":-");
                    break;
                case TextAlignment.center:
                    result.push(this.prettify ? `:${"-".repeat(width)}:` : ":-:");
                    break;
                case TextAlignment.right:
                    result.push(this.prettify ? `${"-".repeat(width + 1)}:` : "-:");
                    break;
                case TextAlignment.default:
                default:
                    result.push(this.prettify ? "-".repeat(width + 2) : "-");
                    break;
            }
        });

        if (this.prettify)
            return `|${result.join("|")}|`;
        else
            return result.join("|");
    }

    private renderRow(table: Table, row: TableRow, columnWidths: number[]): string {
        let result: string[] = [];

        row.getCells().forEach((cell, i) => {
            result.push(this.renderCell(cell, this.prettify ? columnWidths[i] : null));
            if (!this.prettify && i == row.getCells().length - 1 && cell.text.trim() == "")
                result.push("");
        });

        if (this.prettify)
            return `|${result.join("|")}|`;
        else
            return result.join("|");
    }

    private renderCell(cell: TableCell, cellWidth: number = -1): string {
        let text = cell.text.replace(/\r?\n/g, "<br>");

        if (!this.prettify){
            return text;
        }

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
    
    private determineColumnWidth(table: Table, column: TableColumn): number {
        let width = 0;
        for (const cell of table.getCellsInColumn(column))
            width = Math.max(cell.text.replace(/\r?\n/g, "<br>").length, width);
        return width;
    }

    private determineColumnWidths(table: Table): number[] {
        return table.getColumns().map(column => this.determineColumnWidth(table, column));
    }
}