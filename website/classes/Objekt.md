# Class: Objekt\<T\>

Defined in: [core/objekt.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L17)

## Extended by

- [`Route`](Route.md)

## Type Parameters

### T

`T` *extends* `object` = `object`

## Indexable

\[`key`: `string`\]: `T`\[`any`\]

## Constructors

### Constructor

> **new Objekt**\<`T`\>(`opt_object?`): `Objekt`\<`T`\>

Defined in: [core/objekt.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L20)

#### Parameters

##### opt\_object?

`T`

#### Returns

`Objekt`\<`T`\>

## Methods

### allowKeys()

> **allowKeys**(`keys`): `Objekt`

Defined in: [core/objekt.ts:206](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L206)

#### Parameters

##### keys

`string`[]

#### Returns

`Objekt`

***

### clear()

> **clear**(): `void`

Defined in: [core/objekt.ts:135](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L135)

#### Returns

`void`

***

### copy()

> **copy**(): `Objekt`

Defined in: [core/objekt.ts:193](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L193)

#### Returns

`Objekt`

***

### copyObject()

> **copyObject**(): `object`

Defined in: [core/objekt.ts:198](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L198)

#### Returns

`object`

***

### denyKeys()

> **denyKeys**(`keys`): `Objekt`

Defined in: [core/objekt.ts:212](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L212)

#### Parameters

##### keys

`string`[]

#### Returns

`Objekt`

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

***

### filterKeys()

> **filterKeys**(`obj`, `condition`): `Objekt`

Defined in: [core/objekt.ts:218](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L218)

#### Parameters

##### obj

`Objekt`

##### condition

(`key`) => `boolean`

#### Returns

`Objekt`

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

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [core/objekt.ts:202](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L202)

#### Returns

`boolean`

***

### merge()

> **merge**(`object`): `Objekt`

Defined in: [core/objekt.ts:25](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L25)

#### Parameters

##### object

`any`

#### Returns

`Objekt`

***

### remove()

> **remove**(`attribute`): `void`

Defined in: [core/objekt.ts:130](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/objekt.ts#L130)

#### Parameters

##### attribute

`string`

#### Returns

`void`

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
