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

[tables/htmlTable.ts:349](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L349)

## Properties

### indent

• **indent**: `string` = `" "`

#### Defined in

[tables/htmlTable.ts:351](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L351)

___

### prettify

• **prettify**: `boolean` = `true`

#### Defined in

[tables/htmlTable.ts:350](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L350)

___

### renderOutsideTable

• **renderOutsideTable**: `boolean` = `true`

#### Defined in

[tables/htmlTable.ts:352](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L352)

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

[tables/htmlTable.ts:420](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L420)

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

[tables/htmlTable.ts:354](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L354)

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

[tables/htmlTable.ts:405](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L405)

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

[tables/htmlTable.ts:393](https://github.com/FelisDiligens/md-table-tools/blob/0a55b82/src/tables/htmlTable.ts#L393)
