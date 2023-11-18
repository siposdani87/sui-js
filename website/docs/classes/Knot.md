---
id: "Knot"
title: "Class: Knot<T>"
sidebar_label: "Knot"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

## Constructors

### constructor

• **new Knot**\<`T`\>(`node`, `opt_parentKnot?`): [`Knot`](Knot.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` \| `HTMLElement` \| `T` |
| `opt_parentKnot?` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

[`Knot`](Knot.md)\<`T`\>

#### Defined in

[core/knot.ts:23](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L23)

## Properties

### listenerStoreKey

• **listenerStoreKey**: `string`

#### Defined in

[core/knot.ts:21](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L21)

___

### node

• **node**: `T`

#### Defined in

[core/knot.ts:19](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L19)

___

### parentKnot

• **parentKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[core/knot.ts:20](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L20)

## Methods

### \_addListenerToStore

▸ **_addListenerToStore**(`eventName`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Function` |

#### Returns

`void`

#### Defined in

[core/knot.ts:205](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L205)

___

### \_getListenersFromStore

▸ **_getListenersFromStore**(`eventName`): [`Listener`](../modules.md#listener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |

#### Returns

[`Listener`](../modules.md#listener)[]

#### Defined in

[core/knot.ts:215](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L215)

___

### \_getParentElement

▸ **_getParentElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[core/knot.ts:405](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L405)

___

### \_handleClassList

▸ **_handleClassList**(`cssClasses`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cssClasses` | `string` \| `string`[] |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

[core/knot.ts:98](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L98)

___

### addClass

▸ **addClass**(`cssClasses`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cssClasses` | `string` \| `string`[] |

#### Returns

`void`

#### Defined in

[core/knot.ts:111](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L111)

___

### addEventListener

▸ **addEventListener**(`eventName`, `opt_callback?`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `opt_callback?` | (`knot`: [`Knot`](Knot.md)\<`T`\>, `event`: `any`) => `any` |

#### Returns

`Function`

#### Defined in

[core/knot.ts:187](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L187)

___

### afterChild

▸ **afterChild**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:304](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L304)

___

### appendChild

▸ **appendChild**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/knot.ts:256](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L256)

___

### beforeChild

▸ **beforeChild**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:292](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L292)

___

### createElement

▸ **createElement**\<`K`\>(`tagName`): [`Knot`](Knot.md)\<`K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagName` | `string` |

#### Returns

[`Knot`](Knot.md)\<`K`\>

#### Defined in

[core/knot.ts:249](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L249)

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

[core/knot.ts:239](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L239)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:438](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L438)

___

### get

▸ **get**(`attribute`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`any`

#### Defined in

[core/knot.ts:59](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L59)

___

### getAttribute

▸ **getAttribute**(`attribute`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`any`

#### Defined in

[core/knot.ts:167](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L167)

___

### getClasses

▸ **getClasses**(): `string`[]

#### Returns

`string`[]

#### Defined in

[core/knot.ts:131](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L131)

___

### getComputedStyle

▸ **getComputedStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:414](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L414)

___

### getData

▸ **getData**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[core/knot.ts:379](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L379)

___

### getFor

▸ **getFor**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:87](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L87)

___

### getHtml

▸ **getHtml**(`opt_isInner?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_isInner` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[core/knot.ts:354](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L354)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:74](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L74)

___

### getNextSibling

▸ **getNextSibling**(): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[core/knot.ts:344](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L344)

___

### getNode

▸ **getNode**(): `T`

#### Returns

`T`

#### Defined in

[core/knot.ts:66](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L66)

___

### getParentKnot

▸ **getParentKnot**(): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[core/knot.ts:397](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L397)

___

### getStyle

▸ **getStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:418](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L418)

___

### getTagName

▸ **getTagName**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:70](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L70)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:365](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L365)

___

### hasAttribute

▸ **hasAttribute**(`attribute`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:183](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L183)

___

### hasChildren

▸ **hasChildren**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:266](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L266)

___

### hasClass

▸ **hasClass**(`cssClass`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cssClass` | `string` |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:94](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L94)

___

### insert

▸ **insert**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/knot.ts:287](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L287)

___

### insertAfter

▸ **insertAfter**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:322](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L322)

___

### insertBefore

▸ **insertBefore**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:313](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L313)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:434](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L434)

___

### merge

▸ **merge**(`properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |

#### Returns

`void`

#### Defined in

[core/knot.ts:53](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L53)

___

### remove

▸ **remove**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:280](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L280)

___

### removeAttribute

▸ **removeAttribute**(`attribute`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`void`

#### Defined in

[core/knot.ts:179](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L179)

___

### removeChild

▸ **removeChild**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/knot.ts:270](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L270)

___

### removeChildren

▸ **removeChildren**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:260](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L260)

___

### removeClass

▸ **removeClass**(`cssClasses`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cssClasses` | `string` \| `string`[] |

#### Returns

`void`

#### Defined in

[core/knot.ts:119](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L119)

___

### removeData

▸ **removeData**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[core/knot.ts:390](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L390)

___

### removeEventListener

▸ **removeEventListener**(`eventName`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | keyof `GlobalEventHandlersEventMap` |
| `listener` | [`Listener`](../modules.md#listener) |

#### Returns

`void`

#### Defined in

[core/knot.ts:225](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L225)

___

### removeEventListeners

▸ **removeEventListeners**(`eventName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | keyof `GlobalEventHandlersEventMap` |

#### Returns

`void`

#### Defined in

[core/knot.ts:232](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L232)

___

### removeStyle

▸ **removeStyle**(`properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `any`[] |

#### Returns

`void`

#### Defined in

[core/knot.ts:428](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L428)

___

### replaceChild

▸ **replaceChild**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:335](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L335)

___

### set

▸ **set**(`attribute`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `value` | `string` \| `number` \| `boolean` |

#### Returns

`void`

#### Defined in

[core/knot.ts:45](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L45)

___

### setAttribute

▸ **setAttribute**(`attribute`, `opt_value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `opt_value?` | `string` \| `number` \| `boolean` \| `Object` \| `Function` \| `any`[] |

#### Returns

`void`

#### Defined in

[core/knot.ts:135](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L135)

___

### setData

▸ **setData**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[core/knot.ts:369](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L369)

___

### setFor

▸ **setFor**(`htmlFor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `htmlFor` | `string` \| `number` \| `boolean` |

#### Returns

`void`

#### Defined in

[core/knot.ts:82](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L82)

___

### setHtml

▸ **setHtml**(`text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Defined in

[core/knot.ts:350](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L350)

___

### setId

▸ **setId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` \| `boolean` |

#### Returns

`void`

#### Defined in

[core/knot.ts:78](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L78)

___

### setParentKnot

▸ **setParentKnot**(`parentKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentKnot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/knot.ts:41](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L41)

___

### setStyle

▸ **setStyle**(`properties`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |

#### Returns

`void`

#### Defined in

[core/knot.ts:422](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L422)

___

### setText

▸ **setText**(`text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Defined in

[core/knot.ts:361](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L361)

___

### toString

▸ **toString**(`opt_isRoot?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_isRoot` | `boolean` | `true` |

#### Returns

`string`

#### Defined in

[core/knot.ts:442](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L442)

___

### toggleClass

▸ **toggleClass**(`cssClasses`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cssClasses` | `string` \| `string`[] |

#### Returns

`void`

#### Defined in

[core/knot.ts:125](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L125)

___

### trigger

▸ **trigger**(`eventName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |

#### Returns

`void`

#### Defined in

[core/knot.ts:243](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/core/knot.ts#L243)
