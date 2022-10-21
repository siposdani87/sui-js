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

[core/promize.ts:14](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/promize.ts#L14)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/promize.ts:10](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/promize.ts#L10)

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

[core/promize.ts:22](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/promize.ts#L22)

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

[core/promize.ts:106](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/promize.ts#L106)

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

[core/promize.ts:56](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/promize.ts#L56)

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

[core/promize.ts:37](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/promize.ts#L37)

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

[core/promize.ts:77](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/promize.ts#L77)
