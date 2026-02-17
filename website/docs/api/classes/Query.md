# Class: Query\<T\>

Defined in: [core/query.ts:28](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/query.ts#L28)

A DOM query result collection that selects elements matching a CSS selector
and wraps them as [Knot](Knot.md) instances within a [Collection](Collection.md).

Query uses an optimized querySelector helper that dispatches to the
fastest native DOM method available for the given selector string:
`getElementById`, `getElementsByClassName`, `getElementsByTagName`, or
`querySelectorAll` for complex selectors.

## Example

```ts
// Select all list items inside a container
const items = new Query<HTMLLIElement>('ul.menu li');
const firstItem = items.getKnot();

// Select within a specific parent element
const container = new Knot<HTMLDivElement>('.sidebar');
const links = new Query<HTMLAnchorElement>('a', container);
const allLinks = links.getKnots();
```

## See

 - [Collection](Collection.md)
 - [Knot](Knot.md)

## Extends

- [`Collection`](Collection.md)\<[`Knot`](Knot.md)\<`T`\>\>

## Type Parameters

### T

`T` *extends* `HTMLElement` = `HTMLElement`

## Constructors

### Constructor

> **new Query**\<`T`\>(`selector`, `opt_element?`): `Query`\<`T`\>

Defined in: [core/query.ts:39](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/query.ts#L39)

Creates a new Query by selecting DOM elements matching the given CSS
selector and wrapping each result in a [Knot](Knot.md).

#### Parameters

##### selector

`string`

CSS selector string used to find matching elements.

##### opt\_element?

Parent element or [Knot](Knot.md) to scope the query
    within. Defaults to the document root when omitted.

`HTMLElement` | [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

`Query`\<`T`\>

#### Overrides

[`Collection`](Collection.md).[`constructor`](Collection.md#constructor)

## Properties

### items

> **items**: [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:41](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L41)

#### Inherited from

[`Collection`](Collection.md).[`items`](Collection.md#items)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L42)

#### Inherited from

[`Form`](Form.md).[`options`](Form.md#options)

***

### Type

> **Type**: `any`

Defined in: [core/collection.ts:40](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L40)

#### Inherited from

[`Form`](Form.md).[`Type`](Form.md#type)

## Methods

### clear()

> **clear**(): `void`

Defined in: [core/collection.ts:355](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L355)

Removes all items from the collection, resetting its size to zero.

#### Returns

`void`

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
col.clear();
col.size(); // 0
```

#### Inherited from

[`Collection`](Collection.md).[`clear`](Collection.md#clear)

***

### delete()

> **delete**(`value`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:475](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L475)

Removes the first item that is strictly equal to the given value
(reference equality via [eq](../functions/eq.md)).

#### Parameters

##### value

The item reference to delete.

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The deleted item, or `null` if not found.

#### Example

```ts
const col = new Collection([{ id: 1 }]);
const item = col.get(0);
col.delete(item);
col.size(); // 0
```

#### Inherited from

[`Collection`](Collection.md).[`delete`](Collection.md#delete)

***

### deleteAllBy()

> **deleteAllBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:561](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L561)

Removes all items where the given attribute equals the specified value.

#### Parameters

##### attribute

`string`

Dot-notation attribute path to compare.

##### value

`any`

The value to match against.

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

Array of all deleted items.

#### Example

```ts
const col = new Collection([
    { id: 1, role: 'user' },
    { id: 2, role: 'admin' },
    { id: 3, role: 'user' },
]);
const deleted = col.deleteAllBy('role', 'user');
deleted.length; // 2
col.size();     // 1
```

#### Inherited from

[`Collection`](Collection.md).[`deleteAllBy`](Collection.md#deleteallby)

***

### deleteAllByCondition()

> **deleteAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:583](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L583)

Removes all items for which the condition callback returns `true`.
The internal array is rebuilt to contain only non-matching items.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to delete the item.

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

Array of all deleted items.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
const deleted = col.deleteAllByCondition(
    (item) => item.get('id') % 2 !== 0,
);
deleted.length; // 2 (ids 1 and 3)
col.size();     // 1 (id 2 remains)
```

#### Inherited from

[`Collection`](Collection.md).[`deleteAllByCondition`](Collection.md#deleteallbycondition)

***

### deleteBy()

> **deleteBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:514](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L514)

Removes the first item where the given attribute equals the specified
value.

#### Parameters

##### attribute

`string`

Dot-notation attribute path to compare.

##### value

`any`

The value to match against.

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The deleted item, or `null` if no match was found.

#### Example

```ts
const col = new Collection([
    { id: 1, role: 'admin' },
    { id: 2, role: 'user' },
]);
col.deleteBy('role', 'user');
col.size(); // 1
```

#### Inherited from

[`Collection`](Collection.md).[`deleteBy`](Collection.md#deleteby)

***

### deleteByCondition()

> **deleteByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:534](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L534)

Removes the first item for which the condition callback returns `true`.
The item is spliced from the internal array and returned.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to delete the item.

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The deleted item, or `null` if no match was found.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
const deleted = col.deleteByCondition((item) => item.get('id') === 2);
deleted.get('id'); // 2
col.size();        // 2
```

#### Inherited from

[`Collection`](Collection.md).[`deleteByCondition`](Collection.md#deletebycondition)

***

### deleteById()

> **deleteById**(`id`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:494](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L494)

Removes the first item whose configured ID attribute matches the
given value.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The identifier of the item to remove.

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The deleted item, or `null` if no match was found.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
const deleted = col.deleteById(1);
deleted.get('id'); // 1
col.size();        // 1
```

#### Inherited from

[`Collection`](Collection.md).[`deleteById`](Collection.md#deletebyid)

***

### each()

> **each**(`next`): `void`

Defined in: [core/collection.ts:283](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L283)

Iterates over every item in the collection, invoking the callback for
each one. This is a convenience wrapper around [Collection.iterator](Collection.md#iterator)
that accepts all items.

#### Parameters

##### next

(`_item`, `_index`) => `void`

Function invoked with `(item, index)` for each
    item.

#### Returns

`void`

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
col.each((item, index) => {
    console.log(index, item.get('id'));
});
// Logs: 0 1, 1 2
```

#### Inherited from

[`Collection`](Collection.md).[`each`](Collection.md#each)

***

### findAllBy()

> **findAllBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:434](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L434)

Returns all items where the given attribute equals the specified value
(strict equality).

#### Parameters

##### attribute

`string`

Dot-notation attribute path to compare.

##### value

`any`

The value to match against.

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

Array of all matching items (may be empty).

#### Example

```ts
const col = new Collection([
    { id: 1, role: 'user' },
    { id: 2, role: 'admin' },
    { id: 3, role: 'user' },
]);
col.findAllBy('role', 'user').length; // 2
```

#### Inherited from

[`Collection`](Collection.md).[`findAllBy`](Collection.md#findallby)

***

### findAllByCondition()

> **findAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:452](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L452)

Returns all items for which the condition callback returns `true`.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to include the item.

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

Array of all matching items (may be empty).

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
const items = col.findAllByCondition((item) => item.get('id') >= 2);
items.length; // 2
```

#### Inherited from

[`Collection`](Collection.md).[`findAllByCondition`](Collection.md#findallbycondition)

***

### findBy()

> **findBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:391](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L391)

Finds the first item where the given attribute equals the specified
value (strict equality).

#### Parameters

##### attribute

`string`

Dot-notation attribute path to compare.

##### value

`any`

The value to match against.

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The first matching item, or `null` if not found.

#### Example

```ts
const col = new Collection([
    { id: 1, role: 'admin' },
    { id: 2, role: 'user' },
]);
col.findBy('role', 'admin').get('id'); // 1
```

#### Inherited from

[`Collection`](Collection.md).[`findBy`](Collection.md#findby)

***

### findByCondition()

> **findByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:410](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L410)

Finds the first item for which the condition callback returns `true`.
Items are tested sequentially from index 0.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to select the item.

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The first matching item, or `null` if none match.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
const item = col.findByCondition((item) => item.get('id') > 1);
item.get('id'); // 2
```

#### Inherited from

[`Collection`](Collection.md).[`findByCondition`](Collection.md#findbycondition)

***

### findById()

> **findById**(`id`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:372](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L372)

Finds the first item whose configured ID attribute matches the given
value.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The identifier value to search for (compared with
    strict equality).

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The matching item, or `null` if not found.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
col.findById(2).get('id'); // 2
col.findById(99);          // null
```

#### Inherited from

[`Collection`](Collection.md).[`findById`](Collection.md#findbyid)

***

### get()

> **get**\<`K`\>(`index`, `opt_attribute?`): [`Knot`](Knot.md)\<`T`\> \| `K` \| `null`

Defined in: [core/collection.ts:307](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L307)

Returns the item at the given index. If `opt_attribute` is provided
and the item is an [Objekt](Objekt.md), the attribute value is extracted
and returned instead of the item itself.

#### Type Parameters

##### K

`K` = [`Knot`](Knot.md)\<`T`\>

The type of the extracted attribute value.

#### Parameters

##### index

`number`

Zero-based index of the item to retrieve.

##### opt\_attribute?

`string`

Optional dot-notation attribute to
    extract from the item via [Objekt.get](Objekt.md#get).

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `K` \| `null`

The item, the extracted attribute value, or
    `null` if the index is out of bounds.

#### Example

```ts
const col = new Collection([{ id: 1, name: 'Alice' }]);
col.get(0);           // Objekt { id: 1, name: 'Alice' }
col.get(0, 'name');   // 'Alice'
col.get(99);          // null
```

#### Inherited from

[`Collection`](Collection.md).[`get`](Collection.md#get)

***

### getById()

> **getById**\<`K`\>(`id`, `opt_attribute?`): [`Knot`](Knot.md)\<`T`\> \| `K` \| `null`

Defined in: [core/collection.ts:339](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L339)

Finds an item by its ID and optionally extracts an attribute value.
Combines [Collection.findById](Collection.md#findbyid) and [Objekt.get](Objekt.md#get) in a
single call.

#### Type Parameters

##### K

`K` = [`Knot`](Knot.md)\<`T`\>

The type of the extracted attribute value.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The identifier value to search for.

##### opt\_attribute?

`string`

Optional dot-notation attribute to
    extract from the found item.

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `K` \| `null`

The item, the extracted attribute value, or
    `null` if no item matches.

#### Example

```ts
const col = new Collection([{ id: 1, name: 'Alice' }]);
col.getById(1);           // Objekt { id: 1, name: 'Alice' }
col.getById(1, 'name');   // 'Alice'
col.getById(999);         // null
```

#### Inherited from

[`Collection`](Collection.md).[`getById`](Collection.md#getbyid)

***

### getItems()

> **getItems**(): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:225](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L225)

Returns the raw internal array of items. The returned array is the
same reference used internally, so mutations will affect the
collection.

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

The internal items array.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
col.getItems().length; // 2
```

#### Inherited from

[`Collection`](Collection.md).[`getItems`](Collection.md#getitems)

***

### getKnot()

> **getKnot**(): [`Knot`](Knot.md)\<`T`\>

Defined in: [core/query.ts:61](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/query.ts#L61)

Returns the first matched element as a [Knot](Knot.md). If the query
matched no elements, returns an empty Knot (wrapping `null`).

#### Returns

[`Knot`](Knot.md)\<`T`\>

The first matched DOM element wrapped in a [Knot](Knot.md), or
    an empty Knot if no elements matched.

#### Example

```ts
const header = new Query<HTMLHeadingElement>('h1').getKnot();
console.log(header.getNode().textContent);
```

***

### getKnots()

> **getKnots**(): [`Knot`](Knot.md)\<`HTMLElement`\>[]

Defined in: [core/query.ts:78](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/query.ts#L78)

Returns all matched elements as an array of [Knot](Knot.md) instances.

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>[]

An array of all matched DOM elements, each wrapped in a
    [Knot](Knot.md).

#### Example

```ts
const buttons = new Query<HTMLButtonElement>('button').getKnots();
buttons.forEach((knot) => knot.addClass('styled'));
```

***

### iterator()

> **iterator**(`callback`, `next`, `opt_items?`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:252](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L252)

Core iteration method that filters and processes items in a single
pass. The `callback` predicate determines which items to include, and
the `next` function is invoked for each matching item. Returns the
array of matching items.

#### Parameters

##### callback

(`_item`) => `boolean`

Predicate receiving an item; return `true`
    to include it.

##### next

(`_item`, `_index`) => `void`

Function invoked with `(item, index)` for each
    matching item.

##### opt\_items?

[`Knot`](Knot.md)\<`T`\>[]

Items to iterate over; defaults to the
    collection's internal array.

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

Array of items that matched the callback predicate.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }, { id: 3 }]);
const evens = col.iterator(
    (item) => item.get('id') % 2 === 0,
    (item) => console.log(item.get('id')),
);
// Logs: 2
// evens.length === 1
```

#### Inherited from

[`Collection`](Collection.md).[`iterator`](Collection.md#iterator)

***

### limit()

> **limit**(`offset`, `opt_count?`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:625](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L625)

Returns a slice of the collection's items for pagination. The slice
starts at `offset` and contains up to `opt_count` items.

#### Parameters

##### offset

`number`

Zero-based starting index of the slice.

##### opt\_count?

`number` = `10`

Maximum number of items to return.

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

The sliced subset of items.

#### Example

```ts
const col = new Collection([
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
]);
col.limit(1, 2); // [Objekt{id:2}, Objekt{id:3}]
col.limit(3);    // [Objekt{id:4}, Objekt{id:5}]
```

#### Inherited from

[`Collection`](Collection.md).[`limit`](Collection.md#limit)

***

### load()

> **load**(`objects`): `void`

Defined in: [core/collection.ts:102](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L102)

Appends each object in the array to this collection. Plain objects are
automatically wrapped via the configured `Type` constructor.

#### Parameters

##### objects

(`object` \| [`Knot`](Knot.md)\<`T`\>)[]

Items to add to the collection.

#### Returns

`void`

#### Example

```ts
const col = new Collection();
col.load([{ id: 1 }, { id: 2 }]);
col.size(); // 2
```

#### Inherited from

[`Collection`](Collection.md).[`load`](Collection.md#load)

***

### push()

> **push**(`object`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L138)

Adds a single item to the end of the collection. If the item is a
plain object (not already an instance of `Type`), it is wrapped via
the configured constructor.

#### Parameters

##### object

The item or plain object to add.

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)

The item as stored in the collection (possibly wrapped).

#### Example

```ts
const col = new Collection();
const item = col.push({ id: 5, name: 'Eve' });
item.get('name'); // 'Eve'
```

#### Inherited from

[`Collection`](Collection.md).[`push`](Collection.md#push)

***

### reload()

> **reload**(`objects`): `void`

Defined in: [core/collection.ts:120](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L120)

Clears all existing items and loads the given objects, effectively
replacing the entire collection contents.

#### Parameters

##### objects

(`object` \| [`Knot`](Knot.md)\<`T`\>)[]

Items to populate the collection
    with after clearing.

#### Returns

`void`

#### Example

```ts
const col = new Collection([{ id: 1 }]);
col.reload([{ id: 2 }, { id: 3 }]);
col.size(); // 2
```

#### Inherited from

[`Collection`](Collection.md).[`reload`](Collection.md#reload)

***

### replace()

> **replace**(`object`): [`Knot`](Knot.md)\<`T`\> \| `null`

Defined in: [core/collection.ts:201](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L201)

Finds an existing item by its ID and merges the given object's
properties into it. This is useful for updating an item in-place
without changing its reference in the collection.

#### Parameters

##### object

The object containing updated properties
    and an ID matching an existing item.

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `null`

The updated item if found, or `null` if no item
    with a matching ID exists.

#### Example

```ts
const col = new Collection([{ id: 1, name: 'Alice' }]);
col.replace({ id: 1, name: 'Alicia' });
col.findById(1).get('name'); // 'Alicia'
```

#### Inherited from

[`Collection`](Collection.md).[`replace`](Collection.md#replace)

***

### set()

> **set**(`index`, `object`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:176](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L176)

Sets an item at a specific index in the collection. If the index is
within the current bounds, the existing item is replaced. If the index
is out of bounds, the item is appended via [Collection.push](Collection.md#push).

#### Parameters

##### index

`number`

Zero-based position to set the item at.

##### object

The item or plain object to store.

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)

The item as stored in the collection.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
col.set(0, { id: 10 });
col.get(0).get('id'); // 10
```

#### Inherited from

[`Collection`](Collection.md).[`set`](Collection.md#set)

***

### size()

> **size**(): `number`

Defined in: [core/collection.ts:606](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/core/collection.ts#L606)

Returns the number of items currently in the collection.

#### Returns

`number`

The item count.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
col.size(); // 2
```

#### Inherited from

[`Collection`](Collection.md).[`size`](Collection.md#size)
