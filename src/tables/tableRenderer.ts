import { Table } from "./table.js";

export interface TableRenderer {
    render(table: Table): string;
}