[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / HTMLTableRenderer

# Class: HTMLTableRenderer

## Implements

- [`TableRenderer`](../interfaces/TableRenderer.md)

## Table of contents

### Constructors

- [constructor](HTMLTableRenderer.md#constructor)

### Properties

- [indent](HTMLTableRenderer.md#indent)
- [prettify](HTMLTableRenderer.md#prettify)
- [renderOutsideTable](HTMLTableRenderer.md#renderoutsidetable)

### Methods

- [indentString](HTMLTableRenderer.md#indentstring)
- [render](HTMLTableRenderer.md#render)
- [renderCell](HTMLTableRenderer.md#rendercell)
- [renderRow](HTMLTableRenderer.md#renderrow)

## Constructors

### constructor

• **new HTMLTableRenderer**(`prettify?`, `indent?`, `renderOutsideTable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `prettify` | `boolean` | `true` |
| `indent` | `string` | `"  "` |
| `renderOutsideTable` | `boolean` | `true` |

#### Defined in

[tables/htmlTable.ts:344](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L344)

## Properties

### indent

• **indent**: `string` = `" "`

#### Defined in

[tables/htmlTable.ts:346](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L346)

___

### prettify

• **prettify**: `boolean` = `true`

#### Defined in

[tables/htmlTable.ts:345](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L345)

___

### renderOutsideTable

• **renderOutsideTable**: `boolean` = `true`

#### Defined in

[tables/htmlTable.ts:347](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L347)

## Methods

### indentString

▸ `Private` **indentString**(`str`, `indentLevel?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `indentLevel` | `number` | `0` |

#### Returns

`string`

#### Defined in

[tables/htmlTable.ts:415](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L415)

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

[tables/htmlTable.ts:349](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L349)

___

### renderCell

▸ `Private` **renderCell**(`cell`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cell` | [`TableCell`](TableCell.md) |

#### Returns

`string`

#### Defined in

[tables/htmlTable.ts:400](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L400)

___

### renderRow

▸ `Private` **renderRow**(`table`, `row`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | [`Table`](Table.md) |
| `row` | [`TableRow`](TableRow.md) |

#### Returns

`string`[]

#### Defined in

[tables/htmlTable.ts:388](https://github.com/FelisDiligens/md-table-tools/blob/c0688b5/src/tables/htmlTable.ts#L388)
