# Class: Xhr

Defined in: [module/xhr.ts:51](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L51)

Low-level XMLHttpRequest wrapper that manages content-type detection,
request headers, authentication, and response parsing. Each instance
handles exactly one HTTP request; create a new Xhr for each call.

Content types are auto-detected from the URL file extension. Built-in
types include `json`, `form`, `html`, `svg`, and `xml`. Unknown
extensions default to plain text with a wildcard Accept header.

The response is always parsed into an [Objekt](Objekt.md). JSON responses
are merged directly; all other content types (HTML, SVG, XML, Blob)
are stored under the `raw` key via `setRaw()`.

Authentication is set via [Xhr.setBasicAuthorization](#setbasicauthorization) (HTTP Basic)
or [Xhr.setBearerAuthorization](#setbearerauthorization) (Bearer token). These must be
called before one of the request methods.

## Example

```ts
const xhr = new Xhr({ backend: 'https://api.example.com', locale: 'en' });
xhr.setBearerAuthorization('my-jwt-token');

xhr.get('/users.json', { page: 1 }).then(
    (httpRequest, response, filename) => console.log(response),
    (httpRequest, error, filename) => console.error(error),
);
```

## See

 - [Http](Http.md)
 - [Objekt](Objekt.md)

## Constructors

### Constructor

> **new Xhr**(`opt_options?`): `Xhr`

Defined in: [module/xhr.ts:78](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L78)

Creates a new Xhr instance configured with the given options.

#### Parameters

##### opt\_options?

`object` = `{}`

Configuration merged with defaults.

#### Returns

`Xhr`

#### Example

```ts
const xhr = new Xhr({ backend: '/api', locale: 'hu' });
```

## Properties

### authorization

> **authorization**: `string` \| `null`

Defined in: [module/xhr.ts:56](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L56)

***

### deferred

> **deferred**: [`Deferred`](Deferred.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:61](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L61)

***

### httpRequest

> **httpRequest**: `XMLHttpRequest`

Defined in: [module/xhr.ts:60](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L60)

***

### options

> **options**: [`Objekt`](Objekt.md)\<\{ `backend`: `string`; `locale`: `string`; \}\>

Defined in: [module/xhr.ts:52](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L52)

***

### requestHeaders

> **requestHeaders**: `object`

Defined in: [module/xhr.ts:53](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L53)

#### Index Signature

\[`key`: `string`\]: `string`

***

### types

> **types**: `object`

Defined in: [module/xhr.ts:57](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L57)

#### Index Signature

\[`key`: `string`\]: `XhrType`

## Methods

### delete()

> **delete**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:373](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L373)

Sends an HTTP DELETE request to the specified URL.

#### Parameters

##### url

`string`

Request URL (absolute or root-relative).

##### opt\_data?

`object`

Request body payload.

##### opt\_params?

`object`

Query-string parameters appended to
    the URL.

##### opt\_headers?

`object` = `{}`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with the raw request, parsed response, and filename;
    rejects on non-200 status.

#### Example

```ts
xhr.delete('/users/1.json').then(
    (httpRequest, response, filename) => console.log(response),
);
```

***

### get()

> **get**(`url`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:252](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L252)

Sends an HTTP GET request to the specified URL.

#### Parameters

##### url

`string`

Request URL (absolute or root-relative).

##### opt\_params?

`object`

Query-string parameters appended to
    the URL.

##### opt\_headers?

`object` = `{}`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with the raw request, parsed response, and filename;
    rejects on non-200 status.

#### Example

```ts
xhr.get('/users.json', { page: 2 }).then(
    (httpRequest, response, filename) => console.log(response),
);
```

***

### patch()

> **patch**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:341](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L341)

Sends an HTTP PATCH request to the specified URL.

#### Parameters

##### url

`string`

Request URL (absolute or root-relative).

##### opt\_data?

`object`

Request body payload (partial update).

##### opt\_params?

`object`

Query-string parameters appended to
    the URL.

##### opt\_headers?

`object` = `{}`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with the raw request, parsed response, and filename;
    rejects on non-200 status.

#### Example

```ts
xhr.patch('/users/1.json', { email: 'new@example.com' }).then(
    (httpRequest, response, filename) => console.log(response),
);
```

***

### post()

> **post**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:277](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L277)

Sends an HTTP POST request to the specified URL.

#### Parameters

##### url

`string`

Request URL (absolute or root-relative).

##### opt\_data?

`object`

Request body payload.

##### opt\_params?

`object`

Query-string parameters appended to
    the URL.

##### opt\_headers?

`object` = `{}`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with the raw request, parsed response, and filename;
    rejects on non-200 status.

#### Example

```ts
xhr.post('/users.json', { name: 'Alice' }).then(
    (httpRequest, response, filename) => console.log(response),
);
```

***

### put()

> **put**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:309](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L309)

Sends an HTTP PUT request to the specified URL.

#### Parameters

##### url

`string`

Request URL (absolute or root-relative).

##### opt\_data?

`object`

Request body payload.

##### opt\_params?

`object`

Query-string parameters appended to
    the URL.

##### opt\_headers?

`object` = `{}`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with the raw request, parsed response, and filename;
    rejects on non-200 status.

#### Example

```ts
xhr.put('/users/1.json', { name: 'Alice Updated' }).then(
    (httpRequest, response, filename) => console.log(response),
);
```

***

### setBasicAuthorization()

> **setBasicAuthorization**(`username`, `password`): `void`

Defined in: [module/xhr.ts:671](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L671)

Sets HTTP Basic authentication credentials. The username and password
are Base64-encoded into an `Authorization: Basic <hash>` header value
applied when the request headers are set. Both values must be
non-null for the authorization to take effect.

#### Parameters

##### username

The Basic-auth username.

`string` | `null`

##### password

The Basic-auth password.

`string` | `null`

#### Returns

`void`

#### Example

```ts
xhr.setBasicAuthorization('admin', 's3cret');
```

***

### setBearerAuthorization()

> **setBearerAuthorization**(`token`): `void`

Defined in: [module/xhr.ts:689](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/module/xhr.ts#L689)

Sets a Bearer token for authentication. The token is stored as an
`Authorization: Bearer <token>` header value applied when the
request headers are set. The token must be non-null for the
authorization to take effect.

#### Parameters

##### token

The bearer token (e.g. a JWT).

`string` | `null`

#### Returns

`void`

#### Example

```ts
xhr.setBearerAuthorization('eyJhbGciOiJIUzI1NiIs...');
```
