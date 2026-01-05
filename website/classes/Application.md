# Class: Application

Defined in: [component/application.ts:34](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L34)

## Constructors

### Constructor

> **new Application**(`options`, `resources`): `Application`

Defined in: [component/application.ts:74](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L74)

#### Parameters

##### options

`object`

##### resources

[`Injection`](../type-aliases/Injection.md)

#### Returns

`Application`

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/application.ts:35](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L35)

## Methods

### controller()

> **controller**(`name`, `moduleInjections`, `moduleCallback`): `string`

Defined in: [component/application.ts:496](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L496)

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

### getController()

> **getController**(): `object`

Defined in: [component/application.ts:476](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L476)

#### Returns

`object`

***

### getInstance()

> **getInstance**(`name`): `object`

Defined in: [component/application.ts:472](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L472)

#### Parameters

##### name

keyof [`Instance`](../type-aliases/Instance.md)

#### Returns

`object`

***

### getLanguage()

> **getLanguage**(): `string`

Defined in: [component/application.ts:129](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L129)

#### Returns

`string`

***

### getLocale()

> **getLocale**(): `string`

Defined in: [component/application.ts:134](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L134)

#### Returns

`string`

***

### run()

> **run**(`routes`, `services`): `void`

Defined in: [component/application.ts:480](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L480)

#### Parameters

##### routes

[`Route`](Route.md)[]

##### services

`string`[]

#### Returns

`void`

***

### service()

> **service**(`name`, `moduleInjections`, `moduleCallback`): `string`

Defined in: [component/application.ts:504](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L504)

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

### setLocale()

> **setLocale**(`locale`): `void`

Defined in: [component/application.ts:142](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L142)

#### Parameters

##### locale

`string`

#### Returns

`void`

***

### setLocaleWithReload()

> **setLocaleWithReload**(`locale`): `void`

Defined in: [component/application.ts:147](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L147)

#### Parameters

##### locale

`string`

#### Returns

`void`

***

### setRootState()

> **setRootState**(`id`, `opt_params?`): `void`

Defined in: [component/application.ts:467](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/application.ts#L467)

#### Parameters

##### id

`string`

##### opt\_params?

`object`

#### Returns

`void`
