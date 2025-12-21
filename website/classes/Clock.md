# Class: Clock

Defined in: [component/clock.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L7)

## Constructors

### Constructor

> **new Clock**(`knot`, `options`): `Clock`

Defined in: [component/clock.ts:23](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L23)

#### Parameters

##### knot

[`Knot`](Knot.md)

##### options

`object`

#### Returns

`Clock`

## Properties

### activeMode

> **activeMode**: `string`

Defined in: [component/clock.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L12)

***

### clockKnot

> **clockKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L8)

***

### contentKnot

> **contentKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L19)

***

### headerKnot

> **headerKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L13)

***

### hours

> **hours**: `number`

Defined in: [component/clock.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L20)

***

### hoursHeaderKnot

> **hoursHeaderKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L18)

***

### minutes

> **minutes**: `number`

Defined in: [component/clock.ts:21](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L21)

***

### minutesHeaderKnot

> **minutesHeaderKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L17)

***

### modes

> **modes**: `string`[]

Defined in: [component/clock.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L10)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/clock.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L9)

***

### period

> **period**: `string`

Defined in: [component/clock.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L15)

***

### periodHeaderKnot

> **periodHeaderKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L14)

***

### time

> **time**: `Date`

Defined in: [component/clock.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L16)

***

### types

> **types**: `object`

Defined in: [component/clock.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L11)

#### hour

> **hour**: `string`

#### minute

> **minute**: `string`

## Methods

### draw()

> **draw**(): `void`

Defined in: [component/clock.ts:203](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L203)

#### Returns

`void`

***

### eventClick()

> **eventClick**(`time`): `void`

Defined in: [component/clock.ts:249](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L249)

#### Parameters

##### time

`Date`

#### Returns

`void`

***

### setTime()

> **setTime**(`time`): `void`

Defined in: [component/clock.ts:171](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/clock.ts#L171)

#### Parameters

##### time

`Date`

#### Returns

`void`
