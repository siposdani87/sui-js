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

[component/table.ts:45](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L45)

## Properties

### actions

• **actions**: [`Action`](../modules.md#action)[]

#### Defined in

[component/table.ts:33](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L33)

___

### collection

• **collection**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/table.ts:31](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L31)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/table.ts:34](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L34)

___

### headerNodes

• **headerNodes**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:35](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L35)

___

### headerTexts

• **headerTexts**: `string`[]

#### Defined in

[component/table.ts:36](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L36)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/table.ts:30](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L30)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/table.ts:39](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L39)

___

### query

• **query**: `string`

#### Defined in

[component/table.ts:32](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L32)

___

### tableNode

• **tableNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:29](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L29)

___

### tbody

• **tbody**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:37](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L37)

___

### tfoot

• **tfoot**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/table.ts:38](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L38)

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

[component/table.ts:372](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L372)

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

[component/table.ts:421](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L421)

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

[component/table.ts:562](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L562)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:633](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L633)

___

### \_getColumn

▸ `Private` **_getColumn**(): `string`

#### Returns

`string`

#### Defined in

[component/table.ts:363](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L363)

___

### \_getItems

▸ `Private` **_getItems**(): `any`[]

#### Returns

`any`[]

#### Defined in

[component/table.ts:619](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L619)

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

[component/table.ts:403](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L403)

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

[component/table.ts:309](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L309)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:84](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L84)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:102](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L102)

___

### \_initHeader

▸ `Private` **_initHeader**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:168](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L168)

___

### \_initSearch

▸ `Private` **_initSearch**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:112](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L112)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:234](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L234)

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

[component/table.ts:540](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L540)

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

[component/table.ts:523](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L523)

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

[component/table.ts:498](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L498)

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

[component/table.ts:453](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L453)

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

[component/table.ts:551](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L551)

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

[component/table.ts:183](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L183)

___

### \_resetSorting

▸ `Private` **_resetSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:353](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L353)

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

[component/table.ts:59](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L59)

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

[component/table.ts:341](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L341)

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

[component/table.ts:292](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L292)

___

### \_updateSorting

▸ `Private` **_updateSorting**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:328](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L328)

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

[component/table.ts:284](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L284)

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

[component/table.ts:267](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L267)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:644](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L644)

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

[component/table.ts:442](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L442)

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

[component/table.ts:611](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L611)

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

[component/table.ts:598](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/table.ts#L598)
