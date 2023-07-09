[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / CSVTableRenderer

# Class: CSVTableRenderer

## Implements

- [`TableRenderer`](../interfaces/TableRenderer.md)

## Table of contents

### Constructors

- [constructor](CSVTableRenderer.md#constructor)

### Properties

- [lineBreak](CSVTableRenderer.md#linebreak)
- [mode](CSVTableRenderer.md#mode)
- [quote](CSVTableRenderer.md#quote)
- [separator](CSVTableRenderer.md#separator)

### Methods

- [render](CSVTableRenderer.md#render)

## Constructors

### constructor

• **new CSVTableRenderer**(`separator?`, `quote?`, `lineBreak?`, `mode?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `separator` | `string` | `","` |
| `quote` | `string` | `"\""` |
| `lineBreak` | `string` | `"\r\n"` |
| `mode` | [`CSVTableRendererMode`](../enums/CSVTableRendererMode.md) | `CSVTableRendererMode.EscapeWithQuotes` |

#### Defined in

[tables/csvTable.ts:91](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/csvTable.ts#L91)

## Properties

### lineBreak

• **lineBreak**: `string` = `"\r\n"`

#### Defined in

[tables/csvTable.ts:94](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/csvTable.ts#L94)

___

### mode

• **mode**: [`CSVTableRendererMode`](../enums/CSVTableRendererMode.md) = `CSVTableRendererMode.EscapeWithQuotes`

#### Defined in

[tables/csvTable.ts:95](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/csvTable.ts#L95)

___

### quote

• **quote**: `string` = `"\""`

#### Defined in

[tables/csvTable.ts:93](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/csvTable.ts#L93)

___

### separator

• **separator**: `string` = `","`

#### Defined in

[tables/csvTable.ts:92](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/csvTable.ts#L92)

## Methods

### render

▸ **render**(`table`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |

#### Returns

`string`

#### Implementation of

[TableRenderer](../interfaces/TableRenderer.md).[render](../interfaces/TableRenderer.md#render)

#### Defined in

[tables/csvTable.ts:97](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/csvTable.ts#L97)
