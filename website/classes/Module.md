# Class: Module

Defined in: [core/module.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L11)

## Constructors

### Constructor

> **new Module**(): `Module`

Defined in: [core/module.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L20)

#### Returns

`Module`

## Methods

### add()

> **add**(`name`, `moduleInjections`, `moduleCallback`): `string`

Defined in: [core/module.ts:36](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L36)

#### Parameters

##### name

`string`

##### moduleInjections

`string`[]

##### moduleCallback

[`ClassRef`](../type-aliases/ClassRef.md)

#### Returns

`string`

***

### eventAfterInit()

> **eventAfterInit**(): `void`

Defined in: [core/module.ts:275](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L275)

#### Returns

`void`

***

### eventControllerFailed()

> **eventControllerFailed**(): `void`

Defined in: [core/module.ts:249](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L249)

#### Returns

`void`

***

### eventControllerLoaded()

> **eventControllerLoaded**(`dom`): `void`

Defined in: [core/module.ts:245](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L245)

#### Parameters

##### dom

[`Knot`](Knot.md)

#### Returns

`void`

***

### eventDomChange()

> **eventDomChange**(`state`, `dom`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/module.ts:268](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L268)

#### Parameters

##### state

[`Objekt`](Objekt.md)

##### dom

[`Knot`](Knot.md)

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

***

### eventModuleFailed()

> **eventModuleFailed**(`state`): `void`

Defined in: [core/module.ts:253](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L253)

#### Parameters

##### state

[`Objekt`](Objekt.md)

#### Returns

`void`

***

### eventModuleLoaded()

> **eventModuleLoaded**(`state`): `void`

Defined in: [core/module.ts:257](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L257)

#### Parameters

##### state

[`Objekt`](Objekt.md)

#### Returns

`void`

***

### eventServiceFailed()

> **eventServiceFailed**(): `void`

Defined in: [core/module.ts:283](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L283)

#### Returns

`void`

***

### eventServiceLoaded()

> **eventServiceLoaded**(): `void`

Defined in: [core/module.ts:279](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L279)

#### Returns

`void`

***

### eventStateChange()

> **eventStateChange**(`state`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/module.ts:261](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L261)

#### Parameters

##### state

[`Objekt`](Objekt.md)

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

***

### getController()

> **getController**(): `object`

Defined in: [core/module.ts:32](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L32)

#### Returns

`object`

***

### handleRoutes()

> **handleRoutes**(`routes`, `options`): `void`

Defined in: [core/module.ts:167](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L167)

#### Parameters

##### routes

[`Route`](Route.md)[]

##### options

`object`

#### Returns

`void`

***

### handleServices()

> **handleServices**(`services`): `void`

Defined in: [core/module.ts:136](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L136)

#### Parameters

##### services

`string`[]

#### Returns

`void`

***

### load()

> **load**(`instances`, `injections`): `void`

Defined in: [core/module.ts:27](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/module.ts#L27)

#### Parameters

##### instances

[`Instance`](../type-aliases/Instance.md)

##### injections

[`Injection`](../type-aliases/Injection.md)

#### Returns

`void`
