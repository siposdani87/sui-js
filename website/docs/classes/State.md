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

[core/state.ts:22](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-22)

## Properties

### \_current

• `Private` **\_current**: [`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-13)

___

### \_previous

• `Private` **\_previous**: [`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-14)

___

### basePath

• **basePath**: `string`

#### Defined in

[core/state.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-16)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-17)

___

### routes

• **routes**: [`Collection`](Collection.md)<[`Route`](Route.md)\>

#### Defined in

[core/state.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-15)

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

[core/state.ts:80](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-80)

___

### \_getUrlPrefix

▸ `Private` **_getUrlPrefix**(): `string`

#### Returns

`string`

#### Defined in

[core/state.ts:72](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-72)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:50](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-50)

___

### \_initPopstate

▸ `Private` **_initPopstate**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:98](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-98)

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

[core/state.ts:148](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-148)

___

### \_parseUrl

▸ `Private` **_parseUrl**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:121](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-121)

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

[core/state.ts:299](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-299)

___

### \_setBasePath

▸ `Private` **_setBasePath**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:87](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-87)

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

[core/state.ts:229](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-229)

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

[core/state.ts:184](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-184)

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

[core/state.ts:36](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-36)

___

### \_setRealUrls

▸ `Private` **_setRealUrls**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:61](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-61)

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

[core/state.ts:219](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-219)

___

### back

▸ **back**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:369](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-369)

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

[core/state.ts:396](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-396)

___

### forward

▸ **forward**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:387](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-387)

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

[core/state.ts:239](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-239)

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

[core/state.ts:440](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-440)

___

### getParams

▸ **getParams**(): [`Objekt`](Objekt.md)

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[core/state.ts:431](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-431)

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

[core/state.ts:248](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-248)

___

### getRoot

▸ **getRoot**(): `any`[]

#### Returns

`any`[]

#### Defined in

[core/state.ts:460](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-460)

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

[core/state.ts:258](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-258)

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

[core/state.ts:354](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-354)

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

[core/state.ts:336](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-336)

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

[core/state.ts:324](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-324)

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

[core/state.ts:377](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-377)

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

[core/state.ts:454](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-454)

___

### reload

▸ **reload**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:447](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-447)

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

[core/state.ts:314](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-314)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:114](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-114)

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

[core/state.ts:422](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-422)

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

[core/state.ts:412](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/core/state.ts#lines-412)
