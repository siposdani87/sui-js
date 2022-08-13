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

[component/waiter.ts:10](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-10)

## Properties

### counter

• **counter**: `number`

#### Defined in

[component/waiter.ts:6](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-6)

___

### intervall

• **intervall**: `number`

#### Defined in

[component/waiter.ts:7](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-7)

___

### timeoutWaiting

• **timeoutWaiting**: `number`

#### Defined in

[component/waiter.ts:5](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-5)

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

[component/waiter.ts:33](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-33)

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

[component/waiter.ts:79](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-79)

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

[component/waiter.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-19)

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

[component/waiter.ts:68](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-68)

___

### startAdvancedWaiting

▸ **startAdvancedWaiting**(): `void`

#### Returns

`void`

#### Defined in

[component/waiter.ts:59](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-59)

___

### stopAdvancedWaiting

▸ **stopAdvancedWaiting**(): `void`

#### Returns

`void`

#### Defined in

[component/waiter.ts:50](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/waiter.ts#lines-50)
