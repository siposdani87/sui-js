---
id: "Tooltip"
title: "Class: Tooltip"
sidebar_label: "Tooltip"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Tooltip**(`element`, `opt_position?`): [`Tooltip`](Tooltip.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `element` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_position` | `string` | `'TOP'` |

#### Returns

[`Tooltip`](Tooltip.md)

#### Defined in

[component/tooltip.ts:13](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L13)

## Properties

### element

• **element**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/tooltip.ts:8](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L8)

___

### positionCssClass

• **positionCssClass**: `string`

#### Defined in

[component/tooltip.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L10)

___

### tooltip

• **tooltip**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/tooltip.ts:11](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L11)

___

### valid

• **valid**: `boolean`

#### Defined in

[component/tooltip.ts:9](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L9)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:103](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L103)

___

### isOpen

▸ **isOpen**(): `boolean`

#### Returns

`boolean`

#### Defined in

[component/tooltip.ts:107](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L107)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:99](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L99)

___

### render

▸ **render**(`opt_message?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_message?` | `string` |

#### Returns

`void`

#### Defined in

[component/tooltip.ts:73](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L73)

___

### setMessage

▸ **setMessage**(`opt_message?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_message` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/tooltip.ts:87](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L87)

___

### toggle

▸ **toggle**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:111](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/tooltip.ts#L111)
