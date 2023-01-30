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
| `T` | [`Objekt`](Objekt.md) |

## Constructors

### constructor

• **new Table**<`T`\>(`dom`, `opt_selector?`, `opt_options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Objekt`](Objekt.md) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'table'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/table.ts:45](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L45)

## Properties

### actions

• **actions**: [`Action`](../modules.md#action)[]

#### Defined in

[component/table.ts:33](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L33)

___

### collection

• **collection**: [`Collection`](Collection.md)<`T`\>

#### Defined in

[component/table.ts:31](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L31)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/table.ts:34](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L34)

___

### headerKnots

• **headerKnots**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:35](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L35)

___

### headerTexts

• **headerTexts**: `string`[]

#### Defined in

[component/table.ts:36](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L36)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/table.ts:30](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L30)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/table.ts:39](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L39)

___

### query

• **query**: `string`

#### Defined in

[component/table.ts:32](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L32)

___

### tableKnot

• **tableKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:29](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L29)

___

### tbody

• **tbody**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:37](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L37)

___

### tfoot

• **tfoot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:38](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L38)

## Methods

### \_addHeaderRow

▸ `Private` **_addHeaderRow**(`item`, `rowIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |
| `rowIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:371](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L371)

___

### \_addRow

▸ `Private` **_addRow**(`item`, `rowIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |
| `rowIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:420](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L420)

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
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:561](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L561)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:632](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L632)

___

### \_getColumn

▸ `Private` **_getColumn**(): `string`

#### Returns

`string`

#### Defined in

[component/table.ts:362](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L362)

___

### \_getItems

▸ `Private` **_getItems**(): `any`[]

#### Returns

`any`[]

#### Defined in

[component/table.ts:618](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L618)

___

### \_getRowStyle

▸ `Private` **_getRowStyle**(`item`, `rowIndex`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |
| `rowIndex` | `number` |

#### Returns

`string`[]

#### Defined in

[component/table.ts:402](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L402)

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

[component/table.ts:308](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L308)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:83](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L83)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:101](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L101)

___

### \_initHeader

▸ `Private` **_initHeader**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:167](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L167)

___

### \_initSearch

▸ `Private` **_initSearch**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:111](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L111)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:233](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L233)

___

### \_renderActionKnots

▸ `Private` **_renderActionKnots**(`containerKnot`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:539](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L539)

___

### \_renderActions

▸ `Private` **_renderActions**(`tableDataKnot`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableDataKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:522](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L522)

___

### \_renderDataKnot

▸ `Private` **_renderDataKnot**(`tableDataKnot`, `item`, `rowIndex`, `column`, `columnIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableDataKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |
| `rowIndex` | `number` |
| `column` | `string` |
| `columnIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:497](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L497)

___

### \_renderDataKnotByKnot

▸ `Private` **_renderDataKnotByKnot**(`item`, `rowIndex`, `column`, `parentKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |
| `rowIndex` | `number` |
| `column` | `string` |
| `parentKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/table.ts:452](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L452)

___

### \_renderDropDownKnot

▸ `Private` **_renderDropDownKnot**(`dropDownKnot`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dropDownKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:550](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L550)

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

[component/table.ts:182](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L182)

___

### \_resetSorting

▸ `Private` **_resetSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:352](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L352)

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

[component/table.ts:59](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L59)

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

[component/table.ts:340](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L340)

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

[component/table.ts:291](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L291)

___

### \_updateSorting

▸ `Private` **_updateSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:327](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L327)

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

[component/table.ts:283](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L283)

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

[component/table.ts:266](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L266)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:643](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L643)

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

[component/table.ts:441](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L441)

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

[component/table.ts:610](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L610)

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

[component/table.ts:597](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/table.ts#L597)
