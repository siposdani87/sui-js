---
id: "GeoLocation"
title: "Class: GeoLocation"
sidebar_label: "GeoLocation"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GeoLocation**()

#### Defined in

[module/geoLocation.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-17)

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

[module/geoLocation.ts:9](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-9)

___

### watcherId

• **watcherId**: `number`

#### Defined in

[module/geoLocation.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-14)

## Methods

### \_handleError

▸ `Private` **_handleError**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `GeolocationPositionError` |

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:97](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-97)

___

### \_handlePosition

▸ `Private` **_handlePosition**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `GeolocationPosition` |

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:84](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-84)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:24](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-24)

___

### clearWatcher

▸ **clearWatcher**(): `void`

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:67](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-67)

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

[module/geoLocation.ts:76](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-76)

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

[module/geoLocation.ts:127](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-127)

___

### getPosition

▸ **getPosition**(): [`Promize`](Promize.md)

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/geoLocation.ts:48](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-48)

___

### setWatcher

▸ **setWatcher**(): `void`

#### Returns

`void`

#### Defined in

[module/geoLocation.ts:34](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/geoLocation.ts#lines-34)
