# Class: Xhr

Defined in: [module/xhr.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L17)

## Constructors

### Constructor

> **new Xhr**(`opt_options`): `Xhr`

Defined in: [module/xhr.ts:32](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L32)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`Xhr`

## Properties

### authorization

> **authorization**: `string`

Defined in: [module/xhr.ts:22](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L22)

***

### deferred

> **deferred**: [`Deferred`](Deferred.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:27](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L27)

***

### httpRequest

> **httpRequest**: `XMLHttpRequest`

Defined in: [module/xhr.ts:26](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L26)

***

### options

> **options**: [`Objekt`](Objekt.md)\<\{ `backend`: `string`; `locale`: `string`; \}\>

Defined in: [module/xhr.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L18)

***

### requestHeaders

> **requestHeaders**: `object`

Defined in: [module/xhr.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L19)

#### Index Signature

\[`key`: `string`\]: `string`

***

### types

> **types**: `object`

Defined in: [module/xhr.ts:23](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L23)

#### Index Signature

\[`key`: `string`\]: `XhrType`

## Methods

### delete()

> **delete**(`url`, `opt_data`, `opt_params`, `opt_headers`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:191](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L191)

#### Parameters

##### url

`string`

##### opt\_data

`object`

##### opt\_params

`object`

##### opt\_headers

`object` = `{}`

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### get()

> **get**(`url`, `opt_params`, `opt_headers`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:138](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L138)

#### Parameters

##### url

`string`

##### opt\_params

`object`

##### opt\_headers

`object` = `{}`

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### patch()

> **patch**(`url`, `opt_data`, `opt_params`, `opt_headers`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:176](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L176)

#### Parameters

##### url

`string`

##### opt\_data

`object`

##### opt\_params

`object`

##### opt\_headers

`object` = `{}`

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### post()

> **post**(`url`, `opt_data`, `opt_params`, `opt_headers`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:146](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L146)

#### Parameters

##### url

`string`

##### opt\_data

`object`

##### opt\_params

`object`

##### opt\_headers

`object` = `{}`

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### put()

> **put**(`url`, `opt_data`, `opt_params`, `opt_headers`): [`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

Defined in: [module/xhr.ts:161](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L161)

#### Parameters

##### url

`string`

##### opt\_data

`object`

##### opt\_params

`object`

##### opt\_headers

`object` = `{}`

#### Returns

[`Promize`](Promize.md)\<\[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\], \[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`\]\>

***

### setBasicAuthorization()

> **setBasicAuthorization**(`username`, `password`): `void`

Defined in: [module/xhr.ts:387](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L387)

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

Defined in: [module/xhr.ts:394](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/xhr.ts#L394)

#### Parameters

##### token

`string`

#### Returns

`void`
