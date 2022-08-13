---
id: "Storage"
title: "Class: Storage"
sidebar_label: "Storage"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Storage**(`type`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"LOCAL"`` \| ``"SESSION"`` |
| `opt_options` | `Object` |

#### Defined in

[module/storage.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-16)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/storage.ts:10](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-10)

___

### storage

• **storage**: `Storage`

#### Defined in

[module/storage.ts:11](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-11)

___

### type

• **type**: ``"LOCAL"`` \| ``"SESSION"``

#### Defined in

[module/storage.ts:9](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-9)

## Methods

### \_checkExpires

▸ `Private` **_checkExpires**(): `void`

#### Returns

`void`

#### Defined in

[module/storage.ts:120](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-120)

___

### \_getExpires

▸ `Private` **_getExpires**(`opt_expires?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_expires?` | `string` \| `number` \| `boolean` \| `Date` |

#### Returns

`string`

#### Defined in

[module/storage.ts:159](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-159)

___

### \_getExpiresDate

▸ `Private` **_getExpiresDate**(`name`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Date`

#### Defined in

[module/storage.ts:145](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-145)

___

### \_getName

▸ `Private` **_getName**(`propertyName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyName` | `string` |

#### Returns

`string`

#### Defined in

[module/storage.ts:65](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-65)

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

[module/storage.ts:57](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-57)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/storage.ts:44](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-44)

___

### \_isExpired

▸ `Private` **_isExpired**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[module/storage.ts:135](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-135)

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

[module/storage.ts:30](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-30)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/storage.ts:113](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-113)

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

[module/storage.ts:90](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-90)

___

### remove

▸ **remove**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[module/storage.ts:106](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-106)

___

### set

▸ **set**(`name`, `value`, `opt_expires?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |
| `opt_expires?` | `string` \| `number` \| `boolean` \| `Date` |

#### Returns

`void`

#### Defined in

[module/storage.ts:76](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/storage.ts#lines-76)
