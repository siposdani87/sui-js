# Class: Collection\<T\>

Defined in: [core/collection.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L12)

## Extended by

- [`Form`](Form.md)
- [`Query`](Query.md)

## Type Parameters

### T

`T` *extends* `object` = `object`

## Constructors

### Constructor

> **new Collection**\<`T`\>(`opt_items`, `opt_type`, `opt_options`): `Collection`\<`T`\>

Defined in: [core/collection.ts:17](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L17)

#### Parameters

##### opt\_items

`T`[] = `[]`

##### opt\_type

`any` = `Objekt`

##### opt\_options

`object` = `{}`

#### Returns

`Collection`\<`T`\>

## Properties

### items

> **items**: `T`[]

Defined in: [core/collection.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L14)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/collection.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L15)

***

### Type

> **Type**: `any`

Defined in: [core/collection.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L13)

## Methods

### clear()

> **clear**(): `void`

Defined in: [core/collection.ts:134](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L134)

#### Returns

`void`

***

### delete()

> **delete**(`value`): `T`

Defined in: [core/collection.ts:172](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L172)

#### Parameters

##### value

`object` | `T`

#### Returns

`T`

***

### deleteAllBy()

> **deleteAllBy**(`attribute`, `value`): `T`[]

Defined in: [core/collection.ts:198](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L198)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

`T`[]

***

### deleteAllByCondition()

> **deleteAllByCondition**(`conditionCallback`): `T`[]

Defined in: [core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L204)

#### Parameters

##### conditionCallback

`Function`

#### Returns

`T`[]

***

### deleteBy()

> **deleteBy**(`attribute`, `value`): `T`

Defined in: [core/collection.ts:182](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L182)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

`T`

***

### deleteByCondition()

> **deleteByCondition**(`conditionCallback`): `T`

Defined in: [core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L188)

#### Parameters

##### conditionCallback

`Function`

#### Returns

`T`

***

### deleteById()

> **deleteById**(`id`): `T`

Defined in: [core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L178)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

`T`

***

### each()

> **each**(`next`): `void`

Defined in: [core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L106)

#### Parameters

##### next

(`_item`, `_index`) => `void`

#### Returns

`void`

***

### findAllBy()

> **findAllBy**(`attribute`, `value`): `T`[]

Defined in: [core/collection.ts:156](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L156)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

`T`[]

***

### findAllByCondition()

> **findAllByCondition**(`conditionCallback`): `T`[]

Defined in: [core/collection.ts:162](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L162)

#### Parameters

##### conditionCallback

`Function`

#### Returns

`T`[]

***

### findBy()

> **findBy**(`attribute`, `value`): `T`

Defined in: [core/collection.ts:142](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L142)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

`T`

***

### findByCondition()

> **findByCondition**(`conditionCallback`): `T`

Defined in: [core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L148)

#### Parameters

##### conditionCallback

`Function`

#### Returns

`T`

***

### findById()

> **findById**(`id`): `T`

Defined in: [core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L138)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

`T`

***

### get()

> **get**\<`K`\>(`index`, `opt_attribute?`): `T` \| `K`

Defined in: [core/collection.ts:112](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L112)

#### Type Parameters

##### K

`K` = `T`

#### Parameters

##### index

`number`

##### opt\_attribute?

`string`

#### Returns

`T` \| `K`

***

### getById()

> **getById**\<`K`\>(`id`, `opt_attribute?`): `T` \| `K`

Defined in: [core/collection.ts:126](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L126)

#### Type Parameters

##### K

`K` = `T`

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### opt\_attribute?

`string`

#### Returns

`T` \| `K`

***

### getItems()

> **getItems**(): `T`[]

Defined in: [core/collection.ts:86](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L86)

#### Returns

`T`[]

***

### iterator()

> **iterator**(`callback`, `next`, `opt_items?`): `T`[]

Defined in: [core/collection.ts:90](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L90)

#### Parameters

##### callback

(`_item`) => `boolean`

##### next

(`_item`, `_index`) => `void`

##### opt\_items?

`T`[]

#### Returns

`T`[]

***

### limit()

> **limit**(`offset`, `opt_count`): `T`[]

Defined in: [core/collection.ts:222](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L222)

#### Parameters

##### offset

`number`

##### opt\_count

`number` = `10`

#### Returns

`T`[]

***

### load()

> **load**(`objects`): `void`

Defined in: [core/collection.ts:36](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L36)

#### Parameters

##### objects

(`object` \| `T`)[]

#### Returns

`void`

***

### push()

> **push**(`object`): `T`

Defined in: [core/collection.ts:47](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L47)

#### Parameters

##### object

`object` | `T`

#### Returns

`T`

***

### reload()

> **reload**(`objects`): `void`

Defined in: [core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L42)

#### Parameters

##### objects

(`object` \| `T`)[]

#### Returns

`void`

***

### replace()

> **replace**(`object`): `T`

Defined in: [core/collection.ts:73](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L73)

#### Parameters

##### object

`object` | `T`

#### Returns

`T`

***

### set()

> **set**(`index`, `object`): `T`

Defined in: [core/collection.ts:63](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L63)

#### Parameters

##### index

`number`

##### object

`object` | `T`

#### Returns

`T`

***

### size()

> **size**(): `number`

Defined in: [core/collection.ts:218](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L218)

#### Returns

`number`
