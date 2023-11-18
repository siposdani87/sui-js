---
id: "Form"
title: "Class: Form"
sidebar_label: "Form"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Collection`](Collection.md)\<[`BaseField`](BaseField.md)\<`HTMLInputElement`\>\>

  ↳ **`Form`**

## Constructors

### constructor

• **new Form**(`dom`, `opt_selector?`): [`Form`](Form.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'form'` |

#### Returns

[`Form`](Form.md)

#### Overrides

[Collection](Collection.md).[constructor](Collection.md#constructor)

#### Defined in

[component/form.ts:18](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L18)

## Properties

### Type

• **Type**: `any`

#### Inherited from

[Collection](Collection.md).[Type](Collection.md#type)

#### Defined in

[core/collection.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L13)

___

### buttonClasses

• **buttonClasses**: `string`[]

#### Defined in

[component/form.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L15)

___

### fieldClasses

• **fieldClasses**: `string`[]

#### Defined in

[component/form.ts:16](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L16)

___

### formKnot

• **formKnot**: [`Knot`](Knot.md)\<`HTMLFormElement`\>

#### Defined in

[component/form.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L11)

___

### initFields

• **initFields**: `string`[]

#### Defined in

[component/form.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L14)

___

### items

• **items**: [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[items](Collection.md#items)

#### Defined in

[core/collection.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L14)

___

### model

• **model**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/form.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L13)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`Object`\>

#### Inherited from

[Collection](Collection.md).[options](Collection.md#options)

#### Defined in

[core/collection.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L15)

___

### previousModel

• **previousModel**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/form.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L12)

## Methods

### \_fieldValueChange

▸ **_fieldValueChange**(`field`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[component/form.ts:180](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L180)

___

### \_getPreviousValue

▸ **_getPreviousValue**(`field`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Returns

`any`

#### Defined in

[component/form.ts:175](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L175)

___

### \_getValue

▸ **_getValue**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[component/form.ts:171](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L171)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:32](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L32)

___

### \_initFields

▸ **_initFields**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:89](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L89)

___

### \_initFormEvent

▸ **_initFormEvent**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:53](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L53)

___

### \_initResetFormEvent

▸ **_initResetFormEvent**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:82](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L82)

___

### \_initSubmitFormEvent

▸ **_initSubmitFormEvent**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:73](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L73)

___

### \_setValue

▸ **_setValue**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[component/form.ts:163](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L163)

___

### checkValidity

▸ **checkValidity**(`opt_force?`, `opt_showMessage?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_force` | `boolean` | `false` |
| `opt_showMessage` | `boolean` | `true` |

#### Returns

`boolean`

#### Defined in

[component/form.ts:202](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L202)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[core/collection.ts:134](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L134)

___

### delete

▸ **delete**(`value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[delete](Collection.md#delete)

#### Defined in

[core/collection.ts:172](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L172)

___

### deleteAllBy

▸ **deleteAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllBy](Collection.md#deleteallby)

#### Defined in

[core/collection.ts:198](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L198)

___

### deleteAllByCondition

▸ **deleteAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllByCondition](Collection.md#deleteallbycondition)

#### Defined in

[core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L204)

___

### deleteBy

▸ **deleteBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[deleteBy](Collection.md#deleteby)

#### Defined in

[core/collection.ts:182](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L182)

___

### deleteByCondition

▸ **deleteByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[deleteByCondition](Collection.md#deletebycondition)

#### Defined in

[core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L188)

___

### deleteById

▸ **deleteById**(`id`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[deleteById](Collection.md#deletebyid)

#### Defined in

[core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L178)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_item`: [`BaseField`](BaseField.md)\<`HTMLInputElement`\>, `_index`: `number`) => `void` |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[each](Collection.md#each)

#### Defined in

[core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L106)

___

### eventButton

▸ **eventButton**(`model`, `knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Objekt`](Objekt.md)\<`Object`\> |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/form.ts:263](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L263)

___

### eventReset

▸ **eventReset**(`model`, `knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Objekt`](Objekt.md)\<`Object`\> |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/form.ts:259](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L259)

