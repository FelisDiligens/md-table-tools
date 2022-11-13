import { Table } from "./table";
import { TableParser } from "./tableParser";
import { TableRenderer } from "./tableRenderer";

/*
 * Due to the nature of CSV tables, some data will be lost when converting MMD (or HTML) to CSV.
 *
 * CSV file specifications and implementation:
 * https://www.rfc-editor.org/rfc/rfc4180
 * http://super-csv.github.io/super-csv/csv_specification.html
 */

export class CSVTableParser implements TableParser {
    public constructor(
        public separator = ",",
        public quote = "\"") { }

    public parse(table: string): Table {
        throw new Error("Method not implemented.");
    }
}

export enum CSVTableRendererMode {
    OmitSpecialCharacters,
    EscapeWithQuotes,
    AlwaysUseQuotes
}

export class CSVTableRenderer implements TableRenderer {
    public constructor(
        public separator = ",",
        public quote = "\"",
        public lineBreak = "\r\n",
        public mode = CSVTableRendererMode.EscapeWithQuotes) { }

    public render(table: Table): string {
        let specialCharactersRegex = new RegExp(`([${this.separator}${this.quote}]|\r\n|\n)`, "g");
        let quoteRegex = new RegExp(this.quote, "g");
        let csv: string[] = [];
        for (const row of table.getRows()) {
            let renderedRow: string[] = [];
            for (const cell of table.getCellsInRow(row)) {
                switch (this.mode) {
                    case CSVTableRendererMode.AlwaysUseQuotes:
                        renderedRow.push(`"${cell.text.replace(quoteRegex, this.quote.repeat(2))}"`);
                        break;
                    case CSVTableRendererMode.EscapeWithQuotes:
                        if (specialCharactersRegex.test(cell.text)) {
                            renderedRow.push(`"${cell.text.replace(quoteRegex, this.quote.repeat(2))}"`);
                        } else {
                            renderedRow.push(cell.text);
                        }
                        break;
                    case CSVTableRendererMode.OmitSpecialCharacters:
                        renderedRow.push(cell.text.replace(specialCharactersRegex, ""));
                        break;
                }
            }
            csv.push(renderedRow.join(this.separator));
        }
        return csv.join(this.lineBreak);
    }
}