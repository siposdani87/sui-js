# Class: CardCollection

Defined in: [component/cardCollection.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L11)

## Constructors

### Constructor

> **new CardCollection**(`dom`, `opt_selector`, `opt_ctrl`, `opt_options`): `CardCollection`

Defined in: [component/cardCollection.ts:25](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L25)

#### Parameters

##### dom

[`Knot`](Knot.md)

##### opt\_selector

`string` = `'.card-collection'`

##### opt\_ctrl

`object` = `null`

##### opt\_options

`object` = `{}`

#### Returns

`CardCollection`

## Properties

### body

> **body**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:19](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L19)

***

### cardCollectionKnot

> **cardCollectionKnot**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L12)

***

### cardFooterKnot

> **cardFooterKnot**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L20)

***

### cardTemplate

> **cardTemplate**: [`Knot`](Knot.md)\<`HTMLTemplateElement`\>

Defined in: [component/cardCollection.ts:22](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L22)

***

### collection

> **collection**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/cardCollection.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L15)

***

### contentHandler

> **contentHandler**: [`ContentHandler`](ContentHandler.md)

Defined in: [component/cardCollection.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L18)

***

### ctrl

> **ctrl**: `any`

Defined in: [component/cardCollection.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L13)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/cardCollection.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L14)

***

### pager

> **pager**: [`Pager`](Pager.md)

Defined in: [component/cardCollection.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L17)

***

### pagerKnot

> **pagerKnot**: [`Knot`](Knot.md)

Defined in: [component/cardCollection.ts:21](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L21)

***

### query

> **query**: `string`

Defined in: [component/cardCollection.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L16)

***

### template

> **template**: `string`

Defined in: [component/cardCollection.ts:23](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L23)

## Methods

### eventAction()

> **eventAction**(`params`): `void`

Defined in: [component/cardCollection.ts:157](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L157)

#### Parameters

##### params

[`Objekt`](Objekt.md)

#### Returns

`void`

***

### eventCardKnot()

> **eventCardKnot**(`cardKnot`, `item`): `void`

Defined in: [component/cardCollection.ts:161](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L161)

#### Parameters

##### cardKnot

[`Knot`](Knot.md)

##### item

[`Objekt`](Objekt.md)

#### Returns

`void`

***

### refresh()

> **refresh**(`opt_page`): `void`

Defined in: [component/cardCollection.ts:143](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L143)

#### Parameters

##### opt\_page

`number` = `-1`

#### Returns

`void`

***

### render()

> **render**(): `void`

Defined in: [component/cardCollection.ts:206](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L206)

#### Returns

`void`

***

### setCount()

> **setCount**(`count`): `void`

Defined in: [component/cardCollection.ts:182](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L182)

#### Parameters

##### count

`number`

#### Returns

`void`

***

### setData()

> **setData**(`items`): `void`

Defined in: [component/cardCollection.ts:172](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/cardCollection.ts#L172)

#### Parameters

##### items

`any`[]

#### Returns

`void`
