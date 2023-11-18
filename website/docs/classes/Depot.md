---
id: "Depot"
title: "Class: Depot"
sidebar_label: "Depot"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Depot**(`type`, `opt_options?`): [`Depot`](Depot.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"LOCAL"`` \| ``"SESSION"`` |
| `opt_options` | `Object` |

#### Returns

[`Depot`](Depot.md)

#### Defined in

[module/depot.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L10)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[module/depot.ts:7](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L7)

___

### storage

• **storage**: `Storage`

#### Defined in

[module/depot.ts:8](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L8)

___

### type

• **type**: ``"LOCAL"`` \| ``"SESSION"``

#### Defined in

[module/depot.ts:6](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L6)

## Methods

### \_checkExpires

▸ **_checkExpires**(): `void`

#### Returns

`void`

#### Defined in

[module/depot.ts:82](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L82)

___

### \_getExpires

▸ **_getExpires**(`opt_expires?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_expires?` | `string` \| `number` \| `boolean` \| `Date` |

#### Returns

`string`

#### Defined in

[module/depot.ts:109](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L109)

___

### \_getExpiresDate

▸ **_getExpiresDate**(`name`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Date`

#### Defined in

[module/depot.ts:99](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L99)

___

### \_getName

▸ **_getName**(`propertyName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyName` | `string` |

#### Returns

`string`

#### Defined in

[module/depot.ts:43](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L43)

___

### \_getPropertyName

▸ **_getPropertyName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[module/depot.ts:39](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L39)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/depot.ts:30](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L30)

___

### \_isExpired

▸ **_isExpired**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[module/depot.ts:93](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L93)

___

### \_setOptions

▸ **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[module/depot.ts:20](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L20)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/depot.ts:78](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L78)

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

[module/depot.ts:60](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L60)

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

[module/depot.ts:73](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L73)

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

[module/depot.ts:49](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/depot.ts#L49)
