---
id: "Time"
title: "Class: Time"
sidebar_label: "Time"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Time**(`node`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |
| `options` | `Object` |

#### Defined in

[component/time.ts:16](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L16)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/time.ts:10](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L10)

___

### pointerNode

• **pointerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/time.ts:11](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L11)

___

### timeNode

• **timeNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/time.ts:9](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L9)

## Methods

### \_drawCircles

▸ `Private` **_drawCircles**(`start`, `n`, `opt_j?`, `opt_isClockWise?`): `void`

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

[component/time.ts:103](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L103)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/time.ts:33](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L33)

___

### \_initCircleNode

▸ `Private` **_initCircleNode**(): `void`

#### Returns

`void`

#### Defined in

[component/time.ts:41](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L41)

___

### \_initPointerNode

▸ `Private` **_initPointerNode**(): `void`

#### Returns

`void`

#### Defined in

[component/time.ts:71](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L71)

___

### \_initSize

▸ `Private` **_initSize**(`width`, `height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Defined in

[component/time.ts:57](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L57)

___

### \_setCircleEvent

▸ `Private` **_setCircleEvent**(`circle`, `i`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `circle` | [`Item`](Item.md)<`HTMLElement`\> |
| `i` | `number` |

#### Returns

`void`

#### Defined in

[component/time.ts:133](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L133)

___

### \_setCircleStyle

▸ `Private` **_setCircleStyle**(`circle`, `start`, `n`, `i`, `opt_j?`, `opt_isClockWise?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `circle` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `start` | `number` | `undefined` |
| `n` | `number` | `undefined` |
| `i` | `number` | `undefined` |
| `opt_j` | `number` | `1` |
| `opt_isClockWise` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[component/time.ts:150](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L150)

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

[component/time.ts:26](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L26)

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

[component/time.ts:87](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L87)

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

[component/time.ts:190](https://github.com/siposdani87/sui-js/blob/8315555/src/component/time.ts#L190)
