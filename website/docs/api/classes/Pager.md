# Class: Pager

Defined in: [component/pager.ts:31](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L31)

## Description

Pagination control that renders page numbers, previous/next navigation buttons,
and statistics (e.g. "1-10 / 100").

## Example

```ts
const pager = new Pager(containerKnot, ['.pager', '.pager-statistics'], { row_count: 25 });
pager.eventAction = (page) => fetchData(page);
pager.setCount(100);
pager.draw();
```

## See

 - [Table](Table.md) for table-based data display with built-in pagination
 - [CardCollection](CardCollection.md) for card-based data display with built-in pagination

## Constructors

### Constructor

> **new Pager**(`dom`, `opt_selectors?`, `opt_options?`): `Pager`

Defined in: [component/pager.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L46)

#### Parameters

##### dom

[`Knot`](Knot.md)

The parent DOM element containing pager selectors.

##### opt\_selectors?

`string`[] = `...`

CSS selectors for the pager and statistics elements.

##### opt\_options?

`object` = `{}`

Configuration options (row_count, pager_num).

#### Returns

`Pager`

#### Description

Creates a new Pager instance bound to pager and statistics elements within the given DOM.

## Properties

### count

> **count**: `number`

Defined in: [component/pager.ts:35](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L35)

***

### offset

> **offset**: `number`

Defined in: [component/pager.ts:38](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L38)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/pager.ts:34](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L34)

***

### page

> **page**: `number`

Defined in: [component/pager.ts:37](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L37)

***

### pageNum

> **pageNum**: `number`

Defined in: [component/pager.ts:36](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L36)

***

### pager

> **pager**: [`Knot`](Knot.md)

Defined in: [component/pager.ts:32](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L32)

***

### pagerStatistics

> **pagerStatistics**: [`Knot`](Knot.md)

Defined in: [component/pager.ts:33](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L33)

## Methods

### draw()

> **draw**(): `void`

Defined in: [component/pager.ts:276](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L276)

#### Returns

`void`

#### Description

Renders the pager statistics and page navigation buttons.

#### Example

```ts
pager.setCount(totalItems);
pager.draw();
```

***

### eventAction()

> **eventAction**(`page`): `void`

Defined in: [component/pager.ts:290](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L290)

#### Parameters

##### page

`number`

The newly selected page number.

#### Returns

`void`

#### Description

Called when a page navigation action occurs. Override to handle page changes.

#### Example

```ts
pager.eventAction = (page) => {
    fetchData({ offset: (page - 1) * rowCount });
};
```

***

### setCount()

> **setCount**(`count`): `void`

Defined in: [component/pager.ts:244](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L244)

#### Parameters

##### count

`number`

Total item count.

#### Returns

`void`

#### Description

Sets the total number of items for pagination calculation.

#### Example

```ts
pager.setCount(200);
pager.draw();
```

***

### setPage()

> **setPage**(`page`): `void`

Defined in: [component/pager.ts:264](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/pager.ts#L264)

#### Parameters

##### page

`number`

The page number to set.

#### Returns

`void`

#### Description

Sets the current page number and recalculates the row offset.

#### Example

```ts
pager.setPage(3);
```
