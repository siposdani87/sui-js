---
id: "Async"
title: "Class: Async"
sidebar_label: "Async"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Async**(`opt_sum?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_sum?` | `number` |

#### Defined in

[core/async.ts:26](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L26)

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

[core/async.ts:17](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L17)

___

### sum

• **sum**: `number`

#### Defined in

[core/async.ts:16](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L16)

## Methods

### \_clear

▸ `Private` **_clear**(): `void`

#### Returns

`void`

#### Defined in

[core/async.ts:180](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L180)

___

### \_parallelCaller

▸ `Private` **_parallelCaller**(`length`, `isError`, `result`, `allowEvent`, `index`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |
| `isError` | `boolean` |
| `result` | `any` |
| `allowEvent` | `boolean` |
| `index` | `number` |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/async.ts:143](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L143)

___

### \_parallelWrapper

▸ `Private` **_parallelWrapper**(`call`, `length`, `allowEvent`, `index`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `call` | `Function` |
| `length` | `number` |
| `allowEvent` | `boolean` |
| `index` | `number` |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/async.ts:79](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L79)

___

### \_serialCaller

▸ `Private` **_serialCaller**(`calls`, `index`, `result`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `index` | `number` |
| `result` | `any` |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/async.ts:276](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L276)

___

### \_serialWrapper

▸ `Private` **_serialWrapper**(`calls`, `index`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `index` | `number` |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/async.ts:237](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L237)

___

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

[core/async.ts:211](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L211)

___

### parallel

▸ **parallel**(`calls`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/async.ts:35](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L35)

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

[core/async.ts:61](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L61)

___

### serial

▸ **serial**(`calls`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[core/async.ts:219](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L219)

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

[core/async.ts:195](https://github.com/siposdani87/sui-js/blob/8fe9546/src/core/async.ts#L195)
