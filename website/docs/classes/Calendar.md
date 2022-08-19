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

[component/calendar.ts:43](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L43)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/calendar.ts:19](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L19)

___

### calendarNode

• **calendarNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:13](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L13)

___

### contentNode

• **contentNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:29](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L29)

___

### current

• **current**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `day` | `Date` |

#### Defined in

[component/calendar.ts:35](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L35)

___

### currentModeNode

• **currentModeNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:28](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L28)

___

### days

• **days**: [`Day`](Day.md)[]

#### Defined in

[component/calendar.ts:37](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L37)

___

### daysNode

• **daysNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:33](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L33)

___

### headerNode

• **headerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:27](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L27)

___

### maxDays

• **maxDays**: `number`

#### Defined in

[component/calendar.ts:15](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L15)

___

### maxMonths

• **maxMonths**: `number`

#### Defined in

[component/calendar.ts:16](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L16)

___

### maxYears

• **maxYears**: `number`

#### Defined in

[component/calendar.ts:17](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L17)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/calendar.ts:18](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L18)

___

### monthsNode

• **monthsNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:31](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L31)

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

[component/calendar.ts:36](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L36)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/calendar.ts:14](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L14)

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

[component/calendar.ts:34](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L34)

___

### selectedDate

• **selectedDate**: `Date`

#### Defined in

[component/calendar.ts:38](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L38)

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

[component/calendar.ts:20](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L20)

___

### weekDaysNode

• **weekDaysNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:32](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L32)

___

### yearsNode

• **yearsNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/calendar.ts:30](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L30)

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

[component/calendar.ts:150](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L150)

___

### \_drawDays

▸ `Private` **_drawDays**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:421](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L421)

___

### \_drawDaysStructure

▸ `Private` **_drawDaysStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:332](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L332)

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

[component/calendar.ts:358](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L358)

___

### \_drawMonths

▸ `Private` **_drawMonths**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:367](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L367)

___

### \_drawMonthsStructure

▸ `Private` **_drawMonthsStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:341](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L341)

___

### \_drawWeekDays

▸ `Private` **_drawWeekDays**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:404](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L404)

___

### \_drawYears

▸ `Private` **_drawYears**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:384](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L384)

___

### \_drawYearsStructure

▸ `Private` **_drawYearsStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:349](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L349)

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

[component/calendar.ts:159](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L159)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:60](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L60)

___

### \_initContentNode

▸ `Private` **_initContentNode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:140](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L140)

___

### \_initDaysMode

▸ `Private` **_initDaysMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:231](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L231)

___

### \_initHeaderNode

▸ `Private` **_initHeaderNode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:93](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L93)

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

[component/calendar.ts:200](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L200)

___

### \_initMonthsMode

▸ `Private` **_initMonthsMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:222](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L222)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:80](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L80)

___

### \_initYearsMode

▸ `Private` **_initYearsMode**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:213](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L213)

___

### \_next

▸ `Private` **_next**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:267](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L267)

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

[component/calendar.ts:502](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L502)

___

### \_previous

▸ `Private` **_previous**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:244](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L244)

___

### \_setCurrentMonth

▸ `Private` **_setCurrentMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:449](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L449)

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

[component/calendar.ts:287](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L287)

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

[component/calendar.ts:480](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L480)

___

### \_setNextMonth

▸ `Private` **_setNextMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:464](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L464)

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

[component/calendar.ts:53](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L53)

___

### \_setPreviousMonth

▸ `Private` **_setPreviousMonth**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:433](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L433)

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

[component/calendar.ts:517](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L517)

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

[component/calendar.ts:299](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L299)

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

[component/calendar.ts:174](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L174)

___

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/calendar.ts:321](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L321)

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

[component/calendar.ts:524](https://github.com/siposdani87/sui-js/blob/0385915/src/component/calendar.ts#L524)
