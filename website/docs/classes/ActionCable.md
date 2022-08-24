---
id: "ActionCable"
title: "Class: ActionCable"
sidebar_label: "ActionCable"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ActionCable**()

#### Defined in

[module/actionCable.ts:18](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L18)

## Properties

### cable

• **cable**: `Consumer`

#### Defined in

[module/actionCable.ts:13](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L13)

___

### clients

• **clients**: [`ActionCableClient`](ActionCableClient.md)[]

#### Defined in

[module/actionCable.ts:14](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L14)

___

### identifiers

• **identifiers**: `string`[]

#### Defined in

[module/actionCable.ts:15](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L15)

## Methods

### \_generateIdentifier

▸ `Protected` **_generateIdentifier**(`options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

#### Returns

`string`

#### Defined in

[module/actionCable.ts:77](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L77)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/actionCable.ts:25](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L25)

___

### getUrl

▸ **getUrl**(): `string`

#### Returns

`string`

#### Defined in

[module/actionCable.ts:35](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L35)

___

### subscribe

▸ **subscribe**(`channel`, `room`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `room` | `string` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/actionCable.ts:48](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L48)

___

### unsubscribeAll

▸ **unsubscribeAll**(): `void`

#### Returns

`void`

#### Defined in

[module/actionCable.ts:65](https://github.com/siposdani87/sui-js/blob/78d3494/src/module/actionCable.ts#L65)
