# Class: Cookie

Defined in: [module/cookie.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L6)

## Constructors

### Constructor

> **new Cookie**(`opt_options`): `Cookie`

Defined in: [module/cookie.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L9)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`Cookie`

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/cookie.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L7)

## Methods

### clear()

> **clear**(): `void`

Defined in: [module/cookie.ts:126](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L126)

#### Returns

`void`

***

### get()

> **get**(`name`): `any`

Defined in: [module/cookie.ts:73](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L73)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### getKeys()

> **getKeys**(): `string`[]

Defined in: [module/cookie.ts:113](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L113)

#### Returns

`string`[]

***

### hasKey()

> **hasKey**(`name`): `boolean`

Defined in: [module/cookie.ts:100](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L100)

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### remove()

> **remove**(`name`, `opt_path`, `opt_domain`, `opt_secure`): `void`

Defined in: [module/cookie.ts:88](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L88)

#### Parameters

##### name

`string`

##### opt\_path

`string` = `''`

##### opt\_domain

`string` = `''`

##### opt\_secure

`boolean` = `false`

#### Returns

`void`

***

### set()

> **set**(`name`, `value`, `opt_expires`, `opt_path`, `opt_domain`, `opt_secure`): `void`

Defined in: [module/cookie.ts:31](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/cookie.ts#L31)

#### Parameters

##### name

`string`

##### value

`string`

##### opt\_expires

`any` = `''`

##### opt\_path

`string` = `'/'`

##### opt\_domain

`string` = `''`

##### opt\_secure

`boolean` = `false`

#### Returns

`void`
