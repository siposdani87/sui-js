# Class: Route

Defined in: [component/route.ts:3](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/route.ts#L3)

## Extends

- [`Objekt`](Objekt.md)

## Indexable

\[`key`: `string`\]: `any`

## Constructors

### Constructor

> **new Route**(`id`, `title`, `url`, `controller`, `opt_template`, `opt_params`): `Route`

Defined in: [component/route.ts:4](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/route.ts#L4)

#### Parameters

##### id

`string`

##### title

`string`

##### url

`string`

##### controller

`string`

##### opt\_template

`string` = `''`

##### opt\_params

`object` = `{}`

#### Returns

`Route`

#### Overrides

[`Objekt`](Objekt.md).[`constructor`](Objekt.md#constructor)

## Methods

### allowKeys()

> **allowKeys**(`keys`): [`Objekt`](Objekt.md)

Defined in: [core/objekt.ts:206](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L206)

#### Parameters

##### keys

`string`[]

#### Returns

[`Objekt`](Objekt.md)

#### Inherited from

[`Objekt`](Objekt.md).[`allowKeys`](Objekt.md#allowkeys)

***

### clear()

> **clear**(): `void`

Defined in: [core/objekt.ts:135](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L135)

#### Returns

`void`

#### Inherited from

[`Objekt`](Objekt.md).[`clear`](Objekt.md#clear)

***

### copy()

> **copy**(): [`Objekt`](Objekt.md)

Defined in: [core/objekt.ts:193](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L193)

#### Returns

[`Objekt`](Objekt.md)

#### Inherited from

[`Objekt`](Objekt.md).[`copy`](Objekt.md#copy)

***

### copyObject()

> **copyObject**(): `object`

Defined in: [core/objekt.ts:198](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L198)

#### Returns

`object`

#### Inherited from

[`Objekt`](Objekt.md).[`copyObject`](Objekt.md#copyobject)

***

### denyKeys()

> **denyKeys**(`keys`): [`Objekt`](Objekt.md)

Defined in: [core/objekt.ts:212](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L212)

#### Parameters

##### keys

`string`[]

#### Returns

[`Objekt`](Objekt.md)

#### Inherited from

[`Objekt`](Objekt.md).[`denyKeys`](Objekt.md#denykeys)

***

### each()

> **each**\<`K`\>(`next`, `opt_properties?`, `opt_attributes?`): `void`

Defined in: [core/objekt.ts:160](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L160)

#### Type Parameters

##### K

`K`

#### Parameters

##### next

(`value`, `key`) => `void`

##### opt\_properties?

`object`

##### opt\_attributes?

`string`[]

#### Returns

`void`

#### Inherited from

[`Objekt`](Objekt.md).[`each`](Objekt.md#each)

***

### filterKeys()

> **filterKeys**(`obj`, `condition`): [`Objekt`](Objekt.md)

Defined in: [core/objekt.ts:218](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L218)

#### Parameters

##### obj

[`Objekt`](Objekt.md)

##### condition

(`key`) => `boolean`

#### Returns

[`Objekt`](Objekt.md)

#### Inherited from

[`Objekt`](Objekt.md).[`filterKeys`](Objekt.md#filterkeys)

***

### get()

> **get**\<`K`\>(`attribute`, `opt_defaultValue?`, `opt_isSafe?`): `K`

Defined in: [core/objekt.ts:55](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L55)

#### Type Parameters

##### K

`K`

#### Parameters

##### attribute

`string`

##### opt\_defaultValue?

`K`

##### opt\_isSafe?

`boolean` = `false`

#### Returns

`K`

#### Inherited from

[`Objekt`](Objekt.md).[`get`](Objekt.md#get)

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [core/objekt.ts:202](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L202)

#### Returns

`boolean`

#### Inherited from

[`Objekt`](Objekt.md).[`isEmpty`](Objekt.md#isempty)

***

### merge()

> **merge**(`object`): [`Objekt`](Objekt.md)

Defined in: [core/objekt.ts:25](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L25)

#### Parameters

##### object

`any`

#### Returns

[`Objekt`](Objekt.md)

#### Inherited from

[`Objekt`](Objekt.md).[`merge`](Objekt.md#merge)

***

### remove()

> **remove**(`attribute`): `void`

Defined in: [core/objekt.ts:130](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L130)

#### Parameters

##### attribute

`string`

#### Returns

`void`

#### Inherited from

[`Objekt`](Objekt.md).[`remove`](Objekt.md#remove)

***

### set()

> **set**\<`K`\>(`attribute`, `value`): `void`

Defined in: [core/objekt.ts:114](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L114)

#### Type Parameters

##### K

`K`

#### Parameters

##### attribute

`string`

##### value

`K`

#### Returns

`void`

#### Inherited from

[`Objekt`](Objekt.md).[`set`](Objekt.md#set)

***

### setRaw()

> **setRaw**\<`K`\>(`attribute`, `value`, `opt_isSafe`): `void`

Defined in: [core/objekt.ts:120](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L120)

#### Type Parameters

##### K

`K`

#### Parameters

##### attribute

`string`

##### value

`K`

##### opt\_isSafe

`boolean` = `false`

#### Returns

`void`

#### Inherited from

[`Objekt`](Objekt.md).[`setRaw`](Objekt.md#setraw)
