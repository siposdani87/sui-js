---
id: "Clock"
title: "Class: Clock"
sidebar_label: "Clock"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Clock**(`knot`, `options`): [`Clock`](Clock.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `options` | `object` |

#### Returns

[`Clock`](Clock.md)

#### Defined in

[component/clock.ts:23](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L23)

## Properties

### activeMode

• **activeMode**: `string`

#### Defined in

[component/clock.ts:12](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L12)

___

### clockKnot

• **clockKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/clock.ts:8](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L8)

___

### contentKnot

• **contentKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/clock.ts:19](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L19)

___

### headerKnot

• **headerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/clock.ts:13](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L13)

___

### hours

• **hours**: `number`

#### Defined in

[component/clock.ts:20](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L20)

___

### hoursHeaderKnot

• **hoursHeaderKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/clock.ts:18](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L18)

___

### minutes

• **minutes**: `number`

#### Defined in

[component/clock.ts:21](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L21)

___

### minutesHeaderKnot

• **minutesHeaderKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/clock.ts:17](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L17)

___

### modes

• **modes**: `string`[]

#### Defined in

[component/clock.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L10)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[component/clock.ts:9](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L9)

___

### period

• **period**: `string`

#### Defined in

[component/clock.ts:15](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L15)

___

### periodHeaderKnot

• **periodHeaderKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/clock.ts:14](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L14)

___

### time

• **time**: `Date`

#### Defined in

[component/clock.ts:16](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L16)

___

### types

• **types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hour` | `string` |
| `minute` | `string` |

#### Defined in

[component/clock.ts:11](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L11)

## Methods

### draw

▸ **draw**(): `void`

#### Returns

`void`

#### Defined in

[component/clock.ts:203](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L203)

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

[component/clock.ts:249](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L249)

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

[component/clock.ts:171](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/clock.ts#L171)
