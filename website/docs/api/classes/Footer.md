# Class: Footer

Defined in: [module/footer.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L21)

Application footer bar that manages visibility, content injection, locale
selector placement, and an expandable open/close state.

The footer automatically applies dark or static styling based on whether
the current page content is a fullscreen light view.

## See

 - [BottomMenu](BottomMenu.md)
 - [Header](Header.md)

## Example

```ts
const footer = new Footer();
footer.show();
footer.setContent(copyrightKnot);
```

## Constructors

### Constructor

> **new Footer**(`opt_options?`): `Footer`

Defined in: [module/footer.ts:34](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L34)

Creates a new Footer instance and queries the footer DOM elements.

#### Parameters

##### opt\_options?

Optional configuration
    merged into defaults.

`object` | `undefined`

#### Returns

`Footer`

## Properties

### contentKnot

> **contentKnot**: [`Knot`](Knot.md)

Defined in: [module/footer.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L25)

***

### footerKnot

> **footerKnot**: [`Knot`](Knot.md)

Defined in: [module/footer.ts:23](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L23)

***

### localesKnot

> **localesKnot**: [`Knot`](Knot.md)

Defined in: [module/footer.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L26)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/footer.ts:22](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L22)

***

### templateViewKnot

> **templateViewKnot**: [`Knot`](Knot.md)

Defined in: [module/footer.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L24)

## Methods

### close()

> **close**(): `void`

Defined in: [module/footer.ts:135](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L135)

Collapses the footer from its open state.

#### Returns

`void`

***

### getLocalesContainer()

> **getLocalesContainer**(): [`Knot`](Knot.md)

Defined in: [module/footer.ts:121](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L121)

Returns the container [Knot](Knot.md) designated for the locale selector
UI within the footer.

#### Returns

[`Knot`](Knot.md)

The locales container element.

#### Example

```ts
const localesContainer = footer.getLocalesContainer();
```

***

### hide()

> **hide**(): `void`

Defined in: [module/footer.ts:92](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L92)

Hides the footer and removes static positioning from the template view.

#### Returns

`void`

#### Example

```ts
footer.hide();
```

***

### isOpened()

> **isOpened**(): `boolean`

Defined in: [module/footer.ts:144](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L144)

Checks whether the footer is currently in its expanded (open) state.

#### Returns

`boolean`

True if the footer is open, false otherwise.

***

### open()

> **open**(): `void`

Defined in: [module/footer.ts:128](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L128)

Expands the footer to its open state.

#### Returns

`void`

***

### setContent()

> **setContent**(`contentKnot`): `void`

Defined in: [module/footer.ts:108](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L108)

Appends a content element to the footer's content container.

#### Parameters

##### contentKnot

[`Knot`](Knot.md)

The DOM element wrapper to append.

#### Returns

`void`

#### Example

```ts
const copyright = new Knot('span');
copyright.setHtml('2024 My App');
footer.setContent(copyright);
```

***

### show()

> **show**(): `void`

Defined in: [module/footer.ts:68](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L68)

Shows the footer and applies contextual styling. If the current page
content is a fullscreen light view, the footer receives a dark
background and static positioning; otherwise dark styling is removed.

#### Returns

`void`

#### Example

```ts
footer.show();
```

***

### toogle()

> **toogle**(): `void`

Defined in: [module/footer.ts:154](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/footer.ts#L154)

Toggles the footer between its open and closed states.

#### Returns

`void`

#### Example

```ts
footer.toogle();
```