___

### eventSubmit

▸ **eventSubmit**(`model`, `knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Objekt`](Objekt.md)\<`Object`\> |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/form.ts:255](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L255)

___

### findAllBy

▸ **findAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[findAllBy](Collection.md#findallby)

#### Defined in

[core/collection.ts:156](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L156)

___

### findAllByCondition

▸ **findAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[findAllByCondition](Collection.md#findallbycondition)

#### Defined in

[core/collection.ts:162](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L162)

___

### findBy

▸ **findBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[findBy](Collection.md#findby)

#### Defined in

[core/collection.ts:142](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L142)

___

### findByCondition

▸ **findByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[findByCondition](Collection.md#findbycondition)

#### Defined in

[core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L148)

___

### findById

▸ **findById**(`id`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[findById](Collection.md#findbyid)

#### Defined in

[core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L138)

___

### findByModel

▸ **findByModel**\<`T`\>(`name`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`T`

#### Defined in

[component/form.ts:234](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L234)

___

### get

▸ **get**\<`K`\>(`index`, `opt_attribute?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `opt_attribute?` | `string` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

#### Inherited from

[Collection](Collection.md).[get](Collection.md#get)

#### Defined in

[core/collection.ts:112](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L112)

___

### getById

▸ **getById**\<`K`\>(`id`, `opt_attribute?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `opt_attribute?` | `string` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

#### Inherited from

[Collection](Collection.md).[getById](Collection.md#getbyid)

#### Defined in

[core/collection.ts:126](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L126)

___

### getItems

▸ **getItems**(): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[getItems](Collection.md#getitems)

#### Defined in

[core/collection.ts:86](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L86)

___

### getModel

▸ **getModel**(): [`Objekt`](Objekt.md)\<`Object`\>

#### Returns

[`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[component/form.ts:147](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L147)

___

### isInvalid

▸ **isInvalid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[component/form.ts:216](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L216)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[component/form.ts:212](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L212)

___

### iterator

▸ **iterator**(`callback`, `next`, `opt_items?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`_item`: [`BaseField`](BaseField.md)\<`HTMLInputElement`\>) => `boolean` |
| `next` | (`_item`: [`BaseField`](BaseField.md)\<`HTMLInputElement`\>, `_index`: `number`) => `void` |
| `opt_items?` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[] |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[iterator](Collection.md#iterator)

#### Defined in

[core/collection.ts:90](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L90)

___

### limit

▸ **limit**(`offset`, `opt_count?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offset` | `number` | `undefined` |
| `opt_count` | `number` | `10` |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[limit](Collection.md#limit)

#### Defined in

[core/collection.ts:222](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L222)

___

### load

▸ **load**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[load](Collection.md#load)

#### Defined in

[core/collection.ts:36](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L36)

___

### lock

▸ **lock**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:240](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L240)

___

### push

▸ **push**(`object`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[push](Collection.md#push)

#### Defined in

[core/collection.ts:47](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L47)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:220](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L220)

___

### reload

▸ **reload**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[reload](Collection.md#reload)

#### Defined in

[core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L42)

___

### replace

▸ **replace**(`object`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[replace](Collection.md#replace)

#### Defined in

[core/collection.ts:73](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L73)

___

### reset

▸ **reset**(`opt_force?`, `opt_showMessage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_force` | `boolean` | `true` |
| `opt_showMessage` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[component/form.ts:151](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L151)

___

### set

▸ **set**(`index`, `object`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `object` | `Object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[set](Collection.md#set)

#### Defined in

[core/collection.ts:63](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L63)

___

### setErrors

▸ **setErrors**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |

#### Returns

`void`

#### Defined in

[component/form.ts:193](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L193)

___

### setModel

▸ **setModel**(`model`, `opt_force?`, `opt_showMessage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `model` | [`Objekt`](Objekt.md)\<`Object`\> | `undefined` |
| `opt_force` | `boolean` | `true` |
| `opt_showMessage` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[component/form.ts:130](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L130)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[core/collection.ts:218](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/collection.ts#L218)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:249](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/form.ts#L249)
