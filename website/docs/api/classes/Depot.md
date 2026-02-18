# Class: Depot

Defined in: [module/depot.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L39)

Encrypted browser storage wrapper for localStorage and sessionStorage.
Depot stores values with AES encryption using a configurable secret,
and automatically manages entry expiration via periodic checks.

Each stored entry is serialized as `"<expires_utc>;<encrypted_value>"`,
where the expiration timestamp is stored in UTC string format and the
value is encrypted using the configured secret. On retrieval, entries
are decrypted and type-cast via `typeCast`.

A periodic interval (configurable via `interval` option) runs
\_checkExpires to automatically remove entries that have passed
their expiration time.

## Example

```ts
const localDepot = new Depot('LOCAL', {
    prefix: 'myApp',
    secret: 'my-secret-key',
    hours: 48,
});

localDepot.set('user', 'john');
localDepot.get('user'); // 'john'

localDepot.set('session', 'xyz', 2); // expires in 2 hours
localDepot.remove('session');

const sessionDepot = new Depot('SESSION', { prefix: 'myApp' });
sessionDepot.set('temp', 'data');
```

## See

 - [Cookie](Cookie.md)
 - [Objekt](Objekt.md)

## Constructors

### Constructor

> **new Depot**(`type`, `opt_options?`): `Depot`

Defined in: [module/depot.ts:57](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L57)

Creates a new Depot instance backed by either localStorage or
sessionStorage. Initializes the storage backend and starts the
periodic expiration checker.

#### Parameters

##### type

The storage backend to use: `'LOCAL'` for
    `window.localStorage` or `'SESSION'` for `window.sessionStorage`.

`"LOCAL"` | `"SESSION"`

##### opt\_options?

Configuration options. Supports `prefix` (string)
    for key namespace, `secret` (string) for AES encryption key,
    `hours` (number) for default expiration in hours, and
    `interval` (number) for expiration check frequency in
    milliseconds.

`object` | `undefined`

#### Returns

`Depot`

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/depot.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L41)

***

### storage

> **storage**: `Storage`

Defined in: [module/depot.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L42)

***

### type

> **type**: `"LOCAL"` \| `"SESSION"`

Defined in: [module/depot.ts:40](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L40)

## Methods

### clear()

> **clear**(): `void`

Defined in: [module/depot.ts:199](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L199)

Clears all entries from the underlying storage backend. This
removes all keys, not just those managed by this Depot instance.

#### Returns

`void`

#### Example

```ts
depot.set('a', '1');
depot.set('b', '2');
depot.clear();
```

***

### get()

> **get**(`name`): `any`

Defined in: [module/depot.ts:162](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L162)

Retrieves and decrypts a value from storage by its logical name.
The decrypted value is automatically type-cast, so stored numeric
or boolean strings are returned as their native types.

#### Parameters

##### name

`string`

The logical key name to retrieve.

#### Returns

`any`

The decrypted and type-cast value, or `null` if the
    key does not exist or the stored format is invalid.

#### Example

```ts
depot.set('count', '42');
depot.get('count'); // 42 (number)

depot.get('nonexistent'); // null
```

***

### remove()

> **remove**(`name`): `void`

Defined in: [module/depot.ts:185](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L185)

Removes a single entry from storage by its logical name.

#### Parameters

##### name

`string`

The logical key name to remove.

#### Returns

`void`

#### Example

```ts
depot.set('token', 'abc');
depot.remove('token');
depot.get('token'); // null
```

***

### set()

> **set**(`name`, `value`, `opt_expires?`): `void`

Defined in: [module/depot.ts:136](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/depot.ts#L136)

Stores a value in the selected storage backend. The value is
AES-encrypted with the configured secret and stored alongside
an expiration timestamp.

#### Parameters

##### name

`string`

The logical key name to store under.

##### value

`any`

The value to encrypt and store. Any type is accepted.

##### opt\_expires?

Expiration as hours (number), a `Date` object,
    or `Infinity` for permanent storage. When omitted, defaults
    to the configured `hours` option.

`string` | `number` | `boolean` | `Date`

#### Returns

`void`

#### Example

```ts
const depot = new Depot('LOCAL', { secret: 'key123' });

depot.set('token', 'abc');
depot.set('session', 'xyz', 2); // expires in 2 hours
depot.set('permanent', 'data', Infinity);
```
