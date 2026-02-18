# Class: Header

Defined in: [module/header.ts:24](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L24)

Application header bar that manages branding (logo image, title, URL),
visibility, shadow styling, and navigation button toggles for the
left menu and top menu.

The header is bound to the `#header` DOM element and adjusts padding
on the main container and template view when shown or hidden.

## See

 - [TopMenu](TopMenu.md)
 - [LeftMenu](LeftMenu.md)

## Example

```ts
const header = new Header();
header.setTitle('My Application');
header.setImage('/assets/logo.png');
header.show();
```

## Constructors

### Constructor

> **new Header**(`opt_options?`): `Header`

Defined in: [module/header.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L42)

Creates a new Header instance, queries the header DOM elements,
and binds the logo click event.

#### Parameters

##### opt\_options?

Optional configuration
    merged into defaults.

`object` | `undefined`

#### Returns

`Header`

## Properties

### brandKnot

> **brandKnot**: [`Knot`](Knot.md)

Defined in: [module/header.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L29)

***

### brandKnotImage

> **brandKnotImage**: [`Knot`](Knot.md)

Defined in: [module/header.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L30)

***

### brandKnotTitle

> **brandKnotTitle**: [`Knot`](Knot.md)

Defined in: [module/header.ts:31](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L31)

***

### headerKnot

> **headerKnot**: [`Knot`](Knot.md)

Defined in: [module/header.ts:26](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L26)

***

### leftMenuButton

> **leftMenuButton**: [`Knot`](Knot.md)

Defined in: [module/header.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L27)

***

### mainContainerKnot

> **mainContainerKnot**: [`Knot`](Knot.md)

Defined in: [module/header.ts:32](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L32)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/header.ts:25](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L25)

***

### templateViewKnot

> **templateViewKnot**: [`Knot`](Knot.md)

Defined in: [module/header.ts:33](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L33)

***

### topMenuButton

> **topMenuButton**: [`Knot`](Knot.md)

Defined in: [module/header.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L28)

## Methods

### close()

> **close**(): `void`

Defined in: [module/header.ts:151](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L151)

Collapses the header from its open/extended state by removing the
'open' CSS class.

#### Returns

`void`

***

### eventLogoClick()

> **eventLogoClick**(): `void`

Defined in: [module/header.ts:99](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L99)

Overridable hook called when the logo/brand element is clicked.
The default implementation logs a debug message; override this
method to implement custom navigation behavior.

#### Returns

`void`

#### Example

```ts
header.eventLogoClick = () => {
    router.navigate('/home');
};
```

***

### hide()

> **hide**(): `void`

Defined in: [module/header.ts:175](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L175)

Hides the header and removes padding adjustments from the main
container and template view.

#### Returns

`void`

#### Example

```ts
header.hide();
```

***

### hideLeftMenuButton()

> **hideLeftMenuButton**(): `void`

Defined in: [module/header.ts:205](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L205)

Hides the left menu navigation button from the header.

#### Returns

`void`

***

### hideShadow()

> **hideShadow**(): `void`

Defined in: [module/header.ts:191](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L191)

Removes the drop shadow from the header.

#### Returns

`void`

***

### hideTopMenuButton()

> **hideTopMenuButton**(): `void`

Defined in: [module/header.ts:219](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L219)

Hides the top menu toggle button from the header.

#### Returns

`void`

***

### open()

> **open**(): `void`

Defined in: [module/header.ts:143](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L143)

Expands the header to its open/extended state by adding the
'open' CSS class.

#### Returns

`void`

***

### setImage()

> **setImage**(`imagePath`): `void`

Defined in: [module/header.ts:135](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L135)

Sets the logo image source displayed in the header brand area.

#### Parameters

##### imagePath

`string`

The path or URL to the logo image.

#### Returns

`void`

#### Example

```ts
header.setImage('/assets/logo.svg');
```

***

### setTitle()

> **setTitle**(`title`): `void`

Defined in: [module/header.ts:111](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L111)

Sets the application title text displayed in the header brand area.

#### Parameters

##### title

`string`

The title HTML or text to display.

#### Returns

`void`

#### Example

```ts
header.setTitle('Dashboard');
```

***

### setUrl()

> **setUrl**(`url`): `void`

Defined in: [module/header.ts:123](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L123)

Sets the URL that the brand/logo element links to.

#### Parameters

##### url

`string`

The target URL for the brand link.

#### Returns

`void`

#### Example

```ts
header.setUrl('/home');
```

***

### show()

> **show**(): `void`

Defined in: [module/header.ts:162](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L162)

Shows the header and applies appropriate padding to the main
container and template view so content does not overlap.

#### Returns

`void`

#### Example

```ts
header.show();
```

***

### showLeftMenuButton()

> **showLeftMenuButton**(): `void`

Defined in: [module/header.ts:198](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L198)

Shows the left menu navigation button (hamburger icon) in the header.

#### Returns

`void`

***

### showShadow()

> **showShadow**(): `void`

Defined in: [module/header.ts:184](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L184)

Adds a drop shadow beneath the header.

#### Returns

`void`

***

### showTopMenuButton()

> **showTopMenuButton**(): `void`

Defined in: [module/header.ts:212](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/header.ts#L212)

Shows the top menu toggle button in the header.

#### Returns

`void`
