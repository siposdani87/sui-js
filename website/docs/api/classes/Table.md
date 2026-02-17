# Class: Table\<T\>

Defined in: [component/table.ts:72](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L72)

## Description

Data table component with sorting, paging, search, row actions, and custom
column calculations. Renders tabular data from a [Collection](Collection.md) with automatic
header/footer management.

## Example

```ts
const table = new Table(dom, 'table', {
    row_count: 20,
    columns: ['name', 'email', 'actions'],
    sorted: ['name', 'email'],
});
table.setActions([
    { style: (item) => ['edit', 'Edit'], click: (item) => editUser(item) },
]);
table.eventAction = (params) => {
    http.get('/api/users', params).then((response) => {
        table.setData(response.get('items'));
        table.setCount(response.get('count'));
    });
};
table.render();
```

## See

 - [Pager](Pager.md) for pagination controls
 - [ContentHandler](ContentHandler.md) for empty-state display
 - [Collection](Collection.md) for the underlying data collection
 - [TableCalculation](../type-aliases/TableCalculation.md) for custom column renderers

## Type Parameters

### T

`T` *extends* [`Objekt`](Objekt.md) = [`Objekt`](Objekt.md)

The row data type, must extend [Objekt](Objekt.md).

## Constructors

### Constructor

> **new Table**\<`T`\>(`dom`, `opt_selector?`, `opt_options?`): `Table`\<`T`\>

Defined in: [component/table.ts:92](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L92)

#### Parameters

##### dom

[`Knot`](Knot.md)

The parent DOM node containing the table element.

##### opt\_selector?

`string` = `'table'`

CSS selector to locate the table element.

##### opt\_options?

`object` = `{}`

Configuration options (row_count, pager_num, sort, columns, calculations, sorted, rowStyle).

#### Returns

`Table`\<`T`\>

#### Description

Creates a new Table instance bound to the table element found within the given DOM node.

## Properties

### actions

> **actions**: [`Action`](../type-aliases/Action.md)[]

Defined in: [component/table.ts:77](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L77)

***

### collection

> **collection**: [`Collection`](Collection.md)\<`T`\>

Defined in: [component/table.ts:75](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L75)

***

### contentHandler

> **contentHandler**: [`ContentHandler`](ContentHandler.md)

Defined in: [component/table.ts:78](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L78)

***

### headerKnots

> **headerKnots**: [`Query`](Query.md)\<`HTMLElement`\>

Defined in: [component/table.ts:79](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L79)

***

### headerTexts

> **headerTexts**: `string`[]

Defined in: [component/table.ts:80](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L80)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/table.ts:74](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L74)

***

### pager

> **pager**: [`Pager`](Pager.md)

Defined in: [component/table.ts:83](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L83)

***

### query

> **query**: `string`

Defined in: [component/table.ts:76](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L76)

***

### tableKnot

> **tableKnot**: [`Knot`](Knot.md)

Defined in: [component/table.ts:73](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L73)

***

### tbody

> **tbody**: [`Knot`](Knot.md)

Defined in: [component/table.ts:81](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L81)

***

### tfoot

> **tfoot**: [`Knot`](Knot.md)

Defined in: [component/table.ts:82](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L82)

## Methods

### eventAction()

> **eventAction**(`params`): `void`

Defined in: [component/table.ts:337](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L337)

#### Parameters

##### params

[`Objekt`](Objekt.md)

Contains query, column, order, offset, and limit.

#### Returns

`void`

#### Description

Called when the table needs data (on refresh, sort, page, or search). Override to fetch data.

***

### refresh()

> **refresh**(`opt_page?`): `void`

Defined in: [component/table.ts:319](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L319)

#### Parameters

##### opt\_page?

`number` = `-1`

The page number to navigate to. Pass -1 to keep the current page.

#### Returns

`void`

#### Description

Refreshes the table data by triggering [eventAction](#eventaction) with the current
query, sorting, and paging parameters.

#### Example

```ts
table.refresh(1); // reload from page 1
```

***

### render()

> **render**(): `void`

Defined in: [component/table.ts:723](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L723)

#### Returns

`void`

#### Description

Renders the table by updating the sorting state and triggering a data refresh.

#### Example

```ts
table.render();
```

***

### setActions()

> **setActions**(`actions`): `void`

Defined in: [component/table.ts:505](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L505)

#### Parameters

##### actions

[`Action`](../type-aliases/Action.md)[]

Array of action descriptors with style and click callbacks.

#### Returns

`void`

#### Description

Sets the row action definitions displayed in each row's actions column.

#### Example

```ts
table.setActions([
    { style: (item) => ['edit', 'Edit'], click: (item) => editItem(item) },
    { style: (item) => ['delete', 'Delete'], click: (item) => deleteItem(item) },
]);
```

***

### setCount()

> **setCount**(`count`): `void`

Defined in: [component/table.ts:685](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L685)

#### Parameters

##### count

`number`

The total number of items across all pages.

#### Returns

`void`

#### Description

Sets the total item count and redraws the pager controls.

#### Example

```ts
table.setCount(150);
```

***

### setData()

> **setData**(`items`): `void`

Defined in: [component/table.ts:667](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/table.ts#L667)

#### Parameters

##### items

`any`[]

Array of row data objects to display.

#### Returns

`void`

#### Description

Loads data items into the table and redraws the body. Shows the empty-state
content handler if the collection is empty.

#### Example

```ts
table.setData([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
```
