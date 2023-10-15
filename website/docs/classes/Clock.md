---
id: "Clock"
title: "Class: Clock"
sidebar_label: "Clock"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Clock**(`knot`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `options` | `Object` |

#### Defined in

[component/clock.ts:23](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L23)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/clock.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L12)

___

### clockKnot

• **clockKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:8](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L8)

___

### contentKnot

• **contentKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L19)

___

### headerKnot

• **headerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L13)

___

### hours

• **hours**: `number`

#### Defined in

[component/clock.ts:20](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L20)

___

### hoursHeaderKnot

• **hoursHeaderKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:18](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L18)

___

### minutes

• **minutes**: `number`

#### Defined in

[component/clock.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L21)

___

### minutesHeaderKnot

• **minutesHeaderKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:17](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L17)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/clock.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L10)

___

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[component/clock.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L9)

___

### period

• **period**: `string`

#### Defined in

[component/clock.ts:15](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L15)

___

### periodHeaderKnot

• **periodHeaderKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L14)

___

### time

• **time**: `Date`

#### Defined in

[component/clock.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L16)

___

### types

• **types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hour` | `string` |
| `minute` | `string` |

#### Defined in

[component/clock.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L11)

## Methods

### \_changeMode

▸ `Private` **_changeMode**(`direction`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `number` |

#### Returns

`void`

#### Defined in

[component/clock.ts:198](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L198)

___

### \_drawHours

▸ `Private` **_drawHours**(`timeKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/clock.ts:229](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L229)

___

### \_drawMinutes

▸ `Private` **_drawMinutes**(`timeKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/clock.ts:216](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L216)

___

### \_getMode

▸ `Private` **_getMode**(`direction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `number` |

#### Returns

`string`

#### Defined in

[component/clock.ts:189](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L189)

___

### \_getTimeKnot

▸ `Private` **_getTimeKnot**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:136](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L136)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:33](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L33)

___

### \_initContentKnot

▸ `Private` **_initContentKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:130](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L130)

___

### \_initHeaderKnot

▸ `Private` **_initHeaderKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:69](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L69)

___

### \_initHoursHeaderKnot

▸ `Private` **_initHoursHeaderKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:108](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L108)

___

### \_initMinutesHeaderKnot

▸ `Private` **_initMinutesHeaderKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:99](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L99)

___

### \_initMode

▸ `Private` **_initMode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `string` |

#### Returns

`void`

#### Defined in

[component/clock.ts:184](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L184)

___

### \_initPeriodHeaderKnot

▸ `Private` **_initPeriodHeaderKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:80](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L80)

___

### \_initSeparatorHeaderKnot

▸ `Private` **_initSeparatorHeaderKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:123](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L123)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:61](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L61)

___

### \_onClick

▸ `Private` **_onClick**(`selectedTime`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectedTime` | `Date` |

#### Returns

`void`

#### Defined in

[component/clock.ts:243](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L243)

___

### \_setHours

▸ `Private` **_setHours**(`hours`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hours` | `number` |

#### Returns

`void`

#### Defined in

[component/clock.ts:144](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L144)

___

### \_setMinutes

▸ `Private` **_setMinutes**(`minutes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `minutes` | `number` |

#### Returns

`void`

#### Defined in

[component/clock.ts:153](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L153)

___

### \_setMode

▸ `Private` **_setMode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `string` |

#### Returns

`void`

#### Defined in

[component/clock.ts:117](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L117)

___

### \_setOptions

▸ `Private` **_setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

#### Returns

`void`

#### Defined in

[component/clock.ts:29](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L29)

___

### \_setPeriod

▸ `Private` **_setPeriod**(`period`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `period` | `string` |

#### Returns

`void`

#### Defined in

[component/clock.ts:163](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L163)

___

### \_switchMode

▸ `Private` **_switchMode**(`hourCallback`, `minuteCallback`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hourCallback` | `Function` |
| `minuteCallback` | `Function` |

#### Returns

`Date`

#### Defined in

[component/clock.ts:43](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L43)

___

### \_togglePeriod

▸ `Private` **_togglePeriod**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:90](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L90)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:203](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L203)

___

### eventClick

▸ **eventClick**(`time`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `Date` |

#### Returns

`void`

#### Defined in

[component/clock.ts:249](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L249)

___

### setTime

▸ **setTime**(`time`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `Date` |

#### Returns

`void`

#### Defined in

[component/clock.ts:171](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/clock.ts#L171)
