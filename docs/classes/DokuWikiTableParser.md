[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / DokuWikiTableParser

# Class: DokuWikiTableParser

## Implements

- [`TableParser`](../interfaces/TableParser.md)

## Table of contents

### Constructors

- [constructor](DokuWikiTableParser.md#constructor)

### Properties

- [convertMarkup](DokuWikiTableParser.md#convertmarkup)

### Methods

- [parse](DokuWikiTableParser.md#parse)

## Constructors

### constructor

• **new DokuWikiTableParser**(`convertMarkup?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `convertMarkup` | `boolean` | `true` | If true, converts DokuWiki syntax to Markdown syntax |

#### Defined in

[tables/dokuWikiTable.ts:103](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L103)

## Properties

### convertMarkup

• **convertMarkup**: `boolean` = `true`

If true, converts DokuWiki syntax to Markdown syntax

#### Defined in

[tables/dokuWikiTable.ts:105](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L105)

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

[tables/dokuWikiTable.ts:108](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L108)
