# Class: Promize\<T, K\>

Defined in: [core/promize.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/promize.ts#L5)

## Type Parameters

### T

`T` = `object`

### K

`K` = `object`

## Constructors

### Constructor

> **new Promize**\<`T`, `K`\>(`opt_options`): `Promize`\<`T`, `K`\>

Defined in: [core/promize.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/promize.ts#L8)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`Promize`\<`T`, `K`\>

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/promize.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/promize.ts#L6)

## Methods

### defer()

> **defer**(`defer`, `opt_complete?`): `void`

Defined in: [core/promize.ts:82](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/promize.ts#L82)

#### Parameters

##### defer

[`Deferred`](Deferred.md)

##### opt\_complete?

() => `void`

#### Returns

`void`

***

### reject()

> **reject**(`opt_data?`): `void`

Defined in: [core/promize.ts:40](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/promize.ts#L40)

#### Parameters

##### opt\_data?

`K`

#### Returns

`void`

***

### resolve()

> **resolve**(`opt_data?`): `void`

Defined in: [core/promize.ts:23](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/promize.ts#L23)

#### Parameters

##### opt\_data?

`T`

#### Returns

`void`

***

### then()

> **then**(`resolve`, `opt_reject?`, `opt_complete?`): `void`

Defined in: [core/promize.ts:57](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/promize.ts#L57)

#### Parameters

##### resolve

(...`args`) => `void`

##### opt\_reject?

(...`args`) => `void`

##### opt\_complete?

(...`args`) => `void`

#### Returns

`void`
