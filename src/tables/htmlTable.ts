import { Table, TableCellMerge } from "./table";
import { TableParser } from "./tableParser";
import { TableRenderer } from "./tableRenderer";

function md2html(markdown: string): string {
    let html = markdown;

    // Links:
    html = html.replace(/\[([^\[\]]+)\]\(([^\(\)]+)\)/, "<a href=\"$2\">$1</a>");

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

export class HTMLTableParser implements TableParser {
    parse(table: string): Table {
        throw new Error("Method not implemented.");
    }
}

export class HTMLTableRenderer implements TableRenderer {
    public render(table: Table): string {
        let result: string[] = ["<table>"];

        for (const row of table.getRows()) {
            result.push("<tr>");
            for (let columnIndex = 0; columnIndex < table.columnCount(); columnIndex++) {
                let cell = table.getCellByObjs(row, table.getColumn(columnIndex));
                let colspan = cell.getColspan();
                let rowspan = cell.getRowspan();
                if (cell.merged == TableCellMerge.none) {
                    let cellProps =
                        (colspan > 1 ? " colspan=\"" + colspan + "\"" : "") + 
                        (rowspan > 1 ? " rowspan=\"" + rowspan + "\"" : "");
                    let cellTag = cell.isHeaderCell() ? "th" : "td";
                    result.push("<", cellTag, cellProps, ">", md2html(cell.text), "</", cellTag, ">");
                }
            }
            result.push("</tr>");
        }

        result.push("</table>");
        return result.join("");
    }
}