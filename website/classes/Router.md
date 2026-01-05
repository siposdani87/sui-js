# Class: Router

Defined in: [core/router.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L9)

## Constructors

### Constructor

> **new Router**(`opt_route`): `Router`

Defined in: [core/router.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L16)

#### Parameters

##### opt\_route

`string` = `''`

#### Returns

`Router`

## Properties

### escape

> **escape**: `RegExp`

Defined in: [core/router.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L12)

***

### param

> **param**: `RegExp`

Defined in: [core/router.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L11)

***

### paramNames

> **paramNames**: `string`[]

Defined in: [core/router.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L13)

***

### regex

> **regex**: `RegExp`

Defined in: [core/router.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L14)

***

### route

> **route**: `string`

Defined in: [core/router.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L10)

## Methods

### getMatches()

> **getMatches**(`url`): `RegExpMatchArray`

Defined in: [core/router.ts:57](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L57)

#### Parameters

##### url

`string`

#### Returns

`RegExpMatchArray`

***

### parse()

> **parse**(`url`): `object`

Defined in: [core/router.ts:65](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L65)

#### Parameters

##### url

`string`

#### Returns

`object`

***

### stringify()

> **stringify**(`opt_params`): `string`

Defined in: [core/router.ts:35](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/router.ts#L35)

#### Parameters

##### opt\_params

`object` = `{}`

#### Returns

`string`
