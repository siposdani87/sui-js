---
id: "Query"
title: "Class: Query<T>"
sidebar_label: "Query"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

## Hierarchy

- [`Collection`](Collection.md)<[`Knot`](Knot.md)<`T`\>\>

  ↳ **`Query`**

## Constructors

### constructor

• **new Query**<`T`\>(`selector`, `opt_element?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `opt_element?` | `HTMLElement` \| [`Knot`](Knot.md)<`HTMLElement`\> |

#### Overrides

[Collection](Collection.md).[constructor](Collection.md#constructor)

#### Defined in

[core/query.ts:17](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/query.ts#L17)

## Properties

### Type

• **Type**: `any`

#### Inherited from

[Collection](Collection.md).[Type](Collection.md#type)

#### Defined in

[core/collection.ts:17](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L17)

___

### items

• **items**: [`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[items](Collection.md#items)

#### Defined in

[core/collection.ts:18](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L18)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Inherited from

[Collection](Collection.md).[options](Collection.md#options)

#### Defined in

[core/collection.ts:19](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L19)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L188)

___

### delete

▸ **delete**(`value`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` \| [`Knot`](Knot.md)<`T`\> |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[delete](Collection.md#delete)

#### Defined in

[core/collection.ts:246](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L246)

___

### deleteAllBy

▸ **deleteAllBy**(`attribute`, `value`): [`Knot`](Knot.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllBy](Collection.md#deleteallby)

#### Defined in

[core/collection.ts:286](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L286)

___

### deleteAllByCondition

▸ **deleteAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllByCondition](Collection.md#deleteallbycondition)

#### Defined in

[core/collection.ts:295](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L295)

___

### deleteBy

▸ **deleteBy**(`attribute`, `value`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteBy](Collection.md#deleteby)

#### Defined in

[core/collection.ts:263](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L263)

___

### deleteByCondition

▸ **deleteByCondition**(`conditionCallback`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteByCondition](Collection.md#deletebycondition)

#### Defined in

[core/collection.ts:272](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L272)

___

### deleteById

▸ **deleteById**(`id`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteById](Collection.md#deletebyid)

#### Defined in

[core/collection.ts:255](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L255)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_item`: [`Knot`](Knot.md)<`T`\>, `_index`: `number`) => `any` |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[each](Collection.md#each)

#### Defined in

[core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L148)

___

### findAllBy

▸ **findAllBy**(`attribute`, `value`): [`Knot`](Knot.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[findAllBy](Collection.md#findallby)

#### Defined in

[core/collection.ts:224](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L224)

___

### findAllByCondition

▸ **findAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[findAllByCondition](Collection.md#findallbycondition)

#### Defined in

[core/collection.ts:233](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L233)

___

### findBy

▸ **findBy**(`attribute`, `value`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[findBy](Collection.md#findby)

#### Defined in

[core/collection.ts:203](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L203)

___

### findByCondition

▸ **findByCondition**(`conditionCallback`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[findByCondition](Collection.md#findbycondition)

#### Defined in

[core/collection.ts:212](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L212)

___

### findById

▸ **findById**(`id`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[findById](Collection.md#findbyid)

#### Defined in

[core/collection.ts:195](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L195)

___

### get

▸ **get**<`K`\>(`index`, `opt_attribute?`): [`Knot`](Knot.md)<`T`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`Knot`](Knot.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `opt_attribute?` | `string` |

#### Returns

[`Knot`](Knot.md)<`T`\> \| `K`

#### Inherited from

[Collection](Collection.md).[get](Collection.md#get)

#### Defined in

[core/collection.ts:159](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L159)

___

### getById

▸ **getById**<`K`\>(`id`, `opt_attribute?`): [`Knot`](Knot.md)<`T`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`Knot`](Knot.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `opt_attribute?` | `string` |

#### Returns

[`Knot`](Knot.md)<`T`\> \| `K`

#### Inherited from

[Collection](Collection.md).[getById](Collection.md#getbyid)

#### Defined in

[core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L178)

___

### getItems

▸ **getItems**(): [`Knot`](Knot.md)<`T`\>[]

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[getItems](Collection.md#getitems)

#### Defined in

[core/collection.ts:120](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L120)

___

### getKnot

▸ **getKnot**(): [`Knot`](Knot.md)<`T`\>

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Defined in

[core/query.ts:31](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/query.ts#L31)

___

### getKnots

▸ **getKnots**(): [`Knot`](Knot.md)<`HTMLElement`\>[]

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>[]

#### Defined in

[core/query.ts:42](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/query.ts#L42)

___

### iterator

▸ **iterator**(`callback`, `next`, `opt_items?`): [`Knot`](Knot.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`_item`: [`Knot`](Knot.md)<`T`\>) => `any` |
| `next` | (`_item`: [`Knot`](Knot.md)<`T`\>, `_index`: `number`) => `any` |
| `opt_items?` | [`Knot`](Knot.md)<`T`\>[] |

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[iterator](Collection.md#iterator)

#### Defined in

[core/collection.ts:129](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L129)

___

### limit

▸ **limit**(`offset`, `opt_count?`): [`Knot`](Knot.md)<`T`\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offset` | `number` | `undefined` |
| `opt_count` | `number` | `10` |

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[limit](Collection.md#limit)

#### Defined in

[core/collection.ts:319](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L319)

___

### load

▸ **load**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`Knot`](Knot.md)<`T`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[load](Collection.md#load)

#### Defined in

[core/collection.ts:51](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L51)

___

### pluck

▸ **pluck**(`attribute`): [`Knot`](Knot.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

[`Knot`](Knot.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[pluck](Collection.md#pluck)

#### Defined in

[core/collection.ts:326](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L326)

___

### push

▸ **push**(`object`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`Knot`](Knot.md)<`T`\> |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[push](Collection.md#push)

#### Defined in

[core/collection.ts:68](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L68)

___

### reload

▸ **reload**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`Knot`](Knot.md)<`T`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[reload](Collection.md#reload)

#### Defined in

[core/collection.ts:60](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L60)

___

### replace

▸ **replace**(`object`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`Knot`](Knot.md)<`T`\> |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[replace](Collection.md#replace)

#### Defined in

[core/collection.ts:105](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L105)

___

### set

▸ **set**(`index`, `object`): [`Knot`](Knot.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `object` | `Object` \| [`Knot`](Knot.md)<`T`\> |

#### Returns

[`Knot`](Knot.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[set](Collection.md#set)

#### Defined in

[core/collection.ts:92](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L92)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[core/collection.ts:311](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/collection.ts#L311)
