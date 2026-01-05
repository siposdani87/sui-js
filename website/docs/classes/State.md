---
id: "State"
title: "Class: State"
sidebar_label: "State"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new State**(`routes`, `opt_options?`): [`State`](State.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`Route`](Route.md)[] |
| `opt_options` | `object` |

#### Returns

[`State`](State.md)

#### Defined in

[core/state.ts:16](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L16)

## Properties

### basePath

• **basePath**: `string`

#### Defined in

[core/state.ts:13](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L13)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[core/state.ts:14](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L14)

___

### routes

• **routes**: [`Collection`](Collection.md)\<[`Route`](Route.md)\>

#### Defined in

[core/state.ts:12](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L12)

## Methods

### back

▸ **back**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:270](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L270)

___

### eventChange

▸ **eventChange**(`currentState`, `previousState`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `currentState` | [`Objekt`](Objekt.md)\<`object`\> | `undefined` |
| `previousState` | [`Objekt`](Objekt.md)\<`object`\> | `undefined` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:286](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L286)

___

### forward

▸ **forward**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:282](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L282)

___

### getCurrent

▸ **getCurrent**\<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

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

[core/state.ts:177](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L177)

___

### getParam

▸ **getParam**\<`T`\>(`name`, `opt_defaultValue?`): `T`

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

[core/state.ts:316](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L316)

___

### getParams

▸ **getParams**(): [`Objekt`](Objekt.md)\<`object`\>

#### Returns

[`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[core/state.ts:312](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L312)

___

### getPrevious

▸ **getPrevious**\<`T`\>(`opt_attribute?`, `opt_defaultValue?`): `T`

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

[core/state.ts:181](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L181)

___

### getRoot

▸ **getRoot**(): `any`[]

#### Returns

`any`[]

#### Defined in

[core/state.ts:329](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L329)

___

### go

▸ **go**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `opt_params?` | `object` | `undefined` |
| `opt_overwrite` | `boolean` | `false` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:185](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L185)

___

### goBack

▸ **goBack**(`id`, `opt_params?`, `opt_overwrite?`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `opt_params?` | `object` | `undefined` |
| `opt_overwrite` | `boolean` | `false` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/state.ts:257](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L257)

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

[core/state.ts:245](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L245)

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

[core/state.ts:237](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L237)

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

[core/state.ts:274](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L274)

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

[core/state.ts:325](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L325)

___

### reload

▸ **reload**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:321](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L321)

___

### resolveUrl

▸ **resolveUrl**(`id`, `opt_params?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `opt_params?` | `object` |

#### Returns

`string`

#### Defined in

[core/state.ts:232](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L232)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[core/state.ts:82](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L82)

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

[core/state.ts:305](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L305)

___

### setParams

▸ **setParams**(`properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `object` |

#### Returns

`void`

#### Defined in

[core/state.ts:299](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/state.ts#L299)
