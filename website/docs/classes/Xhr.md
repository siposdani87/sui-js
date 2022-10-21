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

[module/xhr.ts:33](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L33)

## Properties

### authorization

• **authorization**: `string`

#### Defined in

[module/xhr.ts:24](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L24)

___

### deferred

• **deferred**: [`Deferred`](Deferred.md)

#### Defined in

[module/xhr.ts:29](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L29)

___

### http

• **http**: `XMLHttpRequest`

#### Defined in

[module/xhr.ts:28](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L28)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/xhr.ts:22](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L22)

___

### requestHeaders

• **requestHeaders**: `Object`

#### Defined in

[module/xhr.ts:23](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L23)

___

### types

• **types**: `Object`

#### Index signature

▪ [key: `string`]: `XhrType`

#### Defined in

[module/xhr.ts:25](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L25)

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

[module/xhr.ts:123](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L123)

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

[module/xhr.ts:107](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L107)

___

### \_getFilenameFromHeader

▸ `Private` **_getFilenameFromHeader**(): `string`

#### Returns

`string`

#### Defined in

[module/xhr.ts:369](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L369)

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

[module/xhr.ts:305](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L305)

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

[module/xhr.ts:392](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L392)

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

[module/xhr.ts:115](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L115)

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

[module/xhr.ts:99](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L99)

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

[module/xhr.ts:273](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L273)

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

[module/xhr.ts:286](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L286)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:54](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L54)

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

[module/xhr.ts:130](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L130)

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

[module/xhr.ts:326](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L326)

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

[module/xhr.ts:42](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L42)

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

[module/xhr.ts:437](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L437)

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

[module/xhr.ts:474](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L474)

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

[module/xhr.ts:91](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L91)

___

### \_setTypes

▸ `Private` **_setTypes**(): `void`

#### Returns

`void`

#### Defined in

[module/xhr.ts:73](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L73)

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

[module/xhr.ts:355](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L355)

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

[module/xhr.ts:253](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L253)

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

[module/xhr.ts:176](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L176)

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

[module/xhr.ts:492](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L492)

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

[module/xhr.ts:232](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L232)

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

[module/xhr.ts:190](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L190)

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

[module/xhr.ts:211](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L211)

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

[module/xhr.ts:500](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L500)

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

[module/xhr.ts:510](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L510)

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

[module/xhr.ts:482](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/xhr.ts#L482)
