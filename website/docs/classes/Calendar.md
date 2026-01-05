---
id: "Calendar"
title: "Class: Calendar"
sidebar_label: "Calendar"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Calendar**(`knot`, `options`): [`Calendar`](Calendar.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `options` | `object` |

#### Returns

[`Calendar`](Calendar.md)

#### Defined in

[component/calendar.ts:37](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L37)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/calendar.ts:16](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L16)

___

### calendarKnot

• **calendarKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L10)

___

### contentKnot

• **contentKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:26](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L26)

___

### current

• **current**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `day` | `Date` |

#### Defined in

[component/calendar.ts:32](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L32)

___

### currentModeKnot

• **currentModeKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:25](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L25)

___

### days

• **days**: [`Day`](Day.md)[]

#### Defined in

[component/calendar.ts:34](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L34)

___

### daysKnot

• **daysKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:30](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L30)

___

### headerKnot

• **headerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:24](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L24)

___

### maxDays

• **maxDays**: `number`

#### Defined in

[component/calendar.ts:12](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L12)

___

### maxMonths

• **maxMonths**: `number`

#### Defined in

[component/calendar.ts:13](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L13)

___

### maxYears

• **maxYears**: `number`

#### Defined in

[component/calendar.ts:14](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L14)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/calendar.ts:15](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L15)

___

### monthsKnot

• **monthsKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:28](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L28)

___

### next

• **next**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `day` | `Date` |
| `month` | `Date` |
| `year` | `Date` |

#### Defined in

[component/calendar.ts:33](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L33)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[component/calendar.ts:11](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L11)

___

### previous

• **previous**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `day` | `Date` |
| `month` | `Date` |
| `year` | `Date` |

#### Defined in

[component/calendar.ts:31](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L31)

___

### selectedDate

• **selectedDate**: `Date`

#### Defined in

[component/calendar.ts:35](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L35)

___

### types

• **types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `date` | `string` |
| `month` | `string` |
| `range` | `string` |
| `week` | `string` |
| `year` | `string` |

#### Defined in

[component/calendar.ts:17](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L17)

___

### weekDaysKnot

• **weekDaysKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:29](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L29)

___

### yearsKnot

• **yearsKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:27](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L27)

## Methods

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:256](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L256)

___

### eventClick

▸ **eventClick**(`date`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:410](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/calendar.ts#L410)
