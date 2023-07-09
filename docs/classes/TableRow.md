[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / TableRow

# Class: TableRow

## Table of contents

### Constructors

- [constructor](TableRow.md#constructor)

### Properties

- [cells](TableRow.md#cells)
- [index](TableRow.md#index)
- [isHeader](TableRow.md#isheader)
- [isMultiline](TableRow.md#ismultiline)
- [startsNewSection](TableRow.md#startsnewsection)

### Methods

- [getCell](TableRow.md#getcell)
- [getCells](TableRow.md#getcells)
- [updateCells](TableRow.md#updatecells)

## Constructors

### constructor

• **new TableRow**(`index?`, `isHeader?`, `isMultiline?`, `startsNewSection?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `0` | - |
| `isHeader` | `boolean` | `false` | - |
| `isMultiline` | `boolean` | `false` | Only pertains to MultiMarkdown multiline feature. Ignored by other parsers/renderers. See Table.mergeMultilineRows() |
| `startsNewSection` | `boolean` | `false` | - |

#### Defined in

[tables/table.ts:114](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L114)

## Properties

### cells

• **cells**: [`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:112](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L112)

___

### index

• **index**: `number` = `0`

#### Defined in

[tables/table.ts:115](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L115)

___

### isHeader

• **isHeader**: `boolean` = `false`

#### Defined in

[tables/table.ts:116](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L116)

___

### isMultiline

• **isMultiline**: `boolean` = `false`

Only pertains to MultiMarkdown multiline feature. Ignored by other parsers/renderers. See Table.mergeMultilineRows()

#### Defined in

[tables/table.ts:118](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L118)

___

### startsNewSection

• **startsNewSection**: `boolean` = `false`

#### Defined in

[tables/table.ts:119](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L119)

## Methods

### getCell

▸ **getCell**(`index`): [`TableCell`](TableCell.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`TableCell`](TableCell.md)

#### Defined in

[tables/table.ts:129](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L129)

___

### getCells

▸ **getCells**(): [`TableCell`](TableCell.md)[]

#### Returns

[`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:133](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L133)

___

### updateCells

▸ **updateCells**(`table`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |

#### Returns

`void`

#### Defined in

[tables/table.ts:123](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/table.ts#L123)
