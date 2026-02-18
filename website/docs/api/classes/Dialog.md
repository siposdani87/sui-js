# Class: Dialog

Defined in: [module/dialog.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/dialog.ts#L41)

Full dialog modal that loads its content from a server endpoint via
[Http](Http.md). Extends [BaseModal](BaseModal.md) to provide template-based
dialog rendering with automatic extraction of title, content, and
action buttons from the fetched HTML.

The server response is expected to contain elements with specific IDs:
- `#title` -- the dialog title text
- `#content` -- the main dialog body content
- `#action` -- container with one or two `<button>` elements
    (one button maps to OK; two buttons map to Cancel + OK)

On HTTP error, the dialog extracts and displays the `.message` element
from the error response and opens automatically.

## Example

```ts
const dialog = new Dialog(http);
dialog.loadTemplate('/api/edit-user/42').then(
    (contentKnot) => {
        dialog.eventOK = () => saveUser(contentKnot);
        dialog.open();
    },
    (errorKnot) => {
        console.error('Failed to load dialog');
    },
);
```

## See

 - [BaseModal](BaseModal.md)
 - [Http](Http.md)
 - [Confirm](Confirm.md)

## Extends

- [`BaseModal`](BaseModal.md)

## Constructors

### Constructor

> **new Dialog**(`http`, `opt_options?`): `Dialog`

Defined in: [module/dialog.ts:54](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/dialog.ts#L54)

Creates a new Dialog instance.

#### Parameters

##### http

[`Http`](Http.md)

The HTTP client used to fetch dialog templates from
    the server.

##### opt\_options?

Configuration options merged with defaults.
    Supported keys: `id` (CSS selector for the dialog element,
    defaults to `'#dialog'`).

`object` | `undefined`

#### Returns

`Dialog`

#### Overrides

[`BaseModal`](BaseModal.md).[`constructor`](BaseModal.md#constructor)

## Properties

### body

> **body**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:47](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L47)

#### Inherited from

[`BaseModal`](BaseModal.md).[`body`](BaseModal.md#body)

***

### btnClose

> **btnClose**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L46)

#### Inherited from

[`BaseModal`](BaseModal.md).[`btnClose`](BaseModal.md#btnclose)

***

### btnMaximize

> **btnMaximize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:45](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L45)

#### Inherited from

[`BaseModal`](BaseModal.md).[`btnMaximize`](BaseModal.md#btnmaximize)

***

### btnMinimize

> **btnMinimize**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:44](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L44)

#### Inherited from

[`BaseModal`](BaseModal.md).[`btnMinimize`](BaseModal.md#btnminimize)

***

### eventCancel()

> **eventCancel**: () => `void`

Defined in: [module/baseModal.ts:54](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L54)

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`eventCancel`](BaseModal.md#eventcancel)

***

### eventOK()

> **eventOK**: () => `void`

Defined in: [module/baseModal.ts:53](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L53)

#### Returns

`void`

#### Inherited from

[`BaseModal`](BaseModal.md).[`eventOK`](BaseModal.md#eventok)

***

### hasBlur

> **hasBlur**: `boolean`

Defined in: [module/baseModal.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L42)

#### Inherited from

[`BaseModal`](BaseModal.md).[`hasBlur`](BaseModal.md#hasblur)

***

### http

> **http**: [`Http`](Http.md)

Defined in: [module/dialog.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/dialog.ts#L42)

***

### interval

> **interval**: `number`

Defined in: [module/baseModal.ts:48](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L48)

#### Inherited from

[`BaseModal`](BaseModal.md).[`interval`](BaseModal.md#interval)

***

### mainContainerKnot

> **mainContainerKnot**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L41)

#### Inherited from

[`BaseModal`](BaseModal.md).[`mainContainerKnot`](BaseModal.md#maincontainerknot)

***

### modal

> **modal**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:43](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L43)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modal`](BaseModal.md#modal)

***

### modalBody

> **modalBody**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:50](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L50)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalBody`](BaseModal.md#modalbody)

***

### modalFooter

> **modalFooter**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:51](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L51)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalFooter`](BaseModal.md#modalfooter)

***

### modalHeader

> **modalHeader**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:52](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L52)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalHeader`](BaseModal.md#modalheader)

***

### modalTitle

> **modalTitle**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:49](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L49)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalTitle`](BaseModal.md#modaltitle)

***

### modalWindow

> **modalWindow**: [`Knot`](Knot.md)

Defined in: [module/baseModal.ts:55](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L55)

#### Inherited from

[`BaseModal`](BaseModal.md).[`modalWindow`](BaseModal.md#modalwindow)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/dialog.ts:43](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/dialog.ts#L43)

***

### windowHeight

> **windowHeight**: `number`

Defined in: [module/baseModal.ts:40](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L40)

#### Inherited from

[`BaseModal`](BaseModal.md).[`windowHeight`](BaseModal.md#windowheight)

***

### windowWidth

> **windowWidth**: `number`

Defined in: [module/baseModal.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L39)

#### Inherited from

[`BaseModal`](BaseModal.md).[`windowWidth`](BaseModal.md#windowwidth)

## Methods

### \_actionCancel()

> `protected` **\_actionCancel**(): `void`

Defined in: [module/baseModal.ts:281](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L281)

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

Defined in: [module/baseModal.ts:270](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L270)

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

Defined in: [module/baseModal.ts:62](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L62)

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

Defined in: [module/baseModal.ts:260](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L260)

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

Defined in: [module/baseModal.ts:242](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/baseModal.ts#L242)

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

#### Inherited from

[`BaseModal`](BaseModal.md).[`close`](BaseModal.md#close)

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

#### Inherited from

[`BaseModal`](BaseModal.md).[`isOpened`](BaseModal.md#isopened)

***

### loadTemplate()

> **loadTemplate**(`url`): [`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

Defined in: [module/dialog.ts:114](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/dialog.ts#L114)

Fetches an HTML template from the given URL and populates the
dialog with the extracted title, content, and action buttons.

On success, the returned [Promize](Promize.md) resolves with the content
[Knot](Knot.md) (the `#content` element from the response). The caller
is responsible for calling `open()` after setting up event callbacks.

On failure, the dialog automatically opens with the error message
content, and the returned promise rejects with the message
[Knot](Knot.md).

#### Parameters

##### url

`string`

The server endpoint URL to fetch the dialog template from.

#### Returns

[`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

A [Promize](Promize.md) that resolves with the content Knot on
    success, or rejects with the message Knot on failure.

#### Example

```ts
dialog.loadTemplate('/api/confirm-delete').then(
    (contentKnot) => {
        dialog.eventOK = () => performDelete();
        dialog.open();
    },
    (errorKnot) => {
        // Dialog already opened with error message
    },
);
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

#### Inherited from

[`BaseModal`](BaseModal.md).[`open`](BaseModal.md#open)

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

#### Inherited from

[`BaseModal`](BaseModal.md).[`setSize`](BaseModal.md#setsize)
