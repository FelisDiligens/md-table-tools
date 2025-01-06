[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / TableCell

# Class: TableCell

## Table of contents

### Constructors

- [constructor](TableCell.md#constructor)

### Properties

- [column](TableCell.md#column)
- [isHeader](TableCell.md#isheader)
- [merged](TableCell.md#merged)
- [row](TableCell.md#row)
- [table](TableCell.md#table)
- [text](TableCell.md#text)
- [textAlign](TableCell.md#textalign)

### Methods

- [getColspan](TableCell.md#getcolspan)
- [getRowspan](TableCell.md#getrowspan)
- [getTextAlignment](TableCell.md#gettextalignment)
- [isHeaderCell](TableCell.md#isheadercell)
- [setText](TableCell.md#settext)

## Constructors

### constructor

• **new TableCell**(`table`, `row`, `column`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `row` | [`TableRow`](TableRow.md) |
| `column` | [`TableColumn`](TableColumn.md) |

#### Defined in

[tables/table.ts:54](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L54)

## Properties

### column

• **column**: [`TableColumn`](TableColumn.md)

#### Defined in

[tables/table.ts:49](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L49)

___

### isHeader

• **isHeader**: `boolean`

#### Defined in

[tables/table.ts:51](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L51)

___

### merged

• **merged**: [`TableCellMerge`](../enums/TableCellMerge.md)

#### Defined in

[tables/table.ts:50](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L50)

___

### row

• **row**: [`TableRow`](TableRow.md)

#### Defined in

[tables/table.ts:48](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L48)

___

### table

• **table**: [`Table`](Table.md)

#### Defined in

[tables/table.ts:47](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L47)

___

### text

• **text**: `string`

#### Defined in

[tables/table.ts:46](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L46)

___

### textAlign

• **textAlign**: [`TextAlignment`](../enums/TextAlignment.md)

#### Defined in

[tables/table.ts:52](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L52)

## Methods

### getColspan

▸ **getColspan**(): `number`

#### Returns

`number`

#### Defined in

[tables/table.ts:78](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L78)

___

### getRowspan

▸ **getRowspan**(): `number`

#### Returns

`number`

#### Defined in

[tables/table.ts:97](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L97)

___

### getTextAlignment

▸ **getTextAlignment**(): [`TextAlignment`](../enums/TextAlignment.md)

#### Returns

[`TextAlignment`](../enums/TextAlignment.md)

#### Defined in

[tables/table.ts:68](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L68)

___

### isHeaderCell

▸ **isHeaderCell**(): `boolean`

#### Returns

`boolean`

#### Defined in

[tables/table.ts:64](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L64)

___

### setText

▸ **setText**(`text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Defined in

[tables/table.ts:74](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L74)
