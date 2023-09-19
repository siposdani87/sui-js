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

[module/xhr.ts:33](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L33)

## Properties

### authorization

• **authorization**: `string`

#### Defined in

[module/xhr.ts:24](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L24)

___

### deferred

• **deferred**: [`Deferred`](Deferred.md)

#### Defined in

[module/xhr.ts:29](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L29)

___

### http

• **http**: `XMLHttpRequest`

#### Defined in

[module/xhr.ts:28](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L28)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/xhr.ts:22](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L22)

___

### requestHeaders

• **requestHeaders**: `Object`

#### Defined in

[module/xhr.ts:23](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L23)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `XhrType`

#### Defined in

[module/xhr.ts:25](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L25)

## Methods

### \_getAccept

▸ `Private` **_getAccept**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:122](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L122)

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

[module/xhr.ts:106](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L106)

___

### \_getFilenameFromHeader

▸ `Private` **_getFilenameFromHeader**(): `string`

#### Returns

`string`

#### Defined in

[module/xhr.ts:368](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L368)

___

### \_getRequestData

▸ `Private` **_getRequestData**(`opt_data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_data` | `Object` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:304](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L304)

___

### \_getResponseData

▸ `Private` **_getResponseData**(`data`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/xhr.ts:391](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L391)

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

[module/xhr.ts:114](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L114)

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

[module/xhr.ts:98](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L98)

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

[module/xhr.ts:272](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L272)

___

### \_handleRequest

▸ `Private` **_handleRequest**(`type`, `url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/xhr.ts:285](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L285)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:53](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L53)

___

### \_onReadyStateChange

▸ `Private` **_onReadyStateChange**(): (`_this`: `XMLHttpRequest`, `_ev`: `Event`) => `any`

#### Returns

`fn`

▸ `Private` (`_this`, `_ev`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_this` | `XMLHttpRequest` |
| `_ev` | `Event` |

##### Returns

`any`

#### Defined in

[module/xhr.ts:129](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L129)

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

[module/xhr.ts:325](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L325)

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

[module/xhr.ts:42](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L42)

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

[module/xhr.ts:436](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L436)

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

[module/xhr.ts:473](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L473)

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

[module/xhr.ts:90](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L90)

___

### \_setTypes

▸ `Private` **_setTypes**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:72](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L72)

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

[module/xhr.ts:354](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L354)

___

### delete

▸ **delete**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/xhr.ts:252](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L252)

___

### get

▸ **get**(`url`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/xhr.ts:175](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L175)

___

### getHeader

▸ **getHeader**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[module/xhr.ts:491](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L491)

___

### patch

▸ **patch**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/xhr.ts:231](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L231)

___

### post

▸ **post**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/xhr.ts:189](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L189)

___

### put

▸ **put**(`url`, `opt_data`, `opt_params`, `opt_headers?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opt_data` | `Object` |
| `opt_params` | `Object` |
| `opt_headers` | `Object` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/xhr.ts:210](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L210)

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

[module/xhr.ts:499](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L499)

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

[module/xhr.ts:509](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L509)

___

### setHeader

▸ **setHeader**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[module/xhr.ts:481](https://github.com/siposdani87/sui-js/blob/4b75724/src/module/xhr.ts#L481)
