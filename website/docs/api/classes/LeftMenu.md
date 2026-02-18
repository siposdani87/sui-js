# Class: LeftMenu

Defined in: [module/leftMenu.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L23)

Slide-out left sidebar navigation with a main menu panel and a
secondary sub-menu panel. Opening the menu applies a blur overlay
to the main content and prevents body scrolling.

The main menu and sub-menu each have their own title and scrollable
container. Use [openSubMenu](#opensubmenu) to switch from the main panel to
the sub-menu panel, and [closeSubMenu](#closesubmenu) to return.

## See

 - [Header](Header.md)
 - [TopMenu](TopMenu.md)

## Example

```ts
const leftMenu = new LeftMenu();
leftMenu.open('Navigation');
const container = leftMenu.getMainContainer();
```

## Constructors

### Constructor

> **new LeftMenu**(): `LeftMenu`

Defined in: [module/leftMenu.ts:38](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L38)

Creates a new LeftMenu instance, queries the menu DOM elements,
and binds open/close event handlers.

#### Returns

`LeftMenu`

## Properties

### body

> **body**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L24)

***

### leftMenu

> **leftMenu**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L26)

***

### mainContainerKnot

> **mainContainerKnot**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L25)

***

### mainMenu

> **mainMenu**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L27)

***

### mainMenuContainer

> **mainMenuContainer**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L29)

***

### mainMenuTitle

> **mainMenuTitle**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:31](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L31)

***

### subMenu

> **subMenu**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L28)

***

### subMenuContainer

> **subMenuContainer**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L30)

***

### subMenuTitle

> **subMenuTitle**: [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:32](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L32)

## Methods

### close()

> **close**(): `void`

Defined in: [module/leftMenu.ts:136](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L136)

Closes the left menu sidebar, removes the blur overlay, and
restores body scrolling.

#### Returns

`void`

***

### closeSubMenu()

> **closeSubMenu**(): `void`

Defined in: [module/leftMenu.ts:162](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L162)

Returns the left menu view from the sub-menu panel back to the
main menu panel.

#### Returns

`void`

***

### getMainContainer()

> **getMainContainer**(): [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:176](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L176)

Returns the main menu container [Knot](Knot.md) where primary menu
items should be appended.

#### Returns

[`Knot`](Knot.md)

The main menu container element.

#### Example

```ts
const mainContainer = leftMenu.getMainContainer();
```

***

### getSubContainer()

> **getSubContainer**(): [`Knot`](Knot.md)

Defined in: [module/leftMenu.ts:189](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L189)

Returns the sub-menu container [Knot](Knot.md) where secondary menu
items should be appended.

#### Returns

[`Knot`](Knot.md)

The sub-menu container element.

#### Example

```ts
const subContainer = leftMenu.getSubContainer();
```

***

### open()

> **open**(`opt_title?`): `void`

Defined in: [module/leftMenu.ts:123](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L123)

Opens the left menu sidebar with a blur overlay on the main content.
Prevents body scrolling while the menu is visible.

#### Parameters

##### opt\_title?

Optional title displayed at
    the top of the main menu panel.

`string` | `undefined`

#### Returns

`void`

#### Example

```ts
leftMenu.open('Main Navigation');
```

***

### openSubMenu()

> **openSubMenu**(`opt_title?`): `void`

Defined in: [module/leftMenu.ts:152](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/leftMenu.ts#L152)

Switches the left menu view from the main menu panel to the
sub-menu panel.

#### Parameters

##### opt\_title?

Optional title displayed at
    the top of the sub-menu panel.

`string` | `undefined`

#### Returns

`void`

#### Example

```ts
leftMenu.openSubMenu('Settings');
```
