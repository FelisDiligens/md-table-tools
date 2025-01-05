[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / DokuWikiTableRenderer

# Class: DokuWikiTableRenderer

Not all features are implemented because some features from MultiMarkdown are missing in DokuWiki's syntax (afaik):

These features are not supported:
- Table captions
- Multiline rows

## Implements

- [`TableRenderer`](../interfaces/TableRenderer.md)

## Table of contents

### Constructors

- [constructor](DokuWikiTableRenderer.md#constructor)

### Methods

- [determineColumnWidths](DokuWikiTableRenderer.md#determinecolumnwidths)
- [render](DokuWikiTableRenderer.md#render)
- [renderCaption](DokuWikiTableRenderer.md#rendercaption)
- [renderCell](DokuWikiTableRenderer.md#rendercell)
- [renderRow](DokuWikiTableRenderer.md#renderrow)

## Constructors

### constructor

• **new DokuWikiTableRenderer**()

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

tables/dokuWikiTable.ts:250

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

tables/dokuWikiTable.ts:151

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

tables/dokuWikiTable.ts:191

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

tables/dokuWikiTable.ts:226

___

### renderRow

▸ `Private` **renderRow**(`table`, `row`, `isHeader`, `columnWidths`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `row` | [`TableRow`](TableRow.md) |
| `isHeader` | `boolean` |
| `columnWidths` | `number`[] |

#### Returns

`string`

#### Defined in

tables/dokuWikiTable.ts:203
