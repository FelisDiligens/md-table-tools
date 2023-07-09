[@felisdiligens/md-table-tools](../README.md) / [Exports](../modules.md) / Table

# Class: Table

## Table of contents

### Constructors

- [constructor](Table.md#constructor)

### Properties

- [afterTable](Table.md#aftertable)
- [beforeTable](Table.md#beforetable)
- [caption](Table.md#caption)
- [cells](Table.md#cells)
- [columns](Table.md#columns)
- [rows](Table.md#rows)

### Methods

- [addCell](Table.md#addcell)
- [addColumn](Table.md#addcolumn)
- [addRow](Table.md#addrow)
- [columnCount](Table.md#columncount)
- [getCell](Table.md#getcell)
- [getCellByObjs](Table.md#getcellbyobjs)
- [getCells](Table.md#getcells)
- [getCellsInColumn](Table.md#getcellsincolumn)
- [getCellsInRow](Table.md#getcellsinrow)
- [getColumn](Table.md#getcolumn)
- [getColumns](Table.md#getcolumns)
- [getHeaderRows](Table.md#getheaderrows)
- [getNormalRows](Table.md#getnormalrows)
- [getRow](Table.md#getrow)
- [getRows](Table.md#getrows)
- [indexOfColumn](Table.md#indexofcolumn)
- [indexOfRow](Table.md#indexofrow)
- [mergeMultilineRows](Table.md#mergemultilinerows)
- [moveColumn](Table.md#movecolumn)
- [moveRow](Table.md#moverow)
- [removeColumn](Table.md#removecolumn)
- [removeRow](Table.md#removerow)
- [rowCount](Table.md#rowcount)
- [sanitize](Table.md#sanitize)
- [update](Table.md#update)

## Constructors

### constructor

• **new Table**(`rowNum?`, `colNum?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rowNum` | `number` | `0` |
| `colNum` | `number` | `0` |

#### Defined in

[tables/table.ts:175](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L175)

## Properties

### afterTable

• **afterTable**: `string`

Text after the table

#### Defined in

[tables/table.ts:173](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L173)

___

### beforeTable

• **beforeTable**: `string`

Text before the table

#### Defined in

[tables/table.ts:170](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L170)

___

### caption

• **caption**: [`TableCaption`](TableCaption.md)

#### Defined in

[tables/table.ts:167](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L167)

___

### cells

• `Private` **cells**: [`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:164](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L164)

___

### columns

• `Private` **columns**: [`TableColumn`](TableColumn.md)[]

#### Defined in

[tables/table.ts:166](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L166)

___

### rows

• `Private` **rows**: [`TableRow`](TableRow.md)[]

#### Defined in

[tables/table.ts:165](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L165)

## Methods

### addCell

▸ **addCell**(`cell`): `void`

Adds the cell to the Table and the cell's respective TableRow and TableColumn.  
(Be careful not to add a cell with row/column that already exist. Otherwise, the added cell will be overshadowed and not be used.)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cell` | [`TableCell`](TableCell.md) |

#### Returns

`void`

#### Defined in

[tables/table.ts:362](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L362)

___

### addColumn

▸ **addColumn**(`index?`, `col?`): [`TableColumn`](TableColumn.md)

Adds a TableColumn to the table.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `-1` | Insert column at index. -1 means it's appended. |
| `col` | [`TableColumn`](TableColumn.md) | `undefined` | (optional) |

#### Returns

[`TableColumn`](TableColumn.md)

The added column.

#### Defined in

[tables/table.ts:206](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L206)

___

### addRow

▸ **addRow**(`index?`, `row?`): [`TableRow`](TableRow.md)

Adds a TableRow to the table.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `-1` | Insert row at index. -1 means it's appended. |
| `row` | [`TableRow`](TableRow.md) | `undefined` | (optional) |

#### Returns

[`TableRow`](TableRow.md)

The added row.

#### Defined in

[tables/table.ts:190](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L190)

___

### columnCount

▸ **columnCount**(): `number`

Returns the total amount of columns in the table.

#### Returns

`number`

#### Defined in

[tables/table.ts:374](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L374)

___

### getCell

▸ **getCell**(`row`, `column`): [`TableCell`](TableCell.md)

Returns the cell at row and column.
If the cell doesn't already exist, it will be created.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | `number` \| [`TableRow`](TableRow.md) | Either index or object reference. |
| `column` | `number` \| [`TableColumn`](TableColumn.md) | Either index or object reference. |

#### Returns

[`TableCell`](TableCell.md)

The cell at row and column.

#### Defined in

[tables/table.ts:351](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L351)

___

### getCellByObjs

▸ `Private` **getCellByObjs**(`rowObj`, `columnObj`): [`TableCell`](TableCell.md)

Returns the cell at row and column.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowObj` | [`TableRow`](TableRow.md) |
| `columnObj` | [`TableColumn`](TableColumn.md) |

#### Returns

[`TableCell`](TableCell.md)

#### Defined in

[tables/table.ts:332](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L332)

___

### getCells

▸ **getCells**(): [`TableCell`](TableCell.md)[]

Returns all cells in the table. Isn't necessarily sorted!

#### Returns

[`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:309](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L309)

___

### getCellsInColumn

▸ **getCellsInColumn**(`column`): [`TableCell`](TableCell.md)[]

Returns all cells within the given column.
See also: [()](TableColumn.md#getcells)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `number` \| [`TableColumn`](TableColumn.md) | Either index or object reference. |

#### Returns

[`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:327](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L327)

___

### getCellsInRow

▸ **getCellsInRow**(`row`): [`TableCell`](TableCell.md)[]

Returns all cells within the given row.
See also: [()](TableRow.md#getcells)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | `number` \| [`TableRow`](TableRow.md) | Either index or object reference. |

#### Returns

[`TableCell`](TableCell.md)[]

#### Defined in

[tables/table.ts:318](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L318)

___

### getColumn

▸ **getColumn**(`index`): [`TableColumn`](TableColumn.md)

Gets the column at index. Negative index counts back from the end. Returns undefined if out-of-bounds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`TableColumn`](TableColumn.md)

#### Defined in

[tables/table.ts:227](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L227)

___

### getColumns

▸ **getColumns**(): [`TableColumn`](TableColumn.md)[]

Returns all columns in the table, from left to right.

#### Returns

[`TableColumn`](TableColumn.md)[]

#### Defined in

[tables/table.ts:304](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L304)

___

### getHeaderRows

▸ **getHeaderRows**(): [`TableRow`](TableRow.md)[]

Returns a list of all rows that are headers.

#### Returns

[`TableRow`](TableRow.md)[]

#### Defined in

[tables/table.ts:289](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L289)

___

### getNormalRows

▸ **getNormalRows**(): [`TableRow`](TableRow.md)[]

Returns a list of all rows that aren't headers.

#### Returns

[`TableRow`](TableRow.md)[]

#### Defined in

[tables/table.ts:294](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L294)

___

### getRow

▸ **getRow**(`index`): [`TableRow`](TableRow.md)

Gets the row at index. Negative index counts back from the end. Returns undefined if out-of-bounds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`TableRow`](TableRow.md)

#### Defined in

[tables/table.ts:217](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L217)

___

### getRows

▸ **getRows**(): [`TableRow`](TableRow.md)[]

Retruns all rows in the table, from top to bottom, including header rows.

#### Returns

[`TableRow`](TableRow.md)[]

#### Defined in

[tables/table.ts:299](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L299)

___

### indexOfColumn

▸ **indexOfColumn**(`col`): `number`

Gets the index of the column. -1 if it hasn't been found.

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | [`TableColumn`](TableColumn.md) |

#### Returns

`number`

#### Defined in

[tables/table.ts:232](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L232)

___

### indexOfRow

▸ **indexOfRow**(`row`): `number`

Gets the index of the row. -1 if it hasn't been found.

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | [`TableRow`](TableRow.md) |

#### Returns

`number`

#### Defined in

[tables/table.ts:222](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L222)

___

### mergeMultilineRows

▸ **mergeMultilineRows**(): [`Table`](Table.md)

Merges multiline rows (from MultiMarkdown feature) into "normal" rows.  
This will destroy MultiMarkdown formatting! Only use when rendering into different formats.

#### Returns

[`Table`](Table.md)

#### Defined in

[tables/table.ts:445](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L445)

___

### moveColumn

▸ **moveColumn**(`col`, `newIndex`): `void`

Moves the given column to the new index.

**`Throws`**

Can't move column outside of table.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `col` | `number` \| [`TableColumn`](TableColumn.md) | Either index or object reference. |
| `newIndex` | `number` | The new index of the given column. |

#### Returns

`void`

#### Defined in

[tables/table.ts:264](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L264)

___

### moveRow

▸ **moveRow**(`row`, `newIndex`): `void`

Moves the given row to the new index.

**`Throws`**

Can't move row outside of table.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | `number` \| [`TableRow`](TableRow.md) | Either index or object reference. |
| `newIndex` | `number` | The new index of the given row. |

#### Returns

`void`

#### Defined in

[tables/table.ts:279](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L279)

___

### removeColumn

▸ **removeColumn**(`col`): `void`

Removes the given column. Also removes all cells within the column.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `col` | `number` \| [`TableColumn`](TableColumn.md) | Either index or object reference. |

#### Returns

`void`

#### Defined in

[tables/table.ts:240](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L240)

___

### removeRow

▸ **removeRow**(`row`): `void`

Removes the given row. Also removes all cells within the row.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | `number` \| [`TableRow`](TableRow.md) | Either index or object reference. |

#### Returns

`void`

#### Defined in

[tables/table.ts:251](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L251)

___

### rowCount

▸ **rowCount**(): `number`

Returns the total amount of rows in the table, including the header rows.

#### Returns

`number`

#### Defined in

[tables/table.ts:369](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L369)

___

### sanitize

▸ `Private` **sanitize**(): [`Table`](Table.md)

Tries to find invalid configurations and sanitize them.

#### Returns

[`Table`](Table.md)

#### Defined in

[tables/table.ts:417](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L417)

___

### update

▸ **update**(): [`Table`](Table.md)

→ Ensures that all table cells exist.  
→ Updates indices and sorts the cells within rows and columns.  
→ Tries to find invalid configurations and sanitize them.  

Call this method after altering the table.

#### Returns

[`Table`](Table.md)

#### Defined in

[tables/table.ts:385](https://github.com/FelisDiligens/md-table-tools/blob/4fd20a3/src/tables/table.ts#L385)
