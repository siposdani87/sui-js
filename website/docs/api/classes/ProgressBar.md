# Class: ProgressBar

Defined in: [module/progressBar.ts:46](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L46)

Manages Material Design Lite progress bars across multiple application
containers: main content, header, dialog, and confirm window.

The ProgressBar determines which container's bar to activate based on
the current state of [Dialog](Dialog.md) and [Confirm](Confirm.md) -- when a dialog
is open the dialog bar is shown, when a confirm is open the confirm bar
is shown, otherwise the main and header bars are shown.

Display uses reference counting: each [show](#show) call increments a
counter, and [hide](#hide) decrements it. The bars are only removed when
the counter reaches zero (or when forced). A [lock](#lock)/[unlock](#unlock)
mechanism can suppress progress display entirely.

## See

 - [Dialog](Dialog.md)
 - [Confirm](Confirm.md)

## Examples

```ts
const progressBar = new ProgressBar(dialog, confirm);
progressBar.show();
// ... perform async work ...
progressBar.hide();
```

```ts
progressBar.setProgress(75);
progressBar.setBuffer(90);
```

## Constructors

### Constructor

> **new ProgressBar**(`dialog`, `confirm`, `opt_options?`): `ProgressBar`

Defined in: [module/progressBar.ts:73](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L73)

Creates a new ProgressBar instance and initializes MDL progress bar
elements in all four containers.

#### Parameters

##### dialog

[`Dialog`](Dialog.md)

The application dialog instance used to
    determine which progress bar to display.

##### confirm

[`Confirm`](Confirm.md)

The application confirm instance used to
    determine which progress bar to display.

##### opt\_options?

Optional configuration
    merged into defaults ({lock: false, counter: 0}).

`object` | `undefined`

#### Returns

`ProgressBar`

## Properties

### async

> **async**: [`Async`](Async.md)

Defined in: [module/progressBar.ts:54](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L54)

***

### bufferValue

> **bufferValue**: `number`

Defined in: [module/progressBar.ts:60](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L60)

***

### confirm

> **confirm**: [`Confirm`](Confirm.md)

Defined in: [module/progressBar.ts:48](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L48)

***

### dialog

> **dialog**: [`Dialog`](Dialog.md)

Defined in: [module/progressBar.ts:47](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L47)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/progressBar.ts:49](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L49)

***

### processConfirm

> **processConfirm**: `ProcessBar`

Defined in: [module/progressBar.ts:58](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L58)

***

### processContainer

> **processContainer**: `ProcessBar`

Defined in: [module/progressBar.ts:55](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L55)

***

### processDialog

> **processDialog**: `ProcessBar`

Defined in: [module/progressBar.ts:57](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L57)

***

### processHeader

> **processHeader**: `ProcessBar`

Defined in: [module/progressBar.ts:56](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L56)

***

### progressBarConfirm

> **progressBarConfirm**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:53](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L53)

***

### progressBarContainer

> **progressBarContainer**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:50](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L50)

***

### progressBarDialog

> **progressBarDialog**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:52](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L52)

***

### progressBarHeader

> **progressBarHeader**: [`Knot`](Knot.md)

Defined in: [module/progressBar.ts:51](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L51)

***

### progressValue

> **progressValue**: `number`

Defined in: [module/progressBar.ts:59](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L59)

## Methods

### hide()

> **hide**(`opt_force?`): `void`

Defined in: [module/progressBar.ts:383](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L383)

Decrements the reference counter and hides all progress bars when the
counter reaches zero. If `opt_force` is true, the counter is reset to
zero and bars are hidden immediately.

#### Parameters

##### opt\_force?

`boolean`

When true, force-hides all
    bars regardless of the current counter value.

#### Returns

`void`

#### Example

```ts
progressBar.hide();       // decrements counter
progressBar.hide(true);   // force-hides immediately
```

***

### lock()

> **lock**(): `void`

Defined in: [module/progressBar.ts:415](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L415)

Locks the progress bar, preventing any further progress display until
[unlock](#unlock) is called. Existing indeterminate animations remain
visible but new activations are suppressed.

#### Returns

`void`

#### Example

```ts
progressBar.lock();
progressBar.show(); // no visible effect
```

***

### setBuffer()

> **setBuffer**(`value`): `void`

Defined in: [module/progressBar.ts:345](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L345)

Sets the buffer value on the appropriate progress bar(s). The buffer
represents how much data has been loaded ahead of the current progress.

#### Parameters

##### value

`number`

The buffer percentage (0--100).

#### Returns

`void`

#### Example

```ts
progressBar.setBuffer(80);
```

***

### setProgress()

> **setProgress**(`value`): `void`

Defined in: [module/progressBar.ts:310](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L310)

Sets a determinate progress value on the appropriate bar(s).

#### Parameters

##### value

`number`

The progress percentage (0--100).

#### Returns

`void`

#### Example

```ts
progressBar.setProgress(50); // 50% complete
```

***

### show()

> **show**(): `void`

Defined in: [module/progressBar.ts:251](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L251)

Activates the indeterminate progress animation on the appropriate bar(s)
and increments the reference counter.

Each call to `show()` must be balanced by a call to [hide](#hide) to
ensure the progress bar is eventually hidden.

#### Returns

`void`

#### Example

```ts
progressBar.show();
// ... perform async operation ...
progressBar.hide();
```

***

### unlock()

> **unlock**(): `void`

Defined in: [module/progressBar.ts:426](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/progressBar.ts#L426)

Unlocks the progress bar, allowing progress display to resume.

#### Returns

`void`

#### Example

```ts
progressBar.unlock();
progressBar.show(); // progress is visible again
```
