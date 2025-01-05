[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / TableCell

# Class: TableCell

## Table of contents

### Constructors

- [constructor](TableCell.md#constructor)

### Properties

- [column](TableCell.md#column)
- [merged](TableCell.md#merged)
- [row](TableCell.md#row)
- [table](TableCell.md#table)
- [text](TableCell.md#text)

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

[tables/table.ts:52](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L52)

## Properties

### column

• **column**: [`TableColumn`](TableColumn.md)

#### Defined in

[tables/table.ts:49](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L49)

___

### merged

• **merged**: [`TableCellMerge`](../enums/TableCellMerge.md)

#### Defined in

[tables/table.ts:50](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L50)

___

### row

• **row**: [`TableRow`](TableRow.md)

#### Defined in

[tables/table.ts:48](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L48)

___

### table

• **table**: [`Table`](Table.md)

#### Defined in

[tables/table.ts:47](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L47)

___

### text

• **text**: `string`

#### Defined in

[tables/table.ts:46](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L46)

## Methods

### getColspan

▸ **getColspan**(): `number`

#### Returns

`number`

#### Defined in

[tables/table.ts:72](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L72)

___

### getRowspan

▸ **getRowspan**(): `number`

#### Returns

`number`

#### Defined in

[tables/table.ts:91](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L91)

___

### getTextAlignment

▸ **getTextAlignment**(): [`TextAlignment`](../enums/TextAlignment.md)

#### Returns

[`TextAlignment`](../enums/TextAlignment.md)

#### Defined in

[tables/table.ts:64](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L64)

___

### isHeaderCell

▸ **isHeaderCell**(): `boolean`

#### Returns

`boolean`

#### Defined in

[tables/table.ts:60](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L60)

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

[tables/table.ts:68](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/table.ts#L68)
