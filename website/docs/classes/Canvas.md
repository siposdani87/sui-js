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

[component/canvas.ts:16](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-16)

## Properties

### canvasNode

• **canvasNode**: [`Item`](Item.md)<`HTMLCanvasElement`\>

#### Defined in

[component/canvas.ts:10](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-10)

___

### canvasRaw

• **canvasRaw**: `HTMLCanvasElement`

#### Defined in

[component/canvas.ts:11](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-11)

___

### context

• **context**: `CanvasRenderingContext2D`

#### Defined in

[component/canvas.ts:12](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-12)

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

[component/canvas.ts:25](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-25)

___

### \_initEvents

▸ `Private` **_initEvents**(): `void`

#### Returns

`void`

#### Defined in

[component/canvas.ts:41](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-41)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[component/canvas.ts:192](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-192)

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

[component/canvas.ts:162](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-162)

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

[component/canvas.ts:93](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-93)

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

[component/canvas.ts:133](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-133)

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

[component/canvas.ts:186](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-186)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[component/canvas.ts:72](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-72)

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

[component/canvas.ts:178](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-178)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[component/canvas.ts:59](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-59)

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

[component/canvas.ts:66](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-66)

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

[component/canvas.ts:80](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-80)

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

[component/canvas.ts:53](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/canvas.ts#lines-53)
