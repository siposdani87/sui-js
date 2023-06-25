---
id: "State"
title: "Class: State"
sidebar_label: "State"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new State**(`routes`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`Route`](Route.md)[] |
| `opt_options` | `Object` |

#### Defined in

[core/state.ts:22](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L22)

## Properties

### \_current

• `Private` **\_current**: [`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:13](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L13)

___

### \_previous

• `Private` **\_previous**: [`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:14](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L14)

___

### basePath

• **basePath**: `string`

#### Defined in

[core/state.ts:16](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L16)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:17](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L17)

___

### routes

• **routes**: [`Collection`](Collection.md)<[`Route`](Route.md)\>

#### Defined in

[core/state.ts:15](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L15)

## Methods

### \_getRealUrl

▸ `Private` **_getRealUrl**(`url`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`string`

#### Defined in

[core/state.ts:79](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L79)

___

### \_getUrlPrefix

▸ `Private` **_getUrlPrefix**(): `string`

#### Returns

`string`

#### Defined in

[core/state.ts:71](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L71)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:49](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L49)

___

### \_initPopstate

▸ `Private` **_initPopstate**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:97](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L97)

___

### \_parsePath

▸ `Private` **_parsePath**(`urlPath`, `successCallback`, `errorCallback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlPath` | `string` |
| `successCallback` | (`state`: [`Route`](Route.md), `path`: `string`, `params`: `Object`) => `void` |
| `errorCallback` | (`state`: [`Route`](Route.md), `path`: `string`, `params`: `Object`) => `void` |

#### Returns

`void`

#### Defined in

[core/state.ts:147](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L147)

___

### \_parseUrl

▸ `Private` **_parseUrl**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:120](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L120)

___

### \_resolveUrlWithState

▸ `Private` **_resolveUrlWithState**(`id`, `opt_params?`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `opt_params?` | `Object` |

#### Returns

`any`[]

#### Defined in

[core/state.ts:298](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L298)

___

### \_setBasePath

▸ `Private` **_setBasePath**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:86](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L86)

___

### \_setCurrent

▸ `Private` **_setCurrent**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[core/state.ts:228](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L228)

___

### \_setHistory

▸ `Private` **_setHistory**(`state`, `url`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `state` | [`Route`](Route.md) | `undefined` |
| `url` | `string` | `undefined` |
| `opt_params` | `Object` | `{}` |
| `opt_overwrite` | `boolean` | `false` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:183](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L183)

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

[core/state.ts:36](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L36)

___

### \_setRealUrls

▸ `Private` **_setRealUrls**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:60](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L60)

___

### \_triggerChange

▸ `Private` **_triggerChange**(`opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:218](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L218)

___

### back

▸ **back**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:368](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L368)

___

### eventChange

▸ **eventChange**(`currentState`, `previousState`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `currentState` | [`Objekt`](Objekt.md) | `undefined` |
| `previousState` | [`Objekt`](Objekt.md) | `undefined` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:395](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L395)

___

### forward

▸ **forward**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:386](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L386)

___

### getCurrent

▸ **getCurrent**<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_attribute?` | `string` |
| `opt_defaultValue?` | `T` |

#### Returns

`T`

#### Defined in

[core/state.ts:238](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L238)

___

### getParam

▸ **getParam**<`T`\>(`name`, `opt_defaultValue?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `opt_defaultValue?` | `any` |

#### Returns

`T`

#### Defined in

[core/state.ts:439](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L439)

___

### getParams

▸ **getParams**(): [`Objekt`](Objekt.md)

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:430](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L430)

___

### getPrevious

▸ **getPrevious**<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_attribute?` | `string` |
| `opt_defaultValue?` | `T` |

#### Returns

`T`

#### Defined in

[core/state.ts:247](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L247)

___

### getRoot

▸ **getRoot**(): `any`[]

#### Returns

`any`[]

#### Defined in

[core/state.ts:459](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L459)

___

### go

▸ **go**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `opt_params?` | `Object` | `undefined` |
| `opt_overwrite` | `boolean` | `false` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:257](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L257)

___

### goBack

▸ **goBack**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `opt_params?` | `Object` | `undefined` |
| `opt_overwrite` | `boolean` | `false` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:353](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L353)

___

### goRoot

▸ **goRoot**(`opt_overwrite?`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_overwrite` | `boolean` | `false` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:335](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L335)

___

### goState

▸ **goState**(`state`, `opt_overwrite?`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `state` | [`Route`](Route.md) | `undefined` |
| `opt_overwrite` | `boolean` | `false` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:323](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L323)

___

### redirect

▸ **redirect**(`url`, `opt_inTab?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `opt_inTab` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:376](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L376)

___

### refresh

▸ **refresh**(`opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:453](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L453)

___

### reload

▸ **reload**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:446](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L446)

___

### resolveUrl

▸ **resolveUrl**(`id`, `opt_params?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `opt_params?` | `Object` |

#### Returns

`string`

#### Defined in

[core/state.ts:313](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L313)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:113](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L113)

___

### setParam

▸ **setParam**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[core/state.ts:421](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L421)

___

### setParams

▸ **setParams**(`properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |

#### Returns

`void`

#### Defined in

[core/state.ts:411](https://github.com/siposdani87/sui-js/blob/3c5600c/src/core/state.ts#L411)
