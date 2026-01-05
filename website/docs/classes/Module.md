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

[core/module.ts:20](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L20)

## Methods

### add

▸ **add**(`name`, `moduleInjections`, `moduleCallback`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `moduleInjections` | `string`[] |
| `moduleCallback` | [`ClassRef`](../#classref) |

#### Returns

`string`

#### Defined in

[core/module.ts:36](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L36)

___

### eventAfterInit

▸ **eventAfterInit**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:275](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L275)

___

### eventControllerFailed

▸ **eventControllerFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:249](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L249)

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

[core/module.ts:245](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L245)

___

### eventDomChange

▸ **eventDomChange**(`state`, `dom`): [`Promize`](Promize.md)\<`object`, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`object`\> |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

#### Defined in

[core/module.ts:268](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L268)

___

### eventModuleFailed

▸ **eventModuleFailed**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`object`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:253](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L253)

___

### eventModuleLoaded

▸ **eventModuleLoaded**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`object`\> |

#### Returns

`void`

#### Defined in

[core/module.ts:257](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L257)

___

### eventServiceFailed

▸ **eventServiceFailed**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:283](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L283)

___

### eventServiceLoaded

▸ **eventServiceLoaded**(): `void`

#### Returns

`void`

#### Defined in

[core/module.ts:279](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L279)

___

### eventStateChange

▸ **eventStateChange**(`state`): [`Promize`](Promize.md)\<`object`, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`Objekt`](Objekt.md)\<`object`\> |

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

#### Defined in

[core/module.ts:261](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L261)

___

### getController

▸ **getController**(): `object`

#### Returns

`object`

#### Defined in

[core/module.ts:32](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L32)

___

### handleRoutes

▸ **handleRoutes**(`routes`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`Route`](Route.md)[] |
| `options` | `object` |

#### Returns

`void`

#### Defined in

[core/module.ts:167](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L167)

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

[core/module.ts:136](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L136)

___

### load

▸ **load**(`instances`, `injections`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instances` | [`Instance`](../#instance) |
| `injections` | [`Injection`](../#injection) |

#### Returns

`void`

#### Defined in

[core/module.ts:27](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/module.ts#L27)
