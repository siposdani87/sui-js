---
id: "EventBus"
title: "Class: EventBus"
sidebar_label: "EventBus"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new EventBus**()

#### Defined in

[module/eventBus.ts:13](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/eventBus.ts#L13)

## Properties

### eventStore

• **eventStore**: [`Objekt`](Objekt.md)

#### Defined in

[module/eventBus.ts:10](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/eventBus.ts#L10)

## Methods

### call

▸ **call**(`name`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `opt_args` | `any`[] | `[]` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/eventBus.ts:53](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/eventBus.ts#L53)

___

### override

▸ **override**(`name`, `args`, `callback`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `args` | `any`[] |
| `callback` | `Function` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/eventBus.ts:64](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/eventBus.ts#L64)

___

### pop

▸ **pop**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[module/eventBus.ts:43](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/eventBus.ts#L43)

___

### remove

▸ **remove**(`name`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

[module/eventBus.ts:33](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/eventBus.ts#L33)

___

### set

▸ **set**(`name`, `callback`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | `Function` |

#### Returns

`Function`

#### Defined in

[module/eventBus.ts:21](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/eventBus.ts#L21)
