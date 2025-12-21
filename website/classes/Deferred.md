# Class: Deferred\<T, K\>

Defined in: [core/deferred.ts:3](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/deferred.ts#L3)

## Type Parameters

### T

`T` = `object`

### K

`K` = `object`

## Constructors

### Constructor

> **new Deferred**\<`T`, `K`\>(): `Deferred`\<`T`, `K`\>

Defined in: [core/deferred.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/deferred.ts#L6)

#### Returns

`Deferred`\<`T`, `K`\>

## Methods

### promise()

> **promise**(): [`Promize`](Promize.md)\<`T`, `K`\>

Defined in: [core/deferred.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/deferred.ts#L10)

#### Returns

[`Promize`](Promize.md)\<`T`, `K`\>

***

### reject()

> **reject**(`opt_data?`): `void`

Defined in: [core/deferred.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/deferred.ts#L18)

#### Parameters

##### opt\_data?

`K`

#### Returns

`void`

***

### resolve()

> **resolve**(`opt_data?`): `void`

Defined in: [core/deferred.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/deferred.ts#L14)

#### Parameters

##### opt\_data?

`T`

#### Returns

`void`
