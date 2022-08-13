---
id: "Event"
title: "Class: Event"
sidebar_label: "Event"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Event**()

#### Defined in

[module/event.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/event.ts#lines-13)

## Properties

### eventStore

• **eventStore**: [`Objekt`](Objekt.md)

#### Defined in

[module/event.ts:10](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/event.ts#lines-10)

## Methods

### call

▸ **call**(`name`, `opt_args?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `opt_args` | `any`[] | `[]` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/event.ts:53](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/event.ts#lines-53)

___

### override

▸ **override**(`name`, `args`, `callback`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `args` | `any`[] |
| `callback` | `Function` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/event.ts:64](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/event.ts#lines-64)

___

### pop

▸ **pop**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[module/event.ts:43](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/event.ts#lines-43)

___

### remove

▸ **remove**(`name`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

[module/event.ts:33](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/event.ts#lines-33)

___

### set

▸ **set**(`name`, `callback`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | `Function` |

#### Returns

`Function`

#### Defined in

[module/event.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/event.ts#lines-21)
