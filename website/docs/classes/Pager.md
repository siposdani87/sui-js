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

[component/pager.ts:29](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-29)

## Properties

### count

• **count**: `number`

#### Defined in

[component/pager.ts:20](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-20)

___

### offset

• **offset**: `number`

#### Defined in

[component/pager.ts:23](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-23)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/pager.ts:19](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-19)

___

### page

• **page**: `number`

#### Defined in

[component/pager.ts:22](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-22)

___

### pageNum

• **pageNum**: `number`

#### Defined in

[component/pager.ts:21](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-21)

___

### pager

• **pager**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:17](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-17)

___

### pagerStatistics

• **pagerStatistics**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:18](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-18)

## Methods

### \_drawNextButton

▸ `Private` **_drawNextButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:115](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-115)

___

### \_drawPageNumbers

▸ `Private` **_drawPageNumbers**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:138](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-138)

___

### \_drawPager

▸ `Private` **_drawPager**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:64](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-64)

___

### \_drawPreviousButton

▸ `Private` **_drawPreviousButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:92](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-92)

___

### \_drawStatistics

▸ `Private` **_drawStatistics**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:75](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-75)

___

### \_getPagers

▸ `Private` **_getPagers**(): `Page`[]

#### Returns

`Page`[]

#### Defined in

[component/pager.ts:166](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-166)

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

[component/pager.ts:230](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-230)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:56](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-56)

___

### \_next

▸ `Private` **_next**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:200](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-200)

___

### \_previous

▸ `Private` **_previous**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:211](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-211)

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

[component/pager.ts:44](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-44)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:245](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-245)

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

[component/pager.ts:253](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-253)

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

[component/pager.ts:222](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-222)

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

[component/pager.ts:238](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/pager.ts#lines-238)
