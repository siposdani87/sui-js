# Class: NavBar

Defined in: [module/navBar.ts:23](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L23)

Navigation bar component for secondary navigation such as breadcrumbs
or contextual links. Supports toggling between expanded and collapsed
states, visibility control, shadow styling, and provides access to its
container for appending navigation items.

The component binds to the `.nav-bar-header` DOM element and the
`#nav-bar` container within it. A toggle button (`#toggle-nav-bar`)
switches between expand (menu icon) and collapse (close icon) states.

## See

[Header](Header.md)

## Example

```ts
const navBar = new NavBar();
navBar.show();
navBar.open();
const container = navBar.getContainer();
```

## Constructors

### Constructor

> **new NavBar**(): `NavBar`

Defined in: [module/navBar.ts:32](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L32)

Creates a new NavBar instance, queries the navigation bar DOM
elements, and binds the toggle click event.

#### Returns

`NavBar`

## Properties

### navBar

> **navBar**: [`Knot`](Knot.md)

Defined in: [module/navBar.ts:25](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L25)

***

### navBarHeader

> **navBarHeader**: [`Knot`](Knot.md)

Defined in: [module/navBar.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L24)

***

### toggleNavBarIcon

> **toggleNavBarIcon**: [`Knot`](Knot.md)

Defined in: [module/navBar.ts:26](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L26)

## Methods

### close()

> **close**(): `void`

Defined in: [module/navBar.ts:92](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L92)

Collapses the navigation bar and changes the toggle icon to 'menu'.

#### Returns

`void`

***

### getContainer()

> **getContainer**(): [`Knot`](Knot.md)

Defined in: [module/navBar.ts:138](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L138)

Returns the navigation bar container [Knot](Knot.md) where navigation
items should be appended.

#### Returns

[`Knot`](Knot.md)

The nav bar container element.

#### Example

```ts
const container = navBar.getContainer();
container.appendChild(breadcrumbKnot);
```

***

### hide()

> **hide**(): `void`

Defined in: [module/navBar.ts:110](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L110)

Hides the navigation bar header by adding the 'hidden' class.

#### Returns

`void`

***

### hideShadow()

> **hideShadow**(): `void`

Defined in: [module/navBar.ts:124](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L124)

Removes the drop shadow from the navigation bar.

#### Returns

`void`

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [module/navBar.ts:74](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L74)

Checks whether the navigation bar is currently in its expanded state.

#### Returns

`boolean`

True if the nav bar is open, false otherwise.

***

### open()

> **open**(): `void`

Defined in: [module/navBar.ts:84](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L84)

Expands the navigation bar and changes the toggle icon to 'close'.

#### Returns

`void`

#### Example

```ts
navBar.open();
```

***

### show()

> **show**(): `void`

Defined in: [module/navBar.ts:103](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L103)

Shows the navigation bar header by removing the 'hidden' class.

#### Returns

`void`

#### Example

```ts
navBar.show();
```

***

### showShadow()

> **showShadow**(): `void`

Defined in: [module/navBar.ts:117](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L117)

Adds a drop shadow beneath the navigation bar.

#### Returns

`void`

***

### toggle()

> **toggle**(): `void`

Defined in: [module/navBar.ts:61](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/navBar.ts#L61)

Toggles the navigation bar between its expanded and collapsed states.

#### Returns

`void`

#### Example

```ts
navBar.toggle();
```
