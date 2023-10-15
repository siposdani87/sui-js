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
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `opt_selectors` | `string`[] |
| `opt_options` | `Object` |

#### Defined in

[component/pager.ts:22](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L22)

## Properties

### count

• **count**: `number`

#### Defined in

[component/pager.ts:17](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L17)

___

### offset

• **offset**: `number`

#### Defined in

[component/pager.ts:20](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L20)

___

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[component/pager.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L16)

___

### page

• **page**: `number`

#### Defined in

[component/pager.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L19)

___

### pageNum

• **pageNum**: `number`

#### Defined in

[component/pager.ts:18](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L18)

___

### pager

• **pager**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L14)

___

### pagerStatistics

• **pagerStatistics**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:15](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L15)

## Methods

### \_drawNextButton

▸ `Private` **_drawNextButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:88](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L88)

___

### \_drawPageNumbers

▸ `Private` **_drawPageNumbers**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:108](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L108)

___

### \_drawPager

▸ `Private` **_drawPager**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:46](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L46)

___

### \_drawPreviousButton

▸ `Private` **_drawPreviousButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:68](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L68)

___

### \_drawStatistics

▸ `Private` **_drawStatistics**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:54](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L54)

___

### \_getPagers

▸ `Private` **_getPagers**(): `Page`[]

#### Returns

`Page`[]

#### Defined in

[component/pager.ts:133](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L133)

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

[component/pager.ts:184](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L184)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:41](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L41)

___

### \_next

▸ `Private` **_next**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:164](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L164)

___

### \_previous

▸ `Private` **_previous**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:172](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L172)

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

[component/pager.ts:33](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L33)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:194](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L194)

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

[component/pager.ts:199](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L199)

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

[component/pager.ts:180](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L180)

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

[component/pager.ts:189](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/pager.ts#L189)
