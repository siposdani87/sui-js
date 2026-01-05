---
id: "DateTime"
title: "Class: DateTime"
sidebar_label: "DateTime"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new DateTime**(`knot`, `options`): [`DateTime`](DateTime.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `options` | `object` |

#### Returns

[`DateTime`](DateTime.md)

#### Defined in

[component/dateTime.ts:25](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L25)

## Properties

### calendarKnot

• **calendarKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:21](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L21)

___

### clockKnot

• **clockKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:22](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L22)

___

### config

• **config**: `DateTimeConfig`

#### Defined in

[component/dateTime.ts:20](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L20)

___

### datetimeKnot

• **datetimeKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/dateTime.ts:15](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L15)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[component/dateTime.ts:16](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L16)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `DateTimeConfig`

#### Defined in

[component/dateTime.ts:17](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L17)

___

### value

• **value**: `Date`

#### Defined in

[component/dateTime.ts:23](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L23)

## Methods

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/dateTime.ts:128](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L128)

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

[component/dateTime.ts:184](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L184)

___

### getConfig

▸ **getConfig**(): `DateTimeConfig`

#### Returns

`DateTimeConfig`

#### Defined in

[component/dateTime.ts:109](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L109)

___

### getFormattedValue

▸ **getFormattedValue**(): `string`

#### Returns

`string`

#### Defined in

[component/dateTime.ts:124](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L124)

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

[component/dateTime.ts:118](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/dateTime.ts#L118)
