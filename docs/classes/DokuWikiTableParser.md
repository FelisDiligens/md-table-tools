[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / DokuWikiTableParser

# Class: DokuWikiTableParser

Not all features of DokuWiki's tables are implemented due to the way the intermediary data is laid out (the library focuses on MultiMarkdown's feature set).

These features are not supported:
- Vertical table headers
- Mixed table rows (`^` header cells and `|` normal cells in the same row)
- Independent (from column) cell alignment (left, center, right)

## Implements

- [`TableParser`](../interfaces/TableParser.md)

## Table of contents

### Constructors

- [constructor](DokuWikiTableParser.md#constructor)

### Methods

- [parse](DokuWikiTableParser.md#parse)

## Constructors

### constructor

• **new DokuWikiTableParser**()

## Methods

### parse

▸ **parse**(`table`): [`Table`](Table.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `string` |

#### Returns

[`Table`](Table.md)

#### Implementation of

[TableParser](../interfaces/TableParser.md).[parse](../interfaces/TableParser.md#parse)

#### Defined in

[tables/dokuWikiTable.ts:35](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/dokuWikiTable.ts#L35)
