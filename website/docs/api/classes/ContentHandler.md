# Class: ContentHandler

Defined in: [component/contentHandler.ts:18](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/contentHandler.ts#L18)

## Description

"No content" placeholder handler that displays an image and/or text message
when a data container is empty, and hides itself when content is present.

## Example

```ts
const handler = new ContentHandler(containerKnot, { image_url: '/empty.svg', text: 'No items found' });
handler.show(); // Display placeholder
handler.hide(); // Hide placeholder, show container
```

## See

 - [Table](Table.md) for table components that use ContentHandler
 - [CardCollection](CardCollection.md) for card components that use ContentHandler

## Constructors

### Constructor

> **new ContentHandler**(`containerKnot`, `opt_options?`): `ContentHandler`

Defined in: [component/contentHandler.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/contentHandler.ts#L28)

#### Parameters

##### containerKnot

[`Knot`](Knot.md)

The data container element to manage visibility for.

##### opt\_options?

`object` = `{}`

Configuration options (image_url, text).

#### Returns

`ContentHandler`

#### Description

Creates a new ContentHandler attached to a container element.

## Properties

### containerKnot

> **containerKnot**: [`Knot`](Knot.md)

Defined in: [component/contentHandler.ts:19](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/contentHandler.ts#L19)

***

### contentKnot

> **contentKnot**: [`Knot`](Knot.md)

Defined in: [component/contentHandler.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/contentHandler.ts#L21)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/contentHandler.ts:20](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/contentHandler.ts#L20)

## Methods

### hide()

> **hide**(): `void`

Defined in: [component/contentHandler.ts:85](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/contentHandler.ts#L85)

#### Returns

`void`

#### Description

Hides the placeholder and shows the data container.

#### Example

```ts
handler.hide();
```

***

### show()

> **show**(): `void`

Defined in: [component/contentHandler.ts:74](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/contentHandler.ts#L74)

#### Returns

`void`

#### Description

Shows the placeholder and hides the data container.

#### Example

```ts
if (items.length === 0) { handler.show(); }
```
