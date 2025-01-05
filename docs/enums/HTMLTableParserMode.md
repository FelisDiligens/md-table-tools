[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / HTMLTableParserMode

# Enumeration: HTMLTableParserMode

changes the behavior of HTMLTableParser

## Table of contents

### Enumeration Members

- [ConvertHTMLElements](HTMLTableParserMode.md#converthtmlelements)
- [PreserveHTMLElements](HTMLTableParserMode.md#preservehtmlelements)
- [StripHTMLElements](HTMLTableParserMode.md#striphtmlelements)

## Enumeration Members

### ConvertHTMLElements

• **ConvertHTMLElements** = ``2``

uses the HTML code (`Cheerio.html()`) and converts to Markdown using Turndown if possible (default)

#### Defined in

[tables/htmlTable.ts:126](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L126)

___

### PreserveHTMLElements

• **PreserveHTMLElements** = ``1``

uses the HTML code (`Cheerio.html()`) without any converting

#### Defined in

[tables/htmlTable.ts:124](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L124)

___

### StripHTMLElements

• **StripHTMLElements** = ``0``

uses only text (`Cheerio.text()`)

#### Defined in

[tables/htmlTable.ts:122](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L122)
