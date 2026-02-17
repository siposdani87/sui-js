# Class: Clock

Defined in: [component/clock.ts:18](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L18)

## Description

Time picker clock with hour and minute selection modes and AM/PM toggle.

## Example

```ts
const clockKnot = new Knot('div');
const clock = new Clock(clockKnot, { time: new Date(), type: 'hour' });
clock.eventClick = (time) => { console.log(time); };
clock.draw();
```

## See

 - [Time](Time.md)
 - [DateIO](../variables/DateIO.md)

## Constructors

### Constructor

> **new Clock**(`knot`, `options`): `Clock`

Defined in: [component/clock.ts:41](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L41)

#### Parameters

##### knot

[`Knot`](Knot.md)

The container DOM element wrapper.

##### options

`object`

Configuration options including `time` (Date) and `type` ('hour' or 'minute').

#### Returns

`Clock`

#### Description

Creates a new Clock instance.

#### Example

```ts
const clock = new Clock(new Knot('div'), { time: new Date(), type: 'hour' });
```

## Properties

### activeMode

> **activeMode**: `string`

Defined in: [component/clock.ts:23](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L23)

***

### clockKnot

> **clockKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:19](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L19)

***

### contentKnot

> **contentKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:30](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L30)

***

### headerKnot

> **headerKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L24)

***

### hours

> **hours**: `number`

Defined in: [component/clock.ts:31](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L31)

***

### hoursHeaderKnot

> **hoursHeaderKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:29](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L29)

***

### minutes

> **minutes**: `number`

Defined in: [component/clock.ts:32](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L32)

***

### minutesHeaderKnot

> **minutesHeaderKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L28)

***

### modes

> **modes**: `string`[]

Defined in: [component/clock.ts:21](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L21)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/clock.ts:20](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L20)

***

### period

> **period**: `string`

Defined in: [component/clock.ts:26](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L26)

***

### periodHeaderKnot

> **periodHeaderKnot**: [`Knot`](Knot.md)

Defined in: [component/clock.ts:25](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L25)

***

### time

> **time**: `Date`

Defined in: [component/clock.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L27)

***

### types

> **types**: `object`

Defined in: [component/clock.ts:22](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L22)

#### hour

> **hour**: `string`

#### minute

> **minute**: `string`

## Methods

### draw()

> **draw**(): `void`

Defined in: [component/clock.ts:302](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L302)

#### Returns

`void`

#### Description

Renders the clock face for the current active mode (hours or minutes).

#### Example

```ts
clock.draw();
```

***

### eventClick()

> **eventClick**(`time`): `void`

Defined in: [component/clock.ts:366](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L366)

#### Parameters

##### time

`Date`

The selected time.

#### Returns

`void`

#### Description

Overridable callback fired when a time is selected. Defaults to a debug log.

#### Example

```ts
clock.eventClick = (time) => { console.log('Selected:', time); };
```

***

### setTime()

> **setTime**(`time`): `void`

Defined in: [component/clock.ts:252](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/clock.ts#L252)

#### Parameters

##### time

`Date`

The time to display on the clock.

#### Returns

`void`

#### Description

Sets the clock to the given time and updates the hours, minutes, and period displays.

#### Example

```ts
clock.setTime(new Date());
```
