# Class: Http

Defined in: [module/http.ts:37](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L37)

High-level HTTP client that wraps [Xhr](Xhr.md) to provide a simplified
request API with built-in authentication management. Http adds an
authentication layer (Basic or Bearer) and event hooks on top of the
low-level [Xhr](Xhr.md) transport, stripping the raw `XMLHttpRequest`
object from resolved/rejected values so consumers receive only the
parsed [Objekt](Objekt.md) response and an optional filename.

Each request method (`get`, `post`, `put`, `patch`, `delete`) creates a
fresh [Xhr](Xhr.md) instance, applies the stored credentials, fires the
[Http.eventBeforeRequest](#eventbeforerequest) hook, and returns a
[Promize](Promize.md)<[[Objekt](Objekt.md), string], [[Objekt](Objekt.md), string]>.

Override [Http.eventBeforeRequest](#eventbeforerequest) and
[Http.eventAfterRequest](#eventafterrequest) to add cross-cutting concerns such as
loading indicators, error toasts, or request logging.

## Example

```ts
const http = new Http({ backend: 'https://api.example.com', locale: 'en' });
http.setBearerAuthorization('my-jwt-token');

http.get('/users').then(
    (response, filename) => console.log(response),
    (error, filename) => console.error(error),
);
```

## See

 - [Xhr](Xhr.md)
 - [Promize](Promize.md)

## Constructors

### Constructor

> **new Http**(`opt_options?`): `Http`

Defined in: [module/http.ts:54](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L54)

Creates a new Http client instance.

#### Parameters

##### opt\_options?

`object` = `{}`

Configuration merged with defaults.

#### Returns

`Http`

#### Example

```ts
const http = new Http({ backend: '/api/v1', locale: 'hu' });
```

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/http.ts:38](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L38)

***

### password

> **password**: `string` \| `null`

Defined in: [module/http.ts:40](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L40)

***

### token

> **token**: `string` \| `null`

Defined in: [module/http.ts:41](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L41)

***

### username

> **username**: `string` \| `null`

Defined in: [module/http.ts:39](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L39)

## Methods

### delete()

> **delete**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:232](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L232)

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

`object`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with
    the parsed response body and filename; rejects on non-200 status.

#### Example

```ts
http.delete('/users/1').then(
    (response, filename) => console.log(response),
);
```

***

### eventAfterRequest()

> **eventAfterRequest**(`http`, `response`, `filename`): `void`

Defined in: [module/http.ts:310](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L310)

Called after each request completes (on both success and failure).
Override this method to implement cross-cutting post-request logic
such as hiding loading indicators or displaying error notifications.

#### Parameters

##### http

`XMLHttpRequest`

The raw XMLHttpRequest object.

##### response

[`Objekt`](Objekt.md)

The parsed response body.

##### filename

`string`

The filename extracted from the
    Content-Disposition header, or an empty string.

#### Returns

`void`

***

### eventBeforeRequest()

> **eventBeforeRequest**(`xhr`): `void`

Defined in: [module/http.ts:296](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L296)

Called before each request is sent. Override this method to inspect or
modify the [Xhr](Xhr.md) instance (e.g. add custom headers or logging).

#### Parameters

##### xhr

[`Xhr`](Xhr.md)

The Xhr instance that will execute the request.

#### Returns

`void`

***

### get()

> **get**(`url`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:127](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L127)

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

`object`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with
    the parsed response body and filename; rejects on non-200 status.

#### Example

```ts
http.get('/users', { page: 1 }).then(
    (response, filename) => console.log(response),
);
```

***

### patch()

> **patch**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:204](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L204)

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

`object`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with
    the parsed response body and filename; rejects on non-200 status.

#### Example

```ts
http.patch('/users/1', { email: 'new@example.com' }).then(
    (response, filename) => console.log(response),
);
```

***

### post()

> **post**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:148](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L148)

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

`object`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with
    the parsed response body and filename; rejects on non-200 status.

#### Example

```ts
http.post('/users', { name: 'Alice' }).then(
    (response, filename) => console.log(response),
);
```

***

### put()

> **put**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:176](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L176)

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

`object`

Additional request headers.

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Resolves with
    the parsed response body and filename; rejects on non-200 status.

#### Example

```ts
http.put('/users/1', { name: 'Alice Updated' }).then(
    (response, filename) => console.log(response),
);
```

***

### setBasicAuthorization()

> **setBasicAuthorization**(`username`, `password`): `void`

Defined in: [module/http.ts:93](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L93)

Stores HTTP Basic authentication credentials. On each subsequent
request the credentials are forwarded to the underlying [Xhr](Xhr.md)
instance, which encodes them as a Base64 `Authorization` header.

#### Parameters

##### username

`string`

The Basic-auth username.

##### password

`string`

The Basic-auth password.

#### Returns

`void`

#### Example

```ts
http.setBasicAuthorization('admin', 's3cret');
```

***

### setBearerAuthorization()

> **setBearerAuthorization**(`token`): `void`

Defined in: [module/http.ts:108](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/http.ts#L108)

Stores a Bearer token for authentication. On each subsequent request
the token is forwarded to the underlying [Xhr](Xhr.md) instance, which
sets the `Authorization: Bearer <token>` header.

#### Parameters

##### token

`string`

The bearer token (e.g. a JWT).

#### Returns

`void`

#### Example

```ts
http.setBearerAuthorization('eyJhbGciOiJIUzI1NiIs...');
```
