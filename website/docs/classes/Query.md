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

- [`Collection`](Collection.md)\<[`Knot`](Knot.md)\<`T`\>\>

  ↳ **`Query`**

## Constructors

### constructor

• **new Query**\<`T`\>(`selector`, `opt_element?`): [`Query`](Query.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `opt_element?` | `HTMLElement` \| [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

[`Query`](Query.md)\<`T`\>

#### Overrides

[Collection](Collection.md).[constructor](Collection.md#constructor)

#### Defined in

[core/query.ts:8](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/query.ts#L8)

## Properties

### Type

• **Type**: `any`

#### Inherited from

[Collection](Collection.md).[Type](Collection.md#type)

#### Defined in

[core/collection.ts:13](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L13)

___

### items

• **items**: [`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[items](Collection.md#items)

#### Defined in

[core/collection.ts:14](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L14)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Inherited from

[Collection](Collection.md).[options](Collection.md#options)

#### Defined in

[core/collection.ts:15](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L15)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[core/collection.ts:134](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L134)

___

### delete

▸ **delete**(`value`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `object` \| [`Knot`](Knot.md)\<`T`\> |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[delete](Collection.md#delete)

#### Defined in

[core/collection.ts:172](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L172)

___

### deleteAllBy

▸ **deleteAllBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllBy](Collection.md#deleteallby)

#### Defined in

[core/collection.ts:198](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L198)

___

### deleteAllByCondition

▸ **deleteAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllByCondition](Collection.md#deleteallbycondition)

#### Defined in

[core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L204)

___

### deleteBy

▸ **deleteBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteBy](Collection.md#deleteby)

#### Defined in

[core/collection.ts:182](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L182)

___

### deleteByCondition

▸ **deleteByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteByCondition](Collection.md#deletebycondition)

#### Defined in

[core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L188)

___

### deleteById

▸ **deleteById**(`id`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../#id) |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteById](Collection.md#deletebyid)

#### Defined in

[core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L178)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_item`: [`Knot`](Knot.md)\<`T`\>, `_index`: `number`) => `void` |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[each](Collection.md#each)

#### Defined in

[core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L106)

___

### findAllBy

▸ **findAllBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[findAllBy](Collection.md#findallby)

#### Defined in

[core/collection.ts:156](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L156)

___

### findAllByCondition

▸ **findAllByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[findAllByCondition](Collection.md#findallbycondition)

#### Defined in

[core/collection.ts:162](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L162)

___

### findBy

▸ **findBy**(`attribute`, `value`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[findBy](Collection.md#findby)

#### Defined in

[core/collection.ts:142](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L142)

___

### findByCondition

▸ **findByCondition**(`conditionCallback`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[findByCondition](Collection.md#findbycondition)

#### Defined in

[core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L148)

___

### findById

▸ **findById**(`id`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../#id) |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[findById](Collection.md#findbyid)

#### Defined in

[core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L138)

___

### get

▸ **get**\<`K`\>(`index`, `opt_attribute?`): [`Knot`](Knot.md)\<`T`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`Knot`](Knot.md)\<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `opt_attribute?` | `string` |

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `K`

#### Inherited from

[Collection](Collection.md).[get](Collection.md#get)

#### Defined in

[core/collection.ts:112](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L112)

___

### getById

▸ **getById**\<`K`\>(`id`, `opt_attribute?`): [`Knot`](Knot.md)\<`T`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`Knot`](Knot.md)\<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../#id) |
| `opt_attribute?` | `string` |

#### Returns

[`Knot`](Knot.md)\<`T`\> \| `K`

#### Inherited from

[Collection](Collection.md).[getById](Collection.md#getbyid)

#### Defined in

[core/collection.ts:126](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L126)

___

### getItems

▸ **getItems**(): [`Knot`](Knot.md)\<`T`\>[]

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[getItems](Collection.md#getitems)

#### Defined in

[core/collection.ts:86](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L86)

___

### getKnot

▸ **getKnot**(): [`Knot`](Knot.md)\<`T`\>

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Defined in

[core/query.ts:20](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/query.ts#L20)

___

### getKnots

▸ **getKnots**(): [`Knot`](Knot.md)\<`HTMLElement`\>[]

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>[]

#### Defined in

[core/query.ts:28](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/query.ts#L28)

___

### iterator

▸ **iterator**(`callback`, `next`, `opt_items?`): [`Knot`](Knot.md)\<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`_item`: [`Knot`](Knot.md)\<`T`\>) => `boolean` |
| `next` | (`_item`: [`Knot`](Knot.md)\<`T`\>, `_index`: `number`) => `void` |
| `opt_items?` | [`Knot`](Knot.md)\<`T`\>[] |

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[iterator](Collection.md#iterator)

#### Defined in

[core/collection.ts:90](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L90)

___

### limit

▸ **limit**(`offset`, `opt_count?`): [`Knot`](Knot.md)\<`T`\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offset` | `number` | `undefined` |
| `opt_count` | `number` | `10` |

#### Returns

[`Knot`](Knot.md)\<`T`\>[]

#### Inherited from

[Collection](Collection.md).[limit](Collection.md#limit)

#### Defined in

[core/collection.ts:222](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L222)

___

### load

▸ **load**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`object` \| [`Knot`](Knot.md)\<`T`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[load](Collection.md#load)

#### Defined in

[core/collection.ts:36](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L36)

___

### push

▸ **push**(`object`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` \| [`Knot`](Knot.md)\<`T`\> |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[push](Collection.md#push)

#### Defined in

[core/collection.ts:47](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L47)

___

### reload

▸ **reload**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`object` \| [`Knot`](Knot.md)\<`T`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[reload](Collection.md#reload)

#### Defined in

[core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L42)

___

### replace

▸ **replace**(`object`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` \| [`Knot`](Knot.md)\<`T`\> |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[replace](Collection.md#replace)

#### Defined in

[core/collection.ts:73](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L73)

___

### set

▸ **set**(`index`, `object`): [`Knot`](Knot.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `object` | `object` \| [`Knot`](Knot.md)\<`T`\> |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Inherited from

[Collection](Collection.md).[set](Collection.md#set)

#### Defined in

[core/collection.ts:63](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L63)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[core/collection.ts:218](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/collection.ts#L218)
