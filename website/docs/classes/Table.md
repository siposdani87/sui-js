---
id: "Table"
title: "Class: Table<T>"
sidebar_label: "Table"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Objekt`](Objekt.md) = [`Objekt`](Objekt.md) |

## Constructors

### constructor

• **new Table**\<`T`\>(`dom`, `opt_selector?`, `opt_options?`): [`Table`](Table.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Objekt`](Objekt.md)\<`object`\> = [`Objekt`](Objekt.md)\<`object`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'table'` |
| `opt_options` | `object` | `{}` |

#### Returns

[`Table`](Table.md)\<`T`\>

#### Defined in

[component/table.ts:45](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L45)

## Properties

### actions

• **actions**: [`Action`](../#action)[]

#### Defined in

[component/table.ts:37](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L37)

___

### collection

• **collection**: [`Collection`](Collection.md)\<`T`\>

#### Defined in

[component/table.ts:35](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L35)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/table.ts:38](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L38)

___

### headerKnots

• **headerKnots**: [`Query`](Query.md)\<`HTMLElement`\>

#### Defined in

[component/table.ts:39](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L39)

___

### headerTexts

• **headerTexts**: `string`[]

#### Defined in

[component/table.ts:40](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L40)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[component/table.ts:34](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L34)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/table.ts:43](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L43)

___

### query

• **query**: `string`

#### Defined in

[component/table.ts:36](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L36)

___

### tableKnot

• **tableKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/table.ts:33](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L33)

___

### tbody

• **tbody**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/table.ts:41](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L41)

___

### tfoot

• **tfoot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/table.ts:42](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L42)

## Methods

### eventAction

▸ **eventAction**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`Objekt`](Objekt.md)\<`object`\> |

#### Returns

`void`

#### Defined in

[component/table.ts:253](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L253)

___

### refresh

▸ **refresh**(`opt_page?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_page` | `number` | `-1` |

#### Returns

`void`

#### Defined in

[component/table.ts:239](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L239)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/table.ts:522](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L522)

___

### setActions

▸ **setActions**(`actions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`Action`](../#action)[] |

#### Returns

`void`

#### Defined in

[component/table.ts:370](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L370)

___

### setCount

▸ **setCount**(`count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`void`

#### Defined in

[component/table.ts:497](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L497)

___

### setData

▸ **setData**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |

#### Returns

`void`

#### Defined in

[component/table.ts:487](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/table.ts#L487)
