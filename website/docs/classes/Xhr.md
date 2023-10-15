---
id: "Xhr"
title: "Class: Xhr"
sidebar_label: "Xhr"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Xhr**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

[module/xhr.ts:30](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L30)

## Properties

### authorization

• **authorization**: `string`

#### Defined in

[module/xhr.ts:20](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L20)

___

### deferred

• **deferred**: [`Deferred`](Deferred.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/xhr.ts:25](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L25)

___

### httpRequest

• **httpRequest**: `XMLHttpRequest`

#### Defined in

[module/xhr.ts:24](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L24)

___

### options

• **options**: [`Objekt`](Objekt.md)<{ `backend`: `string` ; `locale`: `string`  }\>

#### Defined in

[module/xhr.ts:18](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L18)

___

### requestHeaders

• **requestHeaders**: `Object`

#### Defined in

[module/xhr.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L19)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `XhrType`

#### Defined in

[module/xhr.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L21)

## Methods

### \_createRequest

▸ `Private` **_createRequest**(`type`, `url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/xhr.ts:209](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L209)

___

### \_createRequestBody

▸ `Private` **_createRequestBody**(`opt_data?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_data?` | `Object` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:227](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L227)

___

### \_getAccept

▸ `Private` **_getAccept**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:89](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L89)

___

### \_getContentType

▸ `Private` **_getContentType**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:81](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L81)

___

### \_getFilenameFromHeader

▸ `Private` **_getFilenameFromHeader**(): `string`

#### Returns

`string`

#### Defined in

[module/xhr.ts:278](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L278)

___

### \_getHeader

▸ `Private` **_getHeader**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:381](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L381)

___

### \_getResponseType

▸ `Private` **_getResponseType**(`name`): `XMLHttpRequestResponseType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`XMLHttpRequestResponseType`

#### Defined in

[module/xhr.ts:85](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L85)

___

### \_getType

▸ `Private` **_getType**(`name`): `XhrType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`XhrType`

#### Defined in

[module/xhr.ts:77](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L77)

___

### \_getUrl

▸ `Private` **_getUrl**(`url`, `opt_params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params` | `Object` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:204](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L204)

___

### \_handleResponseData

▸ `Private` **_handleResponseData**(`response`): [`Promize`](Promize.md)<[[[`Objekt`](Objekt.md)<`Object`\>, `string`]], `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `any` |

#### Returns

[`Promize`](Promize.md)<[[[`Objekt`](Objekt.md)<`Object`\>, `string`]], `undefined`\>

#### Defined in

[module/xhr.ts:299](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L299)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:43](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L43)

___

### \_onReadyStateChange

▸ `Private` **_onReadyStateChange**(): (`_this`: `XMLHttpRequest`, `ev`: `Event`) => `any`

#### Returns

`fn`

▸ (`_this`, `ev`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_this` | `XMLHttpRequest` |
| `ev` | `Event` |

##### Returns

`any`

#### Defined in

[module/xhr.ts:93](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L93)

___

### \_parseObject

▸ `Private` **_parseObject**(`obj`, `key`, `stringKey`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |
| `key` | `string` |
| `stringKey` | `string` |

#### Returns

`string`[]

#### Defined in

[module/xhr.ts:242](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L242)

___

### \_setHeader

▸ `Private` **_setHeader**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[module/xhr.ts:374](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L374)

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

[module/xhr.ts:35](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L35)

___

### \_setRequestHeaders

▸ `Private` **_setRequestHeaders**(`urlType`, `opt_headers?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlType` | `string` |
| `opt_headers` | `Object` |

#### Returns

`void`

#### Defined in

[module/xhr.ts:337](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L337)

___

### \_setResponseType

▸ `Private` **_setResponseType**(`urlType`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlType` | `string` |

#### Returns

`void`

#### Defined in

[module/xhr.ts:370](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L370)

___

### \_setType

▸ `Private` **_setType**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `XhrType` |

#### Returns

`void`

#### Defined in

[module/xhr.ts:73](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L73)

___

### \_setTypes

▸ `Private` **_setTypes**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:60](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L60)

___

### \_stringifyObject

▸ `Private` **_stringifyObject**(`obj`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:267](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L267)

___

### delete

▸ **delete**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/xhr.ts:189](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L189)

___

### get

▸ **get**(`url`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/xhr.ts:136](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L136)

___

### patch

▸ **patch**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/xhr.ts:174](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L174)

___

### post

▸ **post**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/xhr.ts:144](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L144)

___

### put

▸ **put**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)<[`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`], [`XMLHttpRequest`, [`Objekt`](Objekt.md)<`Object`\>, `string`]\>

#### Defined in

[module/xhr.ts:159](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L159)

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

[module/xhr.ts:385](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L385)

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

[module/xhr.ts:392](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/xhr.ts#L392)
