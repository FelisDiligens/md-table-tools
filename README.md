# MultiMarkdown table tools

> ⚠️ Work-In-Progress

This module currently has the following features:

- Parsing MultiMarkdown, GitHub-flavored Markdown, HTML, or CSV tables into intermediary
- Converting intermediary back to MultiMarkdown, GitHub-flavored Markdown, HTML, or CSV tables
- Formatting or minifying MultiMarkdown or GFM tables
- Manipulating parsed/intermediary tables (⚠️ possibly buggy), e.g.
  - by adding or removing rows
  - by adding or removing columns
  - by changing the content of table cells
  - by merging table cells
  - etc.

## Syntax

This module mostly follows the MultiMarkdown specs: https://fletcher.github.io/MultiMarkdown-6/syntax/tables.html

With one exception: You can merge cells vertically by writing `^^` into a cell.

### Differences to tables in GitHub-flavored Markdown (and similar variants)

GitHub-flavored Markdown tables (and similar variants) are fully supported, with these additional features:

- You can merge cells horizontally by adding additional pipes (`|`) at the end of the cell.
- You can merge cells vertically by writing `^^` into a cell;
- You can add a caption above or below to the table. Captions can optionally have labels.
- You can have a header with multiple rows.
- You can omit the header.
- You can divide the table into multiple sections by adding a single empty line in-between rows.

## Building

```
$ git clone https://github.com/FelisDiligens/md-table-tools.git
$ cd md-table-tools
$ npm install
$ npm run build
```

## Usage

```typescript
import { MultiMarkdownTableParser } from "md-table-tools";
import { HTMLTableRenderer } from "md-table-tools";

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
intermediaryTable.update().sanitze();

// Render as HTML:
var htmlTable = htmlRenderer.render(intermediaryTable);

/* Output:
<table>
  <thead>
    <tr>
      <th>Example</th>
      <th>table</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hello</td>
      <td>everyone!</td>       <--- Changed!
    </tr>
  </tbody>
</table>
*/
```

## Build with...

- [Turndown](https://mixmark-io.github.io/turndown/) - for inline HTML to Markdown conversion
- TypeScript