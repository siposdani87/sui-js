# Class: Helper

Defined in: [module/helper.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L46)

UI element factory for creating and enhancing styled links, buttons,
and icon buttons with Material Design Lite classes. Helper provides
a consistent API for building interactive UI elements with click
handlers, tooltips, and access control.

Methods follow a triplet pattern for each element type:
- `create*()` -- Creates a new DOM element from scratch.
- `*()` -- Selects an existing element by CSS selector and enhances it.
- `multiple*()` -- Selects and enhances all matching elements.

Each method supports an `opt_allowAccess` parameter that removes
the element from the DOM when set to `false`, and an
`opt_description` parameter for adding a [Tooltip](Tooltip.md).

## Example

```ts
const helper = new Helper();

// Create a new link element
const link = helper.createLink('Click me', (href, knot) => {
    console.log('Clicked:', href);
});

// Enhance an existing button in the DOM
helper.button('.save-btn', containerKnot, (id, button) => {
    console.log('Saving...');
}, 'Save changes');

// Create an icon button with a Material icon
const iconBtn = helper.createIconButton('delete', (id, button) => {
    console.log('Deleted');
}, 'Delete item');
```

## See

 - [Knot](Knot.md)
 - [Query](Query.md)
 - [Tooltip](Tooltip.md)

## Constructors

### Constructor

> **new Helper**(): `Helper`

#### Returns

`Helper`

## Methods

### button()

> **button**(`selector`, `dom`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:299](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L299)

