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

[core/router.ts:23](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L23)

## Properties

### escape

• **escape**: `RegExp`

#### Defined in

[core/router.ts:17](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L17)

___

### param

• **param**: `RegExp`

#### Defined in

[core/router.ts:16](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L16)

___

### paramNames

• **paramNames**: `string`[]

#### Defined in

[core/router.ts:18](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L18)

___

### regex

• **regex**: `RegExp`

#### Defined in

[core/router.ts:19](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L19)

___

### route

• **route**: `string`

#### Defined in

[core/router.ts:15](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L15)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[core/router.ts:34](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L34)

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

[core/router.ts:110](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L110)

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

[core/router.ts:82](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L82)

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

[core/router.ts:93](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L93)

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

[core/router.ts:48](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/router.ts#L48)
