# Class: Query\<T\>

Defined in: [core/query.ts:5](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/query.ts#L5)

## Extends

- [`Collection`](Collection.md)\<[`Knot`](Knot.md)\<`T`\>\>

## Type Parameters

### T

`T` *extends* `HTMLElement` = `HTMLElement`

## Constructors

### Constructor

> **new Query**\<`T`\>(`selector`, `opt_element?`): `Query`\<`T`\>

Defined in: [core/query.ts:8](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/query.ts#L8)

#### Parameters

##### selector

`string`

##### opt\_element?

`HTMLElement` | [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

`Query`\<`T`\>

#### Overrides

[`Collection`](Collection.md).[`constructor`](Collection.md#constructor)

## Properties

### items

> **items**: [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L14)

#### Inherited from

[`Collection`](Collection.md).[`items`](Collection.md#items)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/collection.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L15)

#### Inherited from

[`Form`](Form.md).[`options`](Form.md#options)

***

### Type

> **Type**: `any`

Defined in: [core/collection.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L13)

#### Inherited from

[`Form`](Form.md).[`Type`](Form.md#type)

## Methods

### clear()

> **clear**(): `void`

Defined in: [core/collection.ts:134](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L134)

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`clear`](Collection.md#clear)

***

### delete()

> **delete**(`value`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:172](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L172)

#### Parameters

##### value

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`delete`](Collection.md#delete)

***

### deleteAllBy()

> **deleteAllBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:198](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L198)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[`Collection`](Collection.md).[`deleteAllBy`](Collection.md#deleteallby)

***

### deleteAllByCondition()

> **deleteAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L204)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[`Collection`](Collection.md).[`deleteAllByCondition`](Collection.md#deleteallbycondition)

***

### deleteBy()

> **deleteBy**(`attribute`, `value`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:182](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L182)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`deleteBy`](Collection.md#deleteby)

***

### deleteByCondition()

> **deleteByCondition**(`conditionCallback`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L188)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`deleteByCondition`](Collection.md#deletebycondition)

***

### deleteById()

> **deleteById**(`id`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L178)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`deleteById`](Collection.md#deletebyid)

***

### each()

> **each**(`next`): `void`

Defined in: [core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L106)

#### Parameters

##### next

(`_item`, `_index`) => `void`

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`each`](Collection.md#each)

***

### findAllBy()

> **findAllBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:156](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L156)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[`Collection`](Collection.md).[`findAllBy`](Collection.md#findallby)

***

### findAllByCondition()

> **findAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:162](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L162)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[`Collection`](Collection.md).[`findAllByCondition`](Collection.md#findallbycondition)

***

### findBy()

> **findBy**(`attribute`, `value`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:142](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L142)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`findBy`](Collection.md#findby)

***

### findByCondition()

> **findByCondition**(`conditionCallback`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L148)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`findByCondition`](Collection.md#findbycondition)

***

### findById()

> **findById**(`id`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L138)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`findById`](Collection.md#findbyid)

***

### get()

> **get**\<`K`\>(`index`, `opt_attribute?`): [`Knot`](Knot.md)\<`T`\> \| `K`

Defined in: [core/collection.ts:112](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L112)

#### Type Parameters

##### K

`K` = [`Knot`](Knot.md)\<`T`\>

#### Parameters

##### index

`number`

##### opt\_attribute?

`string`

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `K`

#### Inherited from

[`Collection`](Collection.md).[`get`](Collection.md#get)

***

### getById()

> **getById**\<`K`\>(`id`, `opt_attribute?`): [`Knot`](Knot.md)\<`T`\> \| `K`

Defined in: [core/collection.ts:126](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L126)

#### Type Parameters

##### K

`K` = [`Knot`](Knot.md)\<`T`\>

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### opt\_attribute?

`string`

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `K`

#### Inherited from

[`Collection`](Collection.md).[`getById`](Collection.md#getbyid)

***

### getItems()

> **getItems**(): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:86](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L86)

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[`Collection`](Collection.md).[`getItems`](Collection.md#getitems)

***

### getKnot()

> **getKnot**(): [`Knot`](Knot.md)\<`T`\>

Defined in: [core/query.ts:20](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/query.ts#L20)

#### Returns

[`Knot`](Knot.md)\<`T`\>

***

### getKnots()

> **getKnots**(): [`Knot`](Knot.md)\<`HTMLElement`\>[]

Defined in: [core/query.ts:28](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/query.ts#L28)

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>[]

***

### iterator()

> **iterator**(`callback`, `next`, `opt_items?`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:90](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L90)

#### Parameters

##### callback

(`_item`) => `boolean`

##### next

(`_item`, `_index`) => `void`

##### opt\_items?

[`Knot`](Knot.md)\<`T`\>[]

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[`Collection`](Collection.md).[`iterator`](Collection.md#iterator)

***

### limit()

> **limit**(`offset`, `opt_count`): [`Knot`](Knot.md)\<`T`\>[]

Defined in: [core/collection.ts:222](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L222)

#### Parameters

##### offset

`number`

##### opt\_count

`number` = `10`

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[`Collection`](Collection.md).[`limit`](Collection.md#limit)

***

### load()

> **load**(`objects`): `void`

Defined in: [core/collection.ts:36](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L36)

#### Parameters

##### objects

(`object` \| [`Knot`](Knot.md)\<`T`\>)[]

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`load`](Collection.md#load)

***

### push()

> **push**(`object`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:47](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L47)

#### Parameters

##### object

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`push`](Collection.md#push)

***

### reload()

> **reload**(`objects`): `void`

Defined in: [core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L42)

#### Parameters

##### objects

(`object` \| [`Knot`](Knot.md)\<`T`\>)[]

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`reload`](Collection.md#reload)

***

### replace()

> **replace**(`object`): [`Knot`](Knot.md)\<`T`\>

Defined in: [core/collection.ts:73](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L73)

#### Parameters

##### object

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[`Collection`](Collection.md).[`replace`](Collection.md#replace)

***

### set()

> **set**(`index`, `object`): [`Knot`](Knot.md)

Defined in: [core/collection.ts:63](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L63)

#### Parameters

##### index

`number`

##### object

`object` | [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)

#### Inherited from

[`Collection`](Collection.md).[`set`](Collection.md#set)

***

### size()

> **size**(): `number`

Defined in: [core/collection.ts:218](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L218)

#### Returns

`number`

#### Inherited from

[`Collection`](Collection.md).[`size`](Collection.md#size)
