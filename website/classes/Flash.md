# Class: Flash

Defined in: [module/flash.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L8)

## Constructors

### Constructor

> **new Flash**(`opt_options`): `Flash`

Defined in: [module/flash.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L12)

#### Parameters

##### opt\_options

`object` = `{}`

#### Returns

`Flash`

## Properties

### container

> **container**: [`Knot`](Knot.md)

Defined in: [module/flash.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L9)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [module/flash.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L10)

## Methods

### addDefault()

> **addDefault**(`message`, `opt_duration`, `opt_closeCallback`, `opt_id`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:220](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L220)

#### Parameters

##### message

`string`

##### opt\_duration

`number` = `0`

##### opt\_closeCallback

`Function` = `null`

##### opt\_id

`string` = `''`

#### Returns

[`Knot`](Knot.md)

***

### addError()

> **addError**(`message`, `opt_duration`, `opt_closeCallback`, `opt_id`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:186](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L186)

#### Parameters

##### message

`string`

##### opt\_duration

`number` = `0`

##### opt\_closeCallback

`Function` = `null`

##### opt\_id

`string` = `''`

#### Returns

[`Knot`](Knot.md)

***

### addInfo()

> **addInfo**(`message`, `opt_duration`, `opt_closeCallback`, `opt_id`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:156](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L156)

#### Parameters

##### message

`string`

##### opt\_duration

`number` = `0`

##### opt\_closeCallback

`Function` = `null`

##### opt\_id

`string` = `''`

#### Returns

[`Knot`](Knot.md)

***

### addMessage()

> **addMessage**(`message`, `opt_duration`, `opt_closeCallback`, `opt_id`): [`Knot`](Knot.md)\<`HTMLElement`\>

Defined in: [module/flash.ts:201](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L201)

#### Parameters

##### message

###### closable?

`boolean`

###### content

`string`

###### type

`string`

##### opt\_duration

`number` = `0`

##### opt\_closeCallback

`Function` = `null`

##### opt\_id

`string` = `''`

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

***

### addSuccess()

> **addSuccess**(`message`, `opt_duration`, `opt_closeCallback`, `opt_id`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:141](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L141)

#### Parameters

##### message

`string`

##### opt\_duration

`number` = `0`

##### opt\_closeCallback

`Function` = `null`

##### opt\_id

`string` = `''`

#### Returns

[`Knot`](Knot.md)

***

### addWarning()

> **addWarning**(`message`, `opt_duration`, `opt_closeCallback`, `opt_id`): [`Knot`](Knot.md)

Defined in: [module/flash.ts:171](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L171)

#### Parameters

##### message

`string`

##### opt\_duration

`number` = `0`

##### opt\_closeCallback

`Function` = `null`

##### opt\_id

`string` = `''`

#### Returns

[`Knot`](Knot.md)

***

### remove()

> **remove**(`flash`, `opt_closeCallback`): `void`

Defined in: [module/flash.ts:131](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L131)

#### Parameters

##### flash

[`Knot`](Knot.md)

##### opt\_closeCallback

`Function` = `null`

#### Returns

`void`

***

### removeById()

> **removeById**(`opt_id`): `void`

Defined in: [module/flash.ts:111](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/flash.ts#L111)

#### Parameters

##### opt\_id

`string` = `''`

#### Returns

`void`
