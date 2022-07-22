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

[module/xhr.ts:33](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-33)

## Properties

### authorization

• **authorization**: `string`

#### Defined in

[module/xhr.ts:24](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-24)

___

### deferred

• **deferred**: [`Deferred`](Deferred.md)

#### Defined in

[module/xhr.ts:29](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-29)

___

### http

• **http**: `XMLHttpRequest`

#### Defined in

[module/xhr.ts:28](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-28)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/xhr.ts:22](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-22)

___

### requestHeaders

• **requestHeaders**: `Object`

#### Defined in

[module/xhr.ts:23](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-23)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `XhrType`

#### Defined in

[module/xhr.ts:25](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-25)

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

[module/xhr.ts:123](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-123)

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

[module/xhr.ts:107](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-107)

___

### \_getFilenameFromHeader

▸ `Private` **_getFilenameFromHeader**(): `string`

#### Returns

`string`

#### Defined in

[module/xhr.ts:369](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-369)

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

[module/xhr.ts:305](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-305)

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

[module/xhr.ts:392](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-392)

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

[module/xhr.ts:115](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-115)

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

[module/xhr.ts:99](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-99)

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

[module/xhr.ts:273](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-273)

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

[module/xhr.ts:286](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-286)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:54](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-54)

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

[module/xhr.ts:130](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-130)

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

[module/xhr.ts:326](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-326)

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

[module/xhr.ts:42](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-42)

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

[module/xhr.ts:437](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-437)

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

[module/xhr.ts:474](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-474)

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

[module/xhr.ts:91](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-91)

___

### \_setTypes

▸ `Private` **_setTypes**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:73](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-73)

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

[module/xhr.ts:355](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-355)

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

[module/xhr.ts:253](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-253)

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

[module/xhr.ts:176](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-176)

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

[module/xhr.ts:492](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-492)

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

[module/xhr.ts:232](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-232)

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

[module/xhr.ts:190](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-190)

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

[module/xhr.ts:211](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-211)

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

[module/xhr.ts:500](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-500)

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

[module/xhr.ts:510](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-510)

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

[module/xhr.ts:482](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/xhr.ts#lines-482)
