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

[tables/table.ts:120](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L120)

## Properties

### cells

• **cells**: [`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:118](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L118)

___

### index

• **index**: `number` = `0`

#### Defined in

[tables/table.ts:121](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L121)

___

### isHeader

• **isHeader**: `boolean` = `false`

#### Defined in

[tables/table.ts:122](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L122)

___

### isMultiline

• **isMultiline**: `boolean` = `false`

Only pertains to MultiMarkdown multiline feature. Ignored by other parsers/renderers. See Table.mergeMultilineRows()

#### Defined in

[tables/table.ts:124](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L124)

___

### startsNewSection

• **startsNewSection**: `boolean` = `false`

#### Defined in

[tables/table.ts:125](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L125)

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

[tables/table.ts:135](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L135)

___

### getCells

▸ **getCells**(): [`TableCell`](TableCell.md)[]

#### Returns

[`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:139](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L139)

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

[tables/table.ts:129](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L129)
