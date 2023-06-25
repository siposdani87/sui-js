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

[component/pager.ts:29](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L29)

## Properties

### count

• **count**: `number`

#### Defined in

[component/pager.ts:20](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L20)

___

### offset

• **offset**: `number`

#### Defined in

[component/pager.ts:23](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L23)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/pager.ts:19](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L19)

___

### page

• **page**: `number`

#### Defined in

[component/pager.ts:22](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L22)

___

### pageNum

• **pageNum**: `number`

#### Defined in

[component/pager.ts:21](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L21)

___

### pager

• **pager**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:17](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L17)

___

### pagerStatistics

• **pagerStatistics**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/pager.ts:18](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L18)

## Methods

### \_drawNextButton

▸ `Private` **_drawNextButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:114](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L114)

___

### \_drawPageNumbers

▸ `Private` **_drawPageNumbers**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:137](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L137)

___

### \_drawPager

▸ `Private` **_drawPager**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:63](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L63)

___

### \_drawPreviousButton

▸ `Private` **_drawPreviousButton**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:91](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L91)

___

### \_drawStatistics

▸ `Private` **_drawStatistics**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:74](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L74)

___

### \_getPagers

▸ `Private` **_getPagers**(): `Page`[]

#### Returns

`Page`[]

#### Defined in

[component/pager.ts:165](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L165)

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

[component/pager.ts:229](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L229)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:55](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L55)

___

### \_next

▸ `Private` **_next**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:199](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L199)

___

### \_previous

▸ `Private` **_previous**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:210](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L210)

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

[component/pager.ts:44](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L44)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/pager.ts:244](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L244)

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

[component/pager.ts:252](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L252)

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

[component/pager.ts:221](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L221)

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

[component/pager.ts:237](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/pager.ts#L237)
