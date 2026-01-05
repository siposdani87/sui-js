---
id: "Http"
title: "Class: Http"
sidebar_label: "Http"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Http**(`opt_options?`): [`Http`](Http.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `object` |

#### Returns

[`Http`](Http.md)

#### Defined in

[module/http.ts:13](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L13)

## Properties

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[module/http.ts:8](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L8)

___

### password

• **password**: `string`

#### Defined in

[module/http.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L10)

___

### token

• **token**: `string`

#### Defined in

[module/http.ts:11](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L11)

___

### username

• **username**: `string`

#### Defined in

[module/http.ts:9](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L9)

## Methods

### delete

▸ **delete**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `object` |
| `opt_params?` | `object` |
| `opt_headers?` | `object` |

#### Returns

[`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/http.ts:82](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L82)

___

### eventAfterRequest

▸ **eventAfterRequest**(`http`, `response`, `filename`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `XMLHttpRequest` |
| `response` | [`Objekt`](Objekt.md)\<`object`\> |
| `filename` | `string` |

#### Returns

`void`

#### Defined in

[module/http.ts:129](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L129)

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

[module/http.ts:125](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L125)

___

### get

▸ **get**(`url`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params?` | `object` |
| `opt_headers?` | `object` |

#### Returns

[`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/http.ts:41](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L41)

___

### patch

▸ **patch**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `object` |
| `opt_params?` | `object` |
| `opt_headers?` | `object` |

#### Returns

[`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/http.ts:70](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L70)

___

### post

▸ **post**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `object` |
| `opt_params?` | `object` |
| `opt_headers?` | `object` |

#### Returns

[`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/http.ts:46](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L46)

___

### put

▸ **put**(`url`, `opt_data?`, `opt_params?`, `opt_headers?`): [`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data?` | `object` |
| `opt_params?` | `object` |
| `opt_headers?` | `object` |

#### Returns

[`Promize`](Promize.md)\<[[`Objekt`](Objekt.md)\<`object`\>, `string`], [[`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/http.ts:58](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L58)

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

[module/http.ts:32](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L32)

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

[module/http.ts:37](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/http.ts#L37)
