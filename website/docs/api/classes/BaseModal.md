# Class: BaseModal

Defined in: [module/baseModal.ts:38](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L38)

Abstract base class for modal dialog windows. Provides shared
functionality for opening, closing, positioning, and managing modal
overlays with a blur effect on the main container.

Subclasses (such as [Dialog](Dialog.md), [Confirm](Confirm.md), and [Viewer](Viewer.md))
must call `_initBase()` after setting up their own DOM references
(`modal`, `modalWindow`, `modalHeader`, `modalTitle`, `modalBody`,
`modalFooter`, and `body`) to initialize button handlers and shared
state.

The modal supports close, minimize, and maximize buttons, and
automatically centers itself within the viewport. Open/close actions
apply a blur overlay to `.main-container` and prevent body scrolling.

## Example

```ts
// BaseModal is not instantiated directly; extend it instead:
class CustomModal extends BaseModal {
    constructor() {
        super();
        this.body = new Query('body').getKnot();
        this.modal = new Query('#custom-modal').getKnot();
        // ... set up remaining DOM refs ...
        this._initBase();
    }
}
```

## See

 - [Dialog](Dialog.md)
 - [Confirm](Confirm.md)
 - [Viewer](Viewer.md)

## Extended by

- [`Confirm`](Confirm.md)
- [`Dialog`](Dialog.md)
- [`Viewer`](Viewer.md)

## Constructors

### Constructor

> **new BaseModal**(): `BaseModal`

#### Returns

`BaseModal`

## Properties

### body

> **body**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:47](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L47)

***

### btnClose

> **btnClose**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L46)

***

### btnMaximize

> **btnMaximize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:45](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L45)

***

### btnMinimize

> **btnMinimize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:44](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L44)

***

### eventCancel()

> **eventCancel**: () => `void`

Defined in: [module/baseModal.ts:54](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L54)

#### Returns

`void`

***

### eventOK()

> **eventOK**: () => `void`

Defined in: [module/baseModal.ts:53](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L53)

#### Returns

`void`

***

### hasBlur

> **hasBlur**: `boolean`

Defined in: [module/baseModal.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L42)

***

### interval

> **interval**: `number`

Defined in: [module/baseModal.ts:48](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L48)

***

### mainContainerKnot

> **mainContainerKnot**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L41)

***

### modal

> **modal**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:43](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L43)

***

### modalBody

> **modalBody**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:50](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L50)

***

### modalFooter

> **modalFooter**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:51](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L51)

***

### modalHeader

> **modalHeader**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:52](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L52)

***

### modalTitle

> **modalTitle**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:49](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L49)

***

### modalWindow

> **modalWindow**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:55](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L55)

***

### windowHeight

> **windowHeight**: `number`

Defined in: [module/baseModal.ts:40](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L40)

***

### windowWidth

> **windowWidth**: `number`

Defined in: [module/baseModal.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L39)

## Methods

### \_actionCancel()

> `protected` **\_actionCancel**(): `void`

Defined in: [module/baseModal.ts:281](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L281)

Executes the Cancel callback followed by closing the modal. Uses
[Async](Async.md) serial execution to ensure the callback completes
before the modal is closed.

#### Returns

`void`

***

### \_actionOK()

> `protected` **\_actionOK**(): `void`

Defined in: [module/baseModal.ts:270](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L270)

Executes the OK callback followed by closing the modal. Uses
[Async](Async.md) serial execution to ensure the callback completes
before the modal is closed.

#### Returns

`void`

***

### \_initBase()

> `protected` **\_initBase**(): `void`

Defined in: [module/baseModal.ts:62](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L62)

Initializes shared base state including window dimensions, the main
container reference for blur effects, and all modal control buttons.
Must be called by subclasses after their own DOM references are set.

#### Returns

`void`

***

### \_reset()

> `protected` **\_reset**(): `void`

Defined in: [module/baseModal.ts:260](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L260)

Resets the OK and Cancel event callbacks to no-op functions.
Called before loading new content to ensure stale callbacks from
a previous modal session are not carried over.

#### Returns

`void`

***

### \_setTitle()

> `protected` **\_setTitle**(`opt_title`): `void`

Defined in: [module/baseModal.ts:242](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L242)

Sets the modal header title text. Shows the header when the title
is a non-empty string or a number; hides it otherwise.

#### Parameters

##### opt\_title

The title text to display in the modal header.

`string` | `undefined`

#### Returns

`void`

***

### close()

> **close**(): `void`

Defined in: [module/baseModal.ts:220](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L220)

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

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [module/baseModal.ts:150](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L150)

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

***

### open()

> **open**(`opt_allowClose?`): `void`

Defined in: [module/baseModal.ts:193](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L193)

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

***

### setSize()

> **setSize**(`width`, `height`): `void`

Defined in: [module/baseModal.ts:316](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L316)

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
