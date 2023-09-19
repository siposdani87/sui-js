---
id: "Cookie"
title: "Class: Cookie"
sidebar_label: "Cookie"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Cookie**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

[module/cookie.ts:14](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L14)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/cookie.ts:10](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L10)

## Methods

### \_getName

▸ `Private` **_getName**(`propertyName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyName` | `string` |

#### Returns

`string`

#### Defined in

[module/cookie.ts:42](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L42)

___

### \_getPropertyName

▸ `Private` **_getPropertyName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[module/cookie.ts:34](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L34)

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

[module/cookie.ts:22](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L22)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/cookie.ts:167](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L167)

___

### get

▸ **get**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[module/cookie.ts:101](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L101)

___

### getKeys

▸ **getKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[module/cookie.ts:152](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L152)

___

### hasKey

▸ **hasKey**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[module/cookie.ts:137](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L137)

___

### remove

▸ **remove**(`name`, `opt_path?`, `opt_domain?`, `opt_secure?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `opt_path` | `string` | `''` |
| `opt_domain` | `string` | `''` |
| `opt_secure` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[module/cookie.ts:122](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L122)

___

### set

▸ **set**(`name`, `value`, `opt_expires?`, `opt_path?`, `opt_domain?`, `opt_secure?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `value` | `string` | `undefined` |
| `opt_expires` | `any` | `''` |
| `opt_path` | `string` | `'/'` |
| `opt_domain` | `string` | `''` |
| `opt_secure` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[module/cookie.ts:56](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/cookie.ts#L56)
