---
id: "Http"
title: "Class: Http"
sidebar_label: "Http"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Http**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

[module/http.ts:18](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L18)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/http.ts:11](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L11)

___

### password

• **password**: `string`

#### Defined in

[module/http.ts:13](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L13)

___

### token

• **token**: `string`

#### Defined in

[module/http.ts:14](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L14)

___

### username

• **username**: `string`

#### Defined in

[module/http.ts:12](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L12)

## Methods

### \_getPromise

▸ `Private` **_getPromise**(`promise`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | [`Promize`](Promize.md) |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/http.ts:156](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L156)

___

### \_getRequestHandler

▸ `Private` **_getRequestHandler**(): [`Xhr`](Xhr.md)

#### Returns

[`Xhr`](Xhr.md)

#### Defined in

[module/http.ts:144](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L144)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/http.ts:38](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L38)

___

### \_setOptions

▸ `Private` **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[module/http.ts:27](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L27)

___

### delete

▸ **delete**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/http.ts:129](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L129)

___

### eventAfterRequest

▸ **eventAfterRequest**(`http`, `response`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `XMLHttpRequest` |
| `response` | `any` |

#### Returns

`void`

#### Defined in

[module/http.ts:182](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L182)

___

### eventBeforeRequest

▸ **eventBeforeRequest**(`http`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | [`Xhr`](Xhr.md) |

#### Returns

`void`

#### Defined in

[module/http.ts:174](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L174)

___

### get

▸ **get**(`url`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/http.ts:64](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L64)

___

### patch

▸ **patch**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/http.ts:111](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L111)

___

### post

▸ **post**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/http.ts:75](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L75)

___

### put

▸ **put**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/http.ts:93](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L93)

___

### setBasicAuthorization

▸ **setBasicAuthorization**(`username`, `password`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |

#### Returns

`void`

#### Defined in

[module/http.ts:48](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L48)

___

### setBearerAuthorization

▸ **setBearerAuthorization**(`token`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`void`

#### Defined in

[module/http.ts:55](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/http.ts#L55)
