import { Table, TableCell, TableCellMerge, TableRow, TextAlignment } from "./table";
import { TableParser } from "./tableParser";
import { TableRenderer } from "./tableRenderer";

function escape(htmlStr: string): string {
    return htmlStr
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
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

export class HTMLTableParser implements TableParser {
    public parse(table: string): Table {
        throw new Error("Method not implemented.");
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