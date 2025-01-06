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

[tables/table.ts:147](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L147)

## Properties

### cells

• **cells**: [`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:145](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L145)

___

### index

• **index**: `number` = `0`

#### Defined in

[tables/table.ts:148](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L148)

___

### textAlign

• **textAlign**: [`TextAlignment`](../enums/TextAlignment.md) = `TextAlignment.default`

#### Defined in

[tables/table.ts:149](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L149)

___

### wrappable

• **wrappable**: `boolean` = `false`

#### Defined in

[tables/table.ts:150](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L150)

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

[tables/table.ts:160](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L160)

___

### getCells

▸ **getCells**(): [`TableCell`](TableCell.md)[]

#### Returns

[`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:164](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L164)

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

[tables/table.ts:154](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/table.ts#L154)
