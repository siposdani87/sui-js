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

[core/router.ts:21](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L21)

## Properties

### escape

• **escape**: `RegExp`

#### Defined in

[core/router.ts:15](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L15)

___

### param

• **param**: `RegExp`

#### Defined in

[core/router.ts:14](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L14)

___

### paramNames

• **paramNames**: `string`[]

#### Defined in

[core/router.ts:16](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L16)

___

### regex

• **regex**: `RegExp`

#### Defined in

[core/router.ts:17](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L17)

___

### route

• **route**: `string`

#### Defined in

[core/router.ts:13](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L13)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[core/router.ts:32](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L32)

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

[core/router.ts:99](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L99)

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

[core/router.ts:71](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L71)

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

[core/router.ts:82](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L82)

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

[core/router.ts:46](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/router.ts#L46)
