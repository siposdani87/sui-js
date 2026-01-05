---
id: "Xhr"
title: "Class: Xhr"
sidebar_label: "Xhr"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Xhr**(`opt_options?`): [`Xhr`](Xhr.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `object` |

#### Returns

[`Xhr`](Xhr.md)

#### Defined in

[module/xhr.ts:32](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L32)

## Properties

### authorization

• **authorization**: `string`

#### Defined in

[module/xhr.ts:22](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L22)

___

### deferred

• **deferred**: [`Deferred`](Deferred.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/xhr.ts:27](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L27)

___

### httpRequest

• **httpRequest**: `XMLHttpRequest`

#### Defined in

[module/xhr.ts:26](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L26)

___

### options

• **options**: [`Objekt`](Objekt.md)\<\{ `backend`: `string` ; `locale`: `string`  }\>

#### Defined in

[module/xhr.ts:18](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L18)

___

### requestHeaders

• **requestHeaders**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[module/xhr.ts:19](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L19)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `XhrType`

#### Defined in

[module/xhr.ts:23](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L23)

## Methods

### delete

▸ **delete**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `object` |
| `opt_params` | `object` |
| `opt_headers` | `object` |

#### Returns

[`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/xhr.ts:191](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L191)

___

### get

▸ **get**(`url`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params` | `object` |
| `opt_headers` | `object` |

#### Returns

[`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/xhr.ts:138](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L138)

___

### patch

▸ **patch**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `object` |
| `opt_params` | `object` |
| `opt_headers` | `object` |

#### Returns

[`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/xhr.ts:176](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L176)

___

### post

▸ **post**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `object` |
| `opt_params` | `object` |
| `opt_headers` | `object` |

#### Returns

[`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/xhr.ts:146](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L146)

___

### put

▸ **put**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `object` |
| `opt_params` | `object` |
| `opt_headers` | `object` |

#### Returns

[`Promize`](Promize.md)\<[`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)\<`object`\>, `string`]\>

#### Defined in

[module/xhr.ts:161](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L161)

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

[module/xhr.ts:387](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L387)

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

[module/xhr.ts:394](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/xhr.ts#L394)