Selects a single element matching the CSS selector within the
given DOM container and enhances it as a button via
[buttonElement](#buttonelement).

#### Parameters

##### selector

`string`

CSS selector to match the button element.

##### dom

[`Knot`](Knot.md)

The parent [Knot](Knot.md) to search within.

##### callback

(`id`, `button`) => `void`

Called with the button's ID and the [Knot](Knot.md)
    when clicked.

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

Additional MDL CSS classes to add.

`string`[] | `undefined`

#### Returns

[`Knot`](Knot.md)

The selected and enhanced button [Knot](Knot.md).

#### Example

```ts
const btn = helper.button('.submit-btn', formKnot, (id, button) => {
    console.log('Submitting form...');
}, 'Submit form');
```

***

### buttonElement()

> **buttonElement**(`buttonKnot`, `opt_callback?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:336](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L336)

Enhances an existing button [Knot](Knot.md) with Material Design Lite
classes, click handling, and a tooltip. Applies base MDL button
classes (`mdl-button`, `mdl-js-button`, `mdl-js-ripple-effect`,
`mdl-button--raised`) plus any additional classes provided.

When the element already has an ID, existing CSS classes and click
listeners are removed before re-applying. When `opt_allowAccess`
is `false`, the element is removed from the DOM entirely.

#### Parameters

##### buttonKnot

[`Knot`](Knot.md)

The button [Knot](Knot.md) to enhance.

##### opt\_callback?

(`id`, `button`) => `void`

Called with the button's ID and the
    [Knot](Knot.md) when clicked.

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

Additional MDL CSS classes to add.

`string`[] | `undefined`

#### Returns

`void`

***

### createButton()

> **createButton**(`name`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:231](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L231)

Creates a new `<button>` element with the given display name
and enhances it with Material Design Lite classes, click handling,
and a tooltip via [buttonElement](#buttonelement).

#### Parameters

##### name

`string`

The text content to display inside the button.

##### callback

(`id`, `button`) => `void`

Called with the button's ID and the [Knot](Knot.md)
    when clicked.

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

Additional MDL CSS classes to add.

`string`[] | `undefined`

#### Returns

[`Knot`](Knot.md)

The created button [Knot](Knot.md).

#### Example

```ts
const btn = helper.createButton('Save', (id, button) => {
    console.log('Button clicked:', id);
}, 'Save the form');
```

***

### createIconButton()

> **createIconButton**(`iconName`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:393](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L393)

Creates a new `<button>` element with a Material icon and enhances
it with icon button styling, click handling, and a tooltip via
[iconButtonElement](#iconbuttonelement).

#### Parameters

##### iconName

`string`

The Material icon name (e.g., `'delete'`, `'edit'`).

##### callback

(`id`, `button`) => `void`

Called with the button's ID and the [Knot](Knot.md)
    when clicked.

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

Additional MDL CSS classes for icon button
    styling.

`string`[] | `undefined`

#### Returns

[`Knot`](Knot.md)

The created icon button [Knot](Knot.md).

#### Example

```ts
const deleteBtn = helper.createIconButton('delete', (id, button) => {
    console.log('Delete clicked');
}, 'Delete this item');
```

***

### createLink()

> **createLink**(`name`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:68](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L68)

Creates a new anchor (`<a>`) element with the given display name
and enhances it with click handling, tooltip, and CSS classes
via [linkElement](#linkelement).

#### Parameters

##### name

`string`

The text content to display inside the link.

##### opt\_callback

(`href`, `linkKnot`) => `void` \| `undefined`

Called with the link's `href` and the
    [Knot](Knot.md) when clicked.

##### opt\_href?

The URL for the `href` attribute. Defaults to
    `'javascript:void(0)'`.

`string` | `undefined`

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

CSS classes to add to the link element.

`string`[] | `undefined`

#### Returns

[`Knot`](Knot.md)

The created anchor [Knot](Knot.md).

#### Example

```ts
const link = helper.createLink('Home', (href, knot) => {
    console.log('Navigate to:', href);
}, '/home', 'Go to homepage');
```

***

### iconButton()

> **iconButton**(`selector`, `dom`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:471](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L471)

Selects a single element matching the CSS selector within the
given DOM container and enhances it as an icon button via
[iconButtonElement](#iconbuttonelement).

#### Parameters

##### selector

`string`

CSS selector to match the icon button element.

##### dom

[`Knot`](Knot.md)

The parent [Knot](Knot.md) to search within.

##### callback

(`id`, `button`) => `void`

Called with the button's ID and the [Knot](Knot.md)
    when clicked.

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

Additional MDL CSS classes for icon button
    styling.

`string`[] | `undefined`

#### Returns

[`Knot`](Knot.md)

The selected and enhanced icon button [Knot](Knot.md).

#### Example

```ts
const editBtn = helper.iconButton('.edit-btn', containerKnot,
    (id, button) => {
        console.log('Editing...');
    },
    'Edit item',
);
```

***

### iconButtonElement()

> **iconButtonElement**(`buttonKnot`, `opt_callback?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:513](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L513)

Enhances an existing button [Knot](Knot.md) with icon button styling.
Applies base MDL classes (`mdl-button`, `mdl-js-button`,
`mdl-js-ripple-effect`, `mdl-button--icon`) plus any additional
classes provided.

When the element already has an ID, existing CSS classes and click
listeners are removed before re-applying. When `opt_allowAccess`
is `false`, the element is removed from the DOM entirely.

#### Parameters

##### buttonKnot

[`Knot`](Knot.md)

The button [Knot](Knot.md) to enhance.

##### opt\_callback?

(`id`, `button`) => `void`

Called with the button's ID and the
    [Knot](Knot.md) when clicked.

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

Additional MDL CSS classes for icon button
    styling.

`string`[] | `undefined`

#### Returns

`void`

***

### link()

> **link**(`selector`, `dom`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)

Defined in: [module/helper.ts:139](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L139)

Selects a single element matching the CSS selector within the
given DOM container and enhances it as a link via
[linkElement](#linkelement).

#### Parameters

##### selector

`string`

CSS selector to match the link element.

##### dom

[`Knot`](Knot.md)

The parent [Knot](Knot.md) to search within.

##### opt\_callback

(`href`, `linkKnot`) => `void` \| `undefined`

Called with the link's `href` and the
    [Knot](Knot.md) when clicked.

##### opt\_href?

The URL for the `href` attribute.

`string` | `undefined`

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

CSS classes to add to the link element.

`string`[] | `undefined`

#### Returns

[`Knot`](Knot.md)

The selected and enhanced anchor [Knot](Knot.md).

#### Example

```ts
const link = helper.link('.nav-home', containerKnot, (href, knot) => {
    router.navigate(href);
}, '/home', 'Go to homepage');
```

***

### linkElement()

> **linkElement**(`linkKnot`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:178](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L178)

Enhances an existing anchor [Knot](Knot.md) with CSS classes, click
handling, and a tooltip. Generates an ID if the element does not
have one. If the element already has an ID, existing click
listeners are removed before attaching the new handler.

When `opt_allowAccess` is `false`, the element is removed from
the DOM entirely.

#### Parameters

##### linkKnot

[`Knot`](Knot.md)

The anchor [Knot](Knot.md) to enhance.

##### opt\_callback

(`href`, `linkKnot`) => `void` \| `undefined`

Called with the link's `href` and the
    [Knot](Knot.md) when clicked.

##### opt\_href?

The URL for the `href` attribute.

`string` | `undefined`

##### opt\_description?

Tooltip text shown on hover.

`string` | `undefined`

##### opt\_allowAccess?

When `false`, the element is removed
    from the DOM instead of being enhanced.

`boolean` | `undefined`

##### opt\_cssClasses?

CSS classes to add to the link element.

`string`[] | `undefined`

#### Returns

`void`

***

### multipleButton()

> **multipleButton**(`selector`, `dom`, `opt_callback?`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:261](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L261)

Selects all elements matching the CSS selector within the given
DOM container and enhances each as a button via
[buttonElement](#buttonelement).

#### Parameters

##### selector

`string`

CSS selector to match button elements.

##### dom

[`Knot`](Knot.md)

The parent [Knot](Knot.md) to search within.

##### opt\_callback?

(`id`, `button`) => `void`

Called with the button's ID and the
    [Knot](Knot.md) when any matched button is clicked.

##### opt\_cssClasses?

Additional MDL CSS classes to add.

`string`[] | `undefined`

#### Returns

`void`

***

### multipleIconButton()

> **multipleIconButton**(`selector`, `dom`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:426](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L426)

Selects all elements matching the CSS selector within the given
DOM container and enhances each as an icon button via
[iconButtonElement](#iconbuttonelement).

#### Parameters

##### selector

`string`

CSS selector to match icon button elements.

##### dom

[`Knot`](Knot.md)

The parent [Knot](Knot.md) to search within.

##### opt\_cssClasses?

Additional MDL CSS classes for icon button
    styling.

`string`[] | `undefined`

#### Returns

`void`

***

### multipleLink()

> **multipleLink**(`selector`, `dom`, `opt_callback`, `opt_cssClasses?`): `void`

Defined in: [module/helper.ts:99](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L99)

Selects all elements matching the CSS selector within the given
DOM container and enhances each as a link via [linkElement](#linkelement).

#### Parameters

##### selector

`string`

CSS selector to match link elements.

##### dom

[`Knot`](Knot.md)

The parent [Knot](Knot.md) to search within.

##### opt\_callback

(`href`, `linkKnot`) => `void` \| `undefined`

Called with the link's `href` and the
    [Knot](Knot.md) when any matched link is clicked.

##### opt\_cssClasses?

CSS classes to add to each matched element.

`string`[] | `undefined`

#### Returns

`void`

***

### setGravatar()

> **setGravatar**(`imageKnot`, `defaultImageUrl`, `email`, `opt_size?`, `opt_rating?`): `void`

Defined in: [module/helper.ts:605](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/helper.ts#L605)

Sets a Gravatar image on the given image [Knot](Knot.md) based on
the provided email address. Uses MD5 hashing of the email for
the Gravatar URL. Falls back to the provided default image URL
if the Gravatar request returns a 404.

#### Parameters

##### imageKnot

[`Knot`](Knot.md)

The image [Knot](Knot.md) to set the `src` on.

##### defaultImageUrl

`string`

Fallback image URL used when no Gravatar
    exists for the email.

##### email

`string`

The email address to generate the Gravatar from.

##### opt\_size?

The requested image size in pixels. Defaults to 500.

`number` | `undefined`

##### opt\_rating?

The content rating filter. Defaults to `'g'`.

`string` | `undefined`

#### Returns

`void`

#### Example

```ts
const img = new Knot('img');
helper.setGravatar(img, '/default-avatar.png', 'user@example.com');
```
