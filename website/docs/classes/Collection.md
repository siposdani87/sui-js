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

[core/collection.ts:25](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L25)

## Properties

### Type

• **Type**: `any`

#### Defined in

[core/collection.ts:17](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L17)

___

### items

• **items**: `T`[]

#### Defined in

[core/collection.ts:18](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L18)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/collection.ts:19](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L19)

## Methods

### \_createKnot

▸ `Private` **_createKnot**(`object`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| `T` |

#### Returns

`T`

#### Defined in

[core/collection.ts:79](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L79)

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

[core/collection.ts:40](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L40)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/collection.ts:189](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L189)

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

[core/collection.ts:247](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L247)

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

[core/collection.ts:287](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L287)

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

[core/collection.ts:296](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L296)

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

[core/collection.ts:264](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L264)

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

[core/collection.ts:273](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L273)

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

[core/collection.ts:256](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L256)

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

[core/collection.ts:149](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L149)

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

[core/collection.ts:225](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L225)

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

[core/collection.ts:234](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L234)

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

[core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L204)

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

[core/collection.ts:213](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L213)

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

[core/collection.ts:196](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L196)

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

[core/collection.ts:160](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L160)

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

[core/collection.ts:179](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L179)

___

### getItems

▸ **getItems**(): `T`[]

#### Returns

`T`[]

#### Defined in

[core/collection.ts:121](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L121)

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

[core/collection.ts:130](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L130)

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

[core/collection.ts:320](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L320)

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

[core/collection.ts:52](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L52)

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

[core/collection.ts:327](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L327)

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

[core/collection.ts:69](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L69)

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

[core/collection.ts:61](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L61)

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

[core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L106)

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

[core/collection.ts:93](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L93)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Defined in

[core/collection.ts:312](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/collection.ts#L312)
