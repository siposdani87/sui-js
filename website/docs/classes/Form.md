---
id: "Form"
title: "Class: Form"
sidebar_label: "Form"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Collection`](Collection.md)<[`BaseField`](BaseField.md)<`HTMLInputElement`\>\>

  ↳ **`Form`**

## Constructors

### constructor

• **new Form**(`dom`, `opt_selector?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'form'` |

#### Overrides

[Collection](Collection.md).[constructor](Collection.md#constructor)

#### Defined in

[component/form.ts:25](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L25)

## Properties

### Type

• **Type**: `any`

#### Inherited from

[Collection](Collection.md).[Type](Collection.md#type)

#### Defined in

[core/collection.ts:17](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L17)

___

### buttonClasses

• **buttonClasses**: `string`[]

#### Defined in

[component/form.ts:19](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L19)

___

### fieldClasses

• **fieldClasses**: `string`[]

#### Defined in

[component/form.ts:20](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L20)

___

### formKnot

• **formKnot**: [`Knot`](Knot.md)<`HTMLFormElement`\>

#### Defined in

[component/form.ts:15](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L15)

___

### initFields

• **initFields**: `string`[]

#### Defined in

[component/form.ts:18](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L18)

___

### items

• **items**: [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[items](Collection.md#items)

#### Defined in

[core/collection.ts:18](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L18)

___

### model

• **model**: [`Objekt`](Objekt.md)

#### Defined in

[component/form.ts:17](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L17)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Inherited from

[Collection](Collection.md).[options](Collection.md#options)

#### Defined in

[core/collection.ts:19](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L19)

___

### previousModel

• **previousModel**: [`Objekt`](Objekt.md)

#### Defined in

[component/form.ts:16](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L16)

## Methods

### \_fieldValueChange

▸ `Private` **_fieldValueChange**(`field`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | [`BaseField`](BaseField.md)<`HTMLInputElement`\> |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[component/form.ts:231](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L231)

___

### \_getPreviousValue

▸ `Private` **_getPreviousValue**(`field`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Returns

`any`

#### Defined in

[component/form.ts:221](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L221)

___

### \_getValue

▸ `Private` **_getValue**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[component/form.ts:213](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L213)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:42](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L42)

___

### \_initFields

▸ `Private` **_initFields**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:111](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L111)

___

### \_initFormEvent

▸ `Private` **_initFormEvent**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:66](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L66)

___

### \_initResetFormEvent

▸ `Private` **_initResetFormEvent**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:101](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L101)

___

### \_initSubmitFormEvent

▸ `Private` **_initSubmitFormEvent**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:89](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L89)

___

### \_setValue

▸ `Private` **_setValue**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[component/form.ts:201](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L201)

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

[component/form.ts:260](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L260)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[core/collection.ts:189](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L189)

___

### delete

▸ **delete**(`value`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` \| [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[delete](Collection.md#delete)

#### Defined in

[core/collection.ts:247](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L247)

___

### deleteAllBy

▸ **deleteAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllBy](Collection.md#deleteallby)

#### Defined in

[core/collection.ts:287](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L287)

___

### deleteAllByCondition

▸ **deleteAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[deleteAllByCondition](Collection.md#deleteallbycondition)

#### Defined in

[core/collection.ts:296](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L296)

___

### deleteBy

▸ **deleteBy**(`attribute`, `value`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[deleteBy](Collection.md#deleteby)

#### Defined in

[core/collection.ts:264](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L264)

___

### deleteByCondition

▸ **deleteByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[deleteByCondition](Collection.md#deletebycondition)

#### Defined in

[core/collection.ts:273](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L273)

___

### deleteById

▸ **deleteById**(`id`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[deleteById](Collection.md#deletebyid)

#### Defined in

[core/collection.ts:256](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L256)

___

### each

▸ **each**(`next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | (`_item`: [`BaseField`](BaseField.md)<`HTMLInputElement`\>, `_index`: `number`) => `any` |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[each](Collection.md#each)

#### Defined in

[core/collection.ts:149](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L149)

___

### eventButton

▸ **eventButton**(`model`, `knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Objekt`](Objekt.md) |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/form.ts:346](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L346)

___

### eventReset

▸ **eventReset**(`model`, `knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Objekt`](Objekt.md) |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/form.ts:338](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L338)

___

### eventSubmit

▸ **eventSubmit**(`model`, `knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Objekt`](Objekt.md) |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/form.ts:330](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L330)

___

### findAllBy

▸ **findAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[findAllBy](Collection.md#findallby)

#### Defined in

[core/collection.ts:225](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L225)

___

### findAllByCondition

▸ **findAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[findAllByCondition](Collection.md#findallbycondition)

#### Defined in

[core/collection.ts:234](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L234)

___

### findBy

▸ **findBy**(`attribute`, `value`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `any` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[findBy](Collection.md#findby)

#### Defined in

[core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L204)

___

### findByCondition

▸ **findByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conditionCallback` | `Function` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[findByCondition](Collection.md#findbycondition)

#### Defined in

[core/collection.ts:213](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L213)

___

### findById

▸ **findById**(`id`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[findById](Collection.md#findbyid)

#### Defined in

[core/collection.ts:196](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L196)

___

### findByModel

▸ **findByModel**<`T`\>(`name`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`T`

#### Defined in

[component/form.ts:301](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L301)

___

### get

▸ **get**<`K`\>(`index`, `opt_attribute?`): [`BaseField`](BaseField.md)<`HTMLInputElement`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `opt_attribute?` | `string` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\> \| `K`

#### Inherited from

[Collection](Collection.md).[get](Collection.md#get)

#### Defined in

[core/collection.ts:160](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L160)

___

### getById

▸ **getById**<`K`\>(`id`, `opt_attribute?`): [`BaseField`](BaseField.md)<`HTMLInputElement`\> \| `K`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`Id`](../modules.md#id) |
| `opt_attribute?` | `string` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\> \| `K`

#### Inherited from

[Collection](Collection.md).[getById](Collection.md#getbyid)

#### Defined in

[core/collection.ts:179](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L179)

___

### getItems

▸ **getItems**(): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[getItems](Collection.md#getitems)

#### Defined in

[core/collection.ts:121](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L121)

___

### getModel

▸ **getModel**(): [`Objekt`](Objekt.md)

#### Returns

[`Objekt`](Objekt.md)

#### Defined in

[component/form.ts:176](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L176)

___

### isInvalid

▸ **isInvalid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[component/form.ts:278](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L278)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[component/form.ts:272](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L272)

___

### iterator

▸ **iterator**(`callback`, `next`, `opt_items?`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`_item`: [`BaseField`](BaseField.md)<`HTMLInputElement`\>) => `any` |
| `next` | (`_item`: [`BaseField`](BaseField.md)<`HTMLInputElement`\>, `_index`: `number`) => `any` |
| `opt_items?` | [`BaseField`](BaseField.md)<`HTMLInputElement`\>[] |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[iterator](Collection.md#iterator)

#### Defined in

[core/collection.ts:130](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L130)

___

### limit

▸ **limit**(`offset`, `opt_count?`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `offset` | `number` | `undefined` |
| `opt_count` | `number` | `10` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[limit](Collection.md#limit)

#### Defined in

[core/collection.ts:320](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L320)

___

### load

▸ **load**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`BaseField`](BaseField.md)<`HTMLInputElement`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[load](Collection.md#load)

#### Defined in

[core/collection.ts:52](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L52)

___

### lock

▸ **lock**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:309](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L309)

___

### pluck

▸ **pluck**(`attribute`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>[]

#### Inherited from

[Collection](Collection.md).[pluck](Collection.md#pluck)

#### Defined in

[core/collection.ts:327](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L327)

___

### push

▸ **push**(`object`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[push](Collection.md#push)

#### Defined in

[core/collection.ts:69](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L69)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:284](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L284)

___

### reload

▸ **reload**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | (`Object` \| [`BaseField`](BaseField.md)<`HTMLInputElement`\>)[] |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[reload](Collection.md#reload)

#### Defined in

[core/collection.ts:61](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L61)

___

### replace

▸ **replace**(`object`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` \| [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[replace](Collection.md#replace)

#### Defined in

[core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L106)

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

[component/form.ts:184](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L184)

___

### set

▸ **set**(`index`, `object`): [`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `object` | `Object` \| [`BaseField`](BaseField.md)<`HTMLInputElement`\> |

#### Returns

[`BaseField`](BaseField.md)<`HTMLInputElement`\>

#### Inherited from

[Collection](Collection.md).[set](Collection.md#set)

#### Defined in

[core/collection.ts:93](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L93)

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

[component/form.ts:247](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L247)

___

### setModel

▸ **setModel**(`model`, `opt_force?`, `opt_showMessage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `model` | [`Objekt`](Objekt.md) | `undefined` |
| `opt_force` | `boolean` | `true` |
| `opt_showMessage` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[component/form.ts:157](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L157)

___

### size

▸ **size**(): `number`

#### Returns

`number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[core/collection.ts:312](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/collection.ts#L312)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[component/form.ts:320](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/component/form.ts#L320)
