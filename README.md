> ⚠️ Work in progress

# MultiMarkdown table tools

![](assets/demo.png)
> Screenshot of [web demo](https://felisdiligens.github.io/md-table-tools/demo/)

## Features

- Parsing MultiMarkdown, GitHub-flavored Markdown, HTML, or CSV tables into intermediary
- Converting intermediary back to MultiMarkdown, GitHub-flavored Markdown, HTML, or CSV tables
- Formatting or minifying MultiMarkdown or GFM tables
- Manipulating parsed/intermediary tables (⚠️ *possibly buggy, please run `Table.update()` after making any changes*), e.g.
  - by adding, deleting, or moving rows/columns
  - by changing the content of table cells
  - by merging or splitting table cells
  - by changing the text alignment within a column
  - etc.

## Module format

This project gets packaged as CommonJS and ES module. Types are generated as well.

## MultiMarkdown Syntax

This module mostly follows the MultiMarkdown specs: https://fletcher.github.io/MultiMarkdown-6/syntax/tables.html

With a few exceptions:
- You can merge cells vertically by writing `^^` into a cell.
- You can use `\` to join rows together.

### Differences to tables in GitHub-flavored Markdown (and similar variants)

GitHub-flavored Markdown tables (and similar variants) are fully supported, with these additional features:

- You can merge cells horizontally by adding additional pipes (`|`) at the end of the cell.
- You can merge cells vertically by writing `^^` into a cell.
- You can merge the row below by writing `\` at the end of a row.
- You can add a caption above or below to the table. Captions can optionally have labels.
- You can have a header with multiple rows.
- You can omit the header.
- You can divide the table into multiple sections by adding a single empty line in-between rows.

## Development

### Building

```bash
$ git clone https://github.com/FelisDiligens/md-table-tools.git
$ cd md-table-tools
$ npm install
$ npm run build
```

### Testing

```bash
$ npm run test
```

## Usage

### Web demo

A web demo (see screenshot above) is available under `demo/src/index.html`.

You can also click [here](https://felisdiligens.github.io/md-table-tools/demo/) to view it.

### NodeJS demo

```bash
$ npm run demo
```

```typescript
import { MultiMarkdownTableParser } from "@felisdiligens/md-table-tools";
import { HTMLTableRenderer } from "@felisdiligens/md-table-tools";

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
intermediaryTable.getCell(1, 1).setText("everyone!");
intermediaryTable.update();

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

### Available classes

- All classes implementing the interface `TableRenderer`
  - `PrettyMultiMarkdownTableRenderer`
  - `MinifiedMultiMarkdownTableRenderer`
  - `GitHubFlavoredMarkdownTableRenderer`
  - `HTMLTableRenderer`
  - `CSVTableRenderer`
- All classes implementing the interface `TableParser`
  - `MultiMarkdownTableParser`
  - `GitHubFlavoredMarkdownTableParser`
  - `HTMLTableParser`
  - `CSVTableParser`
- Intermediary classes
  - `Table`
  - `TableRow`
  - `TableColumn`
  - `TableCell`
  - `TableCaption`
- Enums:
  - `TextAlignment`
  - `TableCellMerge` - indicates how a cell is merged with a neighboring cell
  - `TableCaptionPosition`
  - `HTMLTableParserMode`
  - `CSVTableRendererMode`


## Built with...

- written in [TypeScript](https://www.typescriptlang.org/)
- [Cheerio](https://github.com/cheeriojs/cheerio#readme) and [htmlparser2](https://github.com/fb55/htmlparser2#readme) - for parsing HTML
- [Turndown](https://mixmark-io.github.io/turndown/) - for inline HTML to Markdown conversion
- [Rollup](https://rollupjs.org/) - for bundling
- [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) - for testing