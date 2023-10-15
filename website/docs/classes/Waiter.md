---
id: "Waiter"
title: "Class: Waiter"
sidebar_label: "Waiter"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Waiter**()

#### Defined in

[component/waiter.ts:6](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L6)

## Properties

### counter

• **counter**: `number`

#### Defined in

[component/waiter.ts:3](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L3)

___

### intervall

• **intervall**: `number`

#### Defined in

[component/waiter.ts:4](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L4)

___

### timeoutWaiting

• **timeoutWaiting**: `number`

#### Defined in

[component/waiter.ts:2](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L2)

## Methods

### \_advancedDelayHandler

▸ `Private` **_advancedDelayHandler**(`callback`, `duration`, `counter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Function` |
| `duration` | `number` |
| `counter` | `number` |

#### Returns

`void`

#### Defined in

[component/waiter.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L19)

___

### \_simpleDelayHandler

▸ `Private` **_simpleDelayHandler**(`callback`, `duration`, `counter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Function` |
| `duration` | `number` |
| `counter` | `number` |

#### Returns

`void`

#### Defined in

[component/waiter.ts:51](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L51)

___

### advancedWaiting

▸ **advancedWaiting**(`callback`, `opt_duration`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Function` |
| `opt_duration` | `number` |

#### Returns

`void`

#### Defined in

[component/waiter.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L11)

___

### simpleWaiting

▸ **simpleWaiting**(`callback`, `opt_duration`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Function` |
| `opt_duration` | `number` |

#### Returns

`void`

#### Defined in

[component/waiter.ts:46](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L46)

___

### startAdvancedWaiting

▸ **startAdvancedWaiting**(): `void`

#### Returns

`void`

#### Defined in

[component/waiter.ts:41](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L41)

___

### stopAdvancedWaiting

▸ **stopAdvancedWaiting**(): `void`

#### Returns

`void`

#### Defined in

[component/waiter.ts:34](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/waiter.ts#L34)
