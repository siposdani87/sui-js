---
id: "ActionCableClient"
title: "Class: ActionCableClient"
sidebar_label: "ActionCableClient"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ActionCableClient**(`parent`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`ActionCable`](ActionCable.md) |
| `options` | `ChannelNameWithParams` |

#### Defined in

[module/actionCableClient.ts:23](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-23)

## Properties

### client

• **client**: `Subscription`<`Consumer`\>

#### Defined in

[module/actionCableClient.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-17)

___

### identifier

• **identifier**: `string`

#### Defined in

[module/actionCableClient.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-18)

___

### parent

• **parent**: [`ActionCable`](ActionCable.md)

#### Defined in

[module/actionCableClient.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-15)

___

### subscription

• **subscription**: [`Promize`](Promize.md)

#### Defined in

[module/actionCableClient.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-16)

## Methods

### \_getSubscription

▸ `Private` **_getSubscription**(`options`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ChannelNameWithParams` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/actionCableClient.ts:40](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-40)

___

### \_init

▸ `Private` **_init**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ChannelNameWithParams` |

#### Returns

`void`

#### Defined in

[module/actionCableClient.ts:32](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-32)

___

### send

▸ **send**(`message`, `opt_data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `opt_data` | `Object` |

#### Returns

`void`

#### Defined in

[module/actionCableClient.ts:62](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-62)

___

### subscribe

▸ **subscribe**(): [`Promize`](Promize.md)

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/actionCableClient.ts:54](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-54)

___

### unsubscribe

▸ **unsubscribe**(): `void`

#### Returns

`void`

#### Defined in

[module/actionCableClient.ts:69](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/actionCableClient.ts#lines-69)