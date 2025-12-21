# Class: Form

Defined in: [component/form.ts:10](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L10)

## Extends

- [`Collection`](Collection.md)\<[`BaseField`](BaseField.md)\<`HTMLInputElement`\>\>

## Constructors

### Constructor

> **new Form**(`dom`, `opt_selector`): `Form`

Defined in: [component/form.ts:18](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L18)

#### Parameters

##### dom

[`Knot`](Knot.md)

##### opt\_selector

`string` = `'form'`

#### Returns

`Form`

#### Overrides

[`Collection`](Collection.md).[`constructor`](Collection.md#constructor)

## Properties

### buttonClasses

> **buttonClasses**: `string`[]

Defined in: [component/form.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L15)

***

### fieldClasses

> **fieldClasses**: `string`[]

Defined in: [component/form.ts:16](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L16)

***

### formKnot

> **formKnot**: [`Knot`](Knot.md)\<`HTMLFormElement`\>

Defined in: [component/form.ts:11](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L11)

***

### initFields

> **initFields**: `string`[]

Defined in: [component/form.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L14)

***

### items

> **items**: [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:14](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L14)

#### Inherited from

[`Collection`](Collection.md).[`items`](Collection.md#items)

***

### model

> **model**: [`Objekt`](Objekt.md)

Defined in: [component/form.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L13)

***

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/collection.ts:15](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L15)

#### Inherited from

[`Collection`](Collection.md).[`options`](Collection.md#options)

***

### previousModel

> **previousModel**: [`Objekt`](Objekt.md)

Defined in: [component/form.ts:12](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L12)

***

### Type

> **Type**: `any`

Defined in: [core/collection.ts:13](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L13)

#### Inherited from

[`Collection`](Collection.md).[`Type`](Collection.md#type)

## Methods

### checkValidity()

> **checkValidity**(`opt_force`, `opt_showMessage`): `boolean`

Defined in: [component/form.ts:202](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L202)

#### Parameters

##### opt\_force

`boolean` = `false`

##### opt\_showMessage

`boolean` = `true`

#### Returns

`boolean`

***

### clear()

> **clear**(): `void`

Defined in: [core/collection.ts:134](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L134)

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`clear`](Collection.md#clear)

***

### delete()

> **delete**(`value`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:172](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L172)

#### Parameters

##### value

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`delete`](Collection.md#delete)

***

### deleteAllBy()

> **deleteAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:198](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L198)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[`Collection`](Collection.md).[`deleteAllBy`](Collection.md#deleteallby)

***

### deleteAllByCondition()

> **deleteAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:204](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L204)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[`Collection`](Collection.md).[`deleteAllByCondition`](Collection.md#deleteallbycondition)

***

### deleteBy()

> **deleteBy**(`attribute`, `value`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:182](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L182)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`deleteBy`](Collection.md#deleteby)

***

### deleteByCondition()

> **deleteByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:188](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L188)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`deleteByCondition`](Collection.md#deletebycondition)

***

### deleteById()

> **deleteById**(`id`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:178](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L178)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`deleteById`](Collection.md#deletebyid)

***

### each()

> **each**(`next`): `void`

Defined in: [core/collection.ts:106](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L106)

#### Parameters

##### next

(`_item`, `_index`) => `void`

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`each`](Collection.md#each)

***

### eventButton()

> **eventButton**(`model`, `knot`): `void`

Defined in: [component/form.ts:263](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L263)

#### Parameters

##### model

[`Objekt`](Objekt.md)

##### knot

[`Knot`](Knot.md)

#### Returns

`void`

***

### eventReset()

> **eventReset**(`model`, `knot`): `void`

Defined in: [component/form.ts:259](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L259)

#### Parameters

##### model

[`Objekt`](Objekt.md)

##### knot

[`Knot`](Knot.md)

#### Returns

`void`

***

### eventSubmit()

> **eventSubmit**(`model`, `knot`): `void`

Defined in: [component/form.ts:255](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L255)

#### Parameters

##### model

[`Objekt`](Objekt.md)

##### knot

[`Knot`](Knot.md)

#### Returns

`void`

***

### findAllBy()

> **findAllBy**(`attribute`, `value`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:156](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L156)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[`Collection`](Collection.md).[`findAllBy`](Collection.md#findallby)

***

### findAllByCondition()

> **findAllByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:162](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L162)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[`Collection`](Collection.md).[`findAllByCondition`](Collection.md#findallbycondition)

***

### findBy()

> **findBy**(`attribute`, `value`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:142](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L142)

#### Parameters

##### attribute

`string`

##### value

`any`

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`findBy`](Collection.md#findby)

***

### findByCondition()

> **findByCondition**(`conditionCallback`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:148](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L148)

#### Parameters

##### conditionCallback

`Function`

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`findByCondition`](Collection.md#findbycondition)

***

### findById()

> **findById**(`id`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:138](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L138)

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`findById`](Collection.md#findbyid)

***

### findByModel()

> **findByModel**\<`T`\>(`name`): `T`

Defined in: [component/form.ts:234](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L234)

#### Type Parameters

##### T

`T` = [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

##### name

`string`

#### Returns

`T`

***

### get()

> **get**\<`K`\>(`index`, `opt_attribute?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

Defined in: [core/collection.ts:112](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L112)

#### Type Parameters

##### K

`K` = [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

##### index

`number`

##### opt\_attribute?

`string`

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

#### Inherited from

[`Collection`](Collection.md).[`get`](Collection.md#get)

***

### getById()

> **getById**\<`K`\>(`id`, `opt_attribute?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

Defined in: [core/collection.ts:126](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L126)

#### Type Parameters

##### K

`K` = [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Parameters

##### id

[`Id`](../type-aliases/Id.md)

##### opt\_attribute?

`string`

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\> \| `K`

#### Inherited from

[`Collection`](Collection.md).[`getById`](Collection.md#getbyid)

***

### getItems()

> **getItems**(): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:86](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L86)

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[`Collection`](Collection.md).[`getItems`](Collection.md#getitems)

***

### getModel()

> **getModel**(): [`Objekt`](Objekt.md)

Defined in: [component/form.ts:147](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L147)

#### Returns

[`Objekt`](Objekt.md)

***

### isInvalid()

> **isInvalid**(): `boolean`

Defined in: [component/form.ts:216](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L216)

#### Returns

`boolean`

***

### isValid()

> **isValid**(): `boolean`

Defined in: [component/form.ts:212](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L212)

#### Returns

`boolean`

***

### iterator()

> **iterator**(`callback`, `next`, `opt_items?`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:90](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L90)

#### Parameters

##### callback

(`_item`) => `boolean`

##### next

(`_item`, `_index`) => `void`

##### opt\_items?

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[`Collection`](Collection.md).[`iterator`](Collection.md#iterator)

***

### limit()

> **limit**(`offset`, `opt_count`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

Defined in: [core/collection.ts:222](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L222)

#### Parameters

##### offset

`number`

##### opt\_count

`number` = `10`

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>[]

#### Inherited from

[`Collection`](Collection.md).[`limit`](Collection.md#limit)

***

### load()

> **load**(`objects`): `void`

Defined in: [core/collection.ts:36](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L36)

#### Parameters

##### objects

(`object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\>)[]

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`load`](Collection.md#load)

***

### lock()

> **lock**(): `void`

Defined in: [component/form.ts:240](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L240)

#### Returns

`void`

***

### push()

> **push**(`object`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:47](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L47)

#### Parameters

##### object

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`push`](Collection.md#push)

***

### refresh()

> **refresh**(): `void`

Defined in: [component/form.ts:220](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L220)

#### Returns

`void`

***

### reload()

> **reload**(`objects`): `void`

Defined in: [core/collection.ts:42](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L42)

#### Parameters

##### objects

(`object` \| [`BaseField`](BaseField.md)\<`HTMLInputElement`\>)[]

#### Returns

`void`

#### Inherited from

[`Collection`](Collection.md).[`reload`](Collection.md#reload)

***

### replace()

> **replace**(`object`): [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

Defined in: [core/collection.ts:73](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L73)

#### Parameters

##### object

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Inherited from

[`Collection`](Collection.md).[`replace`](Collection.md#replace)

***

### reset()

> **reset**(`opt_force`, `opt_showMessage`): `void`

Defined in: [component/form.ts:151](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L151)

#### Parameters

##### opt\_force

`boolean` = `true`

##### opt\_showMessage

`boolean` = `false`

#### Returns

`void`

***

### set()

> **set**(`index`, `object`): [`BaseField`](BaseField.md)

Defined in: [core/collection.ts:63](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L63)

#### Parameters

##### index

`number`

##### object

`object` | [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

#### Returns

[`BaseField`](BaseField.md)

#### Inherited from

[`Collection`](Collection.md).[`set`](Collection.md#set)

***

### setErrors()

> **setErrors**(`data`): `void`

Defined in: [component/form.ts:193](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L193)

#### Parameters

##### data

`object`

#### Returns

`void`

***

### setModel()

> **setModel**(`model`, `opt_force`, `opt_showMessage`): `void`

Defined in: [component/form.ts:130](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L130)

#### Parameters

##### model

[`Objekt`](Objekt.md)

##### opt\_force

`boolean` = `true`

##### opt\_showMessage

`boolean` = `false`

#### Returns

`void`

***

### size()

> **size**(): `number`

Defined in: [core/collection.ts:218](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/core/collection.ts#L218)

#### Returns

`number`

#### Inherited from

[`Collection`](Collection.md).[`size`](Collection.md#size)

***

### unlock()

> **unlock**(): `void`

Defined in: [component/form.ts:249](https://github.com/siposdani87/sui-js/blob/7bd872c2a052d152dc5a61afbf927b99ed2e8480/src/component/form.ts#L249)

#### Returns

`void`
