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

• **new Knot**<`T`\>(`node`, `opt_parentKnot?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` \| `HTMLElement` \| `T` |
| `opt_parentKnot?` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Defined in

[core/knot.ts:30](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L30)

## Properties

### listenerStoreKey

• **listenerStoreKey**: `string`

#### Defined in

[core/knot.ts:25](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L25)

___

### node

• **node**: `T`

#### Defined in

[core/knot.ts:23](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L23)

___

### parentKnot

• **parentKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:24](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L24)

## Methods

### \_addListenerToStore

▸ `Private` **_addListenerToStore**(`eventName`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | `Function` |

#### Returns

`void`

#### Defined in

[core/knot.ts:272](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L272)

___

### \_getListenersFromStore

▸ `Private` **_getListenersFromStore**(`eventName`): [`Listener`](../modules.md#listener)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |

#### Returns

[`Listener`](../modules.md#listener)[]

#### Defined in

[core/knot.ts:286](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L286)

___

### \_getParentElement

▸ `Private` **_getParentElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[core/knot.ts:552](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L552)

___

### \_handleClassList

▸ `Private` **_handleClassList**(`cssClasses`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cssClasses` | `string` \| `string`[] |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

[core/knot.ts:132](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L132)

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

[core/knot.ts:148](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L148)

___

### addEventListener

▸ **addEventListener**(`eventName`, `opt_callback?`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `opt_callback?` | (`knot`: [`Knot`](Knot.md)<`T`\>, `event`: `any`) => `any` |

#### Returns

`Function`

#### Defined in

[core/knot.ts:249](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L249)

___

### afterChild

▸ **afterChild**(`knot`): `boolean`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:414](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L414)

___

### appendChild

▸ **appendChild**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/knot.ts:347](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L347)

___

### beforeChild

▸ **beforeChild**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:398](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L398)

___

### createElement

▸ **createElement**<`K`\>(`tagName`): [`Knot`](Knot.md)<`K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagName` | `string` |

#### Returns

[`Knot`](Knot.md)<`K`\>

#### Defined in

[core/knot.ts:337](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L337)

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

[core/knot.ts:320](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L320)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:599](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L599)

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

[core/knot.ts:72](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L72)

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

[core/knot.ts:219](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L219)

___

### getClasses

▸ **getClasses**(): `string`[]

#### Returns

`string`[]

#### Defined in

[core/knot.ts:176](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L176)

___

### getComputedStyle

▸ **getComputedStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:563](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L563)

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

[core/knot.ts:519](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L519)

___

### getFor

▸ **getFor**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:114](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L114)

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

[core/knot.ts:482](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L482)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:93](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L93)

___

### getNextSibling

▸ **getNextSibling**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:466](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L466)

___

### getNode

▸ **getNode**(): `T`

#### Returns

`T`

#### Defined in

[core/knot.ts:81](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L81)

___

### getParentKnot

▸ **getParentKnot**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:542](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L542)

___

### getStyle

▸ **getStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:569](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L569)

___

### getTagName

▸ **getTagName**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:87](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L87)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:498](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L498)

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

[core/knot.ts:241](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L241)

___

### hasChildren

▸ **hasChildren**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:361](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L361)

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

[core/knot.ts:124](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L124)

___

### insert

▸ **insert**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/knot.ts:390](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L390)

___

### insertAfter

▸ **insertAfter**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:438](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L438)

___

### insertBefore

▸ **insertBefore**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:426](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L426)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:593](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L593)

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

[core/knot.ts:63](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L63)

___

### remove

▸ **remove**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:380](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L380)

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

[core/knot.ts:234](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L234)

___

### removeChild

▸ **removeChild**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/knot.ts:368](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L368)

___

### removeChildren

▸ **removeChildren**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:353](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L353)

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

[core/knot.ts:159](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L159)

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

[core/knot.ts:533](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L533)

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

[core/knot.ts:300](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L300)

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

[core/knot.ts:310](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L310)

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

[core/knot.ts:585](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L585)

___

### replaceChild

▸ **replaceChild**(`knot`): `boolean`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:455](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L455)

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

[core/knot.ts:52](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L52)

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

[core/knot.ts:184](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L184)

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

[core/knot.ts:506](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L506)

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

[core/knot.ts:107](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L107)

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

[core/knot.ts:475](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L475)

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

[core/knot.ts:100](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L100)

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

[core/knot.ts:576](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L576)

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

[core/knot.ts:492](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L492)

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

[core/knot.ts:607](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L607)

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

[core/knot.ts:168](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L168)

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

[core/knot.ts:327](https://github.com/siposdani87/sui-js/blob/4b75724/src/core/knot.ts#L327)
