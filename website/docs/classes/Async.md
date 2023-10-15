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

[core/async.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L14)

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

[core/async.ts:7](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L7)

___

### sum

• **sum**: `number`

#### Defined in

[core/async.ts:6](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L6)

## Methods

### \_clear

▸ `Private` **_clear**(): `void`

#### Returns

`void`

#### Defined in

[core/async.ts:139](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L139)

___

### \_parallelCaller

▸ `Private` **_parallelCaller**(`length`, `isError`, `result`, `allowEvent`, `index`, `opt_args?`): [`Promize`](Promize.md)<`Object`, `Object`\>

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

[`Promize`](Promize.md)<`Object`, `Object`\>

#### Defined in

[core/async.ts:105](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L105)

___

### \_parallelWrapper

▸ `Private` **_parallelWrapper**(`call`, `length`, `allowEvent`, `index`, `opt_args?`): [`Promize`](Promize.md)<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `call` | `Function` |
| `length` | `number` |
| `allowEvent` | `boolean` |
| `index` | `number` |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)<`Object`, `Object`\>

#### Defined in

[core/async.ts:50](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L50)

___

### \_serialCaller

▸ `Private` **_serialCaller**(`calls`, `index`, `result`, `opt_args?`): [`Promize`](Promize.md)<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `index` | `number` |
| `result` | `any` |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)<`Object`, `Object`\>

#### Defined in

[core/async.ts:208](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L208)

___

### \_serialWrapper

▸ `Private` **_serialWrapper**(`calls`, `index`, `opt_args?`): [`Promize`](Promize.md)<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `index` | `number` |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)<`Object`, `Object`\>

#### Defined in

[core/async.ts:176](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L176)

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

[core/async.ts:160](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L160)

___

### parallel

▸ **parallel**(`calls`, `opt_args?`): [`Promize`](Promize.md)<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)<`Object`, `Object`\>

#### Defined in

[core/async.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L19)

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

[core/async.ts:40](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L40)

___

### serial

▸ **serial**(`calls`, `opt_args?`): [`Promize`](Promize.md)<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | `Function`[] |
| `opt_args?` | `any`[] |

#### Returns

[`Promize`](Promize.md)<`Object`, `Object`\>

#### Defined in

[core/async.ts:164](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L164)

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

[core/async.ts:148](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/async.ts#L148)
