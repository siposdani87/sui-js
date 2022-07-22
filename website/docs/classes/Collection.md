---
id: "Collection"
title: "Class: Collection<T>"
sidebar_label: "Collection"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` = [`Objekt`](Objekt.md) |

## Hierarchy

- **`Collection`**

  ↳ [`Form`](Form.md)

  ↳ [`Query`](Query.md)

## Constructors

### constructor

• **new Collection**<`T`\>(`opt_items?`, `opt_type?`, `opt_options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` = [`Objekt`](Objekt.md) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_items` | `any`[] | `[]` |
| `opt_type` | `any` | `Objekt` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[core/collection.ts:25](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-25)

## Properties

### Type

• **Type**: `any`

#### Defined in

[core/collection.ts:17](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-17)

___

### items

• **items**: `T`[]

#### Defined in

[core/collection.ts:18](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-18)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/collection.ts:19](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-19)

## Methods

### \_createItem

▸ `Private` **_createItem**(`object`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| `T` |

#### Returns

`T`

#### Defined in

[core/collection.ts:79](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-79)

___

### \_setOptions

▸ `Private` **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[core/collection.ts:40](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-40)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/collection.ts:189](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-189)

___

### delete

▸ **delete**(`value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` \| `T` |

#### Returns

`T`

#### Defined in

[core/collection.ts:247](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-247)

___

### deleteAllBy

▸ **deleteAllBy**(`attribute`, `value`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:287](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-287)

___

### deleteAllByCondition

▸ **deleteAllByCondition**(`conditionCallback`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:296](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-296)

___

### deleteBy

▸ **deleteBy**(`attribute`, `value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

`T`

#### Defined in

[core/collection.ts:264](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-264)

___

### deleteByCondition

▸ **deleteByCondition**(`conditionCallback`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

`T`

#### Defined in

[core/collection.ts:273](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-273)

___

### deleteById

▸ **deleteById**(`id`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

`T`

#### Defined in

[core/collection.ts:256](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-256)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_item`: `T`, `_index`: `number`) => `any` |

#### Returns

`void`

#### Defined in

[core/collection.ts:149](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-149)

___

### findAllBy

▸ **findAllBy**(`attribute`, `value`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:225](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-225)

___

### findAllByCondition

▸ **findAllByCondition**(`conditionCallback`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:234](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-234)

___

### findBy

▸ **findBy**(`attribute`, `value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

`T`

#### Defined in

[core/collection.ts:204](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-204)

___

### findByCondition

▸ **findByCondition**(`conditionCallback`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

`T`

#### Defined in

[core/collection.ts:213](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-213)

___

### findById

▸ **findById**(`id`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

`T`

#### Defined in

[core/collection.ts:196](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-196)

___

### get

▸ **get**<`K`\>(`index`, `opt_attribute?`): `T` \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `opt_attribute?` | `string` |

#### Returns

`T` \| `K`

#### Defined in

[core/collection.ts:160](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-160)

___

### getById

▸ **getById**<`K`\>(`id`, `opt_attribute?`): `T` \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `opt_attribute?` | `string` |

#### Returns

`T` \| `K`

#### Defined in

[core/collection.ts:179](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-179)

___

### getItems

▸ **getItems**(): `T`[]

#### Returns

`T`[]

#### Defined in

[core/collection.ts:121](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-121)

___

### iterator

▸ **iterator**(`callback`, `next`, `opt_items?`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`_item`: `T`) => `any` |
| `next` | (`_item`: `T`, `_index`: `number`) => `any` |
| `opt_items?` | `T`[] |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:130](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-130)

___

### limit

▸ **limit**(`offset`, `opt_count?`): `T`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offset` | `number` | `undefined` |
| `opt_count` | `number` | `10` |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:320](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-320)

___

### load

▸ **load**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| `T`)[] |

#### Returns

`void`

#### Defined in

[core/collection.ts:52](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-52)

___

### pluck

▸ **pluck**(`attribute`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:327](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-327)

___

### push

▸ **push**(`object`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| `T` |

#### Returns

`T`

#### Defined in

[core/collection.ts:69](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-69)

___

### reload

▸ **reload**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| `T`)[] |

#### Returns

`void`

#### Defined in

[core/collection.ts:61](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-61)

___

### replace

▸ **replace**(`object`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| `T` |

#### Returns

`T`

#### Defined in

[core/collection.ts:106](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-106)

___

### set

▸ **set**(`index`, `object`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `object` | `Object` \| `T` |

#### Returns

`T`

#### Defined in

[core/collection.ts:93](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-93)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Defined in

[core/collection.ts:312](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/collection.ts#lines-312)
