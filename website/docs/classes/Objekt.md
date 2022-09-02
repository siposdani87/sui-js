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

[core/objekt.ts:26](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L26)

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

[core/objekt.ts:250](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L250)

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

[core/objekt.ts:70](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L70)

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

[core/objekt.ts:102](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L102)

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

[core/objekt.ts:199](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L199)

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

[core/objekt.ts:135](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L135)

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

[core/objekt.ts:285](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L285)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/objekt.ts:191](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L191)

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

[core/objekt.ts:267](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L267)

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

[core/objekt.ts:294](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L294)

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

[core/objekt.ts:226](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L226)

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

[core/objekt.ts:304](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L304)

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

[core/objekt.ts:82](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L82)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/objekt.ts:278](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L278)

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

[core/objekt.ts:35](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L35)

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

[core/objekt.ts:184](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L184)

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

[core/objekt.ts:160](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L160)

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

[core/objekt.ts:171](https://github.com/siposdani87/sui-js/blob/a88c06f/src/core/objekt.ts#L171)
