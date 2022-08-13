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

[module/actionCable.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-18)

## Properties

### cable

• **cable**: `Consumer`

#### Defined in

[module/actionCable.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-13)

___

### clients

• **clients**: [`ActionCableClient`](ActionCableClient.md)[]

#### Defined in

[module/actionCable.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-14)

___

### identifiers

• **identifiers**: `string`[]

#### Defined in

[module/actionCable.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-15)

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

[module/actionCable.ts:77](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-77)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/actionCable.ts:25](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-25)

___

### getUrl

▸ **getUrl**(): `string`

#### Returns

`string`

#### Defined in

[module/actionCable.ts:35](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-35)

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

[module/actionCable.ts:48](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-48)

___

### unsubscribeAll

▸ **unsubscribeAll**(): `void`

#### Returns

`void`

#### Defined in

[module/actionCable.ts:65](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCable.ts#lines-65)
