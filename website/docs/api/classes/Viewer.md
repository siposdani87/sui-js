# Class: Viewer

Defined in: [module/viewer.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/viewer.ts#L27)

Image viewer modal that displays a single image in a full-screen
overlay. Extends [BaseModal](BaseModal.md) to provide a lightweight image
preview experience with an optional title.

The viewer automatically opens when `loadImage()` is called, showing
the image in the modal body with the blur overlay applied to the
main container.

## Examples

```ts
const viewer = new Viewer();
viewer.loadImage('/uploads/photo.jpg', 'Vacation Photo');
```

```ts
// Open without a title
viewer.loadImage('/uploads/chart.png');
```

## See

 - [BaseModal](BaseModal.md)
 - [Dialog](Dialog.md)

## Extends

- [`BaseModal`](BaseModal.md)

## Constructors

### Constructor

> **new Viewer**(`opt_options?`): `Viewer`

Defined in: [module/viewer.ts:37](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/viewer.ts#L37)

Creates a new Viewer instance.

#### Parameters

##### opt\_options?

Configuration options merged with defaults.
    Supported keys: `id` (CSS selector for the viewer element,
    defaults to `'#viewer'`).

`object` | `undefined`

#### Returns

`Viewer`

#### Overrides

[`BaseModal`](BaseModal.md).[`constructor`](BaseModal.md#constructor)

## Properties

### body

> **body**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:47](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L47)

#### Inherited from

[`BaseModal`](BaseModal.md).[`body`](BaseModal.md#body)

***

### btnClose

> **btnClose**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:46](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L46)

#### Inherited from

[`BaseModal`](BaseModal.md).[`btnClose`](BaseModal.md#btnclose)

***

### btnMaximize

> **btnMaximize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:45](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L45)

#### Inherited from

[`BaseModal`](BaseModal.md).[`btnMaximize`](BaseModal.md#btnmaximize)

***

### btnMinimize

> **btnMinimize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:44](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L44)

#### Inherited from

[`BaseModal`](BaseModal.md).[`btnMinimize`](BaseModal.md#btnminimize)

***

### eventCancel()

> **eventCancel**: () => `void`

Defined in: [module/baseModal.ts:54](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L54)

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`eventCancel`](BaseModal.md#eventcancel)

***

### eventOK()

> **eventOK**: () => `void`

Defined in: [module/baseModal.ts:53](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L53)

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`eventOK`](BaseModal.md#eventok)

***

### hasBlur

> **hasBlur**: `boolean`

Defined in: [module/baseModal.ts:42](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L42)

#### Inherited from

[`BaseModal`](BaseModal.md).[`hasBlur`](BaseModal.md#hasblur)

***

### interval

> **interval**: `number`

Defined in: [module/baseModal.ts:48](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L48)

#### Inherited from

[`BaseModal`](BaseModal.md).[`interval`](BaseModal.md#interval)

***

### mainContainerKnot

> **mainContainerKnot**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:41](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L41)

#### Inherited from

[`BaseModal`](BaseModal.md).[`mainContainerKnot`](BaseModal.md#maincontainerknot)

***

### modal

> **modal**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:43](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L43)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modal`](BaseModal.md#modal)

***

### modalBody

> **modalBody**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:50](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L50)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalBody`](BaseModal.md#modalbody)

***

### modalFooter

> **modalFooter**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:51](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L51)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalFooter`](BaseModal.md#modalfooter)

***

### modalHeader

> **modalHeader**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:52](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L52)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalHeader`](BaseModal.md#modalheader)

***

### modalTitle

> **modalTitle**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:49](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L49)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalTitle`](BaseModal.md#modaltitle)

***

### modalWindow

> **modalWindow**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:55](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L55)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalWindow`](BaseModal.md#modalwindow)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/viewer.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/viewer.ts#L28)

***

### windowHeight

> **windowHeight**: `number`

Defined in: [module/baseModal.ts:40](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L40)

#### Inherited from

[`BaseModal`](BaseModal.md).[`windowHeight`](BaseModal.md#windowheight)

***

### windowWidth

> **windowWidth**: `number`

Defined in: [module/baseModal.ts:39](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L39)

#### Inherited from

[`BaseModal`](BaseModal.md).[`windowWidth`](BaseModal.md#windowwidth)

## Methods

### \_actionCancel()

> `protected` **\_actionCancel**(): `void`

Defined in: [module/baseModal.ts:281](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L281)

Executes the Cancel callback followed by closing the modal. Uses
[Async](Async.md) serial execution to ensure the callback completes
before the modal is closed.

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`_actionCancel`](BaseModal.md#_actioncancel)

***

### \_actionOK()

> `protected` **\_actionOK**(): `void`

Defined in: [module/baseModal.ts:270](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L270)

Executes the OK callback followed by closing the modal. Uses
[Async](Async.md) serial execution to ensure the callback completes
before the modal is closed.

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`_actionOK`](BaseModal.md#_actionok)

***

### \_initBase()

> `protected` **\_initBase**(): `void`

Defined in: [module/baseModal.ts:62](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L62)

Initializes shared base state including window dimensions, the main
container reference for blur effects, and all modal control buttons.
Must be called by subclasses after their own DOM references are set.

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`_initBase`](BaseModal.md#_initbase)

***

### \_reset()

> `protected` **\_reset**(): `void`

Defined in: [module/baseModal.ts:260](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L260)

Resets the OK and Cancel event callbacks to no-op functions.
Called before loading new content to ensure stale callbacks from
a previous modal session are not carried over.

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`_reset`](BaseModal.md#_reset)

***

### \_setTitle()

> `protected` **\_setTitle**(`opt_title`): `void`

Defined in: [module/baseModal.ts:242](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L242)

Sets the modal header title text. Shows the header when the title
is a non-empty string or a number; hides it otherwise.

#### Parameters

##### opt\_title

The title text to display in the modal header.

`string` | `undefined`

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`_setTitle`](BaseModal.md#_settitle)

***

### close()

> **close**(): `void`

Defined in: [module/baseModal.ts:220](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L220)

Closes the modal dialog and clears its content. Removes the blur
overlay from `.main-container` (unless another modal applied it),
hides the modal, and removes all children from the title, body,
and footer sections.

#### Returns

`void`

#### Example

```ts
dialog.close();
```

#### Inherited from

[`BaseModal`](BaseModal.md).[`close`](BaseModal.md#close)

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [module/baseModal.ts:150](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L150)

Checks whether the modal is currently visible.

#### Returns

`boolean`

True if the modal has the `visible-flex` CSS class, indicating
    it is open and displayed.

#### Example

```ts
if (!dialog.isOpened()) {
    dialog.open();
}
```

#### Inherited from

[`BaseModal`](BaseModal.md).[`isOpened`](BaseModal.md#isopened)

***

### loadImage()

> **loadImage**(`imageUrl`, `opt_title?`): `void`

Defined in: [module/viewer.ts:85](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/viewer.ts#L85)

Loads and displays an image in the viewer modal. Resets any
previous callbacks, creates an `<img>` element with the given
URL, sets the optional title, and opens the modal.

#### Parameters

##### imageUrl

`string`

The URL of the image to display.

##### opt\_title?

Optional title text shown in the modal header.
    When empty or omitted, the header is hidden.

`string` | `undefined`

#### Returns

`void`

#### Examples

```ts
viewer.loadImage('/api/images/12345.jpg', 'Product Preview');
```

```ts
// View an image without a title
viewer.loadImage('https://cdn.example.com/hero.png');
```

***

### open()

> **open**(`opt_allowClose?`): `void`

Defined in: [module/baseModal.ts:193](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L193)

Opens the modal dialog with a blur overlay on the main container.
Applies the `blur` class to `.main-container`, shows the modal,
and starts an interval to keep the modal centered as content
changes size.

If another modal is already applying blur, the existing blur state
is preserved so that closing this modal does not remove the blur
prematurely.

#### Parameters

##### opt\_allowClose?

Whether to show the close button. Defaults to
    true. Pass false to prevent the user from dismissing the modal
    via the close button.

`boolean` | `undefined`

#### Returns

`void`

#### Examples

```ts
confirm.load('Are you sure?', 'Yes', 'No');
confirm.open();
```

```ts
// Open without a close button (forced interaction)
dialog.open(false);
```

#### Inherited from

[`BaseModal`](BaseModal.md).[`open`](BaseModal.md#open)

***

### setSize()

> **setSize**(`width`, `height`): `void`

Defined in: [module/baseModal.ts:316](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/baseModal.ts#L316)

Updates the stored window dimensions and recalculates the modal
center position. Typically called when the browser window is
resized.

#### Parameters

##### width

`number`

The current viewport width in pixels.

##### height

`number`

The current viewport height in pixels.

#### Returns

`void`

#### Example

```ts
window.addEventListener('resize', () => {
    modal.setSize(window.innerWidth, window.innerHeight);
});
```

#### Inherited from

[`BaseModal`](BaseModal.md).[`setSize`](BaseModal.md#setsize)
