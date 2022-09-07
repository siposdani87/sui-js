---
id: "Clock"
title: "Class: Clock"
sidebar_label: "Clock"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Clock**(`node`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |
| `options` | `Object` |

#### Defined in

[component/clock.ts:29](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L29)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/clock.ts:15](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L15)

___

### clockNode

• **clockNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:11](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L11)

___

### contentNode

• **contentNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:22](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L22)

___

### headerNode

• **headerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:16](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L16)

___

### hours

• **hours**: `number`

#### Defined in

[component/clock.ts:23](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L23)

___

### hoursHeaderNode

• **hoursHeaderNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:21](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L21)

___

### minutes

• **minutes**: `number`

#### Defined in

[component/clock.ts:24](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L24)

___

### minutesHeaderNode

• **minutesHeaderNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:20](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L20)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/clock.ts:13](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L13)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/clock.ts:12](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L12)

___

### period

• **period**: `string`

#### Defined in

[component/clock.ts:18](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L18)

___

### periodHeaderNode

• **periodHeaderNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:17](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L17)

___

### time

• **time**: `Date`

#### Defined in

[component/clock.ts:19](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L19)

___

### types

• **types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hour` | `string` |
| `minute` | `string` |

#### Defined in

[component/clock.ts:14](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L14)

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

[component/clock.ts:274](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L274)

___

### \_drawHours

▸ `Private` **_drawHours**(`timeNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeNode` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/clock.ts:315](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L315)

___

### \_drawMinutes

▸ `Private` **_drawMinutes**(`timeNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeNode` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/clock.ts:298](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L298)

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

[component/clock.ts:261](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L261)

___

### \_getTimeNode

▸ `Private` **_getTimeNode**(): [`Item`](Item.md)<`HTMLElement`\>

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:185](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L185)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:46](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L46)

___

### \_initContentNode

▸ `Private` **_initContentNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:176](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L176)

___

### \_initHeaderNode

▸ `Private` **_initHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:93](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L93)

___

### \_initHoursHeaderNode

▸ `Private` **_initHoursHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:144](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L144)

___

### \_initMinutesHeaderNode

▸ `Private` **_initMinutesHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:132](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L132)

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

[component/clock.ts:252](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L252)

___

### \_initPeriodHeaderNode

▸ `Private` **_initPeriodHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:107](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L107)

___

### \_initSeparatorHeaderNode

▸ `Private` **_initSeparatorHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:166](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L166)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:82](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L82)

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

[component/clock.ts:333](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L333)

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

[component/clock.ts:197](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L197)

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

[component/clock.ts:210](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L210)

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

[component/clock.ts:157](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L157)

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

[component/clock.ts:39](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L39)

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

[component/clock.ts:224](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L224)

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

[component/clock.ts:61](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L61)

___

### \_togglePeriod

▸ `Private` **_togglePeriod**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:120](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L120)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:281](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L281)

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

[component/clock.ts:342](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L342)

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

[component/clock.ts:235](https://github.com/siposdani87/sui-js/blob/035cd52/src/component/clock.ts#L235)
