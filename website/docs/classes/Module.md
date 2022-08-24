---
id: "Module"
title: "Class: Module"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Module**()

#### Defined in

[core/module.ts:24](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L24)

## Properties

### \_controller

• **\_controller**: `any`

#### Defined in

[core/module.ts:21](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L21)

___

### \_injections

• **\_injections**: [`Injection`](../modules.md#injection)

#### Defined in

[core/module.ts:20](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L20)

___

### \_instances

• **\_instances**: [`Instance`](../modules.md#instance)

#### Defined in

[core/module.ts:19](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L19)

___

### \_modules

• **\_modules**: `Object`

#### Index signature

▪ [key: `string`]: [`Dependency`](../modules.md#dependency)

#### Defined in

[core/module.ts:16](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L16)

## Methods

### \_getSortedServices

▸ `Private` **_getSortedServices**(`services`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | `string`[] |

#### Returns

`string`[]

#### Defined in

[core/module.ts:83](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L83)

___

### \_handleStateChange

▸ **_handleStateChange**(`currentState`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `currentState` | [`Objekt`](Objekt.md) | `undefined` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/module.ts:230](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L230)

___

### \_initController

▸ `Private` **_initController**(`state`, `dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:271](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L271)

___

### \_resolveDependencies

▸ `Private` **_resolveDependencies**(`dependency`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependency` | [`Dependency`](../modules.md#dependency) |

#### Returns

`Object`

#### Defined in

[core/module.ts:70](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L70)

___

### \_topologicalSort

▸ `Private` **_topologicalSort**(`edges`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `edges` | `string`[][] |

#### Returns

`string`[]

#### Defined in

[core/module.ts:108](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L108)

___

### add

▸ **add**(`name`, `moduleInjections`, `moduleCallback`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `moduleInjections` | `string`[] |
| `moduleCallback` | [`ClassRef`](../modules.md#classref) |

#### Returns

`string`

#### Defined in

[core/module.ts:54](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L54)

___

### eventAfterInit

▸ **eventAfterInit**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:345](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L345)

___

### eventControllerFailed

▸ **eventControllerFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:304](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L304)

___

### eventControllerLoaded

▸ **eventControllerLoaded**(`dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:298](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L298)

___

### eventDomChange

▸ **eventDomChange**(`state`, `dom`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/module.ts:336](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L336)

___

### eventModuleFailed

▸ **eventModuleFailed**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[core/module.ts:311](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L311)

___

### eventModuleLoaded

▸ **eventModuleLoaded**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[core/module.ts:318](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L318)

___

### eventServiceFailed

▸ **eventServiceFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:357](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L357)

___

### eventServiceLoaded

▸ **eventServiceLoaded**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:351](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L351)

___

### eventStateChange

▸ **eventStateChange**(`state`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/module.ts:325](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L325)

___

### getController

▸ **getController**(): `Object`

#### Returns

`Object`

#### Defined in

[core/module.ts:45](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L45)

___

### handleRoutes

▸ **handleRoutes**(`routes`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`Route`](Route.md)[] |
| `options` | `Object` |

#### Returns

`void`

#### Defined in

[core/module.ts:203](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L203)

___

### handleServices

▸ **handleServices**(`services`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | `string`[] |

#### Returns

`void`

#### Defined in

[core/module.ts:169](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L169)

___

### load

▸ **load**(`instances`, `injections`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instances` | [`Instance`](../modules.md#instance) |
| `injections` | [`Injection`](../modules.md#injection) |

#### Returns

`void`

#### Defined in

[core/module.ts:38](https://github.com/siposdani87/sui-js/blob/78d3494/src/core/module.ts#L38)
