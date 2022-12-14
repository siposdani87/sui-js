---
id: "Objekt"
title: "Class: Objekt"
sidebar_label: "Objekt"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`Objekt`**

  ↳ [`Route`](Route.md)

## Indexable

▪ [key: `string`]: `any`

## Constructors

### constructor

• **new Objekt**(`opt_object?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_object?` | `Object` |

#### Defined in

[core/objekt.ts:27](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L27)

## Methods

### \_attributesToObject

▸ **_attributesToObject**(`object`, `attributes`, `value`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` |
| `attributes` | `string`[] |
| `value` | `any` |

#### Returns

`Object`

#### Defined in

[core/objekt.ts:251](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L251)

___

### \_convertObject

▸ `Private` **_convertObject**(`object`, `key`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |
| `key` | `string` |

#### Returns

`void`

#### Defined in

[core/objekt.ts:71](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L71)

___

### \_getByAttributes

▸ `Private` **_getByAttributes**(`object`, `attributes`): `Object` \| [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`Objekt`](Objekt.md) |
| `attributes` | `string`[] |

#### Returns

`Object` \| [`Objekt`](Objekt.md)

#### Defined in

[core/objekt.ts:103](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L103)

___

### \_removeByAttributes

▸ `Private` **_removeByAttributes**(`object`, `attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`Objekt`](Objekt.md) |
| `attributes` | `string`[] |

#### Returns

`void`

#### Defined in

[core/objekt.ts:200](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L200)

___

### \_setByAttributes

▸ `Private` **_setByAttributes**(`object`, `attributes`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`Objekt`](Objekt.md) |
| `attributes` | `string`[] |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[core/objekt.ts:136](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L136)

___

### allowKeys

▸ **allowKeys**(`keys`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[core/objekt.ts:286](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L286)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/objekt.ts:192](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L192)

___

### copy

▸ **copy**(`opt_isNative?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_isNative` | `boolean` | `false` |

#### Returns

`any`

#### Defined in

[core/objekt.ts:268](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L268)

___

### denyKeys

▸ **denyKeys**(`keys`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[core/objekt.ts:295](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L295)

___

### each

▸ **each**(`next`, `opt_properties?`, `opt_attributes?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | `Function` |
| `opt_properties?` | `Object` |
| `opt_attributes?` | `string`[] |

#### Returns

`void`

#### Defined in

[core/objekt.ts:227](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L227)

___

### filterKeys

▸ **filterKeys**(`obj`, `condition`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Objekt`](Objekt.md) |
| `condition` | `Function` |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[core/objekt.ts:305](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L305)

___

### get

▸ **get**<`T`\>(`opt_attribute?`, `opt_defaultValue?`, `opt_isSafe?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_attribute?` | `string` | `undefined` |
| `opt_defaultValue?` | `T` | `undefined` |
| `opt_isSafe` | `boolean` | `false` |

#### Returns

`T`

#### Defined in

[core/objekt.ts:83](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L83)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/objekt.ts:279](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L279)

___

### merge

▸ **merge**(`object`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[core/objekt.ts:36](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L36)

___

### remove

▸ **remove**(`attribute`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`void`

#### Defined in

[core/objekt.ts:185](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L185)

___

### set

▸ **set**(`attribute`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[core/objekt.ts:161](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L161)

___

### setRaw

▸ **setRaw**(`attribute`, `value`, `opt_isSafe?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `attribute` | `string` | `undefined` |
| `value` | `any` | `undefined` |
| `opt_isSafe` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/objekt.ts:172](https://github.com/siposdani87/sui-js/blob/cc9117e/src/core/objekt.ts#L172)
