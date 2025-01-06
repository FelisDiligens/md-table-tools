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

[tables/multiMarkdownTable.ts:255](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L255)

## Properties

### renderOutsideTable

• **renderOutsideTable**: `boolean` = `true`

#### Defined in

[tables/multiMarkdownTable.ts:256](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L256)

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

[tables/multiMarkdownTable.ts:258](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L258)

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

[tables/multiMarkdownTable.ts:298](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L298)

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

[tables/multiMarkdownTable.ts:335](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L335)

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

[tables/multiMarkdownTable.ts:309](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/multiMarkdownTable.ts#L309)
