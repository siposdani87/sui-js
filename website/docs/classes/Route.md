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

[component/route.ts:4](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/route.ts#L4)

## Methods

### allowKeys

▸ **allowKeys**(`keys`): [`Objekt`](Objekt.md)<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

[`Objekt`](Objekt.md)<`Object`\>

#### Inherited from

[Objekt](Objekt.md).[allowKeys](Objekt.md#allowkeys)

#### Defined in

[core/objekt.ts:206](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L206)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Objekt](Objekt.md).[clear](Objekt.md#clear)

#### Defined in

[core/objekt.ts:135](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L135)

___

### copy

▸ **copy**(): [`Objekt`](Objekt.md)<`Object`\>

#### Returns

[`Objekt`](Objekt.md)<`Object`\>

#### Inherited from

[Objekt](Objekt.md).[copy](Objekt.md#copy)

#### Defined in

[core/objekt.ts:193](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L193)

___

### copyObject

▸ **copyObject**(): `Object`

#### Returns

`Object`

#### Inherited from

[Objekt](Objekt.md).[copyObject](Objekt.md#copyobject)

#### Defined in

[core/objekt.ts:198](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L198)

___

### denyKeys

▸ **denyKeys**(`keys`): [`Objekt`](Objekt.md)<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

[`Objekt`](Objekt.md)<`Object`\>

#### Inherited from

[Objekt](Objekt.md).[denyKeys](Objekt.md#denykeys)

#### Defined in

[core/objekt.ts:212](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L212)

___

### each

▸ **each**<`K`\>(`next`, `opt_properties?`, `opt_attributes?`): `void`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`value`: `K`, `key`: `string`) => `void` |
| `opt_properties?` | `Object` |
| `opt_attributes?` | `string`[] |

#### Returns

`void`

#### Inherited from

[Objekt](Objekt.md).[each](Objekt.md#each)

#### Defined in

[core/objekt.ts:160](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L160)

___

### filterKeys

▸ **filterKeys**(`obj`, `condition`): [`Objekt`](Objekt.md)<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Objekt`](Objekt.md)<`Object`\> |
| `condition` | (`key`: `string`) => `boolean` |

#### Returns

[`Objekt`](Objekt.md)<`Object`\>

#### Inherited from

[Objekt](Objekt.md).[filterKeys](Objekt.md#filterkeys)

#### Defined in

[core/objekt.ts:218](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L218)

___

### get

▸ **get**<`K`\>(`attribute`, `opt_defaultValue?`, `opt_isSafe?`): `K`

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

#### Inherited from

[Objekt](Objekt.md).[get](Objekt.md#get)

#### Defined in

[core/objekt.ts:55](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L55)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Objekt](Objekt.md).[isEmpty](Objekt.md#isempty)

#### Defined in

[core/objekt.ts:202](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L202)

___

### merge

▸ **merge**(`object`): [`Objekt`](Objekt.md)<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

[`Objekt`](Objekt.md)<`Object`\>

#### Inherited from

[Objekt](Objekt.md).[merge](Objekt.md#merge)

#### Defined in

[core/objekt.ts:25](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L25)

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

[core/objekt.ts:130](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L130)

___

### set

▸ **set**<`K`\>(`attribute`, `value`): `void`

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

#### Inherited from

[Objekt](Objekt.md).[set](Objekt.md#set)

#### Defined in

[core/objekt.ts:114](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L114)

___

### setRaw

▸ **setRaw**<`K`\>(`attribute`, `value`, `opt_isSafe?`): `void`

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

#### Inherited from

[Objekt](Objekt.md).[setRaw](Objekt.md#setraw)

#### Defined in

[core/objekt.ts:120](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/objekt.ts#L120)
