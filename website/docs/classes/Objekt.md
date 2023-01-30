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
| `opt_object` | `Object` |

#### Defined in

[core/objekt.ts:25](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L25)

## Methods

### \_attributesToObject

▸ `Private` **_attributesToObject**(`object`, `attributes`, `value`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` |
| `attributes` | `string`[] |
| `value` | `any` |

#### Returns

`Object`

#### Defined in

[core/objekt.ts:236](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L236)

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

[core/objekt.ts:61](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L61)

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

[core/objekt.ts:93](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L93)

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

[core/objekt.ts:186](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L186)

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

[core/objekt.ts:124](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L124)

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

[core/objekt.ts:272](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L272)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/objekt.ts:178](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L178)

___

### copy

▸ **copy**(): [`Objekt`](Objekt.md)

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[core/objekt.ts:252](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L252)

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

[core/objekt.ts:281](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L281)

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

[core/objekt.ts:212](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L212)

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

[core/objekt.ts:291](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L291)

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

[core/objekt.ts:73](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L73)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/objekt.ts:265](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L265)

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

[core/objekt.ts:33](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L33)

___

### pureCopy

▸ **pureCopy**(): `Object`

#### Returns

`Object`

#### Defined in

[core/objekt.ts:259](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L259)

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

[core/objekt.ts:171](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L171)

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

[core/objekt.ts:147](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L147)

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

[core/objekt.ts:158](https://github.com/siposdani87/sui-js/blob/1a445e5/src/core/objekt.ts#L158)
