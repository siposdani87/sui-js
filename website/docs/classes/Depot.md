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
| `opt_options` | `object` |

#### Returns

[`Depot`](Depot.md)

#### Defined in

[module/depot.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L10)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[module/depot.ts:7](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L7)

___

### storage

• **storage**: `Storage`

#### Defined in

[module/depot.ts:8](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L8)

___

### type

• **type**: ``"LOCAL"`` \| ``"SESSION"``

#### Defined in

[module/depot.ts:6](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L6)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[module/depot.ts:78](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L78)

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

[module/depot.ts:60](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L60)

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

[module/depot.ts:73](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L73)

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

[module/depot.ts:49](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/depot.ts#L49)
