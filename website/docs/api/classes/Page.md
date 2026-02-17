# Class: Page

Defined in: [module/page.ts:32](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/page.ts#L32)

Document-level utilities for managing the page title, handling
document-wide click events, and triggering common browser actions
such as opening the email client.

Page registers a document-level click listener that wraps the event
target in a [Knot](Knot.md) and dispatches to the overridable
[eventClick](#eventclick) method. This enables centralized click handling
for analytics, delegation, or global UI behaviors.

## Example

```ts
const page = new Page();

page.setTitle('My Application');

page.eventClick = (target, event) => {
    if (target.hasClass('track')) {
        analytics.trackClick(target);
    }
};

page.mailTo('support@example.com', 'Help Request');
```

## See

 - [Knot](Knot.md)
 - [Objekt](Objekt.md)

## Constructors

### Constructor

> **new Page**(`opt_options?`): `Page`

Defined in: [module/page.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/page.ts#L42)

Creates a new Page instance and registers a document-level click
event listener.

#### Parameters

##### opt\_options?

Configuration options to merge with defaults.

`object` | `undefined`

#### Returns

`Page`

## Properties

### document

> **document**: `Document`

Defined in: [module/page.ts:34](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/page.ts#L34)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/page.ts:33](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/page.ts#L33)

## Methods

### eventClick()

> **eventClick**(`target`, `event`): `void`

Defined in: [module/page.ts:89](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/page.ts#L89)

Called when any element in the document is clicked. Override this
method to implement centralized click handling such as event
delegation, analytics tracking, or global UI behaviors.

#### Parameters

##### target

[`Knot`](Knot.md)

The clicked element wrapped in a [Knot](Knot.md).

##### event

`Event`

The native click event.

#### Returns

`void`

***

### mailTo()

> **mailTo**(`email`, `opt_subject?`): `void`

Defined in: [module/page.ts:104](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/page.ts#L104)

Opens the user's default email client with a new message
pre-addressed to the given email and optionally pre-filled
with a subject line.

#### Parameters

##### email

`string`

The recipient email address.

##### opt\_subject?

The email subject line. Defaults to empty.

`string` | `undefined`

#### Returns

`void`

#### Example

```ts
page.mailTo('support@example.com', 'Bug Report');
```

***

### setTitle()

> **setTitle**(`title`): `void`

Defined in: [module/page.ts:77](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/page.ts#L77)

Sets the document title displayed in the browser tab.

#### Parameters

##### title

`string`

The page title string to display.

#### Returns

`void`

#### Example

```ts
page.setTitle('Dashboard - My App');
```
