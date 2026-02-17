# Class: Router

Defined in: [core/router.ts:39](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L39)

Handles URL pattern matching and parameter extraction for client-side
routing. A Router instance compiles a route pattern string into a regular
expression that can be tested against URL paths, and provides methods
to extract named parameters from matching URLs or to build URLs from
a pattern and parameter values.

Route patterns support two placeholder types:
- `:param` matches a single URL segment (everything except `/`)
- `*param` matches any remaining path (including `/` characters)

## Example

```ts
const router = new Router('/users/:userId/posts/:postId');

// Test if a URL matches the pattern
const matches = router.getMatches('/users/42/posts/7');
// matches !== null

// Extract named parameters from a URL
const params = router.parse('/users/42/posts/7');
// { userId: 42, postId: 7 }

// Build a URL from parameters
const url = router.stringify({ userId: 42, postId: 7 });
// '/users/42/posts/7'
```

## See

 - [State](State.md)
 - [Params](../type-aliases/Params.md)

## Constructors

### Constructor

> **new Router**(`opt_route?`): `Router`

Defined in: [core/router.ts:54](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L54)

Creates a new Router for the given route pattern. The pattern is
compiled into a regular expression during construction, and
placeholder names are extracted for later parameter parsing.

#### Parameters

##### opt\_route?

Route pattern string containing `:param` or `*param`
    placeholders. Defaults to an empty string.

`string` | `undefined`

#### Returns

`Router`

## Properties

### escape

> **escape**: `RegExp`

Defined in: [core/router.ts:42](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L42)

***

### param

> **param**: `RegExp`

Defined in: [core/router.ts:41](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L41)

***

### paramNames

> **paramNames**: `string`[]

Defined in: [core/router.ts:43](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L43)

***

### regex

> **regex**: `RegExp`

Defined in: [core/router.ts:44](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L44)

***

### route

> **route**: `string`

Defined in: [core/router.ts:40](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L40)

## Methods

### getMatches()

> **getMatches**(`url`): `RegExpMatchArray` \| `null`

Defined in: [core/router.ts:130](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L130)

Tests whether a URL path matches the compiled route pattern. The
query string portion of the URL (if present) is stripped before
matching.

#### Parameters

##### url

`string`

URL path to test against the route pattern.

#### Returns

`RegExpMatchArray` \| `null`

A `RegExpMatchArray` if the URL matches the pattern, or
    `null` if it does not match.

#### Example

```ts
const router = new Router('/users/:id');
router.getMatches('/users/42');    // RegExpMatchArray
router.getMatches('/posts/42');    // null
```

***

### parse()

> **parse**(`url`): `object`

Defined in: [core/router.ts:154](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L154)

Extracts named parameters from a URL that matches the route pattern.
Combines both path-segment parameters (from `:param` and `*param`
placeholders) and query string parameters into a single object.
Values are automatically type-cast (e.g., numeric strings become
numbers).

#### Parameters

##### url

`string`

URL path to extract parameters from.

#### Returns

`object`

An object mapping parameter names to their extracted and
    type-cast values. Returns an empty object if the URL does not
    match the pattern.

#### Example

```ts
const router = new Router('/items/:id');
const params = router.parse('/items/99?sort=name');
// { id: 99, sort: 'name' }
```

***

### stringify()

> **stringify**(`opt_params?`): `string`

Defined in: [core/router.ts:95](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/router.ts#L95)

Builds a URL string from the route pattern by substituting parameter
values into placeholders. Any parameters that do not correspond to
placeholders in the pattern are appended as query string parameters.
Unused placeholders are removed from the result.

#### Parameters

##### opt\_params?

Key-value pairs to substitute into the route
    pattern. Keys matching `:param` or `*param` names are inserted
    inline; remaining keys become query string parameters.

`Record`\<`string`, `any`\> | `undefined`

#### Returns

`string`

The constructed URL with parameters substituted and
    optional query string appended.

#### Example

```ts
const router = new Router('/search/:category');
const url = router.stringify({ category: 'books', page: '2' });
// '/search/books?page=2'
```
