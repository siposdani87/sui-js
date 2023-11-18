---
id: "EventBus"
title: "Class: EventBus"
sidebar_label: "EventBus"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new EventBus**(): [`EventBus`](EventBus.md)

#### Returns

[`EventBus`](EventBus.md)

#### Defined in

[module/eventBus.ts:8](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/eventBus.ts#L8)

## Properties

### eventStore

• **eventStore**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[module/eventBus.ts:6](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/eventBus.ts#L6)

## Methods

### call

▸ **call**(`name`, `opt_args?`): [`Promize`](Promize.md)\<`Object`, `Object`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `opt_args` | `any`[] | `[]` |

#### Returns

[`Promize`](Promize.md)\<`Object`, `Object`\>

#### Defined in

[module/eventBus.ts:35](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/eventBus.ts#L35)

___

### override

▸ **override**(`name`, `args`, `callback`): [`Promize`](Promize.md)\<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `args` | `any`[] |
| `callback` | `Function` |

#### Returns

[`Promize`](Promize.md)\<`Object`, `Object`\>

#### Defined in

[module/eventBus.ts:41](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/eventBus.ts#L41)

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

[module/eventBus.ts:29](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/eventBus.ts#L29)

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

[module/eventBus.ts:21](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/eventBus.ts#L21)

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

[module/eventBus.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/eventBus.ts#L12)
