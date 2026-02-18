# Class: Calendar

Defined in: [component/calendar.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L22)

## Description

Date picker calendar with day, month, and year selection modes, navigation, and date selection.

## Example

```ts
const calendarKnot = new Knot('div');
const calendar = new Calendar(calendarKnot, { date: new Date(), type: 'date' });
calendar.eventClick = (date) => { console.log(date); };
calendar.draw();
```

## See

 - [Day](Day.md)
 - [Month](Month.md)
 - [Year](Year.md)
 - [DateIO](../variables/DateIO.md)

## Constructors

### Constructor

> **new Calendar**(`knot`, `options`): `Calendar`

Defined in: [component/calendar.ts:57](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L57)

#### Parameters

##### knot

[`Knot`](Knot.md)

The container DOM element wrapper.

##### options

`object`

Configuration options including `date` and `type` ('date', 'month', 'year', 'week', 'range').

#### Returns

`Calendar`

#### Description

Creates a new Calendar instance.

#### Example

```ts
const calendar = new Calendar(new Knot('div'), { date: new Date(), type: 'date' });
```

## Properties

### activeMode

> **activeMode**: `string`

Defined in: [component/calendar.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L29)

***

### calendarKnot

> **calendarKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L23)

***

### contentKnot

> **contentKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L39)

***

### current

> **current**: `object`

Defined in: [component/calendar.ts:45](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L45)

#### day

> **day**: `Date`

***

### currentModeKnot

> **currentModeKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:38](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L38)

***

### days

> **days**: [`Day`](Day.md)[]

Defined in: [component/calendar.ts:47](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L47)

***

### daysKnot

> **daysKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:43](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L43)

***

### headerKnot

> **headerKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:37](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L37)

***

### maxDays

> **maxDays**: `number`

Defined in: [component/calendar.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L25)

***

### maxMonths

> **maxMonths**: `number`

Defined in: [component/calendar.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L26)

***

### maxYears

> **maxYears**: `number`

Defined in: [component/calendar.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L27)

***

### modes

> **modes**: `string`[]

Defined in: [component/calendar.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L28)

***

### monthsKnot

> **monthsKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L41)

***

### next

> **next**: `object`

Defined in: [component/calendar.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L46)

#### day

> **day**: `Date`

#### month

> **month**: `Date`

#### year

> **year**: `Date`

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/calendar.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L24)

***

### previous

> **previous**: `object`

Defined in: [component/calendar.ts:44](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L44)

#### day

> **day**: `Date`

#### month

> **month**: `Date`

#### year

> **year**: `Date`

***

### selectedDate

> **selectedDate**: `Date`

Defined in: [component/calendar.ts:48](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L48)

***

### types

> **types**: `object`

Defined in: [component/calendar.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L30)

#### date

> **date**: `string`

#### month

> **month**: `string`

#### range

> **range**: `string`

#### week

> **week**: `string`

#### year

> **year**: `string`

***

### weekDaysKnot

> **weekDaysKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L42)

***

### yearsKnot

> **yearsKnot**: [`Knot`](Knot.md)

Defined in: [component/calendar.ts:40](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L40)

## Methods

### draw()

> **draw**(): `void`

Defined in: [component/calendar.ts:340](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L340)

#### Returns

`void`

#### Description

Renders the calendar content for the current active mode.

#### Example

```ts
calendar.draw();
```

***

### eventClick()

> **eventClick**(`date`): `void`

Defined in: [component/calendar.ts:546](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/calendar.ts#L546)

#### Parameters

##### date

`Date`

The selected date.

#### Returns

`void`

#### Description

Overridable callback fired when a date is selected. Defaults to a debug log.

#### Example

```ts
calendar.eventClick = (date) => { console.log('Selected:', date); };
```
