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

[core/promize.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/promize.ts#lines-13)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/promize.ts:9](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/promize.ts#lines-9)

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

[core/promize.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/promize.ts#lines-21)

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

[core/promize.ts:105](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/promize.ts#lines-105)

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

[core/promize.ts:55](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/promize.ts#lines-55)

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

[core/promize.ts:36](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/promize.ts#lines-36)

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

[core/promize.ts:76](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/promize.ts#lines-76)