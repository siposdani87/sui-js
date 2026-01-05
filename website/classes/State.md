# Class: State

Defined in: [core/state.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L9)

## Constructors

### Constructor

> **new State**(`routes`, `opt_options`): `State`

Defined in: [core/state.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L16)

#### Parameters

##### routes

[`Route`](Route.md)[]

##### opt\_options

`object` = `{}`

#### Returns

`State`

## Properties

### basePath

> **basePath**: `string`

Defined in: [core/state.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L13)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/state.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L14)

***

### routes

> **routes**: [`Collection`](Collection.md)\<[`Route`](Route.md)\>

Defined in: [core/state.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L12)

## Methods

### back()

> **back**(): `void`

Defined in: [core/state.ts:270](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L270)

#### Returns

`void`

***

### eventChange()

> **eventChange**(`currentState`, `previousState`, `opt_force`): `void`

Defined in: [core/state.ts:286](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L286)

#### Parameters

##### currentState

[`Objekt`](Objekt.md)

##### previousState

[`Objekt`](Objekt.md)

##### opt\_force

`boolean` = `false`

#### Returns

`void`

***

### forward()

> **forward**(): `void`

Defined in: [core/state.ts:282](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L282)

#### Returns

`void`

***

### getCurrent()

> **getCurrent**\<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

Defined in: [core/state.ts:177](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L177)

#### Type Parameters

##### T

`T`

#### Parameters

##### opt\_attribute?

`string`

##### opt\_defaultValue?

`T`

#### Returns

`T`

***

### getParam()

> **getParam**\<`T`\>(`name`, `opt_defaultValue?`): `T`

Defined in: [core/state.ts:316](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L316)

#### Type Parameters

##### T

`T` = `string`

#### Parameters

##### name

`string`

##### opt\_defaultValue?

`any`

#### Returns

`T`

***

### getParams()

> **getParams**(): [`Objekt`](Objekt.md)

Defined in: [core/state.ts:312](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L312)

#### Returns

[`Objekt`](Objekt.md)

***

### getPrevious()

> **getPrevious**\<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

Defined in: [core/state.ts:181](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L181)

#### Type Parameters

##### T

`T`

#### Parameters

##### opt\_attribute?

`string`

##### opt\_defaultValue?

`T`

#### Returns

`T`

***

### getRoot()

> **getRoot**(): `any`[]

Defined in: [core/state.ts:329](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L329)

#### Returns

`any`[]

***

### go()

> **go**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

Defined in: [core/state.ts:185](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L185)

#### Parameters

##### id

`string`

##### opt\_params?

`object`

##### opt\_overwrite?

`boolean` = `false`

##### opt\_force?

`boolean` = `false`

#### Returns

`void`

***

### goBack()

> **goBack**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

Defined in: [core/state.ts:257](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L257)

#### Parameters

##### id

`string`

##### opt\_params?

`object`

##### opt\_overwrite?

`boolean` = `false`

##### opt\_force?

`boolean` = `false`

#### Returns

`void`

***

### goRoot()

> **goRoot**(`opt_overwrite`, `opt_force`): `void`

Defined in: [core/state.ts:245](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L245)

#### Parameters

##### opt\_overwrite

`boolean` = `false`

##### opt\_force

`boolean` = `false`

#### Returns

`void`

***

### goState()

> **goState**(`state`, `opt_overwrite`, `opt_force`): `void`

Defined in: [core/state.ts:237](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L237)

#### Parameters

##### state

[`Route`](Route.md)

##### opt\_overwrite

`boolean` = `false`

##### opt\_force

`boolean` = `false`

#### Returns

`void`

***

### redirect()

> **redirect**(`url`, `opt_inTab`): `void`

Defined in: [core/state.ts:274](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L274)

#### Parameters

##### url

`string`

##### opt\_inTab

`boolean` = `false`

#### Returns

`void`

***

### refresh()

> **refresh**(`opt_force`): `void`

Defined in: [core/state.ts:325](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L325)

#### Parameters

##### opt\_force

`boolean` = `false`

#### Returns

`void`

***

### reload()

> **reload**(): `void`

Defined in: [core/state.ts:321](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L321)

#### Returns

`void`

***

### resolveUrl()

> **resolveUrl**(`id`, `opt_params?`): `string`

Defined in: [core/state.ts:232](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L232)

#### Parameters

##### id

`string`

##### opt\_params?

`object`

#### Returns

`string`

***

### run()

> **run**(): `void`

Defined in: [core/state.ts:82](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L82)

#### Returns

`void`

***

### setParam()

> **setParam**(`name`, `value`): `void`

Defined in: [core/state.ts:305](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L305)

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

`void`

***

### setParams()

> **setParams**(`properties`): `void`

Defined in: [core/state.ts:299](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/state.ts#L299)

#### Parameters

##### properties

`object`

#### Returns

`void`
