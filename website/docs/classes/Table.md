---
id: "Table"
title: "Class: Table<T>"
sidebar_label: "Table"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Objekt`](Objekt.md) = [`Objekt`](Objekt.md) |

## Constructors

### constructor

• **new Table**<`T`\>(`dom`, `opt_selector?`, `opt_options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Objekt`](Objekt.md)<`Object`, `T`\> = [`Objekt`](Objekt.md)<`Object`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'table'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/table.ts:45](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L45)

## Properties

### actions

• **actions**: [`Action`](../modules.md#action)[]

#### Defined in

[component/table.ts:37](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L37)

___

### collection

• **collection**: [`Collection`](Collection.md)<`T`\>

#### Defined in

[component/table.ts:35](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L35)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/table.ts:38](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L38)

___

### headerKnots

• **headerKnots**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:39](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L39)

___

### headerTexts

• **headerTexts**: `string`[]

#### Defined in

[component/table.ts:40](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L40)

___

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[component/table.ts:34](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L34)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/table.ts:43](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L43)

___

### query

• **query**: `string`

#### Defined in

[component/table.ts:36](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L36)

___

### tableKnot

• **tableKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:33](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L33)

___

### tbody

• **tbody**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:41](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L41)

___

### tfoot

• **tfoot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:42](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L42)

## Methods

### \_addHeaderRow

▸ `Private` **_addHeaderRow**(`item`, `rowIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |
| `rowIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:313](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L313)

___

### \_addRow

▸ `Private` **_addRow**(`item`, `rowIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |
| `rowIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:352](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L352)

___

### \_createActionButton

▸ `Private` **_createActionButton**(`containerKnot`, `action`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `action` | `Object` |
| `action.click` | `Function` |
| `action.style` | `Function` |
| `item` | `T` |

#### Returns

`void`

#### Defined in

[component/table.ts:454](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L454)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:513](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L513)

___

### \_getColumn

▸ `Private` **_getColumn**(): `string`

#### Returns

`string`

#### Defined in

[component/table.ts:309](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L309)

___

### \_getItems

▸ `Private` **_getItems**(): `T`[]

#### Returns

`T`[]

#### Defined in

[component/table.ts:502](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L502)

___

### \_getRowStyle

▸ `Private` **_getRowStyle**(`item`, `rowIndex`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |
| `rowIndex` | `number` |

#### Returns

`string`[]

#### Defined in

[component/table.ts:339](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L339)

___

### \_handleSortingColumn

▸ `Private` **_handleSortingColumn**(`head`, `i`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `head` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `i` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:269](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L269)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:76](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L76)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:91](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L91)

___

### \_initHeader

▸ `Private` **_initHeader**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:151](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L151)

___

### \_initSearch

▸ `Private` **_initSearch**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:98](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L98)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:209](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L209)

___

### \_renderActionKnots

▸ `Private` **_renderActionKnots**(`containerKnot`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | `T` |

#### Returns

`void`

#### Defined in

[component/table.ts:443](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L443)

___

### \_renderActions

▸ `Private` **_renderActions**(`tableDataKnot`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableDataKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | `T` |

#### Returns

`void`

#### Defined in

[component/table.ts:431](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L431)

___

### \_renderDataKnot

▸ `Private` **_renderDataKnot**(`tableDataKnot`, `item`, `rowIndex`, `column`, `columnIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableDataKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | `T` |
| `rowIndex` | `number` |
| `column` | `string` |
| `columnIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:411](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L411)

___

### \_renderDataKnotByKnot

▸ `Private` **_renderDataKnotByKnot**(`item`, `rowIndex`, `column`, `parentKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |
| `rowIndex` | `number` |
| `column` | `string` |
| `parentKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/table.ts:374](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L374)

___

### \_renderDropDownKnot

▸ `Private` **_renderDropDownKnot**(`dropDownKnot`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dropDownKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | `T` |

#### Returns

`void`

#### Defined in

[component/table.ts:449](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L449)

___

### \_renderHeader

▸ `Private` **_renderHeader**(`headerKnot`, `columnIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `headerKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `columnIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:161](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L161)

___

### \_resetSorting

▸ `Private` **_resetSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:302](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L302)

___

### \_setOptions

▸ `Private` **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/table.ts:55](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L55)

___

### \_setSorting

▸ `Private` **_setSorting**(`column`, `opt_order?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `column` | `string` | `undefined` |
| `opt_order` | `string` | `'asc'` |

#### Returns

`void`

#### Defined in

[component/table.ts:293](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L293)

___

### \_toggleSorting

▸ `Private` **_toggleSorting**(`columnWithOrder`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnWithOrder` | `string` |

#### Returns

`void`

#### Defined in

[component/table.ts:257](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L257)

___

### \_updateSorting

▸ `Private` **_updateSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:285](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L285)

___

### eventAction

▸ **eventAction**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[component/table.ts:253](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L253)

___

### refresh

▸ **refresh**(`opt_page?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_page` | `number` | `-1` |

#### Returns

`void`

#### Defined in

[component/table.ts:239](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L239)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:522](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L522)

___

### setActions

▸ **setActions**(`actions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`Action`](../modules.md#action)[] |

#### Returns

`void`

#### Defined in

[component/table.ts:370](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L370)

___

### setCount

▸ **setCount**(`count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:497](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L497)

___

### setData

▸ **setData**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |

#### Returns

`void`

#### Defined in

[component/table.ts:487](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/table.ts#L487)
