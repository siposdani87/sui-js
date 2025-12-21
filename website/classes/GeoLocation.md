# Class: GeoLocation

Defined in: [module/geoLocation.ts:4](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L4)

## Constructors

### Constructor

> **new GeoLocation**(): `GeoLocation`

Defined in: [module/geoLocation.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L12)

#### Returns

`GeoLocation`

## Properties

### options

> **options**: `object`

Defined in: [module/geoLocation.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L5)

#### enableHighAccuracy

> **enableHighAccuracy**: `boolean`

#### maximumAge

> **maximumAge**: `number`

#### timeout

> **timeout**: `number`

***

### watcherId

> **watcherId**: `number`

Defined in: [module/geoLocation.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L10)

## Methods

### clearWatcher()

> **clearWatcher**(): `void`

Defined in: [module/geoLocation.ts:53](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L53)

#### Returns

`void`

***

### eventChange()

> **eventChange**(`latitude`, `longitude`, `message`): `void`

Defined in: [module/geoLocation.ts:57](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L57)

#### Parameters

##### latitude

`number`

##### longitude

`number`

##### message

`string`

#### Returns

`void`

***

### eventError()

> **eventError**(`message`, `code`): `void`

Defined in: [module/geoLocation.ts:96](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L96)

#### Parameters

##### message

`string`

##### code

`string`

#### Returns

`void`

***

### getPosition()

> **getPosition**(): [`Promize`](Promize.md)\<\[`number`, `number`\], \[`null`, `null`\]\>

Defined in: [module/geoLocation.ts:36](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L36)

#### Returns

[`Promize`](Promize.md)\<\[`number`, `number`\], \[`null`, `null`\]\>

***

### setWatcher()

> **setWatcher**(): `void`

Defined in: [module/geoLocation.ts:24](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/geoLocation.ts#L24)

#### Returns

`void`
