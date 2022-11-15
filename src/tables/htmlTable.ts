import { Table, TableCaption, TableCaptionPosition, TableCell, TableCellMerge, TableRow, TextAlignment } from "./table";
import { ParsingError, TableParser } from "./tableParser";
import { TableRenderer } from "./tableRenderer";
import TurndownService from 'turndown';
import MarkdownIt from 'markdown-it';

const turndown = new TurndownService();
const mdIt = new MarkdownIt();

function escapeMarkdown(mdStr: string): string {
    return mdStr
        .replace(/\|/g, "\\|");
}

// function mdToHtml(markdown: string): string {
//     let html = markdown; // escape(markdown);

//     // Image:
//     html = html.replace(/!\[([^\[\]]+)\]\(([^\(\)]+)\)/g, "<img src=\"$2\" alt=\"$1\">");

//     // Links:
//     html = html.replace(/\[([^\[\]]+)\]\(([^\(\)]+)\)/g, "<a href=\"$2\">$1</a>");

//     // Inline code:
//     html = html.replace(/`(.*?)`/g, "<code>$1</code>");

//     // Strikethrough:
//     html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

//     // Oblique:
//     html = html.replace(/___(.*?)___/g, "<em><strong>$1</strong></em>");
//     html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<em><strong>$1</strong></em>");

//     // Bold:
//     html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
//     html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

//     // Italic:
//     html = html.replace(/_(.*?)_/g, "<em>$1</em>");
//     html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

//     // Escaped characters:
//     html = html.replace(/\\([#\.\|\*_\s`])/g, "$1");

//     // Newlines:
//     html = html.replace(/\r?\n/g, "<br>");

//     return html;
// }

function textAlignToCSS(textAlign: TextAlignment) {
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

function cssToTextAlign(element: HTMLElement): TextAlignment {
    switch (element.style.textAlign.toLowerCase()) {
        case "left":
            return TextAlignment.left;
        case "center":
            return TextAlignment.center;
        case "right":
            return TextAlignment.right;
        default:
            return TextAlignment.default;
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
        let tableTextAlign = cssToTextAlign(domTable);

        // Parse <thead> tag in <table>:
        let domTHead = domTable.querySelector("thead");
        if (domTHead != null) {
            let sectionTextAlign = cssToTextAlign(domTHead);
            this.parseSection(
                parsedTable,
                domTHead.rows,
                (sectionTextAlign != TextAlignment.default ? sectionTextAlign : tableTextAlign),
                true);
            hasSections = true;
        }

        // Parse <tbody> tags in <table>:
        let domTBodies = domTable.querySelectorAll("tbody");
        if (domTBodies.length > 0) {
            domTBodies.forEach((domTBody, i) => {
                let sectionTextAlign = cssToTextAlign(domTBody);
                this.parseSection(
                    parsedTable,
                    domTBody.rows,
                    (sectionTextAlign != TextAlignment.default ? sectionTextAlign : tableTextAlign),
                    false,
                    domTHead == null,
                    i > 0);
            });
            hasSections = true;
        }

        // No <thead> or <tbody> tags?
        if (!hasSections) {
            // Parse table that doesn't have thead or tbody tags as one section with no header:
            this.parseSection(
                parsedTable,
                domTable.rows,
                tableTextAlign,
                false,
                true,
                false);
        }

        // Parse <caption> tag in <table>:
        let domCaption = domTable.querySelector("caption");
        if (domCaption != null) {
            let caption = new TableCaption();
            caption.text = domCaption.innerText;
            if (caption.getLabel() != domCaption.id)
                caption.label = domCaption.id;
            switch (domCaption.style.captionSide.toLowerCase()) {
                case "top":
                    caption.position = TableCaptionPosition.top;
                    break;
                case "bottom":
                default:
                    caption.position = TableCaptionPosition.bottom;
            }
            parsedTable.caption = caption;
        }

        return parsedTable;
    }

    private parseSection(table: Table, domRows: HTMLCollectionOf<HTMLTableRowElement>, defaultTextAlign: TextAlignment, isHeader: boolean = false, allowHeaderDetection: boolean = false, firstRowStartsNewSection: boolean = false) {
        // HTML skips "ghost" cells that are overshadowed by other cells that have a rowspan > 1.
        // We'll memorize them:
        let rowspanGhostCells: { row: number; col: number; }[] = [];

        // Remember how many rows we already have:
        let rowOffset = table.rowCount();

        // Iterate over each row (<tr>) of the HTML table:
        for (let domRowIndex = 0; domRowIndex < domRows.length; domRowIndex++) {
            let rowIndex = domRowIndex + rowOffset;
            let row = table.getRow(rowIndex);
            if (!row)
                row = table.addRow();
            row.isHeader = isHeader;
            if (domRowIndex == 0)
                row.startsNewSection = firstRowStartsNewSection;

            // Memorize an offset (colspan):
            let colOffset = 0;

            // Iterate over each cell (<td> or <th>) of the HTML table row:
            let domRow = domRows[domRowIndex];
            let domCells = domRow.querySelectorAll("td, th");
            let allCellsAreTH = true;
            domCells.forEach((domCell, domColIndex) => {
                // Get the TableColumn of our Table object, taking the memorized rowspans and colOffset into account:
                let colIndex = domColIndex + colOffset;
                while (rowspanGhostCells.filter(ghost => ghost.row == rowIndex && ghost.col == colIndex).length > 0) {
                    colIndex = domColIndex + ++colOffset;
                }
                let column = table.getColumn(colIndex);
                if (!column)
                    column = table.addColumn();

                // Add cell to our Table object:
                let cellContent = this.parseCell(domCell as HTMLTableCellElement);
                let textAlign = cssToTextAlign(domCell as HTMLElement);
                textAlign = textAlign != TextAlignment.default ? textAlign : defaultTextAlign;
                allCellsAreTH = allCellsAreTH && domCell.tagName.toLowerCase() == "th";

                let cell = new TableCell(table, row, column);
                cell.setText(cellContent);
                column.textAlign = textAlign;
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
                    // Add empty cells to our Table object:
                    for (let i = 1; i < rowspan; i++) {
                        let nextRow = table.getRow(rowIndex + i);
                        if (!nextRow)
                            nextRow = table.addRow();
                        nextRow.isHeader = isHeader;
                        let mergedCell = table.getCellByObjs(nextRow, column);
                        mergedCell.merged = TableCellMerge.above;

                        // Memorize "ghost" cells:
                        rowspanGhostCells.push({
                            "row": rowIndex + i,
                            "col": colIndex
                        });
                    }
                }
            });

            // Detect headers:
            if (allowHeaderDetection && !isHeader) {
                row.isHeader = allCellsAreTH;
            }
        }
    }

    private parseCell(domCell: HTMLTableCellElement): string {
        switch (this.mode) {
            case HTMLTableParserMode.PreserveHTMLElements:
                return escapeMarkdown(domCell.innerHTML);
            case HTMLTableParserMode.StripHTMLElements:
                return escapeMarkdown(domCell.innerText);
            case HTMLTableParserMode.ConvertHTMLElements:
            default:
                return escapeMarkdown(turndown.turndown(domCell.innerHTML));
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
                (cell.getTextAlignment() != TextAlignment.default ? ` style="${textAlignToCSS(cell.getTextAlignment())}"`: "");
            let cellTag = cell.isHeaderCell() ? "th" : "td";
            return ["<", cellTag, cellProps, ">", mdIt.renderInline(cell.text), "</", cellTag, ">"].join("");
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