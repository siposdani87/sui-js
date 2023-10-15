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

[module/cookie.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L9)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[module/cookie.ts:7](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L7)

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

[module/cookie.ts:25](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L25)

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

[module/cookie.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L21)

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

[module/cookie.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L13)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/cookie.ts:126](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L126)

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

[module/cookie.ts:73](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L73)

___

### getKeys

▸ **getKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[module/cookie.ts:113](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L113)

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

[module/cookie.ts:100](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L100)

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

[module/cookie.ts:88](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L88)

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

[module/cookie.ts:31](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/cookie.ts#L31)
