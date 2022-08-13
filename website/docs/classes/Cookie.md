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

[module/cookie.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-14)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/cookie.ts:10](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-10)

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

[module/cookie.ts:43](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-43)

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

[module/cookie.ts:35](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-35)

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

[module/cookie.ts:22](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-22)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/cookie.ts:168](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-168)

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

[module/cookie.ts:102](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-102)

___

### getKeys

▸ **getKeys**(): `any`[]

#### Returns

`any`[]

#### Defined in

[module/cookie.ts:153](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-153)

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

[module/cookie.ts:138](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-138)

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

[module/cookie.ts:123](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-123)

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

[module/cookie.ts:57](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/cookie.ts#lines-57)
