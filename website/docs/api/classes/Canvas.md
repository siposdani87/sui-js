# Class: Canvas

Defined in: [component/canvas.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L21)

HTML5 Canvas wrapper for 2D drawing operations.

## Description

Wraps an HTML5 canvas element providing methods for drawing polygons,
rectangles, and images, as well as reading pixel data. Accepts a [Knot](Knot.md), a CSS
selector string, or creates a new canvas element when no argument is provided.

## Example

```ts
const canvas = new Canvas('.my-canvas');
canvas.setSize(800, 600);
canvas.drawRectangle(10, 10, 100, 50, 0, { fillStyle: '#FF0000' });
```

## See

[Knot](Knot.md)

## Constructors

### Constructor

> **new Canvas**(`opt_selector?`): `Canvas`

Defined in: [component/canvas.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L30)

#### Parameters

##### opt\_selector?

A [Knot](Knot.md) wrapping a canvas element, a CSS selector
    string, or undefined to create a new canvas element.

`string` | [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

`Canvas`

## Properties

### canvasElement

> **canvasElement**: `HTMLCanvasElement`

Defined in: [component/canvas.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L23)

***

### canvasKnot

> **canvasKnot**: [`Knot`](Knot.md)\<`HTMLCanvasElement`\>

Defined in: [component/canvas.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L22)

***

### context

> **context**: `CanvasRenderingContext2D`

Defined in: [component/canvas.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L24)

## Methods

### clear()

> **clear**(): `void`

Defined in: [component/canvas.ts:269](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L269)

Clears the entire canvas.

#### Returns

`void`

#### Example

```ts
canvas.clear();
```

***

### drawImage()

> **drawImage**(`imageKnot`, `opt_width?`, `opt_height?`): `void`

Defined in: [component/canvas.ts:228](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L228)

Draws an image onto the canvas from an image [Knot](Knot.md).

#### Parameters

##### imageKnot

[`Knot`](Knot.md)\<`HTMLImageElement`\>

A [Knot](Knot.md) wrapping an HTMLImageElement.

##### opt\_width?

`number`

Optional width override (defaults to the element's width attribute).

##### opt\_height?

`number`

Optional height override (defaults to the element's height attribute).

#### Returns

`void`

#### Example

```ts
const img = new Knot('img');
img.setAttribute('src', '/photo.png');
canvas.drawImage(img, 200, 150);
```

***

### drawPolygon()

> **drawPolygon**(`x`, `y`, `radius`, `sides`, `rotateAngle`, `options`): `void`

Defined in: [component/canvas.ts:142](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L142)

Draws a regular polygon on the canvas.

#### Parameters

##### x

`number`

The x-coordinate of the polygon center.

##### y

`number`

The y-coordinate of the polygon center.

##### radius

`number`

The radius from center to each vertex.

##### sides

`number`

The number of sides (must be at least 3).

##### rotateAngle

`number`

Rotation angle in radians.

##### options

`object`

Canvas context properties to apply (e.g. fillStyle, strokeStyle).

#### Returns

`void`

#### Example

```ts
canvas.drawPolygon(100, 100, 50, 6, 0, {
    fillStyle: '#00FF00',
    strokeStyle: '#000000',
});
```

***

### drawRectangle()

> **drawRectangle**(`x`, `y`, `width`, `height`, `rotateAngle`, `options`): `void`

Defined in: [component/canvas.ts:191](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L191)

Draws a rectangle on the canvas with optional rotation.

#### Parameters

##### x

`number`

The x-coordinate of the top-left corner.

##### y

`number`

The y-coordinate of the top-left corner.

##### width

`number`

The rectangle width.

##### height

`number`

The rectangle height.

##### rotateAngle

`number`

Rotation angle in radians.

##### options

`object`

Canvas context properties to apply. Fill is applied if fillStyle is set;
    stroke is applied if strokeStyle is set.

#### Returns

`void`

#### Example

```ts
canvas.drawRectangle(10, 10, 200, 100, 0, {
    fillStyle: '#0000FF',
    strokeStyle: '#000000',
});
```

***

### eventMouseMove()

> **eventMouseMove**(`x`, `y`): `void`

Defined in: [component/canvas.ts:259](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L259)

Called when the mouse moves over the canvas. Override to handle mouse tracking.

#### Parameters

##### x

`number`

The x-coordinate relative to the canvas.

##### y

`number`

The y-coordinate relative to the canvas.

#### Returns

`void`

***

### getHeight()

> **getHeight**(): `number`

Defined in: [component/canvas.ts:108](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L108)

Returns the current canvas height in pixels.

#### Returns

`number`

The canvas height.

#### Example

```ts
const h = canvas.getHeight();
```

***

### getImageDataXY()

> **getImageDataXY**(`x`, `y`): `Uint8ClampedArray`

Defined in: [component/canvas.ts:250](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L250)

Returns the RGBA pixel data at a specific canvas coordinate.

#### Parameters

##### x

`number`

The x-coordinate to sample.

##### y

`number`

The y-coordinate to sample.

#### Returns

`Uint8ClampedArray`

A Uint8ClampedArray containing [R, G, B, A] values.

#### Example

```ts
const [r, g, b, a] = canvas.getImageDataXY(50, 50);
```

***

### getWidth()

> **getWidth**(): `number`

Defined in: [component/canvas.ts:84](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L84)

Returns the current canvas width in pixels.

#### Returns

`number`

The canvas width.

#### Example

```ts
const w = canvas.getWidth();
```

***

### setHeight()

> **setHeight**(`height`): `void`

Defined in: [component/canvas.ts:96](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L96)

Sets the canvas height in pixels.

#### Parameters

##### height

`number`

The height in pixels.

#### Returns

`void`

#### Example

```ts
canvas.setHeight(600);
```

***

### setSize()

> **setSize**(`width`, `height`): `void`

Defined in: [component/canvas.ts:121](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L121)

Sets both the canvas width and height in pixels.

#### Parameters

##### width

`number`

The width in pixels.

##### height

`number`

The height in pixels.

#### Returns

`void`

#### Example

```ts
canvas.setSize(800, 600);
```

***

### setWidth()

> **setWidth**(`width`): `void`

Defined in: [component/canvas.ts:72](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/canvas.ts#L72)

Sets the canvas width in pixels.

#### Parameters

##### width

`number`

The width in pixels.

#### Returns

`void`

#### Example

```ts
canvas.setWidth(800);
```
