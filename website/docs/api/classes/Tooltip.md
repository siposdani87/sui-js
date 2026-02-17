# Class: Tooltip

Defined in: [component/tooltip.ts:19](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L19)

## Description

MDL tooltip wrapper with directional positioning (TOP, BOTTOM, LEFT, RIGHT).
Reads tooltip text from the element's title or desc attribute.

## Example

```ts
const tooltip = new Tooltip(buttonKnot, 'BOTTOM');
tooltip.render('Click to submit');
```

## See

[Table](Table.md) for table cells that use tooltips for header descriptions

## Constructors

### Constructor

> **new Tooltip**(`element`, `opt_position?`): `Tooltip`

Defined in: [component/tooltip.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L30)

#### Parameters

##### element

[`Knot`](Knot.md)

The element to attach the tooltip to.

##### opt\_position?

`string` = `'TOP'`

Tooltip direction: 'TOP', 'BOTTOM', 'LEFT', or 'RIGHT'.

#### Returns

`Tooltip`

#### Description

Creates a new Tooltip for the given element with directional positioning.

## Properties

### element

> **element**: [`Knot`](Knot.md)

Defined in: [component/tooltip.ts:20](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L20)

***

### positionCssClass

> **positionCssClass**: `string`

Defined in: [component/tooltip.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L22)

***

### tooltip

> **tooltip**: [`Knot`](Knot.md)

Defined in: [component/tooltip.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L23)

***

### valid

> **valid**: `boolean`

Defined in: [component/tooltip.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L21)

## Methods

### close()

> **close**(): `void`

Defined in: [component/tooltip.ts:164](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L164)

#### Returns

`void`

#### Description

Programmatically closes the tooltip by removing the active CSS class.

#### Example

```ts
tooltip.close();
```

***

### isOpen()

> **isOpen**(): `boolean`

Defined in: [component/tooltip.ts:175](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L175)

#### Returns

`boolean`

True if the tooltip is active.

#### Description

Checks whether the tooltip is currently visible.

#### Example

```ts
if (tooltip.isOpen()) { tooltip.close(); }
```

***

### open()

> **open**(): `void`

Defined in: [component/tooltip.ts:154](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L154)

#### Returns

`void`

#### Description

Programmatically opens the tooltip by adding the active CSS class.

#### Example

```ts
tooltip.open();
```

***

### render()

> **render**(`opt_message?`): `void`

Defined in: [component/tooltip.ts:112](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L112)

#### Parameters

##### opt\_message?

`string`

Optional explicit tooltip message.

#### Returns

`void`

#### Description

Renders the tooltip with the given or auto-detected message, and upgrades MDL components.

#### Example

```ts
tooltip.render('Helpful hint');
```

***

### setMessage()

> **setMessage**(`opt_message?`): `void`

Defined in: [component/tooltip.ts:136](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L136)

#### Parameters

##### opt\_message?

`string` = `''`

The message text to display.

#### Returns

`void`

#### Description

Sets the tooltip message content. Hides the tooltip when message is empty.

#### Example

```ts
tooltip.setMessage('Updated tooltip text');
```

***

### toggle()

> **toggle**(): `void`

Defined in: [component/tooltip.ts:185](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/tooltip.ts#L185)

#### Returns

`void`

#### Description

Toggles the tooltip between open and closed states.

#### Example

```ts
tooltip.toggle();
```
