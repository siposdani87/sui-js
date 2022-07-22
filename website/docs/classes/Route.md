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

[component/route.ts:16](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/route.ts#lines-16)

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

[core/objekt.ts:250](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-250)

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

[core/objekt.ts:285](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-285)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Objekt](Objekt.md).[clear](Objekt.md#clear)

#### Defined in

[core/objekt.ts:191](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-191)

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

[core/objekt.ts:267](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-267)

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

[core/objekt.ts:294](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-294)

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

[core/objekt.ts:226](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-226)

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

[core/objekt.ts:304](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-304)

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

[core/objekt.ts:82](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-82)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Objekt](Objekt.md).[isEmpty](Objekt.md#isempty)

#### Defined in

[core/objekt.ts:278](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-278)

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

[core/objekt.ts:35](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-35)

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

[core/objekt.ts:184](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-184)

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

[core/objekt.ts:160](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-160)

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

[core/objekt.ts:171](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/core/objekt.ts#lines-171)
