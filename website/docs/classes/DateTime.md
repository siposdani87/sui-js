---
id: "DateTime"
title: "Class: DateTime"
sidebar_label: "DateTime"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new DateTime**(`node`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |
| `options` | `Object` |

#### Defined in

[component/dateTime.ts:34](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-34)

## Properties

### calendarNode

• **calendarNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:27](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-27)

___

### clockNode

• **clockNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:28](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-28)

___

### config

• **config**: `DateTimeConfig`

#### Defined in

[component/dateTime.ts:26](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-26)

___

### datetimeNode

• **datetimeNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-21)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/dateTime.ts:22](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-22)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `DateTimeConfig`

#### Defined in

[component/dateTime.ts:23](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-23)

___

### value

• **value**: `Date`

#### Defined in

[component/dateTime.ts:29](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-29)

## Methods

### \_drawCalendar

▸ `Private` **_drawCalendar**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:180](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-180)

___

### \_drawClock

▸ `Private` **_drawClock**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:208](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-208)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:51](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-51)

___

### \_initCalendarNode

▸ `Private` **_initCalendarNode**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:121](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-121)

___

### \_initClockNode

▸ `Private` **_initClockNode**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:132](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-132)

___

### \_initDateTimeNode

▸ `Private` **_initDateTimeNode**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:113](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-113)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:104](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-104)

___

### \_initVariables

▸ `Private` **_initVariables**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:60](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-60)

___

### \_onClick

▸ `Private` **_onClick**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:232](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-232)

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

[component/dateTime.ts:44](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-44)

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

[component/dateTime.ts:150](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-150)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:172](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-172)

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

[component/dateTime.ts:240](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-240)

___

### getConfig

▸ **getConfig**(): `DateTimeConfig`

#### Returns

`DateTimeConfig`

#### Defined in

[component/dateTime.ts:142](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-142)

___

### getFormattedValue

▸ **getFormattedValue**(): `string`

#### Returns

`string`

#### Defined in

[component/dateTime.ts:166](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-166)

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

[component/dateTime.ts:158](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/dateTime.ts#lines-158)
