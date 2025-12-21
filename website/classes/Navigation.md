# Class: Navigation

Defined in: [component/navigation.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L8)

## Constructors

### Constructor

> **new Navigation**(`opt_http?`, `opt_options?`): `Navigation`

Defined in: [component/navigation.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L14)

#### Parameters

##### opt\_http?

[`Http`](Http.md)

##### opt\_options?

`object` = `{}`

#### Returns

`Navigation`

## Properties

### container

> **container**: [`Collection`](Collection.md)\<[`Objekt`](Objekt.md)\<`object`\>\>

Defined in: [component/navigation.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L11)

***

### http?

> `optional` **http**: [`Http`](Http.md)

Defined in: [component/navigation.ts:9](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L9)

***

### linkKnotKey

> **linkKnotKey**: `string`

Defined in: [component/navigation.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L12)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [component/navigation.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L10)

## Methods

### add()

> **add**(`item`): `void`

Defined in: [component/navigation.ts:31](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L31)

#### Parameters

##### item

[`Objekt`](Objekt.md)

#### Returns

`void`

***

### addCounter()

> **addCounter**(`id`, `counter`, `title`, `action`, `opt_href`, `opt_data`): `void`

Defined in: [component/navigation.ts:56](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L56)

#### Parameters

##### id

`string`

##### counter

`string`

##### title

`string`

##### action

`Function`

##### opt\_href

`string` = `''`

##### opt\_data

`object` = `{}`

#### Returns

`void`

***

### addIcon()

> **addIcon**(`id`, `icon`, `title`, `action`, `opt_href`, `opt_data`): `void`

Defined in: [component/navigation.ts:73](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L73)

#### Parameters

##### id

`string`

##### icon

`string`

##### title

`string`

##### action

`Function`

##### opt\_href

`string` = `''`

##### opt\_data

`object` = `{}`

#### Returns

`void`

***

### addImage()

> **addImage**(`id`, `image`, `title`, `action`, `opt_href`, `opt_data`): `void`

Defined in: [component/navigation.ts:94](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L94)

#### Parameters

##### id

`string`

##### image

`string`

##### title

`string`

##### action

`Function`

##### opt\_href

`string` = `''`

##### opt\_data

`object` = `{}`

#### Returns

`void`

***

### addText()

> **addText**(`id`, `title`, `action`, `opt_href`, `opt_data`): `void`

Defined in: [component/navigation.ts:134](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L134)

#### Parameters

##### id

`string`

##### title

`string`

##### action

`Function`

##### opt\_href

`string` = `''`

##### opt\_data

`object` = `{}`

#### Returns

`void`

***

### bindToContainer()

> **bindToContainer**(`containerKnot`): `void`

Defined in: [component/navigation.ts:186](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L186)

#### Parameters

##### containerKnot

[`Knot`](Knot.md)

#### Returns

`void`

***

### each()

> **each**(`next`): `void`

Defined in: [component/navigation.ts:180](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L180)

#### Parameters

##### next

`Function`

#### Returns

`void`

***

### hide()

> **hide**(`id`): `void`

Defined in: [component/navigation.ts:258](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L258)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### setActive()

> **setActive**(`id`): `void`

Defined in: [component/navigation.ts:228](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L228)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### setAllInactive()

> **setAllInactive**(): `void`

Defined in: [component/navigation.ts:242](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L242)

#### Returns

`void`

***

### setDisabled()

> **setDisabled**(`id`): `void`

Defined in: [component/navigation.ts:194](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L194)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### setEnabled()

> **setEnabled**(`id`): `void`

Defined in: [component/navigation.ts:208](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L208)

#### Parameters

##### id

`string`

#### Returns

`void`

***

### show()

> **show**(`id`): `void`

Defined in: [component/navigation.ts:249](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/navigation.ts#L249)

#### Parameters

##### id

`string`

#### Returns

`void`
