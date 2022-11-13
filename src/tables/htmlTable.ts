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
    html = html.replace(/!\[([^\[\]]+)\]\(([^\(\)]+)\)/, "<img src=\"$2\" alt=\"$1\">");

    // Links:
    html = html.replace(/\[([^\[\]]+)\]\(([^\(\)]+)\)/, "<a href=\"$2\">$1</a>");

    // Inline code:
    html = html.replace(/`(.*?)`/, "<code>$1</code>");

    // Strikethrough:
    html = html.replace(/~~(.*?)~~/, "<del>$1</del>");

    // Oblique:
    html = html.replace(/___(.*?)___/, "<em><strong>$1</strong></em>");
    html = html.replace(/\*\*\*(.*?)\*\*\*/, "<em><strong>$1</strong></em>");

    // Bold:
    html = html.replace(/__(.*?)__/, "<strong>$1</strong>");
    html = html.replace(/\*\*(.*?)\*\*/, "<strong>$1</strong>");

    // Italic:
    html = html.replace(/_(.*?)_/, "<em>$1</em>");
    html = html.replace(/\*(.*?)\*/, "<em>$1</em>");

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
    parse(table: string): Table {
        throw new Error("Method not implemented.");
    }
}

export class HTMLTableRenderer implements TableRenderer {
    public render(table: Table): string {
        let result: string[] = ["<table>"];

        let headerRows = table.getHeaderRows();
        let normalRows = table.getNormalRows();

        if (headerRows.length > 0) {
            result.push("<thead>");
            for (const row of headerRows)
                result.push(...this.renderRow(table, row));
            result.push("</thead>");
        }

        result.push("<tbody>");
        for (const row of normalRows) {
            if (row.startsNewSection)
                result.push("</tbody><tbody>");
            result.push(...this.renderRow(table, row));
        }
        result.push("</tbody>");

        if (table.caption && table.caption.length > 0)
            result.push(`<caption style="caption-side: bottom;">${table.caption.trim()}</caption>`)

        result.push("</table>");
        return result.join("");
    }

    renderRow(table: Table, row: TableRow): string[] {
        let result: string[] = [];
        result.push("<tr>");
        for (let cell of table.getCellsInRow(row))
            result.push(...this.renderCell(cell));
        result.push("</tr>");
        return result;
    }

    renderCell(cell: TableCell): string[] {
        let colspan = cell.getColspan();
        let rowspan = cell.getRowspan();
        if (cell.merged == TableCellMerge.none) {
            let cellProps =
                (colspan > 1 ? ` colspan="${colspan}"` : "") + 
                (rowspan > 1 ? ` rowspan="${rowspan}"` : "") +
                ` style="${textAlignCSS(cell.getTextAlignment())}"`;
            let cellTag = cell.isHeaderCell() ? "th" : "td";
            return ["<", cellTag, cellProps, ">", mdToHtml(cell.text), "</", cellTag, ">"];
        }
        return [];
    }
}