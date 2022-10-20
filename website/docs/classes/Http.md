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

[module/http.ts:18](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L18)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/http.ts:11](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L11)

___

### password

• **password**: `string`

#### Defined in

[module/http.ts:13](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L13)

___

### token

• **token**: `string`

#### Defined in

[module/http.ts:14](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L14)

___

### username

• **username**: `string`

#### Defined in

[module/http.ts:12](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L12)

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

[module/http.ts:157](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L157)

___

### \_getRequestHandler

▸ `Private` **_getRequestHandler**(): [`Xhr`](Xhr.md)

#### Returns

[`Xhr`](Xhr.md)

#### Defined in

[module/http.ts:145](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L145)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/http.ts:39](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L39)

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

[module/http.ts:27](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L27)

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

[module/http.ts:130](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L130)

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

[module/http.ts:183](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L183)

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

[module/http.ts:175](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L175)

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

[module/http.ts:65](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L65)

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

[module/http.ts:112](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L112)

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

[module/http.ts:76](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L76)

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

[module/http.ts:94](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L94)

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

[module/http.ts:49](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L49)

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

[module/http.ts:56](https://github.com/siposdani87/sui-js/blob/bf1be67/src/module/http.ts#L56)
