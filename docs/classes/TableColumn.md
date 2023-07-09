[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / TableColumn

# Class: TableColumn

## Table of contents

### Constructors

- [constructor](TableColumn.md#constructor)

### Properties

- [cells](TableColumn.md#cells)
- [index](TableColumn.md#index)
- [textAlign](TableColumn.md#textalign)
- [wrappable](TableColumn.md#wrappable)

### Methods

- [getCell](TableColumn.md#getcell)
- [getCells](TableColumn.md#getcells)
- [updateCells](TableColumn.md#updatecells)

## Constructors

### constructor

• **new TableColumn**(`index?`, `textAlign?`, `wrappable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `index` | `number` | `0` |
| `textAlign` | [`TextAlignment`](../enums/TextAlignment.md) | `TextAlignment.default` |
| `wrappable` | `boolean` | `false` |

#### Defined in

[tables/table.ts:141](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L141)

## Properties

### cells

• **cells**: [`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:139](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L139)

___

### index

• **index**: `number` = `0`

#### Defined in

[tables/table.ts:142](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L142)

___

### textAlign

• **textAlign**: [`TextAlignment`](../enums/TextAlignment.md) = `TextAlignment.default`

#### Defined in

[tables/table.ts:143](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L143)

___

### wrappable

• **wrappable**: `boolean` = `false`

#### Defined in

[tables/table.ts:144](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L144)

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

[tables/table.ts:154](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L154)

___

### getCells

▸ **getCells**(): [`TableCell`](TableCell.md)[]

#### Returns

[`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:158](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L158)

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

[tables/table.ts:148](https://github.com/FelisDiligens/md-table-tools/blob/1e1bcfc/src/tables/table.ts#L148)
