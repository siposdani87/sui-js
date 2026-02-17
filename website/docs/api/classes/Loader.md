# Class: Loader

Defined in: [module/loader.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/loader.ts#L24)

Full-screen loading spinner overlay using a Material Design Lite spinner
component.

Display is reference-counted: each [show](#show) call increments an internal
counter, and each [hide](#hide) call decrements it. The spinner is only
hidden when the counter reaches zero, ensuring that overlapping async
operations keep the loader visible until all of them complete.

## See

[ProgressBar](ProgressBar.md)

## Example

```ts
const loader = new Loader();
loader.show();
// ... perform async work ...
loader.hide();
```

## Constructors

### Constructor

> **new Loader**(`opt_options?`): `Loader`

Defined in: [module/loader.ts:36](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/loader.ts#L36)

Creates a new Loader instance, initializes the spinner element, and
appends it to the loader container in the DOM.

#### Parameters

##### opt\_options?

Optional configuration
    merged into defaults ({counter: 0}).

`object` | `undefined`

#### Returns

`Loader`

## Properties

### loader

> **loader**: [`Knot`](Knot.md)

Defined in: [module/loader.ts:26](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/loader.ts#L26)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/loader.ts:25](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/loader.ts#L25)

***

### spinner

> **spinner**: [`Knot`](Knot.md)

Defined in: [module/loader.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/loader.ts#L27)

## Methods

### hide()

> **hide**(`opt_force?`): `void`

Defined in: [module/loader.ts:95](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/loader.ts#L95)

Decrements the reference counter and hides the loader when it reaches
zero. If `opt_force` is true, the counter is reset to zero and the
loader is hidden immediately.

#### Parameters

##### opt\_force?

`boolean`

When true, force-hides the
    loader regardless of the current counter value.

#### Returns

`void`

#### Example

```ts
loader.hide();        // decrements counter
loader.hide(true);    // force-hides immediately
```

***

### show()

> **show**(): `void`

Defined in: [module/loader.ts:77](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/loader.ts#L77)

Displays the full-screen loader and activates the spinner animation.
Increments the internal reference counter.

#### Returns

`void`

#### Example

```ts
loader.show();
```
