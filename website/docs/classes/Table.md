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
| `T` | extends [`Objekt`](Objekt.md)<`T`\> = [`Objekt`](Objekt.md) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'table'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/table.ts:44](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L44)

## Properties

### actions

• **actions**: [`Action`](../modules.md#action)[]

#### Defined in

[component/table.ts:32](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L32)

___

### collection

• **collection**: [`Collection`](Collection.md)<`T`\>

#### Defined in

[component/table.ts:30](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L30)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/table.ts:33](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L33)

___

### headerKnots

• **headerKnots**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:34](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L34)

___

### headerTexts

• **headerTexts**: `string`[]

#### Defined in

[component/table.ts:35](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L35)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/table.ts:29](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L29)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/table.ts:38](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L38)

___

### query

• **query**: `string`

#### Defined in

[component/table.ts:31](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L31)

___

### tableKnot

• **tableKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:28](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L28)

___

### tbody

• **tbody**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:36](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L36)

___

### tfoot

• **tfoot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:37](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L37)

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

[component/table.ts:370](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L370)

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

[component/table.ts:419](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L419)

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

[component/table.ts:560](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L560)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:631](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L631)

___

### \_getColumn

▸ `Private` **_getColumn**(): `string`

#### Returns

`string`

#### Defined in

[component/table.ts:361](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L361)

___

### \_getItems

▸ `Private` **_getItems**(): `T`[]

#### Returns

`T`[]

#### Defined in

[component/table.ts:617](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L617)

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

[component/table.ts:401](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L401)

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

[component/table.ts:307](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L307)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:82](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L82)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:100](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L100)

___

### \_initHeader

▸ `Private` **_initHeader**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:166](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L166)

___

### \_initSearch

▸ `Private` **_initSearch**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:110](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L110)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:232](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L232)

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

[component/table.ts:538](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L538)

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

[component/table.ts:521](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L521)

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

[component/table.ts:496](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L496)

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

[component/table.ts:451](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L451)

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

[component/table.ts:549](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L549)

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

[component/table.ts:181](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L181)

___

### \_resetSorting

▸ `Private` **_resetSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:351](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L351)

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

[component/table.ts:58](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L58)

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

[component/table.ts:339](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L339)

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

[component/table.ts:290](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L290)

___

### \_updateSorting

▸ `Private` **_updateSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:326](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L326)

___

### eventAction

▸ **eventAction**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:282](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L282)

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

[component/table.ts:265](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L265)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:642](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L642)

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

[component/table.ts:440](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L440)

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

[component/table.ts:609](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L609)

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

[component/table.ts:596](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/table.ts#L596)
