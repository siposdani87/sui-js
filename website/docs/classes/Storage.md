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

[module/storage.ts:16](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L16)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/storage.ts:10](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L10)

___

### storage

• **storage**: `Storage`

#### Defined in

[module/storage.ts:11](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L11)

___

### type

• **type**: ``"LOCAL"`` \| ``"SESSION"``

#### Defined in

[module/storage.ts:9](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L9)

## Methods

### \_checkExpires

▸ `Private` **_checkExpires**(): `void`

#### Returns

`void`

#### Defined in

[module/storage.ts:120](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L120)

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

[module/storage.ts:159](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L159)

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

[module/storage.ts:145](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L145)

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

[module/storage.ts:65](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L65)

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

[module/storage.ts:57](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L57)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/storage.ts:44](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L44)

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

[module/storage.ts:135](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L135)

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

[module/storage.ts:30](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L30)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/storage.ts:113](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L113)

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

[module/storage.ts:90](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L90)

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

[module/storage.ts:106](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L106)

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

[module/storage.ts:76](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/storage.ts#L76)
