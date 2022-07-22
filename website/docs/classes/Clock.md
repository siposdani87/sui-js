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

[component/clock.ts:29](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-29)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/clock.ts:15](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-15)

___

### clockNode

• **clockNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:11](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-11)

___

### contentNode

• **contentNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:22](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-22)

___

### headerNode

• **headerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:16](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-16)

___

### hours

• **hours**: `number`

#### Defined in

[component/clock.ts:23](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-23)

___

### hoursHeaderNode

• **hoursHeaderNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:21](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-21)

___

### minutes

• **minutes**: `number`

#### Defined in

[component/clock.ts:24](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-24)

___

### minutesHeaderNode

• **minutesHeaderNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:20](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-20)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/clock.ts:13](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-13)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/clock.ts:12](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-12)

___

### period

• **period**: `string`

#### Defined in

[component/clock.ts:18](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-18)

___

### periodHeaderNode

• **periodHeaderNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:17](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-17)

___

### time

• **time**: `Date`

#### Defined in

[component/clock.ts:19](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-19)

___

### types

• **types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hour` | `string` |
| `minute` | `string` |

#### Defined in

[component/clock.ts:14](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-14)

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

[component/clock.ts:274](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-274)

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

[component/clock.ts:315](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-315)

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

[component/clock.ts:298](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-298)

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

[component/clock.ts:261](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-261)

___

### \_getTimeNode

▸ `Private` **_getTimeNode**(): [`Item`](Item.md)<`HTMLElement`\>

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/clock.ts:185](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-185)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:46](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-46)

___

### \_initContentNode

▸ `Private` **_initContentNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:176](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-176)

___

### \_initHeaderNode

▸ `Private` **_initHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:93](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-93)

___

### \_initHoursHeaderNode

▸ `Private` **_initHoursHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:144](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-144)

___

### \_initMinutesHeaderNode

▸ `Private` **_initMinutesHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:132](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-132)

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

[component/clock.ts:252](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-252)

___

### \_initPeriodHeaderNode

▸ `Private` **_initPeriodHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:107](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-107)

___

### \_initSeparatorHeaderNode

▸ `Private` **_initSeparatorHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:166](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-166)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:82](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-82)

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

[component/clock.ts:333](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-333)

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

[component/clock.ts:197](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-197)

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

[component/clock.ts:210](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-210)

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

[component/clock.ts:157](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-157)

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

[component/clock.ts:39](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-39)

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

[component/clock.ts:224](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-224)

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

[component/clock.ts:61](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-61)

___

### \_togglePeriod

▸ `Private` **_togglePeriod**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:120](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-120)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:281](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-281)

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

[component/clock.ts:342](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-342)

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

[component/clock.ts:235](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/clock.ts#lines-235)
