# Class: Screen

Defined in: [module/screen.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L5)

## Constructors

### Constructor

> **new Screen**(`opt_options`): `Screen`

Defined in: [module/screen.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L11)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`Screen`

## Properties

### document

> **document**: `Document`

Defined in: [module/screen.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L8)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/screen.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L6)

***

### orientation

> **orientation**: `string`

Defined in: [module/screen.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L9)

***

### window

> **window**: `Window`

Defined in: [module/screen.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L7)

## Methods

### eventColorSchemeChange()

> **eventColorSchemeChange**(`colorScheme`, `event`): `void`

Defined in: [module/screen.ts:158](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L158)

#### Parameters

##### colorScheme

`string`

##### event

`Event`

#### Returns

`void`

***

### eventOffline()

> **eventOffline**(`event`): `void`

Defined in: [module/screen.ts:73](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L73)

#### Parameters

##### event

`Event`

#### Returns

`void`

***

### eventOnline()

> **eventOnline**(`event`): `void`

Defined in: [module/screen.ts:77](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L77)

#### Parameters

##### event

`Event`

#### Returns

`void`

***

### eventOrientationChange()

> **eventOrientationChange**(`orientation`, `width`, `height`, `event`): `void`

Defined in: [module/screen.ts:85](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L85)

#### Parameters

##### orientation

`string`

##### width

`number`

##### height

`number`

##### event

`Event`

#### Returns

`void`

***

### eventResize()

> **eventResize**(`width`, `height`, `event`): `void`

Defined in: [module/screen.ts:81](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L81)

#### Parameters

##### width

`number`

##### height

`number`

##### event

`Event`

#### Returns

`void`

***

### eventScroll()

> **eventScroll**(`scrollTop`, `event`): `void`

Defined in: [module/screen.ts:100](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L100)

#### Parameters

##### scrollTop

`number`

##### event

`Event`

#### Returns

`void`

***

### getHeight()

> **getHeight**(): `number`

Defined in: [module/screen.ts:134](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L134)

#### Returns

`number`

***

### getOrientation()

> **getOrientation**(): `string`

Defined in: [module/screen.ts:138](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L138)

#### Returns

`string`

***

### getScrollTop()

> **getScrollTop**(): `number`

Defined in: [module/screen.ts:123](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L123)

#### Returns

`number`

***

### getWidth()

> **getWidth**(): `number`

Defined in: [module/screen.ts:130](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L130)

#### Returns

`number`

***

### isColorScheme()

> **isColorScheme**(`type`): `boolean`

Defined in: [module/screen.ts:162](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/screen.ts#L162)

#### Parameters

##### type

`string`

#### Returns

`boolean`
