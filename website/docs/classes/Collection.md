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

[core/collection.ts:25](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L25)

## Properties

### Type

• **Type**: `any`

#### Defined in

[core/collection.ts:17](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L17)

___

### items

• **items**: `T`[]

#### Defined in

[core/collection.ts:18](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L18)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/collection.ts:19](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L19)

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

[core/collection.ts:78](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L78)

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

[core/collection.ts:40](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L40)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L188)

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

[core/collection.ts:246](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L246)

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

[core/collection.ts:286](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L286)

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

[core/collection.ts:295](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L295)

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

[core/collection.ts:263](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L263)

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

[core/collection.ts:272](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L272)

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

[core/collection.ts:255](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L255)

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

[core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L148)

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

[core/collection.ts:224](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L224)

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

[core/collection.ts:233](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L233)

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

[core/collection.ts:203](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L203)

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

[core/collection.ts:212](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L212)

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

[core/collection.ts:195](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L195)

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

[core/collection.ts:159](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L159)

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

[core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L178)

___

### getItems

▸ **getItems**(): `T`[]

#### Returns

`T`[]

#### Defined in

[core/collection.ts:120](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L120)

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

[core/collection.ts:129](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L129)

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

[core/collection.ts:319](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L319)

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

[core/collection.ts:51](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L51)

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

[core/collection.ts:326](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L326)

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

[core/collection.ts:68](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L68)

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

[core/collection.ts:60](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L60)

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

[core/collection.ts:105](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L105)

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

[core/collection.ts:92](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L92)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Defined in

[core/collection.ts:311](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/collection.ts#L311)
