import { Table } from "./table";
import { TableParser } from "./tableParser";
import { TableRenderer } from "./tableRenderer";

export class CSVTableParser implements TableParser {
    public parse(table: string): Table {
        throw new Error("Method not implemented.");
    }
}

export class CSVTableRenderer implements TableRenderer {
    public render(table: Table): string {
        throw new Error("Method not implemented.");
    }
}