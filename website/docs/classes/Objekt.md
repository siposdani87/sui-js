---
id: "Objekt"
title: "Class: Objekt<T>"
sidebar_label: "Objekt"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` = `object` |

## Hierarchy

- **`Objekt`**

  ↳ [`Route`](Route.md)

## Indexable

▪ [key: `string`]: `T`[keyof `T` \| `any`]

## Constructors

### constructor

• **new Objekt**\<`T`\>(`opt_object?`): [`Objekt`](Objekt.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` = `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_object?` | `T` |

#### Returns

[`Objekt`](Objekt.md)\<`T`\>

#### Defined in

[core/objekt.ts:20](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L20)

## Methods

### allowKeys

▸ **allowKeys**(`keys`): [`Objekt`](Objekt.md)\<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

[`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[core/objekt.ts:206](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L206)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[core/objekt.ts:135](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L135)

___

### copy

▸ **copy**(): [`Objekt`](Objekt.md)\<`object`\>

#### Returns

[`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[core/objekt.ts:193](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L193)

___

### copyObject

▸ **copyObject**(): `object`

#### Returns

`object`

#### Defined in

[core/objekt.ts:198](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L198)

___

### denyKeys

▸ **denyKeys**(`keys`): [`Objekt`](Objekt.md)\<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

[`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[core/objekt.ts:212](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L212)

___

### each

▸ **each**\<`K`\>(`next`, `opt_properties?`, `opt_attributes?`): `void`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`value`: `K`, `key`: `string`) => `void` |
| `opt_properties?` | `object` |
| `opt_attributes?` | `string`[] |

#### Returns

`void`

#### Defined in

[core/objekt.ts:160](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L160)

___

### filterKeys

▸ **filterKeys**(`obj`, `condition`): [`Objekt`](Objekt.md)\<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Objekt`](Objekt.md)\<`object`\> |
| `condition` | (`key`: `string`) => `boolean` |

#### Returns

[`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[core/objekt.ts:218](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L218)

___

### get

▸ **get**\<`K`\>(`attribute`, `opt_defaultValue?`, `opt_isSafe?`): `K`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `attribute` | `string` | `undefined` |
| `opt_defaultValue?` | `K` | `undefined` |
| `opt_isSafe` | `boolean` | `false` |

#### Returns

`K`

#### Defined in

[core/objekt.ts:55](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L55)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/objekt.ts:202](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L202)

___

### merge

▸ **merge**(`object`): [`Objekt`](Objekt.md)\<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

[`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[core/objekt.ts:25](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L25)

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

[core/objekt.ts:130](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L130)

___

### set

▸ **set**\<`K`\>(`attribute`, `value`): `void`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `K` |

#### Returns

`void`

#### Defined in

[core/objekt.ts:114](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L114)

___

### setRaw

▸ **setRaw**\<`K`\>(`attribute`, `value`, `opt_isSafe?`): `void`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `attribute` | `string` | `undefined` |
| `value` | `K` | `undefined` |
| `opt_isSafe` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[core/objekt.ts:120](https://github.com/siposdani87/sui-js/blob/fa20298/src/core/objekt.ts#L120)
