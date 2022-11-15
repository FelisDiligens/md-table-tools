import { Table, TableCell, TableCellMerge, TableRow, TextAlignment } from "./table";
import { ParsingError, TableParser } from "./tableParser";
import { TableRenderer } from "./tableRenderer";

function escape(htmlStr: string): string {
    return htmlStr
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function unescape(htmlStr: string): string {
    return htmlStr
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'");
}

function mdToHtml(markdown: string): string {
    let html = markdown; // escape(markdown);

    // Image:
    html = html.replace(/!\[([^\[\]]+)\]\(([^\(\)]+)\)/g, "<img src=\"$2\" alt=\"$1\">");

    // Links:
    html = html.replace(/\[([^\[\]]+)\]\(([^\(\)]+)\)/g, "<a href=\"$2\">$1</a>");

    // Inline code:
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    // Strikethrough:
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

    // Oblique:
    html = html.replace(/___(.*?)___/g, "<em><strong>$1</strong></em>");
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<em><strong>$1</strong></em>");

    // Bold:
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic:
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Escaped characters:
    html = html.replace(/\\([#\.\|\*_\s`])/g, "$1");

    // Newlines:
    html = html.replace(/\r?\n/g, "<br>");

    return html;
}

function htmlToMd(html: string): string {
    // TODO: Implement!
    return html;
}

function textAlignCSS(textAlign: TextAlignment) {
    switch (textAlign) {
        case TextAlignment.left:
            return "text-align: left;";
        case TextAlignment.right:
            return "text-align: right;";
        case TextAlignment.center:
            return "text-align: center;";
        case TextAlignment.default:
        default:
            return "text-align: start;";
    }
}

export enum HTMLTableParserMode {
    StripHTMLElements,   // uses innerText
    ConvertHTMLElements, // uses innerHTML and converts to Markdown if possible (default)
    PreserveHTMLElements // uses innerHTML without any converting
}

export class HTMLTableParser implements TableParser {
    public constructor(
        public mode: HTMLTableParserMode = HTMLTableParserMode.ConvertHTMLElements) {}

    public parse(table: string): Table {
        /*
            Using DOMParser to parse the string and find our <table> tag to start:
        */
        let domParser = new DOMParser();
        let dom = domParser.parseFromString(table, "text/html");
        let domTable = dom.querySelector("table");
        if (domTable == null)
            throw new ParsingError("Couldn't find <table> tag in DOM.");

        /*
            Converting table to Markdown:
        */
        let parsedTable = new Table();
        let hasSections = false;

        let domTHead = domTable.querySelector("thead");
        if (domTHead != null) {
            this.parseSection(parsedTable, domTHead, true);
            hasSections = true;
        }

        let domTBodies = domTable.querySelectorAll("tbody");
        if (domTBodies.length > 0) {
            domTBodies.forEach(domTBody => {
                this.parseSection(parsedTable, domTBody);
            });
            hasSections = true;
        }

        if (!hasSections) {
            // TODO: Parse table that doesn't have thead or tbody tags!
        }

        // TODO: Parse caption!

        return parsedTable;
    }

    private parseSection(table: Table, domSection: HTMLTableSectionElement, isHeader: boolean = false) {
        // HTML skips "ghost" cells that are overshadowed by other cells that have a rowspan > 1.
        // We'll memorize them:
        let rowspanGhostCells: { row: number; col: number; }[] = [];

        // Iterate over each row (<tr>) of the HTML table:
        for (let domRowIndex = 0; domRowIndex < domSection.rows.length; domRowIndex++) {
            let row = table.addRow();
            row.isHeader = isHeader;

            // Memorize an offset (colspan):
            let colOffset = 0;

            // Iterate over each cell (<td> or <th>) of the HTML table row:
            let domRow = domSection.rows[domRowIndex];
            let domCells = domRow.querySelectorAll("td, th");
            domCells.forEach((domCell, domColIndex) => {
                // Get the TableColumn of our Table object, taking the memorized rowspans and colOffset into account:
                let colIndex: number;
                let column;
                let isGhostCell = false;
                do {
                    colIndex = domColIndex + colOffset;
                    column = table.getColumn(colIndex);
                    if (!column)
                        column = table.addColumn();
                    
                    isGhostCell = rowspanGhostCells.filter(ghost => ghost.row == domRowIndex && ghost.col == colIndex).length > 0;
                    console.log(rowspanGhostCells);
                    console.log({"row": domColIndex, "col": colIndex});
                    console.log(isGhostCell);
                    if (isGhostCell) {
                        let mergedCell = new TableCell(table, row, column);
                        mergedCell.merged = TableCellMerge.above;
                        table.addCell(mergedCell);
                        colOffset++;
                    }
                } while (isGhostCell);

                // Add cell to our Table object:
                let cellContent = this.parseCell(domCell as HTMLTableCellElement);
                let cell = new TableCell(table, row, column);
                cell.setText(cellContent);
                table.addCell(cell);

                // Take "colspan" into account:
                let colspan = (domCell as HTMLTableCellElement).colSpan;
                if (colspan > 1) {
                    // Add empty cells to our Table object:
                    for (let i = 1; i < colspan; i++) {
                        let nextColumn = table.getColumn(colIndex + i);
                        if (!nextColumn)
                            nextColumn = table.addColumn();
                        let mergedCell = table.getCellByObjs(row, nextColumn);
                        mergedCell.merged = TableCellMerge.left;
                    }

                    // Add colspan to colOffset:
                    colOffset += colspan - 1;
                }

                // Take "rowspan" into account:
                let rowspan = (domCell as HTMLTableCellElement).rowSpan;
                if (rowspan > 1) {
                    for (let i = 1; i < rowspan; i++) {
                        rowspanGhostCells.push({
                            "row": domRowIndex + i,
                            "col": colIndex
                        });
                    }
                }
            });
        }
    }

    private parseCell(domCell: HTMLTableCellElement): string {
        switch (this.mode) {
            case HTMLTableParserMode.PreserveHTMLElements:
                return domCell.innerHTML;
            case HTMLTableParserMode.StripHTMLElements:
                return domCell.innerText;
            case HTMLTableParserMode.ConvertHTMLElements:
            default:
                return htmlToMd(domCell.innerHTML);
        }
    }
}

export class HTMLTableRenderer implements TableRenderer {
    public constructor(
        public prettify = true,
        public indent = "  ") { }

    public render(table: Table): string {
        let result: string[] = ["<table>"];

        let headerRows = table.getHeaderRows();
        let normalRows = table.getNormalRows();

        if (headerRows.length > 0) {
            result.push(this.indentString("<thead>", 1));
            for (const row of headerRows)
                result.push(...this.renderRow(table, row));
            result.push(this.indentString("</thead>", 1));
        }

        result.push(this.indentString("<tbody>", 1));
        for (const row of normalRows) {
            if (row.startsNewSection)
                result.push(this.indentString("</tbody>", 1), this.indentString("<tbody>", 1));
            result.push(...this.renderRow(table, row));
        }
        result.push(this.indentString("</tbody>", 1));

        if (table.caption && table.caption.text.length > 0)
            result.push(this.indentString(`<caption id="${table.caption.getLabel()}" style="caption-side: ${table.caption.position};">${table.caption.text.trim()}</caption>`, 1));

        result.push("</table>");
        return result.join(this.prettify ? "\n" : "");
    }

    private renderRow(table: Table, row: TableRow): string[] {
        let result: string[] = [];
        result.push(this.indentString("<tr>", 2));
        for (let cell of table.getCellsInRow(row)) {
            let renderedCell = this.indentString(this.renderCell(cell), 3);
            if (renderedCell.trim() !== "")
                result.push(renderedCell);
        }
        result.push(this.indentString("</tr>", 2));
        return result;
    }

    private renderCell(cell: TableCell): string {
        let colspan = cell.getColspan();
        let rowspan = cell.getRowspan();
        if (cell.merged == TableCellMerge.none) {
            let cellProps =
                (colspan > 1 ? ` colspan="${colspan}"` : "") + 
                (rowspan > 1 ? ` rowspan="${rowspan}"` : "") +
                (cell.getTextAlignment() != TextAlignment.default ? ` style="${textAlignCSS(cell.getTextAlignment())}"`: "");
            let cellTag = cell.isHeaderCell() ? "th" : "td";
            return ["<", cellTag, cellProps, ">", mdToHtml(cell.text), "</", cellTag, ">"].join("");
        }
        return "";
    }

    private indentString(str: string, indentLevel: number = 0): string {
        if (this.prettify)
            return this.indent.repeat(indentLevel) + str;
        else
            return str;
    }
}