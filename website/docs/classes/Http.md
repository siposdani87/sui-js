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

[module/http.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L13)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[module/http.ts:8](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L8)

___

### password

• **password**: `string`

#### Defined in

[module/http.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L10)

___

### token

• **token**: `string`

#### Defined in

[module/http.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L11)

___

### username

• **username**: `string`

#### Defined in

[module/http.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L9)

## Methods

### \_createXhrRequest

▸ `Private` **_createXhrRequest**(): [`Xhr`](Xhr.md)

#### Returns

[`Xhr`](Xhr.md)

#### Defined in

[module/http.ts:94](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L94)

___

### \_getPromise

▸ `Private` **_getPromise**(`promise`): [`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | [`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\> |

#### Returns

[`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/http.ts:103](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L103)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/http.ts:26](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L26)

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

[module/http.ts:18](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L18)

___

### delete

▸ **delete**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/http.ts:82](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L82)

___

### eventAfterRequest

▸ **eventAfterRequest**(`http`, `response`, `filename`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `XMLHttpRequest` |
| `response` | [`Objekt`](Objekt.md)<`Object`\> |
| `filename` | `string` |

#### Returns

`void`

#### Defined in

[module/http.ts:127](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L127)

___

### eventBeforeRequest

▸ **eventBeforeRequest**(`xhr`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `xhr` | [`Xhr`](Xhr.md) |

#### Returns

`void`

#### Defined in

[module/http.ts:123](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L123)

___

### get

▸ **get**(`url`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/http.ts:41](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L41)

___

### patch

▸ **patch**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/http.ts:70](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L70)

___

### post

▸ **post**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/http.ts:46](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L46)

___

### put

▸ **put**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `Object` |
| `opt_params?` | `Object` |
| `opt_headers?` | `Object` |

#### Returns

[`Promize`](Promize.md)<[[`Objekt`](Objekt.md)<`Object`\>, `string`], [[`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/http.ts:58](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L58)

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

[module/http.ts:32](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L32)

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

[module/http.ts:37](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/http.ts#L37)
