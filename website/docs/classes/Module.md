---
id: "Module"
title: "Class: Module"
sidebar_label: "Module"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Module**(): [`Module`](Module.md)

#### Returns

[`Module`](Module.md)

#### Defined in

[core/module.ts:20](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L20)

## Properties

### \_controller

• `Private` **\_controller**: `any`

#### Defined in

[core/module.ts:18](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L18)

___

### \_injections

• `Private` **\_injections**: [`Injection`](../modules.md#injection)

#### Defined in

[core/module.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L13)

___

### \_instances

• `Private` **\_instances**: [`Instance`](../modules.md#instance)

#### Defined in

[core/module.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L12)

___

### \_modules

• `Private` **\_modules**: `Object`

#### Index signature

▪ [key: `string`]: [`Dependency`](../modules.md#dependency)

#### Defined in

[core/module.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L15)

## Methods

### \_getSortedServices

▸ **_getSortedServices**(`services`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | `string`[] |

#### Returns

`string`[]

#### Defined in

[core/module.ts:57](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L57)

___

### \_handleStateChange

▸ **_handleStateChange**(`currentState`, `opt_force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `currentState` | [`Objekt`](Objekt.md)\<`Object`\> | `undefined` |
| `opt_force` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/module.ts:190](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L190)

___

### \_initController

▸ **_initController**(`state`, `dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`Object`\> |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:224](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L224)

___

### \_resolveDependencies

▸ **_resolveDependencies**(`dependency`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependency` | [`Dependency`](../modules.md#dependency) |

#### Returns

`Object`

#### Defined in

[core/module.ts:48](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L48)

___

### \_topologicalSort

▸ **_topologicalSort**(`edges`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `edges` | `string`[][] |

#### Returns

`string`[]

#### Defined in

[core/module.ts:78](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L78)

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

[core/module.ts:36](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L36)

___

### eventAfterInit

▸ **eventAfterInit**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:275](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L275)

___

### eventControllerFailed

▸ **eventControllerFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:249](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L249)

___

### eventControllerLoaded

▸ **eventControllerLoaded**(`dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:245](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L245)

___

### eventDomChange

▸ **eventDomChange**(`state`, `dom`): [`Promize`](Promize.md)\<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`Object`\> |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

[`Promize`](Promize.md)\<`Object`, `Object`\>

#### Defined in

[core/module.ts:268](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L268)

___

### eventModuleFailed

▸ **eventModuleFailed**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:253](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L253)

___

### eventModuleLoaded

▸ **eventModuleLoaded**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:257](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L257)

___

### eventServiceFailed

▸ **eventServiceFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:283](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L283)

___

### eventServiceLoaded

▸ **eventServiceLoaded**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:279](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L279)

___

### eventStateChange

▸ **eventStateChange**(`state`): [`Promize`](Promize.md)\<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`Object`\> |

#### Returns

[`Promize`](Promize.md)\<`Object`, `Object`\>

#### Defined in

[core/module.ts:261](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L261)

___

### getController

▸ **getController**(): `Object`

#### Returns

`Object`

#### Defined in

[core/module.ts:32](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L32)

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

[core/module.ts:167](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L167)

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

[core/module.ts:136](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L136)

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

[core/module.ts:27](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/module.ts#L27)
