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

- [`Collection`](Collection.md)<[`Item`](Item.md)<`T`\>\>

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
| `opt_element?` | `HTMLElement` \| [`Item`](Item.md)<`HTMLElement`\> |

#### Overrides

[Collection](Collection.md).[constructor](Collection.md#constructor)

#### Defined in

[core/query.ts:17](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/query.ts#lines-17)

## Properties

### Type

• **Type**: `any`

#### Inherited from

[Collection](Collection.md).[Type](Collection.md#type)

#### Defined in

[core/collection.ts:17](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-17)

___

### items

• **items**: [`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[items](Collection.md#items)

#### Defined in

[core/collection.ts:18](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-18)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Inherited from

[Collection](Collection.md).[options](Collection.md#options)

#### Defined in

[core/collection.ts:19](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-19)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[core/collection.ts:189](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-189)

___

### delete

▸ **delete**(`value`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` \| [`Item`](Item.md)<`T`\> |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[delete](Collection.md#delete)

#### Defined in

[core/collection.ts:247](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-247)

___

### deleteAllBy

▸ **deleteAllBy**(`attribute`, `value`): [`Item`](Item.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllBy](Collection.md#deleteallby)

#### Defined in

[core/collection.ts:287](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-287)

___

### deleteAllByCondition

▸ **deleteAllByCondition**(`conditionCallback`): [`Item`](Item.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllByCondition](Collection.md#deleteallbycondition)

#### Defined in

[core/collection.ts:296](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-296)

___

### deleteBy

▸ **deleteBy**(`attribute`, `value`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteBy](Collection.md#deleteby)

#### Defined in

[core/collection.ts:264](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-264)

___

### deleteByCondition

▸ **deleteByCondition**(`conditionCallback`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteByCondition](Collection.md#deletebycondition)

#### Defined in

[core/collection.ts:273](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-273)

___

### deleteById

▸ **deleteById**(`id`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[deleteById](Collection.md#deletebyid)

#### Defined in

[core/collection.ts:256](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-256)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_item`: [`Item`](Item.md)<`T`\>, `_index`: `number`) => `any` |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[each](Collection.md#each)

#### Defined in

[core/collection.ts:149](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-149)

___

### findAllBy

▸ **findAllBy**(`attribute`, `value`): [`Item`](Item.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[findAllBy](Collection.md#findallby)

#### Defined in

[core/collection.ts:225](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-225)

___

### findAllByCondition

▸ **findAllByCondition**(`conditionCallback`): [`Item`](Item.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[findAllByCondition](Collection.md#findallbycondition)

#### Defined in

[core/collection.ts:234](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-234)

___

### findBy

▸ **findBy**(`attribute`, `value`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[findBy](Collection.md#findby)

#### Defined in

[core/collection.ts:204](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-204)

___

### findByCondition

▸ **findByCondition**(`conditionCallback`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[findByCondition](Collection.md#findbycondition)

#### Defined in

[core/collection.ts:213](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-213)

___

### findById

▸ **findById**(`id`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[findById](Collection.md#findbyid)

#### Defined in

[core/collection.ts:196](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-196)

___

### get

▸ **get**<`K`\>(`index`, `opt_attribute?`): [`Item`](Item.md)<`T`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`Item`](Item.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `opt_attribute?` | `string` |

#### Returns

[`Item`](Item.md)<`T`\> \| `K`

#### Inherited from

[Collection](Collection.md).[get](Collection.md#get)

#### Defined in

[core/collection.ts:160](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-160)

___

### getById

▸ **getById**<`K`\>(`id`, `opt_attribute?`): [`Item`](Item.md)<`T`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`Item`](Item.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `opt_attribute?` | `string` |

#### Returns

[`Item`](Item.md)<`T`\> \| `K`

#### Inherited from

[Collection](Collection.md).[getById](Collection.md#getbyid)

#### Defined in

[core/collection.ts:179](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-179)

___

### getItem

▸ **getItem**(): [`Item`](Item.md)<`T`\>

#### Returns

[`Item`](Item.md)<`T`\>

#### Defined in

[core/query.ts:31](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/query.ts#lines-31)

___

### getItems

▸ **getItems**(): [`Item`](Item.md)<`T`\>[]

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[getItems](Collection.md#getitems)

#### Defined in

[core/collection.ts:121](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-121)

___

### iterator

▸ **iterator**(`callback`, `next`, `opt_items?`): [`Item`](Item.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`_item`: [`Item`](Item.md)<`T`\>) => `any` |
| `next` | (`_item`: [`Item`](Item.md)<`T`\>, `_index`: `number`) => `any` |
| `opt_items?` | [`Item`](Item.md)<`T`\>[] |

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[iterator](Collection.md#iterator)

#### Defined in

[core/collection.ts:130](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-130)

___

### limit

▸ **limit**(`offset`, `opt_count?`): [`Item`](Item.md)<`T`\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offset` | `number` | `undefined` |
| `opt_count` | `number` | `10` |

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[limit](Collection.md#limit)

#### Defined in

[core/collection.ts:320](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-320)

___

### load

▸ **load**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`Item`](Item.md)<`T`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[load](Collection.md#load)

#### Defined in

[core/collection.ts:52](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-52)

___

### pluck

▸ **pluck**(`attribute`): [`Item`](Item.md)<`T`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

[`Item`](Item.md)<`T`\>[]

#### Inherited from

[Collection](Collection.md).[pluck](Collection.md#pluck)

#### Defined in

[core/collection.ts:327](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-327)

___

### push

▸ **push**(`object`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`Item`](Item.md)<`T`\> |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[push](Collection.md#push)

#### Defined in

[core/collection.ts:69](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-69)

___

### reload

▸ **reload**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`Item`](Item.md)<`T`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[reload](Collection.md#reload)

#### Defined in

[core/collection.ts:61](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-61)

___

### replace

▸ **replace**(`object`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`Item`](Item.md)<`T`\> |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[replace](Collection.md#replace)

#### Defined in

[core/collection.ts:106](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-106)

___

### set

▸ **set**(`index`, `object`): [`Item`](Item.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `object` | `Object` \| [`Item`](Item.md)<`T`\> |

#### Returns

[`Item`](Item.md)<`T`\>

#### Inherited from

[Collection](Collection.md).[set](Collection.md#set)

#### Defined in

[core/collection.ts:93](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-93)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[core/collection.ts:312](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-312)
