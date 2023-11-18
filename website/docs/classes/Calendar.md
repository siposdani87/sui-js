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
| `options` | `Object` |

#### Returns

[`Calendar`](Calendar.md)

#### Defined in

[component/calendar.ts:37](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L37)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/calendar.ts:16](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L16)

___

### calendarKnot

• **calendarKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L10)

___

### contentKnot

• **contentKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:26](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L26)

___

### current

• **current**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `day` | `Date` |

#### Defined in

[component/calendar.ts:32](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L32)

___

### currentModeKnot

• **currentModeKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:25](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L25)

___

### days

• **days**: [`Day`](Day.md)[]

#### Defined in

[component/calendar.ts:34](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L34)

___

### daysKnot

• **daysKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:30](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L30)

___

### headerKnot

• **headerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:24](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L24)

___

### maxDays

• **maxDays**: `number`

#### Defined in

[component/calendar.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L12)

___

### maxMonths

• **maxMonths**: `number`

#### Defined in

[component/calendar.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L13)

___

### maxYears

• **maxYears**: `number`

#### Defined in

[component/calendar.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L14)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/calendar.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L15)

___

### monthsKnot

• **monthsKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:28](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L28)

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

[component/calendar.ts:33](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L33)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/calendar.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L11)

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

[component/calendar.ts:31](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L31)

___

### selectedDate

• **selectedDate**: `Date`

#### Defined in

[component/calendar.ts:35](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L35)

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

[component/calendar.ts:17](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L17)

___

### weekDaysKnot

• **weekDaysKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:29](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L29)

___

### yearsKnot

• **yearsKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/calendar.ts:27](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L27)

## Methods

### \_changeMode

▸ **_changeMode**(`direction`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `number` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:124](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L124)

___

### \_drawDays

▸ **_drawDays**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:331](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L331)

___

### \_drawDaysStructure

▸ **_drawDaysStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:264](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L264)

___

### \_drawHeader

▸ **_drawHeader**(`format`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:280](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L280)

___

### \_drawMonths

▸ **_drawMonths**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:286](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L286)

___

### \_drawMonthsStructure

▸ **_drawMonthsStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:270](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L270)

___

### \_drawWeekDays

▸ **_drawWeekDays**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:317](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L317)

___

### \_drawYears

▸ **_drawYears**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:300](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L300)

___

### \_drawYearsStructure

▸ **_drawYearsStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:275](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L275)

___

### \_getMode

▸ **_getMode**(`direction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `number` |

#### Returns

`string`

#### Defined in

[component/calendar.ts:129](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L129)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:47](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L47)

___

### \_initContentKnot

▸ **_initContentKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:118](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L118)

___

### \_initDaysMode

▸ **_initDaysMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:182](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L182)

___

### \_initHeaderKnot

▸ **_initHeaderKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:74](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L74)

___

### \_initMode

▸ **_initMode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `string` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:160](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L160)

___

### \_initMonthsMode

▸ **_initMonthsMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:176](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L176)

___

### \_initStructure

▸ **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:64](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L64)

___

### \_initYearsMode

▸ **_initYearsMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:170](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L170)

___

### \_next

▸ **_next**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:212](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L212)

___

### \_onClick

▸ **_onClick**(`selectedDate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectedDate` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:395](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L395)

___

### \_previous

▸ **_previous**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:192](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L192)

___

### \_setCurrentMonth

▸ **_setCurrentMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:353](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L353)

___

### \_setDate

▸ **_setDate**(`date`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:228](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L228)

___

### \_setModeDate

▸ **_setModeDate**(`selectedDate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectedDate` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:377](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L377)

___

### \_setNextMonth

▸ **_setNextMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:365](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L365)

___

### \_setOptions

▸ **_setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:43](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L43)

___

### \_setPreviousMonth

▸ **_setPreviousMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:340](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L340)

___

### \_setSelectedDate

▸ **_setSelectedDate**(`date`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:406](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L406)

___

### \_setVariables

▸ **_setVariables**(`date`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:236](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L236)

___

### \_switchMode

▸ **_switchMode**(`dayFun`, `monthFun`, `yearFun`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dayFun` | `Function` |
| `monthFun` | `Function` |
| `yearFun` | `Function` |

#### Returns

`Date`

#### Defined in

[component/calendar.ts:138](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L138)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:256](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L256)

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

[component/calendar.ts:410](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/calendar.ts#L410)
