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

[core/objekt.ts:25](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L25)

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

[core/objekt.ts:236](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L236)

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

[core/objekt.ts:62](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L62)

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

[core/objekt.ts:94](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L94)

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

[core/objekt.ts:187](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L187)

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

[core/objekt.ts:125](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L125)

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

[core/objekt.ts:271](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L271)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/objekt.ts:179](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L179)

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

[core/objekt.ts:253](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L253)

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

[core/objekt.ts:280](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L280)

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

[core/objekt.ts:212](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L212)

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

[core/objekt.ts:290](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L290)

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

[core/objekt.ts:74](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L74)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/objekt.ts:264](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L264)

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

[core/objekt.ts:34](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L34)

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

[core/objekt.ts:172](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L172)

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

[core/objekt.ts:148](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L148)

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

[core/objekt.ts:159](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L159)
