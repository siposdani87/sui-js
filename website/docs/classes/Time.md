---
id: "Time"
title: "Class: Time"
sidebar_label: "Time"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Time**(`knot`, `options`): [`Time`](Time.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `options` | `Object` |

#### Returns

[`Time`](Time.md)

#### Defined in

[component/time.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L10)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/time.ts:7](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L7)

___

### pointerKnot

• **pointerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/time.ts:8](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L8)

___

### timeKnot

• **timeKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/time.ts:6](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L6)

## Methods

### \_drawCircles

▸ **_drawCircles**(`start`, `n`, `opt_j?`, `opt_isClockWise?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `number` | `undefined` |
| `n` | `number` | `undefined` |
| `opt_j` | `number` | `1` |
| `opt_isClockWise` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[component/time.ts:66](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L66)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/time.ts:20](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L20)

___

### \_initCircleKnot

▸ **_initCircleKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/time.ts:25](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L25)

___

### \_initPointerKnot

▸ **_initPointerKnot**(): `void`

#### Returns

`void`

#### Defined in

[component/time.ts:47](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L47)

___

### \_initSize

▸ **_initSize**(`width`, `height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Defined in

[component/time.ts:36](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L36)

___

### \_setCircleEvent

▸ **_setCircleEvent**(`circle`, `i`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `circle` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `i` | `number` |

#### Returns

`void`

#### Defined in

[component/time.ts:91](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L91)

___

### \_setCircleStyle

▸ **_setCircleStyle**(`circle`, `start`, `n`, `i`, `opt_j?`, `opt_isClockWise?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `circle` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `start` | `number` | `undefined` |
| `n` | `number` | `undefined` |
| `i` | `number` | `undefined` |
| `opt_j` | `number` | `1` |
| `opt_isClockWise` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[component/time.ts:99](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L99)

___

### \_setOptions

▸ **_setOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

#### Returns

`void`

#### Defined in

[component/time.ts:16](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L16)

___

### draw

▸ **draw**(`start`, `n`, `opt_j?`, `opt_isClockWise?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `number` | `undefined` |
| `n` | `number` | `undefined` |
| `opt_j` | `number` | `1` |
| `opt_isClockWise` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[component/time.ts:57](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L57)

___

### eventClick

▸ **eventClick**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[component/time.ts:137](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/time.ts#L137)
