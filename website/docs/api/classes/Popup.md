# Class: Popup

Defined in: [component/popup.ts:20](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L20)

## Description

Toggleable popup overlay that attaches content to a parent element.
Supports optional close button and integrates with the global [PopupContainer](PopupContainer.md)
for lifecycle management.

## Example

```ts
const popup = new Popup(contentKnot, parentKnot, true);
popup.eventClose = () => console.log('Popup closed');
popup.toggle();
```

## See

[PopupContainer](PopupContainer.md) for global popup lifecycle management

## Constructors

### Constructor

> **new Popup**(`content`, `parent`, `opt_withClose?`): `Popup`

Defined in: [component/popup.ts:33](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L33)

#### Parameters

##### content

[`Knot`](Knot.md)

The content to display inside the popup.

##### parent

[`Knot`](Knot.md)

The parent element the popup is attached to.

##### opt\_withClose?

`boolean` = `false`

Whether to show a close button.

#### Returns

`Popup`

#### Description

Creates a new Popup with content attached to a parent element.

## Properties

### content

> **content**: [`Knot`](Knot.md)

Defined in: [component/popup.ts:21](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L21)

***

### parent?

> `optional` **parent**: [`Knot`](Knot.md)\<`HTMLElement`\>

Defined in: [component/popup.ts:22](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L22)

***

### popupContainer

> **popupContainer**: [`PopupContainer`](PopupContainer.md)

Defined in: [component/popup.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L24)

***

### popupKnot

> **popupKnot**: [`Knot`](Knot.md)

Defined in: [component/popup.ts:25](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L25)

***

### withClose

> **withClose**: `boolean`

Defined in: [component/popup.ts:23](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L23)

## Methods

### close()

> **close**(): `void`

Defined in: [component/popup.ts:113](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L113)

#### Returns

`void`

#### Description

Closes the popup, removes it from the container, and fires the eventClose callback.

#### Example

```ts
popup.close();
```

***

### eventClose()

> **eventClose**(): `void`

Defined in: [component/popup.ts:126](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L126)

#### Returns

`void`

#### Description

Called when the popup is closed. Override to handle close events.

#### Example

```ts
popup.eventClose = () => cleanup();
```

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [component/popup.ts:151](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L151)

#### Returns

`boolean`

True if the popup is visible.

#### Description

Checks whether the popup is currently open.

#### Example

```ts
if (popup.isOpened()) { popup.close(); }
```

***

### open()

> **open**(): `void`

Defined in: [component/popup.ts:100](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L100)

#### Returns

`void`

#### Description

Opens the popup, closing all other popups first, and positions it within the container.

#### Example

```ts
popup.open();
```

***

### toggle()

> **toggle**(): `void`

Defined in: [component/popup.ts:136](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/popup.ts#L136)

#### Returns

`void`

#### Description

Toggles the popup between open and closed states.

#### Example

```ts
button.addEventListener('click', () => popup.toggle());
```
