---
id: "Promize"
title: "Class: Promize<T, K>"
sidebar_label: "Promize"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Object` |
| `K` | `Object` |

## Constructors

### constructor

• **new Promize**<`T`, `K`\>(`opt_options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Object` |
| `K` | `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

[core/promize.ts:8](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/promize.ts#L8)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[core/promize.ts:6](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/promize.ts#L6)

## Methods

### \_setOptions

▸ `Private` **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[core/promize.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/promize.ts#L12)

___

### defer

▸ **defer**(`defer`, `opt_complete?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `defer` | [`Deferred`](Deferred.md)<`Object`, `Object`\> |
| `opt_complete?` | () => `void` |

#### Returns

`void`

#### Defined in

[core/promize.ts:82](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/promize.ts#L82)

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

[core/promize.ts:40](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/promize.ts#L40)

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

[core/promize.ts:23](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/promize.ts#L23)

___

### then

▸ **then**(`resolve`, `opt_reject?`, `opt_complete?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resolve` | (...`args`: `T` extends `any`[] ? `T` : [`T`]) => `void` |
| `opt_reject?` | (...`args`: `K` extends `any`[] ? `K` : [`K`]) => `void` |
| `opt_complete?` | (...`args`: `T` extends `any`[] ? `T` : [`T`]) => `void` |

#### Returns

`void`

#### Defined in

[core/promize.ts:57](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/promize.ts#L57)
