---
id: "Pager"
title: "Class: Pager"
sidebar_label: "Pager"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Pager**(`dom`, `opt_selectors?`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> |
| `opt_selectors` | `string`[] |
| `opt_options` | `Object` |

#### Defined in

[component/pager.ts:29](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L29)

## Properties

### count

• **count**: `number`

#### Defined in

[component/pager.ts:20](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L20)

___

### offset

• **offset**: `number`

#### Defined in

[component/pager.ts:23](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L23)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/pager.ts:19](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L19)

___

### page

• **page**: `number`

#### Defined in

[component/pager.ts:22](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L22)

___

### pageNum

• **pageNum**: `number`

#### Defined in

[component/pager.ts:21](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L21)

___

### pager

• **pager**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:17](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L17)

___

### pagerStatistics

• **pagerStatistics**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:18](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L18)

## Methods

### \_drawNextButton

▸ `Private` **_drawNextButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:115](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L115)

___

### \_drawPageNumbers

▸ `Private` **_drawPageNumbers**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:138](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L138)

___

### \_drawPager

▸ `Private` **_drawPager**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:64](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L64)

___

### \_drawPreviousButton

▸ `Private` **_drawPreviousButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:92](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L92)

___

### \_drawStatistics

▸ `Private` **_drawStatistics**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:75](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L75)

___

### \_getPagers

▸ `Private` **_getPagers**(): `Page`[]

#### Returns

`Page`[]

#### Defined in

[component/pager.ts:166](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L166)

___

### \_go

▸ `Private` **_go**(`page`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

`void`

#### Defined in

[component/pager.ts:230](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L230)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:56](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L56)

___

### \_next

▸ `Private` **_next**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:200](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L200)

___

### \_previous

▸ `Private` **_previous**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:211](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L211)

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

[component/pager.ts:44](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L44)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:245](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L245)

___

### eventAction

▸ **eventAction**(`page`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

`void`

#### Defined in

[component/pager.ts:253](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L253)

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

[component/pager.ts:222](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L222)

___

### setPage

▸ **setPage**(`page`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

`void`

#### Defined in

[component/pager.ts:238](https://github.com/siposdani87/sui-js/blob/e8748e2/src/component/pager.ts#L238)
