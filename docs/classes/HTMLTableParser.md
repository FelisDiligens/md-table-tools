[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / HTMLTableParser

# Class: HTMLTableParser

## Implements

- [`TableParser`](../interfaces/TableParser.md)

## Table of contents

### Constructors

- [constructor](HTMLTableParser.md#constructor)

### Properties

- [mode](HTMLTableParser.md#mode)
- [turndownService](HTMLTableParser.md#turndownservice)

### Methods

- [parse](HTMLTableParser.md#parse)
- [parseCell](HTMLTableParser.md#parsecell)
- [parseSection](HTMLTableParser.md#parsesection)

## Constructors

### constructor

• **new HTMLTableParser**(`mode?`, `turndownService?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mode` | [`HTMLTableParserMode`](../enums/HTMLTableParserMode.md) | `HTMLTableParserMode.ConvertHTMLElements` |
| `turndownService` | `TurndownService` | `undefined` |

#### Defined in

[tables/htmlTable.ts:130](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/htmlTable.ts#L130)

## Properties

### mode

• **mode**: [`HTMLTableParserMode`](../enums/HTMLTableParserMode.md) = `HTMLTableParserMode.ConvertHTMLElements`

#### Defined in

[tables/htmlTable.ts:131](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/htmlTable.ts#L131)

___

### turndownService

• **turndownService**: `TurndownService`

#### Defined in

[tables/htmlTable.ts:132](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/htmlTable.ts#L132)

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

[tables/htmlTable.ts:134](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/htmlTable.ts#L134)

___

### parseCell

▸ `Private` **parseCell**(`$cell`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `$cell` | `Cheerio` |

#### Returns

`string`

#### Defined in

[tables/htmlTable.ts:330](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/htmlTable.ts#L330)

___

### parseSection

▸ `Private` **parseSection**(`$`, `table`, `$rows`, `defaultTextAlign`, `isHeader?`, `allowHeaderDetection?`, `firstRowStartsNewSection?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `$` | `Root` | `undefined` |
| `table` | [`Table`](Table.md) | `undefined` |
| `$rows` | `Cheerio` | `undefined` |
| `defaultTextAlign` | [`TextAlignment`](../enums/TextAlignment.md) | `undefined` |
| `isHeader` | `boolean` | `false` |
| `allowHeaderDetection` | `boolean` | `false` |
| `firstRowStartsNewSection` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[tables/htmlTable.ts:237](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/htmlTable.ts#L237)
