# Function: urlWithQueryString()

> **urlWithQueryString**(`url`, `opt_params?`): `string`

Defined in: [utils/operation.ts:989](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L989)

Appends query string parameters to a URL.

Builds a query string from the params object (via [getQueryString](getQueryString.md))
and appends it to the URL. Uses `?` if the URL has no existing query string,
or `&` if one already exists.

## Parameters

### url

`string`

The base URL to append parameters to.

### opt\_params?

`object`

An object of key-value pairs to encode as query parameters.

## Returns

`string`

The URL with appended query string, or the original URL if
    no parameters are provided.

## Example

```ts
urlWithQueryString('/api/items', { page: 1, limit: 10 });
// '/api/items?page=1&limit=10'

urlWithQueryString('/api/items?sort=name', { page: 2 });
// '/api/items?sort=name&page=2'
```
