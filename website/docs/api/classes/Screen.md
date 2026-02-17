# Class: Screen

Defined in: [module/screen.ts:38](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L38)

Window event manager that listens for and dispatches browser-level
events including resize, scroll, online/offline connectivity, and
color scheme changes. All resize and scroll events are debounced
with a configurable delay to prevent excessive handler invocations.

Screen detects orientation changes by comparing window width and
height after each resize, and fires a separate
[eventOrientationChange](#eventorientationchange) when the orientation shifts between
`'landscape'` and `'portrait'`.

Event handler methods ([eventResize](#eventresize), [eventScroll](#eventscroll),
[eventOnline](#eventonline), [eventOffline](#eventoffline),
[eventColorSchemeChange](#eventcolorschemechange)) are designed to be overridden by
subclasses or instances to implement custom behavior.

## Example

```ts
const screen = new Screen({ delay: 300 });

screen.eventResize = (width, height, event) => {
    console.log(`Resized to ${width}x${height}`);
};

screen.eventScroll = (scrollTop, event) => {
    console.log('Scrolled to:', scrollTop);
};

screen.getWidth();       // current window width
screen.getOrientation(); // 'landscape' or 'portrait'
```

## See

[Objekt](Objekt.md)

## Constructors

### Constructor

> **new Screen**(`opt_options?`): `Screen`

Defined in: [module/screen.ts:52](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L52)

Creates a new Screen instance, initializes window and document
references, and sets up event listeners for resize, scroll,
connectivity, and color scheme changes.

#### Parameters

##### opt\_options?

Configuration options. Supports `delay` (number)
    for the debounce interval in milliseconds. Defaults to 250.

`object` | `undefined`

#### Returns

`Screen`

## Properties

### document

> **document**: `Document`

Defined in: [module/screen.ts:41](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L41)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/screen.ts:39](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L39)

***

### orientation

> **orientation**: `string`

Defined in: [module/screen.ts:42](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L42)

***

### window

> **window**: `Window`

Defined in: [module/screen.ts:40](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L40)

## Methods

### eventColorSchemeChange()

> **eventColorSchemeChange**(`colorScheme`, `event`): `void`

Defined in: [module/screen.ts:316](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L316)

Called when the system color scheme preference changes between
light and dark mode. Override this method to implement custom
theme-switching behavior.

#### Parameters

##### colorScheme

`string`

The new color scheme: `'dark'` or `'light'`.

##### event

`Event`

The native media query change event.

#### Returns

`void`

***

### eventOffline()

> **eventOffline**(`event`): `void`

Defined in: [module/screen.ts:139](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L139)

Called when the browser goes offline. Override this method to
implement custom offline behavior such as showing a notification
or disabling network-dependent features.

#### Parameters

##### event

`Event`

The native offline event.

#### Returns

`void`

***

### eventOnline()

> **eventOnline**(`event`): `void`

Defined in: [module/screen.ts:150](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L150)

Called when the browser comes back online. Override this method
to implement custom online behavior such as re-syncing data or
hiding offline notifications.

#### Parameters

##### event

`Event`

The native online event.

#### Returns

`void`

***

### eventOrientationChange()

> **eventOrientationChange**(`orientation`, `width`, `height`, `event`): `void`

Defined in: [module/screen.ts:177](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L177)

Called when the device orientation changes between landscape and
portrait. Override this method to implement custom
orientation-change behavior.

#### Parameters

##### orientation

`string`

The new orientation: `'landscape'` or `'portrait'`.

##### width

`number`

The new window inner width in pixels.

##### height

`number`

The new window inner height in pixels.

##### event

`Event`

The native resize event that triggered the orientation change.

#### Returns

`void`

***

### eventResize()

> **eventResize**(`width`, `height`, `event`): `void`

Defined in: [module/screen.ts:163](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L163)

Called when the window is resized. Override this method to
implement custom resize behavior such as adjusting layouts or
recalculating dimensions.

#### Parameters

##### width

`number`

The new window inner width in pixels.

##### height

`number`

The new window inner height in pixels.

##### event

`Event`

The native resize event.

#### Returns

`void`

***

### eventScroll()

> **eventScroll**(`scrollTop`, `event`): `void`

Defined in: [module/screen.ts:200](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L200)

Called when the window is scrolled. Override this method to
implement custom scroll behavior such as infinite scrolling
or sticky headers.

#### Parameters

##### scrollTop

`number`

The current vertical scroll position in pixels.

##### event

`Event`

The native scroll event.

#### Returns

`void`

***

### getHeight()

> **getHeight**(): `number`

Defined in: [module/screen.ts:270](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L270)

Returns the current inner height of the browser window.

#### Returns

`number`

The window height in pixels.

#### Example

```ts
const height = screen.getHeight();
```

***

### getOrientation()

> **getOrientation**(): `string`

Defined in: [module/screen.ts:284](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L284)

Determines the current screen orientation based on the aspect
ratio of the window dimensions.

#### Returns

`string`

`'landscape'` if the width is greater than or equal to
    the height, `'portrait'` otherwise.

#### Example

```ts
const orientation = screen.getOrientation(); // 'landscape'
```

***

### getScrollTop()

> **getScrollTop**(): `number`

Defined in: [module/screen.ts:243](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L243)

Returns the current vertical scroll position of the document.

#### Returns

`number`

The scroll offset from the top in pixels.

#### Example

```ts
const scrollY = screen.getScrollTop();
```

***

### getWidth()

> **getWidth**(): `number`

Defined in: [module/screen.ts:258](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L258)

Returns the current inner width of the browser window.

#### Returns

`number`

The window width in pixels.

#### Example

```ts
const width = screen.getWidth();
```

***

### isColorScheme()

> **isColorScheme**(`type`): `boolean`

Defined in: [module/screen.ts:333](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/screen.ts#L333)

Checks whether the system currently uses the specified color
scheme preference.

#### Parameters

##### type

`string`

The color scheme to check, either `'dark'` or `'light'`.

#### Returns

`boolean`

`true` if the system preference matches the given type,
    `false` otherwise.

#### Example

```ts
if (screen.isColorScheme('dark')) {
    applyDarkTheme();
}
```
