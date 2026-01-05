---
id: "Deferred"
title: "Class: Deferred<T, K>"
sidebar_label: "Deferred"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `object` |
| `K` | `object` |

## Constructors

### constructor

• **new Deferred**\<`T`, `K`\>(): [`Deferred`](Deferred.md)\<`T`, `K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `object` |
| `K` | `object` |

#### Returns

[`Deferred`](Deferred.md)\<`T`, `K`\>

#### Defined in

[core/deferred.ts:6](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/deferred.ts#L6)

## Methods

### promise

▸ **promise**(): [`Promize`](Promize.md)\<`T`, `K`\>

#### Returns

[`Promize`](Promize.md)\<`T`, `K`\>

#### Defined in

[core/deferred.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/deferred.ts#L10)

___

### reject

▸ **reject**(`opt_data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_data?` | `K` |

#### Returns

`void`

#### Defined in

[core/deferred.ts:18](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/deferred.ts#L18)

___

### resolve

▸ **resolve**(`opt_data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_data?` | `T` |

#### Returns

`void`

#### Defined in

[core/deferred.ts:14](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/deferred.ts#L14)
