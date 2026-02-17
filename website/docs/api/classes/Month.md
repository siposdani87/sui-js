# Class: Month

Defined in: [component/month.ts:15](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L15)

## Description

Represents a single month cell in the [Calendar](Calendar.md)'s month-selection mode, with CSS classes for current and now states.

## Example

```ts
const month = new Month(new Date(), selectedDate, {});
const knot = month.getKnot();
```

## See

 - [Calendar](Calendar.md)
 - [DateIO](../variables/DateIO.md)

## Constructors

### Constructor

> **new Month**(`date`, `currentDate`, `options`): `Month`

Defined in: [component/month.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L29)

#### Parameters

##### date

`Date`

The date representing this month.

##### currentDate

`Date`

The currently selected date, used for highlight comparison.

##### options

`object`

Configuration options including optional `css_class`.

#### Returns

`Month`

#### Description

Creates a new Month instance.

#### Example

```ts
const month = new Month(new Date(2024, 5, 1), selectedDate, {});
```

## Properties

### cssClasses

> **cssClasses**: `string`[]

Defined in: [component/month.ts:19](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L19)

***

### currentDate

> **currentDate**: `Date`

Defined in: [component/month.ts:17](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L17)

***

### date

> **date**: `Date`

Defined in: [component/month.ts:16](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L16)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/month.ts:18](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L18)

## Methods

### eventClick()

> **eventClick**(`date`): `void`

Defined in: [component/month.ts:85](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L85)

#### Parameters

##### date

`Date`

The date of the clicked month.

#### Returns

`void`

#### Description

Overridable callback fired when this month cell is clicked. Defaults to a debug log.

#### Example

```ts
month.eventClick = (date) => { console.log('Clicked:', date); };
```

***

### getKnot()

> **getKnot**(): [`Knot`](Knot.md)

Defined in: [component/month.ts:68](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/month.ts#L68)

#### Returns

[`Knot`](Knot.md)

The month cell DOM element wrapper.

#### Description

Creates and returns a styled [Knot](Knot.md) element representing this month cell with a click handler.

#### Example

```ts
const monthKnot = month.getKnot();
container.appendChild(monthKnot);
```
