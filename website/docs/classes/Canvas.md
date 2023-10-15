---
id: "Canvas"
title: "Class: Canvas"
sidebar_label: "Canvas"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Canvas**(`opt_selector?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_selector?` | `string` \| [`Knot`](Knot.md)<`HTMLElement`\> |

#### Defined in

[component/canvas.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L11)

## Properties

### canvasKnot

• **canvasKnot**: [`Knot`](Knot.md)<`HTMLCanvasElement`\>

#### Defined in

[component/canvas.ts:7](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L7)

___

### canvasRaw

• **canvasRaw**: `HTMLCanvasElement`

#### Defined in

[component/canvas.ts:8](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L8)

___

### context

• **context**: `CanvasRenderingContext2D`

#### Defined in

[component/canvas.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L9)

## Methods

### \_init

▸ `Private` **_init**(`opt_selector?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_selector?` | `string` \| [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/canvas.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L16)

___

### \_initEvents

▸ `Private` **_initEvents**(): `void`

#### Returns

`void`

#### Defined in

[component/canvas.ts:29](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L29)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[component/canvas.ts:136](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L136)

___

### drawImage

▸ **drawImage**(`imageKnot`, `opt_width?`, `opt_height?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `imageKnot` | [`Knot`](Knot.md)<`HTMLImageElement`\> |
| `opt_width?` | `number` |
| `opt_height?` | `number` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:116](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L116)

___

### drawPolygon

▸ **drawPolygon**(`x`, `y`, `radius`, `sides`, `rotateAngle`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `radius` | `number` |
| `sides` | `number` |
| `rotateAngle` | `number` |
| `options` | `Object` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:59](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L59)

___

### drawRectangle

▸ **drawRectangle**(`x`, `y`, `width`, `height`, `rotateAngle`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |
| `rotateAngle` | `number` |
| `options` | `Object` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:91](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L91)

___

### eventMouseMove

▸ **eventMouseMove**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:132](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L132)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[component/canvas.ts:50](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L50)

___

### getImageDataXY

▸ **getImageDataXY**(`x`, `y`): `Uint8ClampedArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`Uint8ClampedArray`

#### Defined in

[component/canvas.ts:128](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L128)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[component/canvas.ts:42](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L42)

___

### setHeight

▸ **setHeight**(`height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:46](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L46)

___

### setSize

▸ **setSize**(`width`, `height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:54](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L54)

___

### setWidth

▸ **setWidth**(`width`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:38](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/canvas.ts#L38)
