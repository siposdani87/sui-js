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

[core/async.ts:20](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L20)

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

[core/async.ts:11](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L11)

___

### sum

• **sum**: `number`

#### Defined in

[core/async.ts:10](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L10)

## Methods

### \_clear

▸ `Private` **_clear**(): `void`

#### Returns

`void`

#### Defined in

[core/async.ts:174](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L174)

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

[core/async.ts:137](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L137)

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

[core/async.ts:73](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L73)

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

[core/async.ts:270](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L270)

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

[core/async.ts:231](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L231)

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

[core/async.ts:205](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L205)

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

[core/async.ts:29](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L29)

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

[core/async.ts:55](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L55)

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

[core/async.ts:213](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L213)

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

[core/async.ts:189](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/async.ts#L189)
