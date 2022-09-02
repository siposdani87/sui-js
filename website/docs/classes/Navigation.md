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

[component/navigation.ts:20](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L20)

## Properties

### container

• **container**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/navigation.ts:14](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L14)

___

### http

• `Optional` **http**: [`Http`](Http.md)

#### Defined in

[component/navigation.ts:12](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L12)

___

### linkNodeKey

• **linkNodeKey**: `string`

#### Defined in

[component/navigation.ts:15](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L15)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/navigation.ts:13](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L13)

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

[component/navigation.ts:270](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L270)

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

[component/navigation.ts:291](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L291)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/navigation.ts:39](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L39)

___

### \_setItem

▸ `Private` **_setItem**(`id`, `title`, `action`, `opt_href?`, `opt_data?`): [`Objekt`](Objekt.md)

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

[component/navigation.ts:200](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L200)

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

[component/navigation.ts:30](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L30)

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

[component/navigation.ts:48](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L48)

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

[component/navigation.ts:81](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L81)

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

[component/navigation.ts:106](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L106)

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

[component/navigation.ts:135](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L135)

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

[component/navigation.ts:182](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L182)

___

### bindToContainer

▸ **bindToContainer**(`containerNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerNode` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/navigation.ts:248](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L248)

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

[component/navigation.ts:239](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L239)

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

[component/navigation.ts:345](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L345)

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

[component/navigation.ts:307](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L307)

___

### setAllInactive

▸ **setAllInactive**(): `void`

#### Returns

`void`

#### Defined in

[component/navigation.ts:323](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L323)

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

[component/navigation.ts:259](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L259)

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

[component/navigation.ts:280](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L280)

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

[component/navigation.ts:333](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/navigation.ts#L333)
