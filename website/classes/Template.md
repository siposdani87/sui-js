# Class: Template

Defined in: [module/template.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L9)

## Constructors

### Constructor

> **new Template**(`http`, `opt_options`): `Template`

Defined in: [module/template.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L14)

#### Parameters

##### http

[`Http`](Http.md)

##### opt\_options

`object` = `{}`

#### Returns

`Template`

## Properties

### http

> **http**: [`Http`](Http.md)

Defined in: [module/template.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L10)

***

### options

> **options**: [`Objekt`](Objekt.md)\<\{ `locale`: `string`; `selector`: `string`; \}\>

Defined in: [module/template.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L11)

***

### viewKnot

> **viewKnot**: [`Knot`](Knot.md)

Defined in: [module/template.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L12)

## Methods

### \_spaNavigate()

> **\_spaNavigate**(`data`, `isError`): [`Knot`](Knot.md)

Defined in: [module/template.ts:63](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L63)

#### Parameters

##### data

[`Knot`](Knot.md)

##### isError

`boolean`

#### Returns

[`Knot`](Knot.md)

***

### eventError()

> **eventError**(`message`): `void`

Defined in: [module/template.ts:97](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L97)

#### Parameters

##### message

###### content

`string`

###### type

`string`

#### Returns

`void`

***

### getViewKnot()

> **getViewKnot**(): [`Knot`](Knot.md)

Defined in: [module/template.ts:33](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L33)

#### Returns

[`Knot`](Knot.md)

***

### load()

> **load**(`url`, `opt_force`): [`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

Defined in: [module/template.ts:37](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/module/template.ts#L37)

#### Parameters

##### url

`string`

##### opt\_force

`boolean` = `false`

#### Returns

[`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>
