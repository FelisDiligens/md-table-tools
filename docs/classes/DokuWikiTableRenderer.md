[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / DokuWikiTableRenderer

# Class: DokuWikiTableRenderer

## Implements

- [`TableRenderer`](../interfaces/TableRenderer.md)

## Table of contents

### Constructors

- [constructor](DokuWikiTableRenderer.md#constructor)

### Properties

- [convertMarkup](DokuWikiTableRenderer.md#convertmarkup)

### Methods

- [determineColumnWidths](DokuWikiTableRenderer.md#determinecolumnwidths)
- [render](DokuWikiTableRenderer.md#render)
- [renderCaption](DokuWikiTableRenderer.md#rendercaption)
- [renderCell](DokuWikiTableRenderer.md#rendercell)
- [renderRow](DokuWikiTableRenderer.md#renderrow)
- [renderText](DokuWikiTableRenderer.md#rendertext)

## Constructors

### constructor

• **new DokuWikiTableRenderer**(`convertMarkup?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `convertMarkup` | `boolean` | `true` | If true, converts Markdown syntax to DokuWiki syntax |

#### Defined in

[tables/dokuWikiTable.ts:235](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L235)

## Properties

### convertMarkup

• **convertMarkup**: `boolean` = `true`

If true, converts Markdown syntax to DokuWiki syntax

#### Defined in

[tables/dokuWikiTable.ts:237](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L237)

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

[tables/dokuWikiTable.ts:339](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L339)

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

[tables/dokuWikiTable.ts:240](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L240)

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

[tables/dokuWikiTable.ts:272](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L272)

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

[tables/dokuWikiTable.ts:308](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L308)

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

[tables/dokuWikiTable.ts:284](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L284)

___

### renderText

▸ `Private` **renderText**(`text`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`string`

#### Defined in

[tables/dokuWikiTable.ts:335](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/dokuWikiTable.ts#L335)
