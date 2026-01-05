# Class: Canvas

Defined in: [component/canvas.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L6)

## Constructors

### Constructor

> **new Canvas**(`opt_selector?`): `Canvas`

Defined in: [component/canvas.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L11)

#### Parameters

##### opt\_selector?

`string` | [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

`Canvas`

## Properties

### canvasElement

> **canvasElement**: `HTMLCanvasElement`

Defined in: [component/canvas.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L8)

***

### canvasKnot

> **canvasKnot**: [`Knot`](Knot.md)\<`HTMLCanvasElement`\>

Defined in: [component/canvas.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L7)

***

### context

> **context**: `CanvasRenderingContext2D`

Defined in: [component/canvas.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L9)

## Methods

### clear()

> **clear**(): `void`

Defined in: [component/canvas.ts:136](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L136)

#### Returns

`void`

***

### drawImage()

> **drawImage**(`imageKnot`, `opt_width?`, `opt_height?`): `void`

Defined in: [component/canvas.ts:116](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L116)

#### Parameters

##### imageKnot

[`Knot`](Knot.md)\<`HTMLImageElement`\>

##### opt\_width?

`number`

##### opt\_height?

`number`

#### Returns

`void`

***

### drawPolygon()

> **drawPolygon**(`x`, `y`, `radius`, `sides`, `rotateAngle`, `options`): `void`

Defined in: [component/canvas.ts:59](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L59)

#### Parameters

##### x

`number`

##### y

`number`

##### radius

`number`

##### sides

`number`

##### rotateAngle

`number`

##### options

`object`

#### Returns

`void`

***

### drawRectangle()

> **drawRectangle**(`x`, `y`, `width`, `height`, `rotateAngle`, `options`): `void`

Defined in: [component/canvas.ts:91](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L91)

#### Parameters

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

##### rotateAngle

`number`

##### options

`object`

#### Returns

`void`

***

### eventMouseMove()

> **eventMouseMove**(`x`, `y`): `void`

Defined in: [component/canvas.ts:132](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L132)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`void`

***

### getHeight()

> **getHeight**(): `number`

Defined in: [component/canvas.ts:50](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L50)

#### Returns

`number`

***

### getImageDataXY()

> **getImageDataXY**(`x`, `y`): `Uint8ClampedArray`

Defined in: [component/canvas.ts:128](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L128)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`Uint8ClampedArray`

***

### getWidth()

> **getWidth**(): `number`

Defined in: [component/canvas.ts:42](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L42)

#### Returns

`number`

***

### setHeight()

> **setHeight**(`height`): `void`

Defined in: [component/canvas.ts:46](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L46)

#### Parameters

##### height

`number`

#### Returns

`void`

***

### setSize()

> **setSize**(`width`, `height`): `void`

Defined in: [component/canvas.ts:54](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L54)

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`

***

### setWidth()

> **setWidth**(`width`): `void`

Defined in: [component/canvas.ts:38](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/canvas.ts#L38)

#### Parameters

##### width

`number`

#### Returns

`void`
