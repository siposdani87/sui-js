---
id: "Calendar"
title: "Class: Calendar"
sidebar_label: "Calendar"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Calendar**(`node`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |
| `options` | `Object` |

#### Defined in

[component/calendar.ts:43](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-43)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/calendar.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-19)

___

### calendarNode

• **calendarNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-13)

___

### contentNode

• **contentNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:29](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-29)

___

### current

• **current**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `day` | `Date` |

#### Defined in

[component/calendar.ts:35](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-35)

___

### currentModeNode

• **currentModeNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:28](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-28)

___

### days

• **days**: [`Day`](Day.md)[]

#### Defined in

[component/calendar.ts:37](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-37)

___

### daysNode

• **daysNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:33](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-33)

___

### headerNode

• **headerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:27](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-27)

___

### maxDays

• **maxDays**: `number`

#### Defined in

[component/calendar.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-15)

___

### maxMonths

• **maxMonths**: `number`

#### Defined in

[component/calendar.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-16)

___

### maxYears

• **maxYears**: `number`

#### Defined in

[component/calendar.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-17)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/calendar.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-18)

___

### monthsNode

• **monthsNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:31](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-31)

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

[component/calendar.ts:36](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-36)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/calendar.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-14)

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

[component/calendar.ts:34](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-34)

___

### selectedDate

• **selectedDate**: `Date`

#### Defined in

[component/calendar.ts:38](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-38)

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

[component/calendar.ts:20](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-20)

___

### weekDaysNode

• **weekDaysNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:32](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-32)

___

### yearsNode

• **yearsNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:30](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-30)

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

[component/calendar.ts:150](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-150)

___

### \_drawDays

▸ `Private` **_drawDays**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:421](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-421)

___

### \_drawDaysStructure

▸ `Private` **_drawDaysStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:332](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-332)

___

### \_drawHeader

▸ `Private` **_drawHeader**(`format`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `string` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:358](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-358)

___

### \_drawMonths

▸ `Private` **_drawMonths**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:367](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-367)

___

### \_drawMonthsStructure

▸ `Private` **_drawMonthsStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:341](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-341)

___

### \_drawWeekDays

▸ `Private` **_drawWeekDays**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:404](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-404)

___

### \_drawYears

▸ `Private` **_drawYears**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:384](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-384)

___

### \_drawYearsStructure

▸ `Private` **_drawYearsStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:349](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-349)

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

[component/calendar.ts:159](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-159)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:60](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-60)

___

### \_initContentNode

▸ `Private` **_initContentNode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:140](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-140)

___

### \_initDaysMode

▸ `Private` **_initDaysMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:231](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-231)

___

### \_initHeaderNode

▸ `Private` **_initHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:93](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-93)

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

[component/calendar.ts:200](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-200)

___

### \_initMonthsMode

▸ `Private` **_initMonthsMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:222](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-222)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:80](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-80)

___

### \_initYearsMode

▸ `Private` **_initYearsMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:213](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-213)

___

### \_next

▸ `Private` **_next**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:267](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-267)

___

### \_onClick

▸ `Private` **_onClick**(`selectedDate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectedDate` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:502](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-502)

___

### \_previous

▸ `Private` **_previous**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:244](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-244)

___

### \_setCurrentMonth

▸ `Private` **_setCurrentMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:449](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-449)

___

### \_setDate

▸ `Private` **_setDate**(`date`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:287](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-287)

___

### \_setModeDate

▸ `Private` **_setModeDate**(`selectedDate`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectedDate` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:480](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-480)

___

### \_setNextMonth

▸ `Private` **_setNextMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:464](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-464)

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

[component/calendar.ts:53](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-53)

___

### \_setPreviousMonth

▸ `Private` **_setPreviousMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:433](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-433)

___

### \_setSelectedDate

▸ `Private` **_setSelectedDate**(`date`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:517](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-517)

___

### \_setVariables

▸ `Private` **_setVariables**(`date`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`void`

#### Defined in

[component/calendar.ts:299](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-299)

___

### \_switchMode

▸ `Private` **_switchMode**(`dayFun`, `monthFun`, `yearFun`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dayFun` | `Function` |
| `monthFun` | `Function` |
| `yearFun` | `Function` |

#### Returns

`Date`

#### Defined in

[component/calendar.ts:174](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-174)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:321](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-321)

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

[component/calendar.ts:524](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/calendar.ts#lines-524)
