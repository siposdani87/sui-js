# Class: Table\<T\>

Defined in: [component/table.ts:32](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L32)

## Type Parameters

### T

`T` *extends* [`Objekt`](Objekt.md) = [`Objekt`](Objekt.md)

## Constructors

### Constructor

> **new Table**\<`T`\>(`dom`, `opt_selector`, `opt_options`): `Table`\<`T`\>

Defined in: [component/table.ts:45](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L45)

#### Parameters

##### dom

[`Knot`](Knot.md)

##### opt\_selector

`string` = `'table'`

##### opt\_options

`object` = `{}`

#### Returns

`Table`\<`T`\>

## Properties

### actions

> **actions**: [`Action`](../type-aliases/Action.md)[]

Defined in: [component/table.ts:37](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L37)

***

### collection

> **collection**: [`Collection`](Collection.md)\<`T`\>

Defined in: [component/table.ts:35](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L35)

***

### contentHandler

> **contentHandler**: [`ContentHandler`](ContentHandler.md)

Defined in: [component/table.ts:38](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L38)

***

### headerKnots

> **headerKnots**: [`Query`](Query.md)\<`HTMLElement`\>

Defined in: [component/table.ts:39](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L39)

***

### headerTexts

> **headerTexts**: `string`[]

Defined in: [component/table.ts:40](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L40)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/table.ts:34](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L34)

***

### pager

> **pager**: [`Pager`](Pager.md)

Defined in: [component/table.ts:43](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L43)

***

### query

> **query**: `string`

Defined in: [component/table.ts:36](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L36)

***

### tableKnot

> **tableKnot**: [`Knot`](Knot.md)

Defined in: [component/table.ts:33](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L33)

***

### tbody

> **tbody**: [`Knot`](Knot.md)

Defined in: [component/table.ts:41](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L41)

***

### tfoot

> **tfoot**: [`Knot`](Knot.md)

Defined in: [component/table.ts:42](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L42)

## Methods

### eventAction()

> **eventAction**(`params`): `void`

Defined in: [component/table.ts:253](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L253)

#### Parameters

##### params

[`Objekt`](Objekt.md)

#### Returns

`void`

***

### refresh()

> **refresh**(`opt_page`): `void`

Defined in: [component/table.ts:239](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L239)

#### Parameters

##### opt\_page

`number` = `-1`

#### Returns

`void`

***

### render()

> **render**(): `void`

Defined in: [component/table.ts:522](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L522)

#### Returns

`void`

***

### setActions()

> **setActions**(`actions`): `void`

Defined in: [component/table.ts:370](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L370)

#### Parameters

##### actions

[`Action`](../type-aliases/Action.md)[]

#### Returns

`void`

***

### setCount()

> **setCount**(`count`): `void`

Defined in: [component/table.ts:497](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L497)

#### Parameters

##### count

`number`

#### Returns

`void`

***

### setData()

> **setData**(`items`): `void`

Defined in: [component/table.ts:487](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/table.ts#L487)

#### Parameters

##### items

`any`[]

#### Returns

`void`
