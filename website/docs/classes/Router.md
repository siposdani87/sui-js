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

[core/router.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L16)

## Properties

### escape

• **escape**: `RegExp`

#### Defined in

[core/router.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L12)

___

### param

• **param**: `RegExp`

#### Defined in

[core/router.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L11)

___

### paramNames

• **paramNames**: `string`[]

#### Defined in

[core/router.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L13)

___

### regex

• **regex**: `RegExp`

#### Defined in

[core/router.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L14)

___

### route

• **route**: `string`

#### Defined in

[core/router.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L10)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[core/router.ts:24](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L24)

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

[core/router.ts:78](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L78)

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

[core/router.ts:57](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L57)

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

[core/router.ts:65](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L65)

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

[core/router.ts:35](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/router.ts#L35)
