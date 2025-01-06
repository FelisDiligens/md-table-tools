[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / PrettyMultiMarkdownTableRenderer

# Class: PrettyMultiMarkdownTableRenderer

## Implements

- [`TableRenderer`](../interfaces/TableRenderer.md)

## Table of contents

### Constructors

- [constructor](PrettyMultiMarkdownTableRenderer.md#constructor)

### Properties

- [renderOutsideTable](PrettyMultiMarkdownTableRenderer.md#renderoutsidetable)

### Methods

- [determineColumnWidths](PrettyMultiMarkdownTableRenderer.md#determinecolumnwidths)
- [render](PrettyMultiMarkdownTableRenderer.md#render)
- [renderCaption](PrettyMultiMarkdownTableRenderer.md#rendercaption)
- [renderCell](PrettyMultiMarkdownTableRenderer.md#rendercell)
- [renderRow](PrettyMultiMarkdownTableRenderer.md#renderrow)
- [renderSeparator](PrettyMultiMarkdownTableRenderer.md#renderseparator)

## Constructors

### constructor

• **new PrettyMultiMarkdownTableRenderer**(`renderOutsideTable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `renderOutsideTable` | `boolean` | `true` |

#### Defined in

[tables/multiMarkdownTable.ts:366](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L366)

## Properties

### renderOutsideTable

• **renderOutsideTable**: `boolean` = `true`

#### Defined in

[tables/multiMarkdownTable.ts:367](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L367)

## Methods

### determineColumnWidths

▸ `Private` **determineColumnWidths**(`table`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |

#### Returns

`number`[]

#### Defined in

[tables/multiMarkdownTable.ts:494](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L494)

___

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

[tables/multiMarkdownTable.ts:369](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L369)

___

### renderCaption

▸ `Private` **renderCaption**(`caption`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `caption` | [`TableCaption`](TableCaption.md) |

#### Returns

`string`

#### Defined in

[tables/multiMarkdownTable.ts:410](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L410)

___

### renderCell

▸ `Private` **renderCell**(`cell`, `colspan?`, `cellWidth?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cell` | [`TableCell`](TableCell.md) | `undefined` |
| `colspan` | `number` | `1` |
| `cellWidth` | `number` | `-1` |

#### Returns

`string`

#### Defined in

[tables/multiMarkdownTable.ts:475](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L475)

___

### renderRow

▸ `Private` **renderRow**(`table`, `row`, `columnWidths`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `row` | [`TableRow`](TableRow.md) |
| `columnWidths` | `number`[] |

#### Returns

`string`

#### Defined in

[tables/multiMarkdownTable.ts:458](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L458)

___

### renderSeparator

▸ `Private` **renderSeparator**(`table`, `columnWidths`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `columnWidths` | `number`[] |

#### Returns

`string`

#### Defined in

[tables/multiMarkdownTable.ts:421](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L421)
