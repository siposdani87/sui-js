---
id: "DateTime"
title: "Class: DateTime"
sidebar_label: "DateTime"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new DateTime**(`knot`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `options` | `Object` |

#### Defined in

[component/dateTime.ts:34](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L34)

## Properties

### calendarKnot

• **calendarKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:27](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L27)

___

### clockKnot

• **clockKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:28](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L28)

___

### config

• **config**: `DateTimeConfig`

#### Defined in

[component/dateTime.ts:26](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L26)

___

### datetimeKnot

• **datetimeKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:21](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L21)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/dateTime.ts:22](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L22)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `DateTimeConfig`

#### Defined in

[component/dateTime.ts:23](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L23)

___

### value

• **value**: `Date`

#### Defined in

[component/dateTime.ts:29](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L29)

## Methods

### \_drawCalendar

▸ `Private` **_drawCalendar**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:180](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L180)

___

### \_drawClock

▸ `Private` **_drawClock**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:208](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L208)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:51](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L51)

___

### \_initCalendarKnot

▸ `Private` **_initCalendarKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:121](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L121)

___

### \_initClockKnot

▸ `Private` **_initClockKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:132](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L132)

___

### \_initDateTimeKnot

▸ `Private` **_initDateTimeKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:113](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L113)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:104](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L104)

___

### \_initVariables

▸ `Private` **_initVariables**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:60](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L60)

___

### \_onClick

▸ `Private` **_onClick**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:232](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L232)

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

[component/dateTime.ts:44](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L44)

___

### \_setValue

▸ `Private` **_setValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[component/dateTime.ts:150](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L150)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:172](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L172)

___

### eventClick

▸ **eventClick**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[component/dateTime.ts:240](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L240)

___

### getConfig

▸ **getConfig**(): `DateTimeConfig`

#### Returns

`DateTimeConfig`

#### Defined in

[component/dateTime.ts:142](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L142)

___

### getFormattedValue

▸ **getFormattedValue**(): `string`

#### Returns

`string`

#### Defined in

[component/dateTime.ts:166](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L166)

___

### setValue

▸ **setValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[component/dateTime.ts:158](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/dateTime.ts#L158)
