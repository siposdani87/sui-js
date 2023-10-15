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

[core/state.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L16)

## Properties

### \_current

• `Private` **\_current**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[core/state.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L10)

___

### \_previous

• `Private` **\_previous**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[core/state.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L11)

___

### basePath

• **basePath**: `string`

#### Defined in

[core/state.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L13)

___

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[core/state.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L14)

___

### routes

• **routes**: [`Collection`](Collection.md)<[`Route`](Route.md)\>

#### Defined in

[core/state.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L12)

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

[core/state.ts:56](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L56)

___

### \_getUrlPrefix

▸ `Private` **_getUrlPrefix**(): `string`

#### Returns

`string`

#### Defined in

[core/state.ts:52](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L52)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:36](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L36)

___

### \_initPopstate

▸ `Private` **_initPopstate**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:68](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L68)

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

[core/state.ts:107](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L107)

___

### \_parseUrl

▸ `Private` **_parseUrl**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:86](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L86)

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

[core/state.ts:221](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L221)

___

### \_setBasePath

▸ `Private` **_setBasePath**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:60](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L60)

___

### \_setCurrent

▸ `Private` **_setCurrent**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[core/state.ts:172](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L172)

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

[core/state.ts:135](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L135)

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

[core/state.ts:26](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L26)

___

### \_setRealUrls

▸ `Private` **_setRealUrls**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:44](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L44)

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

[core/state.ts:166](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L166)

___

### back

▸ **back**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:270](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L270)

___

### eventChange

▸ **eventChange**(`currentState`, `previousState`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `currentState` | [`Objekt`](Objekt.md)<`Object`\> | `undefined` |
| `previousState` | [`Objekt`](Objekt.md)<`Object`\> | `undefined` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:286](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L286)

___

### forward

▸ **forward**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:282](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L282)

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

[core/state.ts:177](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L177)

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

[core/state.ts:316](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L316)

___

### getParams

▸ **getParams**(): [`Objekt`](Objekt.md)<`Object`\>

#### Returns

[`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[core/state.ts:312](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L312)

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

[core/state.ts:181](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L181)

___

### getRoot

▸ **getRoot**(): `any`[]

#### Returns

`any`[]

#### Defined in

[core/state.ts:329](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L329)

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

[core/state.ts:185](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L185)

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

[core/state.ts:257](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L257)

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

[core/state.ts:245](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L245)

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

[core/state.ts:237](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L237)

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

[core/state.ts:274](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L274)

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

[core/state.ts:325](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L325)

___

### reload

▸ **reload**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:321](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L321)

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

[core/state.ts:232](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L232)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:82](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L82)

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

[core/state.ts:305](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L305)

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

[core/state.ts:299](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/state.ts#L299)
