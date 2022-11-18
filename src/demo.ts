import { MultiMarkdownTableParser } from "./tables/multiMarkdownTable.js";
import { HTMLTableRenderer } from "./tables/htmlTable.js";

const mdParser = new MultiMarkdownTableParser();
const htmlRenderer = new HTMLTableRenderer();

var mdTable = `
| Example | table  |
|---------|--------|
| Hello   | world! |
`;

// Parse markdown to intermediary:
var intermediaryTable = mdParser.parse(mdTable);

// Make some changes:
intermediaryTable.getCellByIndices(1, 1).setText("everyone!");
intermediaryTable.update().sanitize();

// Render as HTML:
var htmlTable = htmlRenderer.render(intermediaryTable);

console.log(htmlTable);