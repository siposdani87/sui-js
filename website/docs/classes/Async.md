---
id: "Async"
title: "Class: Async"
sidebar_label: "Async"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Async**(`opt_sum?`): [`Async`](Async.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_sum?` | `number` |

#### Returns

[`Async`](Async.md)

#### Defined in

[core/async.ts:14](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L14)

## Properties

### call

• **call**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `counter` | `number` |
| `isError` | `boolean` |
| `results` | `any`[] |
| `sum` | `number` |

#### Defined in

[core/async.ts:7](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L7)

___

### sum

• **sum**: `number`

#### Defined in

[core/async.ts:6](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L6)

## Methods

### eventComplete

▸ **eventComplete**(`isError`, `results`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isError` | `boolean` |
| `results` | `any`[] |

#### Returns

`void`

#### Defined in

[core/async.ts:160](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L160)

___

### parallel

▸ **parallel**(`calls`, `opt_args?`): [`Promize`](Promize.md)\<`object`, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

#### Defined in

[core/async.ts:19](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L19)

___

### parallelFunction

▸ **parallelFunction**(`call`, `opt_args?`, `opt_index?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `call` | `Function` |
| `opt_args?` | `any`[] |
| `opt_index?` | `number` |

#### Returns

`void`

#### Defined in

[core/async.ts:40](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L40)

___

### serial

▸ **serial**(`calls`, `opt_args?`): [`Promize`](Promize.md)\<`object`, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

#### Defined in

[core/async.ts:164](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L164)

___

### setStatus

▸ **setStatus**(`sum`, `isError`, `counter`, `results`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sum` | `number` |
| `isError` | `boolean` |
| `counter` | `number` |
| `results` | `any`[] |

#### Returns

`void`

#### Defined in

[core/async.ts:148](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/async.ts#L148)
