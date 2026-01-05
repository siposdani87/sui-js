# Class: Depot

Defined in: [module/depot.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L5)

## Constructors

### Constructor

> **new Depot**(`type`, `opt_options`): `Depot`

Defined in: [module/depot.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L10)

#### Parameters

##### type

`"LOCAL"` | `"SESSION"`

##### opt\_options

`object` = `{}`

#### Returns

`Depot`

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/depot.ts:7](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L7)

***

### storage

> **storage**: `Storage`

Defined in: [module/depot.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L8)

***

### type

> **type**: `"LOCAL"` \| `"SESSION"`

Defined in: [module/depot.ts:6](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L6)

## Methods

### clear()

> **clear**(): `void`

Defined in: [module/depot.ts:78](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L78)

#### Returns

`void`

***

### get()

> **get**(`name`): `any`

Defined in: [module/depot.ts:60](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L60)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### remove()

> **remove**(`name`): `void`

Defined in: [module/depot.ts:73](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L73)

#### Parameters

##### name

`string`

#### Returns

`void`

***

### set()

> **set**(`name`, `value`, `opt_expires?`): `void`

Defined in: [module/depot.ts:49](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/depot.ts#L49)

#### Parameters

##### name

`string`

##### value

`any`

##### opt\_expires?

`string` | `number` | `boolean` | `Date`

#### Returns

`void`
