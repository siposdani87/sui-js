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

[core/module.ts:25](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L25)

## Properties

### \_controller

• **\_controller**: `any`

#### Defined in

[core/module.ts:22](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L22)

___

### \_injections

• **\_injections**: [`Injection`](../modules.md#injection)

#### Defined in

[core/module.ts:17](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L17)

___

### \_instances

• **\_instances**: [`Instance`](../modules.md#instance)

#### Defined in

[core/module.ts:16](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L16)

___

### \_modules

• **\_modules**: `Object`

#### Index signature

▪ [key: `string`]: [`Dependency`](../modules.md#dependency)

#### Defined in

[core/module.ts:19](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L19)

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

[core/module.ts:82](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L82)

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

[core/module.ts:230](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L230)

___

### \_initController

▸ `Private` **_initController**(`state`, `dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:269](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L269)

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

[core/module.ts:69](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L69)

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

[core/module.ts:107](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L107)

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

[core/module.ts:53](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L53)

___

### eventAfterInit

▸ **eventAfterInit**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:343](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L343)

___

### eventControllerFailed

▸ **eventControllerFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:302](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L302)

___

### eventControllerLoaded

▸ **eventControllerLoaded**(`dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:296](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L296)

___

### eventDomChange

▸ **eventDomChange**(`state`, `dom`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md) |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/module.ts:334](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L334)

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

[core/module.ts:309](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L309)

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

[core/module.ts:316](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L316)

___

### eventServiceFailed

▸ **eventServiceFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:355](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L355)

___

### eventServiceLoaded

▸ **eventServiceLoaded**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:349](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L349)

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

[core/module.ts:323](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L323)

___

### getController

▸ **getController**(): `Object`

#### Returns

`Object`

#### Defined in

[core/module.ts:44](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L44)

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

[core/module.ts:203](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L203)

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

[core/module.ts:168](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L168)

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

[core/module.ts:37](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/module.ts#L37)
