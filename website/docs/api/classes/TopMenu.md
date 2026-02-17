# Class: TopMenu

Defined in: [module/topMenu.ts:21](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L21)

Dropdown menu rendered inside the application [Header](Header.md). Toggling
the menu also opens/closes the header's expanded state and manages
shadow styling.

The toggle button is bound to the `#toggle-top-menu` element within the
header, and the menu container is `#top-menu`.

## See

[Header](Header.md)

## Example

```ts
const topMenu = new TopMenu(header);
topMenu.open();
const container = topMenu.getContainer();
```

## Constructors

### Constructor

> **new TopMenu**(`header`): `TopMenu`

Defined in: [module/topMenu.ts:33](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L33)

Creates a new TopMenu instance and binds the toggle click event
within the provided header.

#### Parameters

##### header

[`Header`](Header.md)

The application header instance that
    contains the top menu DOM elements.

#### Returns

`TopMenu`

## Properties

### header

> **header**: [`Header`](Header.md)

Defined in: [module/topMenu.ts:22](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L22)

***

### toggleTopMenu

> **toggleTopMenu**: [`Knot`](Knot.md)

Defined in: [module/topMenu.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L24)

***

### topMenu

> **topMenu**: [`Knot`](Knot.md)

Defined in: [module/topMenu.ts:23](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L23)

## Methods

### close()

> **close**(): `void`

Defined in: [module/topMenu.ts:98](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L98)

Closes the top menu by collapsing the header, hiding the menu
container, deactivating the toggle button, and removing the
header shadow.

#### Returns

`void`

***

### getContainer()

> **getContainer**(): [`Knot`](Knot.md)

Defined in: [module/topMenu.ts:115](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L115)

Returns the menu container [Knot](Knot.md) where menu items should be
appended.

#### Returns

[`Knot`](Knot.md)

The top menu container element.

#### Example

```ts
const container = topMenu.getContainer();
container.appendChild(menuItemKnot);
```

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [module/topMenu.ts:74](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L74)

Checks whether the top menu is currently visible.

#### Returns

`boolean`

True if the menu is open, false otherwise.

***

### open()

> **open**(): `void`

Defined in: [module/topMenu.ts:86](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L86)

Opens the top menu by expanding the header, showing the menu
container, activating the toggle button, and displaying the
header shadow.

#### Returns

`void`

#### Example

```ts
topMenu.open();
```

***

### toggle()

> **toggle**(): `void`

Defined in: [module/topMenu.ts:61](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/topMenu.ts#L61)

Toggles the top menu between its open and closed states.

#### Returns

`void`

#### Example

```ts
topMenu.toggle();
```
