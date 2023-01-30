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

[component/waiter.ts:10](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L10)

## Properties

### counter

• **counter**: `number`

#### Defined in

[component/waiter.ts:6](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L6)

___

### intervall

• **intervall**: `number`

#### Defined in

[component/waiter.ts:7](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L7)

___

### timeoutWaiting

• **timeoutWaiting**: `number`

#### Defined in

[component/waiter.ts:5](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L5)

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

[component/waiter.ts:33](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L33)

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

[component/waiter.ts:79](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L79)

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

[component/waiter.ts:19](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L19)

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

[component/waiter.ts:68](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L68)

___

### startAdvancedWaiting

▸ **startAdvancedWaiting**(): `void`

#### Returns

`void`

#### Defined in

[component/waiter.ts:59](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L59)

___

### stopAdvancedWaiting

▸ **stopAdvancedWaiting**(): `void`

#### Returns

`void`

#### Defined in

[component/waiter.ts:50](https://github.com/siposdani87/sui-js/blob/1a445e5/src/component/waiter.ts#L50)
