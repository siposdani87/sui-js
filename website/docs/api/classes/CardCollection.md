# Class: CardCollection

Defined in: [component/cardCollection.ts:27](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L27)

## Description

Card-based data display component with template rendering and pagination.
Renders data items as cards using an HTML template element, with built-in
paging and empty-content handling.

## Example

```ts
const cards = new CardCollection(containerKnot, '.card-collection', ctrl, { row_count: 12 });
cards.eventAction = (params) => http.get('/api/items', params);
cards.render();
```

## See

 - [Pager](Pager.md) for the pagination control
 - [ContentHandler](ContentHandler.md) for the empty-content placeholder
 - [Collection](Collection.md) for the underlying data collection

## Constructors

### Constructor

> **new CardCollection**(`dom`, `opt_selector?`, `opt_ctrl?`, `opt_options?`): `CardCollection`

Defined in: [component/cardCollection.ts:48](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L48)

#### Parameters

##### dom

[`Knot`](Knot.md)

The parent DOM element.

##### opt\_selector?

`string` = `'.card-collection'`

CSS selector for the card collection container.

##### opt\_ctrl?

Controller object for template expression evaluation.

`object` | `null`

##### opt\_options?

`object` = `{}`

Configuration options (row_count, pager_num, sort, no_content).

#### Returns

`CardCollection`

#### Description

Creates a new CardCollection bound to a DOM container with optional controller and options.

## Properties

### body

> **body**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:35](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L35)

***

### cardCollectionKnot

> **cardCollectionKnot**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L28)

***

### cardFooterKnot

> **cardFooterKnot**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:36](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L36)

***

### cardTemplate

> **cardTemplate**: [`Knot`](Knot.md)\<`HTMLTemplateElement`\>

Defined in: [component/cardCollection.ts:38](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L38)

***

### collection

> **collection**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/cardCollection.ts:31](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L31)

***

### contentHandler

> **contentHandler**: [`ContentHandler`](ContentHandler.md)

Defined in: [component/cardCollection.ts:34](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L34)

***

### ctrl

> **ctrl**: `any`

Defined in: [component/cardCollection.ts:29](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L29)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/cardCollection.ts:30](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L30)

***

### pager

> **pager**: [`Pager`](Pager.md)

Defined in: [component/cardCollection.ts:33](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L33)

***

### pagerKnot

> **pagerKnot**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:37](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L37)

***

### query

> **query**: `string`

Defined in: [component/cardCollection.ts:32](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L32)

***

### template

> **template**: `string`

Defined in: [component/cardCollection.ts:39](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L39)

## Methods

### eventAction()

> **eventAction**(`params`): `void`

Defined in: [component/cardCollection.ts:217](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L217)

#### Parameters

##### params

[`Objekt`](Objekt.md)

Query parameters including query, column, order, offset, and limit.

#### Returns

`void`

#### Description

Called when data needs to be fetched. Override to load data from a backend.

#### Example

```ts
cards.eventAction = (params) => {
    http.get('/api/items', params).then((response) => cards.setData(response.items));
};
```

***

### eventCardKnot()

> **eventCardKnot**(`cardKnot`, `item`): `void`

Defined in: [component/cardCollection.ts:231](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L231)

#### Parameters

##### cardKnot

[`Knot`](Knot.md)

The rendered card DOM element.

##### item

[`Objekt`](Objekt.md)

The data item associated with the card.

#### Returns

`void`

#### Description

Called after each card is rendered. Override to attach event listeners or modify card DOM.

#### Example

```ts
cards.eventCardKnot = (cardKnot, item) => {
    cardKnot.addEventListener('click', () => navigate(item.get('id')));
};
```

***

### refresh()

> **refresh**(`opt_page?`): `void`

Defined in: [component/cardCollection.ts:194](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L194)

#### Parameters

##### opt\_page?

`number` = `-1`

Page number to navigate to before refreshing (-1 keeps current page).

#### Returns

`void`

#### Description

Refreshes the card collection by triggering eventAction with current query, sort, and paging params.

#### Example

```ts
cards.refresh(1); // Refresh from page 1
```

***

### render()

> **render**(): `void`

Defined in: [component/cardCollection.ts:307](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L307)

#### Returns

`void`

#### Description

Initiates the initial data fetch and render cycle.

#### Example

```ts
cards.render();
```

***

### setCount()

> **setCount**(`count`): `void`

Defined in: [component/cardCollection.ts:270](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L270)

#### Parameters

##### count

`number`

Total number of items across all pages.

#### Returns

`void`

#### Description

Sets the total item count and redraws the pager.

#### Example

```ts
cards.setCount(response.total);
```

***

### setData()

> **setData**(`items`): `void`

Defined in: [component/cardCollection.ts:253](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/cardCollection.ts#L253)

#### Parameters

##### items

`any`[]

Array of data items to display.

#### Returns

`void`

#### Description

Loads data items into the collection and renders cards, or shows the empty-content placeholder.

#### Example

```ts
cards.setData([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
```
