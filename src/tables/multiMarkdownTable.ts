import { Table, TableCellMerge, TableRow } from "./table";
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
                for (let char of line.substring(1, line.length)) {
                    if (char == "|") {
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
                    } else {
                        cellContent += char;
                    }
                }
            }
            else if (state == ParsingState.Separator) {

            }
            else if (state == ParsingState.Caption) {

            }
            else {
                throw new ParsingError("Not implemented ParsingState.");
            }
        }

        return parsedTable;
    }
}

export class MultiMarkdownTableRenderer implements TableRenderer {
    render(table: Table): string {
        throw new Error("Method not implemented.");
    }
}