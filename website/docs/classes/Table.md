---
id: "Table"
title: "Class: Table"
sidebar_label: "Table"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Table**(`dom`, `opt_selector?`, `opt_options?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'table'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/table.ts:45](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-45)

## Properties

### actions

• **actions**: [`Action`](../modules.md#action)[]

#### Defined in

[component/table.ts:33](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-33)

___

### collection

• **collection**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/table.ts:31](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-31)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/table.ts:34](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-34)

___

### headerNodes

• **headerNodes**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:35](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-35)

___

### headerTexts

• **headerTexts**: `string`[]

#### Defined in

[component/table.ts:36](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-36)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/table.ts:30](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-30)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/table.ts:39](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-39)

___

### query

• **query**: `string`

#### Defined in

[component/table.ts:32](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-32)

___

### tableNode

• **tableNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:29](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-29)

___

### tbody

• **tbody**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:37](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-37)

___

### tfoot

• **tfoot**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:38](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-38)

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

[component/table.ts:372](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-372)

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

[component/table.ts:421](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-421)

___

### \_createActionButton

▸ `Private` **_createActionButton**(`containerNode`, `action`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerNode` | [`Item`](Item.md)<`HTMLElement`\> |
| `action` | `Object` |
| `action.click` | `Function` |
| `action.style` | `Function` |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:562](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-562)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:633](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-633)

___

### \_getColumn

▸ `Private` **_getColumn**(): `string`

#### Returns

`string`

#### Defined in

[component/table.ts:363](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-363)

___

### \_getItems

▸ `Private` **_getItems**(): `any`[]

#### Returns

`any`[]

#### Defined in

[component/table.ts:619](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-619)

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

[component/table.ts:403](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-403)

___

### \_handleSortingColumn

▸ `Private` **_handleSortingColumn**(`head`, `i`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `head` | [`Item`](Item.md)<`HTMLElement`\> |
| `i` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:309](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-309)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:84](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-84)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:102](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-102)

___

### \_initHeader

▸ `Private` **_initHeader**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:168](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-168)

___

### \_initSearch

▸ `Private` **_initSearch**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:112](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-112)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:234](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-234)

___

### \_renderActionNodes

▸ `Private` **_renderActionNodes**(`containerNode`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerNode` | [`Item`](Item.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:540](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-540)

___

### \_renderActions

▸ `Private` **_renderActions**(`tableDataNode`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableDataNode` | [`Item`](Item.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:523](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-523)

___

### \_renderDataNode

▸ `Private` **_renderDataNode**(`tableDataNode`, `item`, `rowIndex`, `column`, `columnIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableDataNode` | [`Item`](Item.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |
| `rowIndex` | `number` |
| `column` | `string` |
| `columnIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:498](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-498)

___

### \_renderDataNodeByItem

▸ `Private` **_renderDataNodeByItem**(`item`, `rowIndex`, `column`, `parentNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |
| `rowIndex` | `number` |
| `column` | `string` |
| `parentNode` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/table.ts:453](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-453)

___

### \_renderDropDownNode

▸ `Private` **_renderDropDownNode**(`dropDownNode`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dropDownNode` | [`Item`](Item.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/table.ts:551](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-551)

___

### \_renderHeader

▸ `Private` **_renderHeader**(`headerNode`, `columnIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `headerNode` | [`Item`](Item.md)<`HTMLElement`\> |
| `columnIndex` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:183](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-183)

___

### \_resetSorting

▸ `Private` **_resetSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:353](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-353)

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

[component/table.ts:59](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-59)

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

[component/table.ts:341](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-341)

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

[component/table.ts:292](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-292)

___

### \_updateSorting

▸ `Private` **_updateSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:328](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-328)

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

[component/table.ts:284](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-284)

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

[component/table.ts:267](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-267)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:644](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-644)

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

[component/table.ts:442](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-442)

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

[component/table.ts:611](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-611)

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

[component/table.ts:598](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/table.ts#lines-598)
