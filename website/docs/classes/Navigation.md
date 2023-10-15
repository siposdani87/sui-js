---
id: "Navigation"
title: "Class: Navigation"
sidebar_label: "Navigation"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Navigation**(`opt_http?`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_http?` | [`Http`](Http.md) |
| `opt_options` | `Object` |

#### Defined in

[component/navigation.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L14)

## Properties

### container

• **container**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)<`Object`\>\>

#### Defined in

[component/navigation.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L11)

___

### http

• `Optional` **http**: [`Http`](Http.md)

#### Defined in

[component/navigation.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L9)

___

### linkKnotKey

• **linkKnotKey**: `string`

#### Defined in

[component/navigation.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L12)

___

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[component/navigation.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L10)

## Methods

### \_disabled

▸ `Private` **_disabled**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[component/navigation.ts:201](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L201)

___

### \_enabled

▸ `Private` **_enabled**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[component/navigation.ts:215](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L215)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/navigation.ts:25](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L25)

___

### \_setKnot

▸ `Private` **_setKnot**(`id`, `title`, `action`, `opt_href?`, `opt_data?`): [`Objekt`](Objekt.md)<`Object`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `action` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_data` | `Object` | `{}` |

#### Returns

[`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[component/navigation.ts:144](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L144)

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

[component/navigation.ts:20](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L20)

___

### add

▸ **add**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[component/navigation.ts:31](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L31)

___

### addCounter

▸ **addCounter**(`id`, `counter`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `counter` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `action` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_data` | `Object` | `{}` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:56](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L56)

___

### addIcon

▸ **addIcon**(`id`, `icon`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `icon` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `action` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_data` | `Object` | `{}` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:73](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L73)

___

### addImage

▸ **addImage**(`id`, `image`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `image` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `action` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_data` | `Object` | `{}` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:94](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L94)

___

### addText

▸ **addText**(`id`, `title`, `action`, `opt_href?`, `opt_data?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `action` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_data` | `Object` | `{}` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:134](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L134)

___

### bindToContainer

▸ **bindToContainer**(`containerKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/navigation.ts:186](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L186)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | `Function` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:180](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L180)

___

### hide

▸ **hide**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:258](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L258)

___

### setActive

▸ **setActive**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:228](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L228)

___

### setAllInactive

▸ **setAllInactive**(): `void`

#### Returns

`void`

#### Defined in

[component/navigation.ts:242](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L242)

___

### setDisabled

▸ **setDisabled**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:194](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L194)

___

### setEnabled

▸ **setEnabled**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:208](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L208)

___

### show

▸ **show**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[component/navigation.ts:249](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/navigation.ts#L249)
