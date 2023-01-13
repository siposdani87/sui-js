---
id: "Route"
title: "Class: Route"
sidebar_label: "Route"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Objekt`](Objekt.md)

  ↳ **`Route`**

## Constructors

### constructor

• **new Route**(`id`, `title`, `url`, `controller`, `opt_template?`, `opt_params?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `title` | `string` | `undefined` |
| `url` | `string` | `undefined` |
| `controller` | `string` | `undefined` |
| `opt_template` | `string` | `''` |
| `opt_params` | `Object` | `{}` |

#### Overrides

[Objekt](Objekt.md).[constructor](Objekt.md#constructor)

#### Defined in

[component/route.ts:16](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/route.ts#L16)

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

#### Inherited from

[Objekt](Objekt.md).[_attributesToObject](Objekt.md#_attributestoobject)

#### Defined in

[core/objekt.ts:236](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L236)

___

### allowKeys

▸ **allowKeys**(`keys`): [`Objekt`](Objekt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

[`Objekt`](Objekt.md)

#### Inherited from

[Objekt](Objekt.md).[allowKeys](Objekt.md#allowkeys)

#### Defined in

[core/objekt.ts:271](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L271)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Objekt](Objekt.md).[clear](Objekt.md#clear)

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

#### Inherited from

[Objekt](Objekt.md).[copy](Objekt.md#copy)

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

#### Inherited from

[Objekt](Objekt.md).[denyKeys](Objekt.md#denykeys)

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

#### Inherited from

[Objekt](Objekt.md).[each](Objekt.md#each)

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

#### Inherited from

[Objekt](Objekt.md).[filterKeys](Objekt.md#filterkeys)

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

#### Inherited from

[Objekt](Objekt.md).[get](Objekt.md#get)

#### Defined in

[core/objekt.ts:74](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L74)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Objekt](Objekt.md).[isEmpty](Objekt.md#isempty)

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

#### Inherited from

[Objekt](Objekt.md).[merge](Objekt.md#merge)

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

#### Inherited from

[Objekt](Objekt.md).[remove](Objekt.md#remove)

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

#### Inherited from

[Objekt](Objekt.md).[set](Objekt.md#set)

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

#### Inherited from

[Objekt](Objekt.md).[setRaw](Objekt.md#setraw)

#### Defined in

[core/objekt.ts:159](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/objekt.ts#L159)
