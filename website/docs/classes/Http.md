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

[module/http.ts:18](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-18)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/http.ts:11](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-11)

___

### password

• **password**: `string`

#### Defined in

[module/http.ts:13](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-13)

___

### token

• **token**: `string`

#### Defined in

[module/http.ts:14](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-14)

___

### username

• **username**: `string`

#### Defined in

[module/http.ts:12](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-12)

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

[module/http.ts:157](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-157)

___

### \_getRequestHandler

▸ `Private` **_getRequestHandler**(): [`Xhr`](Xhr.md)

#### Returns

[`Xhr`](Xhr.md)

#### Defined in

[module/http.ts:145](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-145)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/http.ts:39](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-39)

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

[module/http.ts:27](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-27)

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

[module/http.ts:130](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-130)

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

[module/http.ts:183](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-183)

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

[module/http.ts:175](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-175)

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

[module/http.ts:65](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-65)

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

[module/http.ts:112](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-112)

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

[module/http.ts:76](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-76)

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

[module/http.ts:94](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-94)

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

[module/http.ts:49](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-49)

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

[module/http.ts:56](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/http.ts#lines-56)
