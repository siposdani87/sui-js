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
| `T` | extends `Object` = `Object` |

## Hierarchy

- **`Collection`**

  ↳ [`Form`](Form.md)

  ↳ [`Query`](Query.md)

## Constructors

### constructor

• **new Collection**\<`T`\>(`opt_items?`, `opt_type?`, `opt_options?`): [`Collection`](Collection.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` = `Object` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_items` | `T`[] | `[]` |
| `opt_type` | `any` | `Objekt` |
| `opt_options` | `Object` | `{}` |

#### Returns

[`Collection`](Collection.md)\<`T`\>

#### Defined in

[core/collection.ts:17](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L17)

## Properties

### Type

• **Type**: `any`

#### Defined in

[core/collection.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L13)

___

### items

• **items**: `T`[]

#### Defined in

[core/collection.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L14)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[core/collection.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L15)

## Methods

### \_createItem

▸ **_createItem**(`object`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| `T` |

#### Returns

`T`

#### Defined in

[core/collection.ts:53](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L53)

___

### \_setOptions

▸ **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[core/collection.ts:28](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L28)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/collection.ts:134](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L134)

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

[core/collection.ts:172](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L172)

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

[core/collection.ts:198](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L198)

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

[core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L204)

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

[core/collection.ts:182](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L182)

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

[core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L188)

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

[core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L178)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_item`: `T`, `_index`: `number`) => `void` |

#### Returns

`void`

#### Defined in

[core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L106)

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

[core/collection.ts:156](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L156)

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

[core/collection.ts:162](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L162)

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

[core/collection.ts:142](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L142)

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

[core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L148)

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

[core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L138)

___

### get

▸ **get**\<`K`\>(`index`, `opt_attribute?`): `T` \| `K`

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

[core/collection.ts:112](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L112)

___

### getById

▸ **getById**\<`K`\>(`id`, `opt_attribute?`): `T` \| `K`

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

[core/collection.ts:126](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L126)

___

### getItems

▸ **getItems**(): `T`[]

#### Returns

`T`[]

#### Defined in

[core/collection.ts:86](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L86)

___

### iterator

▸ **iterator**(`callback`, `next`, `opt_items?`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`_item`: `T`) => `boolean` |
| `next` | (`_item`: `T`, `_index`: `number`) => `void` |
| `opt_items?` | `T`[] |

#### Returns

`T`[]

#### Defined in

[core/collection.ts:90](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L90)

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

[core/collection.ts:222](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L222)

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

[core/collection.ts:36](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L36)

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

[core/collection.ts:47](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L47)

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

[core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L42)

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

[core/collection.ts:73](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L73)

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

[core/collection.ts:63](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L63)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Defined in

[core/collection.ts:218](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L218)
