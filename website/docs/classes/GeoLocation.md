---
id: "GeoLocation"
title: "Class: GeoLocation"
sidebar_label: "GeoLocation"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GeoLocation**(): [`GeoLocation`](GeoLocation.md)

#### Returns

[`GeoLocation`](GeoLocation.md)

#### Defined in

[module/geoLocation.ts:12](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L12)

## Properties

### options

• **options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enableHighAccuracy` | `boolean` |
| `maximumAge` | `number` |
| `timeout` | `number` |

#### Defined in

[module/geoLocation.ts:5](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L5)

___

### watcherId

• **watcherId**: `number`

#### Defined in

[module/geoLocation.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L10)

## Methods

### clearWatcher

▸ **clearWatcher**(): `void`

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:53](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L53)

___

### eventChange

▸ **eventChange**(`latitude`, `longitude`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `latitude` | `number` |
| `longitude` | `number` |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:57](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L57)

___

### eventError

▸ **eventError**(`message`, `code`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `code` | `string` |

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:96](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L96)

___

### getPosition

▸ **getPosition**(): [`Promize`](Promize.md)\<[`number`, `number`], [``null``, ``null``]\>

#### Returns

[`Promize`](Promize.md)\<[`number`, `number`], [``null``, ``null``]\>

#### Defined in

[module/geoLocation.ts:36](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L36)

___

### setWatcher

▸ **setWatcher**(): `void`

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:24](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/geoLocation.ts#L24)
