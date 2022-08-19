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
| `opt_selector?` | `string` \| [`Item`](Item.md)<`HTMLElement`\> |

#### Defined in

[component/canvas.ts:16](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L16)

## Properties

### canvasNode

• **canvasNode**: [`Item`](Item.md)<`HTMLCanvasElement`\>

#### Defined in

[component/canvas.ts:10](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L10)

___

### canvasRaw

• **canvasRaw**: `HTMLCanvasElement`

#### Defined in

[component/canvas.ts:11](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L11)

___

### context

• **context**: `CanvasRenderingContext2D`

#### Defined in

[component/canvas.ts:12](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L12)

## Methods

### \_init

▸ `Private` **_init**(`opt_selector?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_selector?` | `string` \| [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/canvas.ts:25](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L25)

___

### \_initEvents

▸ `Private` **_initEvents**(): `void`

#### Returns

`void`

#### Defined in

[component/canvas.ts:41](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L41)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[component/canvas.ts:192](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L192)

___

### drawImage

▸ **drawImage**(`image`, `opt_width?`, `opt_height?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | [`Item`](Item.md)<`HTMLImageElement`\> |
| `opt_width?` | `number` |
| `opt_height?` | `number` |

#### Returns

`void`

#### Defined in

[component/canvas.ts:162](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L162)

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

[component/canvas.ts:93](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L93)

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

[component/canvas.ts:133](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L133)

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

[component/canvas.ts:186](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L186)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[component/canvas.ts:72](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L72)

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

[component/canvas.ts:178](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L178)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[component/canvas.ts:59](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L59)

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

[component/canvas.ts:66](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L66)

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

[component/canvas.ts:80](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L80)

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

[component/canvas.ts:53](https://github.com/siposdani87/sui-js/blob/0385915/src/component/canvas.ts#L53)
