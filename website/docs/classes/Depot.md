---
id: "Depot"
title: "Class: Depot"
sidebar_label: "Depot"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Depot**(`type`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"LOCAL"`` \| ``"SESSION"`` |
| `opt_options` | `Object` |

#### Defined in

[module/depot.ts:16](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L16)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/depot.ts:10](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L10)

___

### storage

• **storage**: `Storage`

#### Defined in

[module/depot.ts:11](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L11)

___

### type

• **type**: ``"LOCAL"`` \| ``"SESSION"``

#### Defined in

[module/depot.ts:9](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L9)

## Methods

### \_checkExpires

▸ `Private` **_checkExpires**(): `void`

#### Returns

`void`

#### Defined in

[module/depot.ts:119](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L119)

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

[module/depot.ts:158](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L158)

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

[module/depot.ts:144](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L144)

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

[module/depot.ts:64](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L64)

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

[module/depot.ts:56](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L56)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/depot.ts:43](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L43)

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

[module/depot.ts:134](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L134)

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

[module/depot.ts:30](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L30)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/depot.ts:112](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L112)

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

[module/depot.ts:89](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L89)

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

[module/depot.ts:105](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L105)

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

[module/depot.ts:75](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/depot.ts#L75)
