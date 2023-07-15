[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / MinifiedMultiMarkdownTableRenderer

# Class: MinifiedMultiMarkdownTableRenderer

## Implements

- [`TableRenderer`](../interfaces/TableRenderer.md)

## Table of contents

### Constructors

- [constructor](MinifiedMultiMarkdownTableRenderer.md#constructor)

### Properties

- [renderOutsideTable](MinifiedMultiMarkdownTableRenderer.md#renderoutsidetable)

### Methods

- [render](MinifiedMultiMarkdownTableRenderer.md#render)
- [renderCaption](MinifiedMultiMarkdownTableRenderer.md#rendercaption)
- [renderRow](MinifiedMultiMarkdownTableRenderer.md#renderrow)
- [renderSeparator](MinifiedMultiMarkdownTableRenderer.md#renderseparator)

## Constructors

### constructor

• **new MinifiedMultiMarkdownTableRenderer**(`renderOutsideTable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `renderOutsideTable` | `boolean` | `true` |

#### Defined in

[tables/multiMarkdownTable.ts:254](https://github.com/FelisDiligens/md-table-tools/blob/7054713/src/tables/multiMarkdownTable.ts#L254)

## Properties

### renderOutsideTable

• **renderOutsideTable**: `boolean` = `true`

#### Defined in

[tables/multiMarkdownTable.ts:255](https://github.com/FelisDiligens/md-table-tools/blob/7054713/src/tables/multiMarkdownTable.ts#L255)

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

[tables/multiMarkdownTable.ts:257](https://github.com/FelisDiligens/md-table-tools/blob/7054713/src/tables/multiMarkdownTable.ts#L257)

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

[tables/multiMarkdownTable.ts:297](https://github.com/FelisDiligens/md-table-tools/blob/7054713/src/tables/multiMarkdownTable.ts#L297)

___

### renderRow

▸ `Private` **renderRow**(`table`, `row`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `row` | [`TableRow`](TableRow.md) |

#### Returns

`string`

#### Defined in

[tables/multiMarkdownTable.ts:334](https://github.com/FelisDiligens/md-table-tools/blob/7054713/src/tables/multiMarkdownTable.ts#L334)

___

### renderSeparator

▸ `Private` **renderSeparator**(`table`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |

#### Returns

`string`

#### Defined in

[tables/multiMarkdownTable.ts:308](https://github.com/FelisDiligens/md-table-tools/blob/7054713/src/tables/multiMarkdownTable.ts#L308)
