# Class: Year

Defined in: [component/year.ts:15](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L15)

## Description

Represents a single year cell in the [Calendar](Calendar.md)'s year-selection mode, with CSS classes for current and now states.

## Example

```ts
const year = new Year(new Date(), selectedDate, {});
const knot = year.getKnot();
```

## See

 - [Calendar](Calendar.md)
 - [DateIO](../variables/DateIO.md)

## Constructors

### Constructor

> **new Year**(`date`, `currentDate`, `options`): `Year`

Defined in: [component/year.ts:29](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L29)

#### Parameters

##### date

`Date`

The date representing this year.

##### currentDate

`Date`

The currently selected date, used for highlight comparison.

##### options

`object`

Configuration options including optional `css_class`.

#### Returns

`Year`

#### Description

Creates a new Year instance.

#### Example

```ts
const year = new Year(new Date(2024, 0, 1), selectedDate, {});
```

## Properties

### cssClasses

> **cssClasses**: `string`[]

Defined in: [component/year.ts:19](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L19)

***

### currentDate

> **currentDate**: `Date`

Defined in: [component/year.ts:17](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L17)

***

### date

> **date**: `Date`

Defined in: [component/year.ts:16](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L16)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/year.ts:18](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L18)

## Methods

### eventClick()

> **eventClick**(`date`): `void`

Defined in: [component/year.ts:86](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L86)

#### Parameters

##### date

`Date`

The date of the clicked year.

#### Returns

`void`

#### Description

Overridable callback fired when this year cell is clicked. Defaults to a debug log.

#### Example

```ts
year.eventClick = (date) => { console.log('Clicked:', date); };
```

***

### getKnot()

> **getKnot**(): [`Knot`](Knot.md)

Defined in: [component/year.ts:68](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/year.ts#L68)

#### Returns

[`Knot`](Knot.md)

The year cell DOM element wrapper.

#### Description

Creates and returns a styled [Knot](Knot.md) element representing this year cell with a click handler.

#### Example

```ts
const yearKnot = year.getKnot();
container.appendChild(yearKnot);
```
