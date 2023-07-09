[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / GitHubFlavoredMarkdownTableRenderer

# Class: GitHubFlavoredMarkdownTableRenderer

## Implements

- [`TableRenderer`](../interfaces/TableRenderer.md)

## Table of contents

### Constructors

- [constructor](GitHubFlavoredMarkdownTableRenderer.md#constructor)

### Properties

- [prettify](GitHubFlavoredMarkdownTableRenderer.md#prettify)
- [renderOutsideTable](GitHubFlavoredMarkdownTableRenderer.md#renderoutsidetable)

### Methods

- [determineColumnWidth](GitHubFlavoredMarkdownTableRenderer.md#determinecolumnwidth)
- [determineColumnWidths](GitHubFlavoredMarkdownTableRenderer.md#determinecolumnwidths)
- [render](GitHubFlavoredMarkdownTableRenderer.md#render)
- [renderCell](GitHubFlavoredMarkdownTableRenderer.md#rendercell)
- [renderDelimiterRow](GitHubFlavoredMarkdownTableRenderer.md#renderdelimiterrow)
- [renderRow](GitHubFlavoredMarkdownTableRenderer.md#renderrow)

## Constructors

### constructor

• **new GitHubFlavoredMarkdownTableRenderer**(`prettify?`, `renderOutsideTable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `prettify` | `boolean` | `true` |
| `renderOutsideTable` | `boolean` | `true` |

#### Defined in

[tables/gfmTable.ts:182](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L182)

## Properties

### prettify

• **prettify**: `boolean` = `true`

#### Defined in

[tables/gfmTable.ts:183](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L183)

___

### renderOutsideTable

• **renderOutsideTable**: `boolean` = `true`

#### Defined in

[tables/gfmTable.ts:184](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L184)

## Methods

### determineColumnWidth

▸ `Private` **determineColumnWidth**(`table`, `column`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `column` | [`TableColumn`](TableColumn.md) |

#### Returns

`number`

#### Defined in

[tables/gfmTable.ts:274](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L274)

___

### determineColumnWidths

▸ `Private` **determineColumnWidths**(`table`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |

#### Returns

`number`[]

#### Defined in

[tables/gfmTable.ts:281](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L281)

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

[tables/gfmTable.ts:186](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L186)

___

### renderCell

▸ `Private` **renderCell**(`cell`, `cellWidth?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cell` | [`TableCell`](TableCell.md) | `undefined` |
| `cellWidth` | `number` | `-1` |

#### Returns

`string`

#### Defined in

[tables/gfmTable.ts:255](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L255)

___

### renderDelimiterRow

▸ `Private` **renderDelimiterRow**(`table`, `columnWidths`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `columnWidths` | `number`[] |

#### Returns

`string`

#### Defined in

[tables/gfmTable.ts:212](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L212)

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

[tables/gfmTable.ts:240](https://github.com/FelisDiligens/md-table-tools/blob/e0dc98a/src/tables/gfmTable.ts#L240)
