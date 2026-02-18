# Class: Day

Defined in: [component/day.ts:15](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L15)

## Description

Represents a single day cell in the [Calendar](Calendar.md) grid, with CSS classes for current, now, and month context.

## Example

```ts
const day = new Day(new Date(), selectedDate, { css_class: 'current-month' });
const knot = day.getKnot();
```

## See

 - [Calendar](Calendar.md)
 - [DateIO](../variables/DateIO.md)

## Constructors

### Constructor

> **new Day**(`date`, `currentDate`, `options`): `Day`

Defined in: [component/day.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L29)

#### Parameters

##### date

`Date`

The date this cell represents.

##### currentDate

`Date`

The currently selected date, used for highlight comparison.

##### options

`object`

Configuration options including `css_class`.

#### Returns

`Day`

#### Description

Creates a new Day instance.

#### Example

```ts
const day = new Day(new Date(2024, 0, 15), selectedDate, { css_class: 'current-month' });
```

## Properties

### cssClasses

> **cssClasses**: `string`[]

Defined in: [component/day.ts:19](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L19)

***

### currentDate

> **currentDate**: `Date`

Defined in: [component/day.ts:17](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L17)

***

### date

> **date**: `Date`

Defined in: [component/day.ts:16](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L16)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/day.ts:18](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L18)

## Methods

### eventClick()

> **eventClick**(`date`): `void`

Defined in: [component/day.ts:86](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L86)

#### Parameters

##### date

`Date`

The date of the clicked day.

#### Returns

`void`

#### Description

Overridable callback fired when this day cell is clicked. Defaults to a debug log.

#### Example

```ts
day.eventClick = (date) => { console.log('Clicked:', date); };
```

***

### getKnot()

> **getKnot**(): [`Knot`](Knot.md)

Defined in: [component/day.ts:68](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/day.ts#L68)

#### Returns

[`Knot`](Knot.md)

The day cell DOM element wrapper.

#### Description

Creates and returns a styled [Knot](Knot.md) element representing this day cell with a click handler.

#### Example

```ts
const dayKnot = day.getKnot();
container.appendChild(dayKnot);
```
