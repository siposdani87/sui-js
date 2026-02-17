# Class: BottomMenu

Defined in: [module/bottomMenu.ts:21](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L21)

Popup menu rendered inside the application [Footer](Footer.md). Toggling
the menu also opens/closes the footer's expanded state.

The open and close buttons are bound to `#open-bottom-menu` and
`#close-bottom-menu` elements within the footer, and the menu
container is `#bottom-menu`.

## See

[Footer](Footer.md)

## Example

```ts
const bottomMenu = new BottomMenu(footer);
bottomMenu.open();
const container = bottomMenu.getContainer();
```

## Constructors

### Constructor

> **new BottomMenu**(`footer`): `BottomMenu`

Defined in: [module/bottomMenu.ts:32](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L32)

Creates a new BottomMenu instance and binds the toggle click events
within the provided footer.

#### Parameters

##### footer

[`Footer`](Footer.md)

The application footer instance that
    contains the bottom menu DOM elements.

#### Returns

`BottomMenu`

## Properties

### bottomMenu

> **bottomMenu**: [`Knot`](Knot.md)

Defined in: [module/bottomMenu.ts:23](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L23)

***

### footer

> **footer**: [`Footer`](Footer.md)

Defined in: [module/bottomMenu.ts:22](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L22)

## Methods

### close()

> **close**(): `void`

Defined in: [module/bottomMenu.ts:103](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L103)

Closes the bottom menu by hiding it and collapsing the footer.

#### Returns

`void`

***

### getContainer()

> **getContainer**(): [`Knot`](Knot.md)

Defined in: [module/bottomMenu.ts:118](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L118)

Returns the menu container [Knot](Knot.md) where menu items should be
appended.

#### Returns

[`Knot`](Knot.md)

The bottom menu container element.

#### Example

```ts
const container = bottomMenu.getContainer();
container.appendChild(menuItemKnot);
```

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [module/bottomMenu.ts:85](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L85)

Checks whether the bottom menu is currently visible.

#### Returns

`boolean`

True if the menu is open, false otherwise.

***

### open()

> **open**(): `void`

Defined in: [module/bottomMenu.ts:95](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L95)

Opens the bottom menu by making it visible and expanding the footer.

#### Returns

`void`

#### Example

```ts
bottomMenu.open();
```

***

### toggle()

> **toggle**(): `void`

Defined in: [module/bottomMenu.ts:72](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/bottomMenu.ts#L72)

Toggles the bottom menu between its open and closed states.

#### Returns

`void`

#### Example

```ts
bottomMenu.toggle();
```
