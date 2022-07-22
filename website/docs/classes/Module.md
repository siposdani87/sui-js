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

[core/module.ts:24](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-24)

## Properties

### \_controller

• **\_controller**: `any`

#### Defined in

[core/module.ts:21](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-21)

___

### \_injections

• **\_injections**: [`Injection`](../modules.md#injection)

#### Defined in

[core/module.ts:20](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-20)

___

### \_instances

• **\_instances**: [`Instance`](../modules.md#instance)

#### Defined in

[core/module.ts:19](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-19)

___

### \_modules

• **\_modules**: `Object`

#### Index signature

▪ [key: `string`]: [`Dependency`](../modules.md#dependency)

#### Defined in

[core/module.ts:16](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-16)

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

[core/module.ts:83](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-83)

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

[core/module.ts:230](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-230)

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

[core/module.ts:271](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-271)

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

[core/module.ts:70](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-70)

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

[core/module.ts:108](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-108)

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

[core/module.ts:54](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-54)

___

### eventAfterInit

▸ **eventAfterInit**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:345](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-345)

___

### eventControllerFailed

▸ **eventControllerFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:304](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-304)

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

[core/module.ts:298](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-298)

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

[core/module.ts:336](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-336)

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

[core/module.ts:311](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-311)

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

[core/module.ts:318](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-318)

___

### eventServiceFailed

▸ **eventServiceFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:357](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-357)

___

### eventServiceLoaded

▸ **eventServiceLoaded**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:351](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-351)

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

[core/module.ts:325](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-325)

___

### getController

▸ **getController**(): `Object`

#### Returns

`Object`

#### Defined in

[core/module.ts:45](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-45)

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

[core/module.ts:203](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-203)

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

[core/module.ts:169](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-169)

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

[core/module.ts:38](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/module.ts#lines-38)
