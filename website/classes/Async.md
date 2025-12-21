# Class: Async

Defined in: [core/async.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L5)

## Constructors

### Constructor

> **new Async**(`opt_sum?`): `Async`

Defined in: [core/async.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L14)

#### Parameters

##### opt\_sum?

`number`

#### Returns

`Async`

## Properties

### call

> **call**: `object`

Defined in: [core/async.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L7)

#### counter

> **counter**: `number`

#### isError

> **isError**: `boolean`

#### results

> **results**: `any`[]

#### sum

> **sum**: `number`

***

### sum

> **sum**: `number`

Defined in: [core/async.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L6)

## Methods

### eventComplete()

> **eventComplete**(`isError`, `results`): `void`

Defined in: [core/async.ts:160](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L160)

#### Parameters

##### isError

`boolean`

##### results

`any`[]

#### Returns

`void`

***

### parallel()

> **parallel**(`calls`, `opt_args?`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/async.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L19)

#### Parameters

##### calls

`Function`[]

##### opt\_args?

`any`[]

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

***

### parallelFunction()

> **parallelFunction**(`call`, `opt_args?`, `opt_index?`): `void`

Defined in: [core/async.ts:40](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L40)

#### Parameters

##### call

`Function`

##### opt\_args?

`any`[]

##### opt\_index?

`number`

#### Returns

`void`

***

### serial()

> **serial**(`calls`, `opt_args?`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/async.ts:164](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L164)

#### Parameters

##### calls

`Function`[]

##### opt\_args?

`any`[]

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

***

### setStatus()

> **setStatus**(`sum`, `isError`, `counter`, `results`): `void`

Defined in: [core/async.ts:148](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/async.ts#L148)

#### Parameters

##### sum

`number`

##### isError

`boolean`

##### counter

`number`

##### results

`any`[]

#### Returns

`void`
