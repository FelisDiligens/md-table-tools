[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / CSVTableParser

# Class: CSVTableParser

## Implements

- [`TableParser`](../interfaces/TableParser.md)

## Table of contents

### Constructors

- [constructor](CSVTableParser.md#constructor)

### Properties

- [assumeFirstLineIsHeader](CSVTableParser.md#assumefirstlineisheader)
- [quote](CSVTableParser.md#quote)
- [separator](CSVTableParser.md#separator)

### Methods

- [parse](CSVTableParser.md#parse)

## Constructors

### constructor

• **new CSVTableParser**(`separator?`, `quote?`, `assumeFirstLineIsHeader?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `separator` | `string` | `","` |
| `quote` | `string` | `"\""` |
| `assumeFirstLineIsHeader` | `boolean` | `true` |

#### Defined in

[tables/csvTable.ts:14](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/csvTable.ts#L14)

## Properties

### assumeFirstLineIsHeader

• **assumeFirstLineIsHeader**: `boolean` = `true`

#### Defined in

[tables/csvTable.ts:17](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/csvTable.ts#L17)

___

### quote

• **quote**: `string` = `"\""`

#### Defined in

[tables/csvTable.ts:16](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/csvTable.ts#L16)

___

### separator

• **separator**: `string` = `","`

#### Defined in

[tables/csvTable.ts:15](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/csvTable.ts#L15)

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

[tables/csvTable.ts:19](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/csvTable.ts#L19)
