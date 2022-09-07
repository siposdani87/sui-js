---
id: "BaseTest"
title: "Class: BaseTest"
sidebar_label: "BaseTest"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`BaseTest`**

  ↳ [`CollectionTest`](CollectionTest.md)

  ↳ [`DeferredTest`](DeferredTest.md)

  ↳ [`ItemTest`](ItemTest.md)

  ↳ [`ObjektTest`](ObjektTest.md)

## Constructors

### constructor

• **new BaseTest**(`opt_name?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_name?` | `string` |

#### Defined in

[test/baseTest.ts:15](https://github.com/siposdani87/sui-js/blob/035cd52/src/test/baseTest.ts#L15)

## Properties

### name

• **name**: `string`

#### Defined in

[test/baseTest.ts:11](https://github.com/siposdani87/sui-js/blob/035cd52/src/test/baseTest.ts#L11)

## Methods

### init

▸ **init**(): `void`

#### Returns

`void`

#### Defined in

[test/baseTest.ts:21](https://github.com/siposdani87/sui-js/blob/035cd52/src/test/baseTest.ts#L21)

___

### showAssert

▸ **showAssert**(`condition`, `message`, `object`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | `boolean` |
| `message` | `string` |
| `object` | `string` \| `number` \| `boolean` \| `Object` |

#### Returns

`void`

#### Defined in

[test/baseTest.ts:30](https://github.com/siposdani87/sui-js/blob/035cd52/src/test/baseTest.ts#L30)
