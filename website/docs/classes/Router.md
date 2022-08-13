---
id: "Router"
title: "Class: Router"
sidebar_label: "Router"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Router**(`opt_route?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_route` | `string` | `''` |

#### Defined in

[core/router.ts:23](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-23)

## Properties

### escape

• **escape**: `RegExp`

#### Defined in

[core/router.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-17)

___

### param

• **param**: `RegExp`

#### Defined in

[core/router.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-16)

___

### paramNames

• **paramNames**: `string`[]

#### Defined in

[core/router.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-18)

___

### regex

• **regex**: `RegExp`

#### Defined in

[core/router.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-19)

___

### route

• **route**: `string`

#### Defined in

[core/router.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-15)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[core/router.ts:34](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-34)

___

### \_parseParams

▸ `Private` **_parseParams**(`url`): [`Params`](../modules.md#params)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[`Params`](../modules.md#params)

#### Defined in

[core/router.ts:110](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-110)

___

### getMatches

▸ **getMatches**(`url`): `RegExpMatchArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`RegExpMatchArray`

#### Defined in

[core/router.ts:82](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-82)

___

### parse

▸ **parse**(`url`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Object`

#### Defined in

[core/router.ts:93](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-93)

___

### stringify

▸ **stringify**(`opt_params?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_params` | `Object` |

#### Returns

`string`

#### Defined in

[core/router.ts:48](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/router.ts#lines-48)
