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

function dokuWikiToMarkdown(markup: string): string {
    // Image:
    markup = markup.replace(/{{([^\|]*?)\|?([^\|]*?)}}/g, "![$2]($1)");

    // Links:
    markup = markup.replace(/\[\[([^\|]*?)\|?([^\|]*?)\]\]/g, "[$2]($1)");

    // Block code:
    markup = markup.replace(/<code\s+?([a-zA-Z0-9]*?)>\n(.*?)<\/code>/gs, "```$1\n$2```");

    // Inline code / monospaced text:
    markup = markup.replace(/''(.*?)''/g, "`$1`");

    // Oblique:
    markup = markup.replace(/\/\/\*\*(.*?)\*\*\/\//g, "***$1***");
    markup = markup.replace(/\*\*\/\/(.*?)\/\/\*\*/g, "***$1***");

    // Italic:
    markup = markup.replace(/\/\/(.*?)\/\//g, "*$1*");

    // Underlined:
    markup = markup.replace(/__(.*?)__/g, "<u>$1</u>");

    // Newlines:
    markup = markup.replace(/\\\\ /g, "\n");

    return markup;
}

function markdownToDokuWiki(markup: string): string {
    // Image:
    markup = markup.replace(/!\[([^\[\]]+)\]\(([^\(\)]+)\)/g, "{{$2|$1}}");

    // Links:
    markup = markup.replace(/\[([^\[\]]+)\]\(([^\(\)]+)\)/g, "[[$2|$1]]");

    // Block code:
    markup = markup.replace(/```([a-zA-Z0-9]*?)\n(.*?)\n```/gs, "<code $1>\n$2\n</code>");

    // Inline code / monospaced text:
    markup = markup.replace(/`(.*?)`/g, "''$1''");

    // Strikethrough:
    markup = markup.replace(/~~(.*?)~~/g, "<del>$1</del>");

    // Oblique:
    markup = markup.replace(/___(.*?)___/g, "//**$1**//");
    markup = markup.replace(/\*\*\*(.*?)\*\*\*/g, "//**$1**//");

    // Bold:
    markup = markup.replace(/__(.*?)__/g, "**$1**");

    // Italic:
    markup = markup.replace(/_(.*?)_/g, "//$1//");
    markup = markup.replace(/\*(.*?)\*/g, "//$1//");

    // Underlined:
    markup = markup.replace(/<ins>(.*?)<\/ins>/g, "__$1__");
    markup = markup.replace(/<u>(.*?)<\/u>/g, "__$1__");

    // Superscript:
    markup = markup.replace(/\^(.*?)\^/g, "<sup>$1</sup>");

    // Subscript:
    markup = markup.replace(/~(.*?)~/g, "<sub>$1</sub>");

    // Escaped characters:
    markup = markup.replace(/\\([#\.\|\*_\s`\[\]\-])/g, "$1");

    // Newlines:
    markup = markup.replace(/<br\s?\/?>/g, "\\\\ ");
    markup = markup.replace(/\r?\n/g, "\\\\ ");

    return markup;
}

const rowRegex = /^[\|\^](.+)[\|\^]$/;

enum ParsingState {
    BeforeTable,
    Row,
    AfterTable,
}

export class DokuWikiTableParser implements TableParser {
    public constructor(
        /** If true, converts DokuWiki syntax to Markdown syntax */
        public convertMarkup: boolean = true
    ) {}

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

                // Parse each character:
                let cellContent = "";
                let colIndex = 0;
                let spaces = 0;
                let leftHasSpaces = false;
                let rightHasSpaces = false;
                let foundCellContent = false;
                let cellIsHeader = line.trim()[0] == "^";
                let rowIsHeader = line.trim()[0] == "^";
                for (let char of line.trim().substring(1, line.length)) {
                    if (char == "|" || char == "^") {
                        let tableColumn = parsedTable.getColumn(colIndex);
                        if (!tableColumn) tableColumn = parsedTable.addColumn();
                        let cell = new TableCell(parsedTable, tableRow, tableColumn);
                        parsedTable.addCell(cell);

                        if (foundCellContent && spaces >= 2) {
                            rightHasSpaces = true;
                        }

                        cell.isHeader = cellIsHeader;

                        if (leftHasSpaces && rightHasSpaces) {
                            if (tableColumn.textAlign == TextAlignment.default) {
                                tableColumn.textAlign = TextAlignment.center;
                            }
                            cell.textAlign = TextAlignment.center;
                        } else if (leftHasSpaces) {
                            if (tableColumn.textAlign == TextAlignment.default) {
                                tableColumn.textAlign = TextAlignment.right;
                            }
                            cell.textAlign = TextAlignment.right;
                        } else if (rightHasSpaces) {
                            if (tableColumn.textAlign == TextAlignment.default) {
                                tableColumn.textAlign = TextAlignment.left;
                            }
                            cell.textAlign = TextAlignment.left;
                        }

                        if (cellContent.trim() == ":::") {
                            cell.merged = TableCellMerge.above;
                        } else if (cellContent === "") {
                            cell.merged = TableCellMerge.left;
                        } else {
                            cellContent = this.convertMarkup
                                ? dokuWikiToMarkdown(cellContent.trim())
                                : cellContent.trim();
                            cell.setText(cellContent);
                        }

                        cellContent = "";
                        colIndex++;

                        if (char == "|") {
                            cellIsHeader = false;
                            rowIsHeader = false;
                        } else if (char == "^") {
                            cellIsHeader = true;
                        }

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

                tableRow.isHeader = rowIsHeader;
            }
        }

        parsedTable.beforeTable = beforeTable.join("\n");
        parsedTable.afterTable = afterTable.join("\n");

        return parsedTable.update();
    }
}

export class DokuWikiTableRenderer implements TableRenderer {
    public constructor(
        /** If true, converts Markdown syntax to DokuWiki syntax */
        public convertMarkup: boolean = true
    ) {}

    render(table: Table): string {
        const rows = table.getRows();
        const columnWidths = this.determineColumnWidths(table);

        let result: string[] = [];

        if (table.beforeTable.trim() !== "") {
            result.push(table.beforeTable);
        }

        // DokuWiki has no table caption -- insert "caption" (if position is top):
        if (table.caption && table.caption.position == TableCaptionPosition.top) {
            result.push(this.renderCaption(table.caption));
        }

        // Rows:
        for (const row of rows) {
            result.push(this.renderRow(table, row, columnWidths));
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

    private renderRow(table: Table, row: TableRow, columnWidths: number[]): string {
        let result: string[] = [];

        let lastCellIsHeader = false;
        table.getCellsInRow(row).forEach((cell, i) => {
            let colspan = cell.getColspan();
            let cellWidth = columnWidths[i];
            if (colspan > 1) {
                for (let col = i + 1; col < i + colspan; col++) {
                    cellWidth += columnWidths[col];
                }
                cellWidth += colspan * 2 - 2;
            }
            lastCellIsHeader = cell.isHeaderCell();
            result.push(this.renderCell(cell, colspan, cellWidth));
        });

        if (lastCellIsHeader) {
            return `${result.join("")}^`;
        } else {
            return `${result.join("")}|`;
        }
    }

    private renderCell(cell: TableCell, colspan: number = 1, cellWidth: number = -1): string {
        let isHeader = cell.isHeaderCell();
        let separator = isHeader ? "^" : "|";

        if (cell.merged == TableCellMerge.left) {
            return separator;
        }

        // `:::` => merge cell above
        // `\\ ` => insert a newline
        let text = cell.merged == TableCellMerge.above ? ":::" : this.renderText(cell.text);
        const textLength = stringWidth(text);

        switch (cell.getTextAlignment()) {
            case TextAlignment.center:
                return `${separator}${" ".repeat(
                    Math.max(0, Math.floor((cellWidth - textLength + colspan - 1) / 2))
                )} ${text} ${" ".repeat(Math.max(0, Math.ceil((cellWidth - textLength - colspan + 1) / 2)))}`;
            case TextAlignment.right:
                return `${separator}${" ".repeat(Math.max(0, cellWidth - textLength))} ${text} `;
            case TextAlignment.left:
            case TextAlignment.default:
            default:
                return `${separator} ${text} ${" ".repeat(Math.max(0, cellWidth - textLength))}`;
        }
    }

    private renderText(text: string) {
        return this.convertMarkup ? markdownToDokuWiki(text) : text;
    }

    private determineColumnWidths(table: Table): number[] {
        let columnWidths: number[] = Array.from({ length: table.columnCount() }, () => 0);

        for (let colIndex = table.columnCount() - 1; colIndex >= 0; colIndex--) {
            const column = table.getColumn(colIndex);
            let colWidth = 0;
            for (const cell of table.getCellsInColumn(column)) {
                let colspan = cell.getColspan();
                let cellWidth = cell.merged == TableCellMerge.above ? 3 : stringWidth(this.renderText(cell.text));

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
