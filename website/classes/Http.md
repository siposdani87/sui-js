# Class: Http

Defined in: [module/http.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L7)

## Constructors

### Constructor

> **new Http**(`opt_options`): `Http`

Defined in: [module/http.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L13)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`Http`

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/http.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L8)

***

### password

> **password**: `string`

Defined in: [module/http.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L10)

***

### token

> **token**: `string`

Defined in: [module/http.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L11)

***

### username

> **username**: `string`

Defined in: [module/http.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L9)

## Methods

### delete()

> **delete**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:82](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L82)

#### Parameters

##### url

`string`

##### opt\_data?

`object`

##### opt\_params?

`object`

##### opt\_headers?

`object`

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### eventAfterRequest()

> **eventAfterRequest**(`http`, `response`, `filename`): `void`

Defined in: [module/http.ts:127](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L127)

#### Parameters

##### http

`XMLHttpRequest`

##### response

[`Objekt`](Objekt.md)

##### filename

`string`

#### Returns

`void`

***

### eventBeforeRequest()

> **eventBeforeRequest**(`xhr`): `void`

Defined in: [module/http.ts:123](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L123)

#### Parameters

##### xhr

[`Xhr`](Xhr.md)

#### Returns

`void`

***

### get()

> **get**(`url`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:41](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L41)

#### Parameters

##### url

`string`

##### opt\_params?

`object`

##### opt\_headers?

`object`

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### patch()

> **patch**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:70](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L70)

#### Parameters

##### url

`string`

##### opt\_data?

`object`

##### opt\_params?

`object`

##### opt\_headers?

`object`

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### post()

> **post**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:46](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L46)

#### Parameters

##### url

`string`

##### opt\_data?

`object`

##### opt\_params?

`object`

##### opt\_headers?

`object`

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### put()

> **put**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/http.ts:58](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L58)

#### Parameters

##### url

`string`

##### opt\_data?

`object`

##### opt\_params?

`object`

##### opt\_headers?

`object`

#### Returns

[`Promize`](Promize.md)\<\[[`Objekt`](Objekt.md)\<`object`\>, `string`\], \[[`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### setBasicAuthorization()

> **setBasicAuthorization**(`username`, `password`): `void`

Defined in: [module/http.ts:32](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L32)

#### Parameters

##### username

`string`

##### password

`string`

#### Returns

`void`

***

### setBearerAuthorization()

> **setBearerAuthorization**(`token`): `void`

Defined in: [module/http.ts:37](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/http.ts#L37)

#### Parameters

##### token

`string`

#### Returns

`void`
