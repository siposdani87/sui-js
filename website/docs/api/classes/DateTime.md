# Class: DateTime

Defined in: [component/dateTime.ts:30](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L30)

## Description

Combined date and time picker that composes a [Calendar](Calendar.md) and [Clock](Clock.md) based on the input type.

## Example

```ts
const knot = new Knot('div');
const dt = new DateTime(knot, { type: 'datetime-local', value: '2024-01-15T10:30:00' });
dt.eventClick = (formattedValue) => { console.log(formattedValue); };
dt.draw();
```

## See

 - [Calendar](Calendar.md)
 - [Clock](Clock.md)
 - [DateIO](../variables/DateIO.md)

## Constructors

### Constructor

> **new DateTime**(`knot`, `options`): `DateTime`

Defined in: [component/dateTime.ts:48](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L48)

#### Parameters

##### knot

[`Knot`](Knot.md)

The container DOM element wrapper.

##### options

`object`

Configuration options including `type` and `value`.

#### Returns

`DateTime`

#### Description

Creates a new DateTime instance.

#### Example

```ts
const dt = new DateTime(new Knot('div'), { type: 'date', value: '2024-01-15' });
```

## Properties

### calendarKnot

> **calendarKnot**: [`Knot`](Knot.md)

Defined in: [component/dateTime.ts:37](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L37)

***

### clockKnot

> **clockKnot**: [`Knot`](Knot.md)

Defined in: [component/dateTime.ts:38](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L38)

***

### config

> **config**: `DateTimeConfig`

Defined in: [component/dateTime.ts:36](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L36)

***

### datetimeKnot

> **datetimeKnot**: [`Knot`](Knot.md)

Defined in: [component/dateTime.ts:31](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L31)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/dateTime.ts:32](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L32)

***

### types

> **types**: `object`

Defined in: [component/dateTime.ts:33](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L33)

#### Index Signature

\[`key`: `string`\]: `DateTimeConfig`

***

### value

> **value**: `Date`

Defined in: [component/dateTime.ts:39](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L39)

## Methods

### draw()

> **draw**(): `void`

Defined in: [component/dateTime.ts:201](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L201)

#### Returns

`void`

#### Description

Renders both the calendar and clock components based on the active configuration.

#### Example

```ts
dt.draw();
```

***

### eventClick()

> **eventClick**(`value`): `void`

Defined in: [component/dateTime.ts:272](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L272)

#### Parameters

##### value

`string`

The formatted date/time string.

#### Returns

`void`

#### Description

Overridable callback fired when the date/time value changes. Defaults to a debug log.

#### Example

```ts
dt.eventClick = (value) => { console.log('Changed:', value); };
```

***

### getConfig()

> **getConfig**(): `DateTimeConfig`

Defined in: [component/dateTime.ts:161](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L161)

#### Returns

`DateTimeConfig`

The format configuration.

#### Description

Returns the active DateTimeConfig for the current input type.

#### Example

```ts
const config = dt.getConfig();
console.log(config.format); // 'YYYY-MM-DD'
```

***

### getFormattedValue()

> **getFormattedValue**(): `string`

Defined in: [component/dateTime.ts:192](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L192)

#### Returns

`string`

The formatted date/time string.

#### Description

Returns the current value formatted according to the active config's format string.

#### Example

```ts
const formatted = dt.getFormattedValue(); // '2024-01-15'
```

***

### setValue()

> **setValue**(`value`): `void`

Defined in: [component/dateTime.ts:180](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/dateTime.ts#L180)

#### Parameters

##### value

`string`

The date/time string to set.

#### Returns

`void`

#### Description

Sets a new value, rebuilds the DOM structure, and redraws both calendar and clock.

#### Example

```ts
dt.setValue('2024-06-20T14:30:00');
```
