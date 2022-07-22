---
id: "DeferredTest"
title: "Class: DeferredTest"
sidebar_label: "DeferredTest"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseTest`](BaseTest.md)

  ↳ **`DeferredTest`**

## Constructors

### constructor

• **new DeferredTest**()

#### Overrides

[BaseTest](BaseTest.md).[constructor](BaseTest.md#constructor)

#### Defined in

[test/deferredTest.ts:17](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-17)

## Properties

### ajaxReject

• **ajaxReject**: () => `any`

#### Type declaration

▸ (): `any`

##### Returns

`any`

#### Defined in

[test/deferredTest.ts:12](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-12)

___

### ajaxResolve

• **ajaxResolve**: () => `any`

#### Type declaration

▸ (): `any`

##### Returns

`any`

#### Defined in

[test/deferredTest.ts:10](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-10)

___

### funcReject

• **funcReject**: () => `any`

#### Type declaration

▸ (): `any`

##### Returns

`any`

#### Defined in

[test/deferredTest.ts:13](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-13)

___

### funcResolve

• **funcResolve**: () => `any`

#### Type declaration

▸ (): `any`

##### Returns

`any`

#### Defined in

[test/deferredTest.ts:11](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-11)

___

### name

• **name**: `string`

#### Inherited from

[BaseTest](BaseTest.md).[name](BaseTest.md#name)

#### Defined in

[test/baseTest.ts:11](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/baseTest.ts#lines-11)

## Methods

### init

▸ **init**(): `void`

#### Returns

`void`

#### Overrides

[BaseTest](BaseTest.md).[init](BaseTest.md#init)

#### Defined in

[test/deferredTest.ts:24](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-24)

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

#### Inherited from

[BaseTest](BaseTest.md).[showAssert](BaseTest.md#showassert)

#### Defined in

[test/baseTest.ts:30](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/baseTest.ts#lines-30)

___

### testPromise

▸ **testPromise**(): `void`

#### Returns

`void`

#### Defined in

[test/deferredTest.ts:60](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-60)

___

### testReject

▸ **testReject**(): `void`

#### Returns

`void`

#### Defined in

[test/deferredTest.ts:90](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-90)

___

### testResolve

▸ **testResolve**(): `void`

#### Returns

`void`

#### Defined in

[test/deferredTest.ts:68](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/test/deferredTest.ts#lines-68)
