# Class: Form

Defined in: [component/form.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L27)

## Description

Manages a collection of form fields with model binding, validation, and
event handling. Extends [Collection](Collection.md) to provide field iteration, lookup, and lifecycle management.

## Example

```ts
const form = new Form(dom, 'form');
form.setModel(new Objekt({ name: 'John', email: 'john@example.com' }));
form.eventSubmit = (model, knot) => {
    http.post('/api/users', model);
};
```

## See

 - [BaseField](BaseField.md) for individual field implementations
 - [Collection](Collection.md) for the base collection interface
 - [Objekt](Objekt.md) for the model data wrapper

## Extends

- [`Collection`](Collection.md)\<[`BaseField`](BaseField.md)\<`HTMLInputElement`\>\>

## Constructors

### Constructor

> **new Form**(`dom`, `opt_selector?`): `Form`

Defined in: [component/form.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L41)

#### Parameters

##### dom

[`Knot`](Knot.md)

The parent DOM node containing the form element.

##### opt\_selector?

`string` = `'form'`

CSS selector to locate the form element.

#### Returns

`Form`

#### Description

Creates a new Form instance bound to the form element found within the given DOM node.

#### Overrides

[`Collection`](Collection.md).[`constructor`](Collection.md#constructor)

## Properties

### buttonClasses

> **buttonClasses**: `string`[]

Defined in: [component/form.ts:32](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L32)

***

### fieldClasses

> **fieldClasses**: `string`[]

Defined in: [component/form.ts:33](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L33)

***

### formKnot

> **formKnot**: [`Knot`](Knot.md)\<`HTMLFormElement`\>

Defined in: [component/form.ts:28](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L28)

***

### initFields

> **initFields**: `string`[]

Defined in: [component/form.ts:31](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L31)

***

### items

> **items**: [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L41)

#### Inherited from

[`Collection`](Collection.md).[`items`](Collection.md#items)

***

### model

> **model**: [`Objekt`](Objekt.md)

Defined in: [component/form.ts:30](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L30)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L42)

#### Inherited from

[`Collection`](Collection.md).[`options`](Collection.md#options)

***

### previousModel

> **previousModel**: [`Objekt`](Objekt.md)

Defined in: [component/form.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L29)

***

### Type

> **Type**: `any`

Defined in: [core/collection.ts:40](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L40)

#### Inherited from

[`Collection`](Collection.md).[`Type`](Collection.md#type)

## Methods

### checkValidity()

> **checkValidity**(`opt_force?`, `opt_showMessage?`): `boolean`

Defined in: [component/form.ts:308](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L308)

#### Parameters

##### opt\_force?

`boolean` = `false`

Whether to force re-validation on all fields.

##### opt\_showMessage?

`boolean` = `true`

Whether to display validation messages.

#### Returns

`boolean`

True if all fields are valid.

#### Description

Validates all form fields and returns the overall validity state.

#### Example

```ts
if (form.checkValidity()) {
    // submit the form
}
```

***

### clear()

> **clear**(): `void`

Defined in: [core/collection.ts:355](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L355)

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

> **delete**(`value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:475](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L475)

Removes the first item that is strictly equal to the given value
(reference equality via [eq](../functions/eq.md)).

#### Parameters

##### value

The item reference to delete.

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

> **deleteAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:561](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L561)

Removes all items where the given attribute equals the specified value.

#### Parameters

##### attribute

`string`

Dot-notation attribute path to compare.

##### value

`any`

The value to match against.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

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

> **deleteAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:583](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L583)

Removes all items for which the condition callback returns `true`.
The internal array is rebuilt to contain only non-matching items.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to delete the item.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

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

> **deleteBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:514](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L514)

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

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

> **deleteByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:534](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L534)

Removes the first item for which the condition callback returns `true`.
The item is spliced from the internal array and returned.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to delete the item.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

> **deleteById**(`id`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:494](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L494)

Removes the first item whose configured ID attribute matches the
given value.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The identifier of the item to remove.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

Defined in: [core/collection.ts:283](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L283)

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

### eventButton()

> **eventButton**(`model`, `knot`): `void`

Defined in: [component/form.ts:435](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L435)

#### Parameters

##### model

[`Objekt`](Objekt.md)

The current form data model.

##### knot

[`Knot`](Knot.md)

The button DOM element.

#### Returns

`void`

#### Description

Called when a non-submit/non-reset button inside the form is clicked. Override to handle button actions.

***

### eventReset()

> **eventReset**(`model`, `knot`): `void`

Defined in: [component/form.ts:426](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L426)

#### Parameters

##### model

[`Objekt`](Objekt.md)

The current form data model.

##### knot

[`Knot`](Knot.md)

The form DOM element.

#### Returns

`void`

#### Description

Called when the form reset button is clicked. Override to handle reset logic.

***

### eventSubmit()

> **eventSubmit**(`model`, `knot`): `void`

Defined in: [component/form.ts:417](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L417)

#### Parameters

##### model

[`Objekt`](Objekt.md)

The current form data model.

##### knot

[`Knot`](Knot.md)

The form DOM element.

#### Returns

`void`

#### Description

Called when the form is submitted and passes validation. Override to handle submission.

***

### findAllBy()

> **findAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:434](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L434)

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

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

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

> **findAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:452](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L452)

Returns all items for which the condition callback returns `true`.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to include the item.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

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

> **findBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:391](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L391)

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

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

> **findByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:410](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L410)

Finds the first item for which the condition callback returns `true`.
Items are tested sequentially from index 0.

#### Parameters

##### conditionCallback

`Function`

Predicate receiving `(item, index)`;
    return `true` to select the item.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

> **findById**(`id`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:372](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L372)

Finds the first item whose configured ID attribute matches the given
value.

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

The identifier value to search for (compared with
    strict equality).

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

### findByModel()

> **findByModel**\<`T`\>(`name`): `T`

Defined in: [component/form.ts:377](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L377)

#### Type Parameters

##### T

`T` = [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

The expected field type, defaults to BaseField.

#### Parameters

##### name

`string`

The model property name bound to the field.

#### Returns

`T`

The matching field instance.

#### Description

Finds a form field by its model binding name.

#### Example

```ts
const emailField = form.findByModel<TextField>('email');
```

***

### get()

> **get**\<`K`\>(`index`, `opt_attribute?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K` \| `null`

Defined in: [core/collection.ts:307](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L307)

Returns the item at the given index. If `opt_attribute` is provided
and the item is an [Objekt](Objekt.md), the attribute value is extracted
and returned instead of the item itself.

#### Type Parameters

##### K

`K` = [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

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

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K` \| `null`

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

> **getById**\<`K`\>(`id`, `opt_attribute?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K` \| `null`

Defined in: [core/collection.ts:339](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L339)

Finds an item by its ID and optionally extracts an attribute value.
Combines [Collection.findById](Collection.md#findbyid) and [Objekt.get](Objekt.md#get) in a
single call.

#### Type Parameters

##### K

`K` = [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

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

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K` \| `null`

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

> **getItems**(): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:225](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L225)

Returns the raw internal array of items. The returned array is the
same reference used internally, so mutations will affect the
collection.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

The internal items array.

#### Example

```ts
const col = new Collection([{ id: 1 }, { id: 2 }]);
col.getItems().length; // 2
```

#### Inherited from

[`Collection`](Collection.md).[`getItems`](Collection.md#getitems)

***

### getModel()

> **getModel**(): [`Objekt`](Objekt.md)

Defined in: [component/form.ts:204](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L204)

#### Returns

[`Objekt`](Objekt.md)

The form's data model containing all field values.

#### Description

Returns the current form data model.

#### Example

```ts
const data = form.getModel();
console.log(data.get('name'));
```

***

### isInvalid()

> **isInvalid**(): `boolean`

Defined in: [component/form.ts:342](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L342)

#### Returns

`boolean`

True if the form fails validation.

#### Description

Checks whether the form is currently invalid.

#### Example

```ts
if (form.isInvalid()) {
    flash.addError('Please fix the errors');
}
```

***

### isValid()

> **isValid**(): `boolean`

Defined in: [component/form.ts:328](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L328)

#### Returns

`boolean`

True if the form passes validation.

#### Description

Checks whether the form is currently valid by forcing validation on all fields.

#### Example

```ts
if (form.isValid()) {
    // proceed with submission
}
```

***

### iterator()

> **iterator**(`callback`, `next`, `opt_items?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:252](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L252)

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

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Items to iterate over; defaults to the
    collection's internal array.

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

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

> **limit**(`offset`, `opt_count?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:625](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L625)

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

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

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

Defined in: [core/collection.ts:102](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L102)

Appends each object in the array to this collection. Plain objects are
automatically wrapped via the configured `Type` constructor.

#### Parameters

##### objects

(`object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\>)[]

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

### lock()

> **lock**(): `void`

Defined in: [component/form.ts:391](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L391)

#### Returns

`void`

#### Description

Disables all form fields, preserving their original disabled state for later unlock.

#### Example

```ts
form.lock();
// submit data...
form.unlock();
```

***

### push()

> **push**(`object`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L138)

Adds a single item to the end of the collection. If the item is a
plain object (not already an instance of `Type`), it is wrapped via
the configured constructor.

#### Parameters

##### object

The item or plain object to add.

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)

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

### refresh()

> **refresh**(): `void`

Defined in: [component/form.ts:353](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L353)

#### Returns

`void`

#### Description

Removes fields that no longer exist in the DOM and re-initializes any new fields.

#### Example

```ts
// After dynamically adding fields to the DOM
form.refresh();
```

***

### reload()

> **reload**(`objects`): `void`

Defined in: [core/collection.ts:120](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L120)

Clears all existing items and loads the given objects, effectively
replacing the entire collection contents.

#### Parameters

##### objects

(`object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\>)[]

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

> **replace**(`object`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

Defined in: [core/collection.ts:201](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L201)

Finds an existing item by its ID and merges the given object's
properties into it. This is useful for updating an item in-place
without changing its reference in the collection.

#### Parameters

##### object

The object containing updated properties
    and an ID matching an existing item.

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `null`

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

### reset()

> **reset**(`opt_force?`, `opt_showMessage?`): `void`

Defined in: [component/form.ts:217](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L217)

#### Parameters

##### opt\_force?

`boolean` = `true`

Whether to force validation after reset.

##### opt\_showMessage?

`boolean` = `false`

Whether to display validation messages.

#### Returns

`void`

#### Description

Clears all field values and resets the form model.

#### Example

```ts
form.reset();
```

***

### set()

> **set**(`index`, `object`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:176](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L176)

Sets an item at a specific index in the collection. If the index is
within the current bounds, the existing item is replaced. If the index
is out of bounds, the item is appended via [Collection.push](Collection.md#push).

#### Parameters

##### index

`number`

Zero-based position to set the item at.

##### object

The item or plain object to store.

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)

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

### setErrors()

> **setErrors**(`data`): `void`

Defined in: [component/form.ts:287](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L287)

#### Parameters

##### data

`object`

An object mapping field names to arrays of error messages.

#### Returns

`void`

#### Description

Applies server-side validation errors to the corresponding form fields.

#### Example

```ts
form.setErrors({ email: ['Email is required'], name: ['Name is too short'] });
```

***

### setModel()

> **setModel**(`model`, `opt_force?`, `opt_showMessage?`): `void`

Defined in: [component/form.ts:178](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L178)

#### Parameters

##### model

[`Objekt`](Objekt.md)

The data model to merge into the form.

##### opt\_force?

`boolean` = `true`

Whether to force validation on all fields.

##### opt\_showMessage?

`boolean` = `false`

Whether to display validation messages.

#### Returns

`void`

#### Description

Merges the given model into the form, updates all field values, and runs validation.

#### Example

```ts
form.setModel(new Objekt({ name: 'Jane', age: 30 }));
```

***

### size()

> **size**(): `number`

Defined in: [core/collection.ts:606](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/collection.ts#L606)

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

***

### unlock()

> **unlock**(): `void`

Defined in: [component/form.ts:406](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/component/form.ts#L406)

#### Returns

`void`

#### Description

Restores each field's disabled state to what it was before [lock](#lock) was called.

#### Example

```ts
form.unlock();
```
