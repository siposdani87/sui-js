# Class: Cookie

Defined in: [module/cookie.ts:34](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L34)

Browser cookie management with automatic key prefixing. Cookie provides
a structured API for reading, writing, and deleting browser cookies,
with all keys scoped under a configurable prefix to avoid collisions
with other applications on the same domain.

Cookie values are automatically URI-encoded when stored and decoded
when retrieved. The [get](#get) method applies type-casting via
`typeCast`, so stored numeric or boolean strings are returned as
their native types.

## Example

```ts
const cookie = new Cookie({ prefix: 'myApp', hours: 48 });

cookie.set('token', 'abc123');
cookie.get('token'); // 'abc123'

cookie.set('count', '5');
cookie.get('count'); // 5 (type-cast to number)

cookie.hasKey('token'); // true
cookie.remove('token');
cookie.hasKey('token'); // false
```

## See

 - [Objekt](Objekt.md)
 - [Depot](Depot.md)

## Constructors

### Constructor

> **new Cookie**(`opt_options?`): `Cookie`

Defined in: [module/cookie.ts:45](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L45)

Creates a new Cookie instance with the given options. The default
prefix is `'app'` and the default expiration is 24 hours.

#### Parameters

##### opt\_options?

Configuration options. Supports `prefix` (string)
    for cookie key namespace and `hours` (number) for default
    expiration time in hours.

`object` | `undefined`

#### Returns

`Cookie`

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/cookie.ts:35](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L35)

## Methods

### clear()

> **clear**(): `void`

Defined in: [module/cookie.ts:276](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L276)

Removes all cookies managed by this instance by iterating over
all known keys and calling [remove](#remove) for each.

#### Returns

`void`

#### Example

```ts
cookie.set('a', '1');
cookie.set('b', '2');
cookie.clear();
cookie.getKeys(); // []
```

***

### get()

> **get**(`name`): `any`

Defined in: [module/cookie.ts:175](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L175)

Reads a cookie value by its logical name and returns it with
automatic type-casting. Numeric strings are returned as numbers,
`'true'`/`'false'` as booleans, and so on.

#### Parameters

##### name

`string`

The logical cookie name to read.

#### Returns

`any`

The type-cast cookie value, or `null` if the cookie
    does not exist.

#### Example

```ts
cookie.set('count', '42');
cookie.get('count'); // 42 (number)

cookie.set('active', 'true');
cookie.get('active'); // true (boolean)
```

***

### getKeys()

> **getKeys**(): `string`[]

Defined in: [module/cookie.ts:253](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L253)

Returns an array of all logical cookie names currently stored
under this instance's prefix. The prefix is stripped from each
returned name.

#### Returns

`string`[]

An array of logical cookie names.

#### Example

```ts
cookie.set('a', '1');
cookie.set('b', '2');
cookie.getKeys(); // ['a', 'b']
```

***

### hasKey()

> **hasKey**(`name`): `boolean`

Defined in: [module/cookie.ts:228](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L228)

Checks whether a cookie with the given logical name exists in
the browser's cookie store.

#### Parameters

##### name

`string`

The logical cookie name to check.

#### Returns

`boolean`

`true` if the cookie exists, `false` otherwise.

#### Example

```ts
cookie.set('lang', 'en');
cookie.hasKey('lang'); // true
cookie.hasKey('missing'); // false
```

***

### remove()

> **remove**(`name`, `opt_path?`, `opt_domain?`, `opt_secure?`): `void`

Defined in: [module/cookie.ts:204](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L204)

Deletes a cookie by setting its expiration to the Unix epoch.
The cookie is only removed if it currently exists.

#### Parameters

##### name

`string`

The logical cookie name to remove.

##### opt\_path?

The cookie path used when the cookie was set.

`string` | `undefined`

##### opt\_domain?

The cookie domain used when the cookie was set.

`string` | `undefined`

##### opt\_secure?

The secure flag used when the cookie was set.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
cookie.set('token', 'abc');
cookie.remove('token');
cookie.get('token'); // null
```

***

### set()

> **set**(`name`, `value`, `opt_expires?`, `opt_path?`, `opt_domain?`, `opt_secure?`): `void`

Defined in: [module/cookie.ts:117](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/cookie.ts#L117)

Stores a cookie with the given name and value. The name is
automatically prefixed. Expiration can be specified as a number
of hours, a `Date` object, or omitted to use the default
expiration from the constructor options.

Reserved cookie attribute names (`expires`, `max-age`, `path`,
`domain`, `secure`) are silently rejected as cookie names.

#### Parameters

##### name

`string`

The logical cookie name to store.

##### value

`string`

The string value to store.

##### opt\_expires?

`any` = `''`

Expiration as hours (number), a `Date` object,
    or `Infinity` for a permanent cookie. When omitted, defaults
    to the configured `hours` option.

##### opt\_path?

The cookie path. Defaults to `'/'`.

`string` | `undefined`

##### opt\_domain?

The cookie domain. Defaults to empty (current domain).

`string` | `undefined`

##### opt\_secure?

Whether to set the `Secure` flag. Defaults to `false`.

`boolean` | `undefined`

#### Returns

`void`

#### Example

```ts
const cookie = new Cookie({ prefix: 'app' });

// Default expiration from options
cookie.set('user', 'john');

// Expire in 2 hours
cookie.set('session', 'xyz', 2);

// Expire at a specific date
cookie.set('promo', 'sale', new Date('2025-12-31'));
```
