# Class: EventBus

Defined in: [module/eventBus.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L5)

## Constructors

### Constructor

> **new EventBus**(): `EventBus`

Defined in: [module/eventBus.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L8)

#### Returns

`EventBus`

## Properties

### eventStore

> **eventStore**: [`Objekt`](Objekt.md)

Defined in: [module/eventBus.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L6)

## Methods

### call()

> **call**(`name`, `opt_args`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [module/eventBus.ts:35](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L35)

#### Parameters

##### name

`string`

##### opt\_args

`any`[] = `[]`

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

***

### override()

> **override**(`name`, `args`, `callback`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [module/eventBus.ts:41](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L41)

#### Parameters

##### name

`string`

##### args

`any`[]

##### callback

`Function`

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

***

### pop()

> **pop**(`name`): `void`

Defined in: [module/eventBus.ts:29](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L29)

#### Parameters

##### name

`string`

#### Returns

`void`

***

### remove()

> **remove**(`name`, `callback`): `void`

Defined in: [module/eventBus.ts:21](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L21)

#### Parameters

##### name

`string`

##### callback

`Function`

#### Returns

`void`

***

### set()

> **set**(`name`, `callback`): `Function`

Defined in: [module/eventBus.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/eventBus.ts#L12)

#### Parameters

##### name

`string`

##### callback

`Function`

#### Returns

`Function`
