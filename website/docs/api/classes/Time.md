# Class: Time

Defined in: [component/time.ts:15](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/time.ts#L15)

## Description

Circular time selector that renders numbered circles arranged in a ring for hour or minute selection.

## Example

```ts
const timeKnot = new Knot('div');
const time = new Time(timeKnot, { selected: 5 });
time.eventClick = (index) => { console.log(index); };
time.draw(1, 12, 1, true);
```

## See

[Clock](Clock.md)

## Constructors

### Constructor

> **new Time**(`knot`, `options`): `Time`

Defined in: [component/time.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/time.ts#L27)

#### Parameters

##### knot

[`Knot`](Knot.md)

The container DOM element wrapper.

##### options

`object`

Configuration options including `selected` (index) and optional `captions` array.

#### Returns

`Time`

#### Description

Creates a new Time instance.

#### Example

```ts
const time = new Time(new Knot('div'), { selected: 10, captions: ['00', '05'] });
```

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/time.ts:17](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/time.ts#L17)

***

### pointerKnot

> **pointerKnot**: [`Knot`](Knot.md)

Defined in: [component/time.ts:18](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/time.ts#L18)

***

### timeKnot

> **timeKnot**: [`Knot`](Knot.md)

Defined in: [component/time.ts:16](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/time.ts#L16)

## Methods

### draw()

> **draw**(`start`, `n`, `opt_j?`, `opt_isClockWise?`): `void`

Defined in: [component/time.ts:102](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/time.ts#L102)

#### Parameters

##### start

`number`

The starting index value.

##### n

`number`

The ending index value (inclusive).

##### opt\_j?

`number` = `1`

The step interval for displaying captions.

##### opt\_isClockWise?

`boolean` = `true`

Whether circles are arranged clockwise.

#### Returns

`void`

#### Description

Renders numbered circles arranged in a ring from start to n.

#### Example

```ts
time.draw(1, 12, 1, true);   // Hours: 1-12
time.draw(0, 59, 5, true);   // Minutes: 0-59 with labels every 5
```

***

### eventClick()

> **eventClick**(`index`): `void`

Defined in: [component/time.ts:209](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/time.ts#L209)

#### Parameters

##### index

`number`

The index value of the clicked circle.

#### Returns

`void`

#### Description

Overridable callback fired when a circle is clicked. Defaults to a debug log.

#### Example

```ts
time.eventClick = (index) => { console.log('Selected:', index); };
```
