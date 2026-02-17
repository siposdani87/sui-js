# Class: Objekt\<T\>

Defined in: [core/objekt.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L39)

Recursive object wrapper that provides dot-notation access to nested
properties. Objekt serves as the foundational data container throughout the
SUI framework, replacing plain JavaScript objects with a richer interface
for deep property access, recursive merging, and filtered copying.

Nested plain objects are automatically converted to Objekt instances during
[Objekt.merge](#merge), so the entire object tree supports the same API at
every level.

## Example

```ts
const config = new Objekt({
    server: { host: 'localhost', port: 3000 },
    debug: true,
});
config.get('server.host');       // 'localhost'
config.set('server.port', 8080);
config.get('server.port');       // 8080
```

## See

[Collection](Collection.md)

## Extended by

- [`Route`](Route.md)

## Type Parameters

### T

`T` *extends* `object` = `object`

## Indexable

\[`key`: `string`\]: `T`\[`any`\]

## Constructors

### Constructor

> **new Objekt**\<`T`\>(`opt_object?`): `Objekt`\<`T`\>

Defined in: [core/objekt.ts:53](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L53)

Creates a new Objekt instance, optionally populated with the properties
of the given plain object. Nested plain objects are recursively converted
to Objekt instances.

#### Parameters

##### opt\_object?

`T`

Initial data to merge into this instance.

#### Returns

`Objekt`\<`T`\>

#### Example

```ts
const obj = new Objekt({ name: 'Alice', address: { city: 'Paris' } });
obj.get('address.city'); // 'Paris'
```

## Methods

### allowKeys()

> **allowKeys**(`keys`): `Objekt`

Defined in: [core/objekt.ts:446](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L446)

Creates a new Objekt containing only the properties whose
dot-notation keys appear in the given allowlist. All other properties
are excluded.

#### Parameters

##### keys

`string`[]

Dot-notation keys to include.

#### Returns

`Objekt`

A new Objekt with only the allowed keys.

#### Example

```ts
const obj = new Objekt({ name: 'Alice', age: 30, role: 'admin' });
const filtered = obj.allowKeys(['name', 'role']);
filtered.get('name'); // 'Alice'
filtered.get('age');  // undefined
```

***

### clear()

> **clear**(): `void`

Defined in: [core/objekt.ts:290](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L290)

Removes all properties from this Objekt, leaving it empty.

#### Returns

`void`

#### Example

```ts
const obj = new Objekt({ x: 1, y: 2 });
obj.clear();
obj.isEmpty(); // true
```

***

### copy()

> **copy**(): `Objekt`

Defined in: [core/objekt.ts:399](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L399)

Creates a deep copy of this Objekt, returning a new independent
instance with the same data.

#### Returns

`Objekt`

A new Objekt containing a deep copy of this
    instance's data.

#### Example

```ts
const original = new Objekt({ x: { y: 1 } });
const clone = original.copy();
clone.set('x.y', 99);
original.get('x.y'); // 1 (unchanged)
```

***

### copyObject()

> **copyObject**(): `object`

Defined in: [core/objekt.ts:414](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L414)

Returns a deep copy of this Objekt's data as a plain JavaScript object.

#### Returns

`object`

A plain object representation of this Objekt.

#### Example

```ts
const obj = new Objekt({ a: 1, b: { c: 2 } });
const plain = obj.copyObject();
// plain is { a: 1, b: { c: 2 } } (plain object, not Objekt)
```

***

### denyKeys()

> **denyKeys**(`keys`): `Objekt`

Defined in: [core/objekt.ts:465](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L465)

Creates a new Objekt excluding the properties whose dot-notation keys
appear in the given denylist. All other properties are kept.

#### Parameters

##### keys

`string`[]

Dot-notation keys to exclude.

#### Returns

`Objekt`

A new Objekt without the denied keys.

#### Example

```ts
const obj = new Objekt({ name: 'Alice', password: 'secret' });
const safe = obj.denyKeys(['password']);
safe.get('password'); // undefined
safe.get('name');     // 'Alice'
```

***

### each()

> **each**\<`K`\>(`next`, `opt_properties?`, `opt_attributes?`): `void`

Defined in: [core/objekt.ts:344](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L344)

Recursively iterates over every leaf value in this Objekt (or a
sub-tree), invoking the callback with the value and its full
dot-notation key. Nested objects and arrays are traversed automatically;
only scalar leaf values trigger the callback.

#### Type Parameters

##### K

`K`

The type of the leaf values.

#### Parameters

##### next

(`value`, `key`) => `void`

Callback invoked for each leaf value, receiving
    `(value, key)` where `key` is the full dot-notation path.

##### opt\_properties?

`object`

Sub-tree to iterate; defaults to this
    Objekt.

##### opt\_attributes?

`string`[]

Accumulated path segments used
    during recursion.

#### Returns

`void`

#### Example

```ts
const obj = new Objekt({ a: { b: 1 }, c: 2 });
obj.each((value, key) => {
    console.log(key, value);
});
// Logs: 'a.b' 1, 'c' 2
```

***

### filterKeys()

> **filterKeys**(`obj`, `condition`): `Objekt`

Defined in: [core/objekt.ts:487](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L487)

Creates a new Objekt by iterating over the leaf values of the source
Objekt and including only those whose dot-notation keys satisfy the
condition callback.

#### Parameters

##### obj

`Objekt`

The source Objekt to filter.

##### condition

(`key`) => `boolean`

Predicate receiving a dot-notation key;
    return `true` to include the property.

#### Returns

`Objekt`

A new Objekt containing only the matching properties.

#### Example

```ts
const obj = new Objekt({ a: 1, b: 2, c: 3 });
const result = obj.filterKeys(obj, (key) => key !== 'b');
result.get('a'); // 1
result.get('b'); // undefined
```

***

### get()

> **get**\<`K`\>(`attribute`, `opt_defaultValue?`, `opt_isSafe?`): `K`

Defined in: [core/objekt.ts:136](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L136)

Retrieves a value from this Objekt using a dot-notation path. When the
path resolves to a nested Objekt, that Objekt is returned. If the path
does not exist, the optional default value is returned instead.

When `opt_isSafe` is `true` the attribute string is treated as a single
literal key rather than being split on dots; this is useful when keys
themselves contain periods.

#### Type Parameters

##### K

`K`

The expected return type.

#### Parameters

##### attribute

Dot-notation path such as
    `'user.address.city'`, or `undefined` to return the entire Objekt.

`string` | `undefined`

##### opt\_defaultValue?

`K`

Value returned when the path does not
    resolve to an existing property.

##### opt\_isSafe?

`boolean` = `false`

When `true`, treat the attribute
    as a literal key without splitting on dots.

#### Returns

`K`

The resolved value, or the default value if the path is
    not found.

#### Example

```ts
const obj = new Objekt({ user: { name: 'Bob', age: 30 } });
obj.get('user.name');             // 'Bob'
obj.get('user.email', 'n/a');     // 'n/a'
obj.get('user.name', '', true);   // undefined (literal key 'user.name')
```

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [core/objekt.ts:428](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L428)

Checks whether this Objekt has no properties.

#### Returns

`boolean`

`true` if the Objekt contains no properties,
    `false` otherwise.

#### Example

```ts
new Objekt().isEmpty();         // true
new Objekt({ a: 1 }).isEmpty(); // false
```

***

### merge()

> **merge**(`object`): `Objekt`

Defined in: [core/objekt.ts:73](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L73)

Recursively merges the properties of the given object into this Objekt.
Plain-object values are converted to Objekt instances so the full API
is available at every nesting level. Arrays whose first element is a
plain object are converted element-wise. Scalar values are passed
through [typeCast](../functions/typeCast.md).

#### Parameters

##### object

`any`

The source object whose properties will be merged.

#### Returns

`Objekt`

This instance, for chaining.

#### Example

```ts
const obj = new Objekt({ a: 1 });
obj.merge({ b: 2, c: { d: 3 } });
obj.get('c.d'); // 3
```

***

### remove()

> **remove**(`attribute`): `void`

Defined in: [core/objekt.ts:277](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L277)

Removes the property at the given dot-notation path. If the path
includes nested segments, only the leaf property is deleted.

#### Parameters

##### attribute

`string`

Dot-notation path of the property to remove.

#### Returns

`void`

#### Example

```ts
const obj = new Objekt({ a: { b: 1, c: 2 } });
obj.remove('a.b');
obj.get('a.b'); // undefined
obj.get('a.c'); // 2
```

***

### set()

> **set**\<`K`\>(`attribute`, `value`): `void`

Defined in: [core/objekt.ts:227](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L227)

Sets a value at the given dot-notation path. Intermediate objects are
created as needed and merged into this Objekt, so the full path is
guaranteed to exist after the call.

#### Type Parameters

##### K

`K`

The type of the value being set.

#### Parameters

##### attribute

`string`

Dot-notation path such as `'theme.color'`.

##### value

`K`

The value to assign.

#### Returns

`void`

#### Example

```ts
const obj = new Objekt();
obj.set('theme.color', 'blue');
obj.get('theme.color'); // 'blue'
```

***

### setRaw()

> **setRaw**\<`K`\>(`attribute`, `value`, `opt_isSafe?`): `void`

Defined in: [core/objekt.ts:255](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/objekt.ts#L255)

Sets a value at the given path, bypassing the recursive merge used by
[Objekt.set](#set). This is useful when the value is not a plain object
and should be stored as-is (e.g., class instances, DOM elements, or
functions).

Internally, the path is first set to `null` via [Objekt.set](#set) to
ensure the path exists, then the actual value is written directly with
Objekt.\_setByAttributes.

#### Type Parameters

##### K

`K`

The type of the value being set.

#### Parameters

##### attribute

`string`

Dot-notation path.

##### value

`K`

The value to assign without merging.

##### opt\_isSafe?

`boolean` = `false`

When `true`, treat the attribute
    as a literal key without splitting on dots.

#### Returns

`void`

#### Example

```ts
const obj = new Objekt();
const el = document.createElement('div');
obj.setRaw('container', el);
obj.get('container') === el; // true
```
