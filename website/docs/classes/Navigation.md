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

[component/navigation.ts:20](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L20)

## Properties

### container

• **container**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/navigation.ts:14](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L14)

___

### http

• `Optional` **http**: [`Http`](Http.md)

#### Defined in

[component/navigation.ts:12](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L12)

___

### linkKnotKey

• **linkKnotKey**: `string`

#### Defined in

[component/navigation.ts:15](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L15)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/navigation.ts:13](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L13)

## Methods

### \_disabled

▸ `Private` **_disabled**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/navigation.ts:269](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L269)

___

### \_enabled

▸ `Private` **_enabled**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/navigation.ts:290](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L290)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/navigation.ts:38](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L38)

___

### \_setKnot

▸ `Private` **_setKnot**(`id`, `title`, `action`, `opt_href?`, `opt_data?`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `action` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_data` | `Object` | `{}` |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[component/navigation.ts:199](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L199)

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

[component/navigation.ts:30](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L30)

___

### add

▸ **add**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/navigation.ts:47](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L47)

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

[component/navigation.ts:80](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L80)

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

[component/navigation.ts:105](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L105)

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

[component/navigation.ts:134](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L134)

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

[component/navigation.ts:181](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L181)

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

[component/navigation.ts:247](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L247)

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

[component/navigation.ts:238](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L238)

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

[component/navigation.ts:344](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L344)

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

[component/navigation.ts:306](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L306)

___

### setAllInactive

▸ **setAllInactive**(): `void`

#### Returns

`void`

#### Defined in

[component/navigation.ts:322](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L322)

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

[component/navigation.ts:258](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L258)

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

[component/navigation.ts:279](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L279)

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

[component/navigation.ts:332](https://github.com/siposdani87/sui-js/blob/4b75724/src/component/navigation.ts#L332)
