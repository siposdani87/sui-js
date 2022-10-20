---
id: "Promize"
title: "Class: Promize"
sidebar_label: "Promize"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Promize**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

[core/promize.ts:13](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/promize.ts#L13)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/promize.ts:9](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/promize.ts#L9)

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

[core/promize.ts:21](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/promize.ts#L21)

___

### defer

▸ **defer**(`defer`, `opt_complete?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `defer` | [`Deferred`](Deferred.md) |
| `opt_complete?` | `Function` |

#### Returns

`void`

#### Defined in

[core/promize.ts:105](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/promize.ts#L105)

___

### reject

▸ **reject**(`opt_data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_data` | `any` |

#### Returns

`void`

#### Defined in

[core/promize.ts:55](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/promize.ts#L55)

___

### resolve

▸ **resolve**(`opt_data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_data` | `any` |

#### Returns

`void`

#### Defined in

[core/promize.ts:36](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/promize.ts#L36)

___

### then

▸ **then**(`resolve`, `opt_reject?`, `opt_complete?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resolve` | `Function` |
| `opt_reject?` | `Function` |
| `opt_complete?` | `Function` |

#### Returns

`void`

#### Defined in

[core/promize.ts:76](https://github.com/siposdani87/sui-js/blob/0baad71/src/core/promize.ts#L76)
