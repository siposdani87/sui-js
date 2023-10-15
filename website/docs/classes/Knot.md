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

[core/knot.ts:23](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L23)

## Properties

### listenerStoreKey

• **listenerStoreKey**: `string`

#### Defined in

[core/knot.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L21)

___

### node

• **node**: `T`

#### Defined in

[core/knot.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L19)

___

### parentKnot

• **parentKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:20](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L20)

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

[core/knot.ts:201](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L201)

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

[core/knot.ts:211](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L211)

___

### \_getParentElement

▸ `Private` **_getParentElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[core/knot.ts:401](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L401)

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

[core/knot.ts:94](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L94)

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

[core/knot.ts:107](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L107)

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

[core/knot.ts:183](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L183)

___

### afterChild

▸ **afterChild**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:300](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L300)

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

[core/knot.ts:252](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L252)

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

[core/knot.ts:288](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L288)

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

[core/knot.ts:245](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L245)

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

[core/knot.ts:235](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L235)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:434](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L434)

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

[core/knot.ts:55](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L55)

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

[core/knot.ts:163](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L163)

___

### getClasses

▸ **getClasses**(): `string`[]

#### Returns

`string`[]

#### Defined in

[core/knot.ts:127](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L127)

___

### getComputedStyle

▸ **getComputedStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:410](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L410)

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

[core/knot.ts:375](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L375)

___

### getFor

▸ **getFor**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:83](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L83)

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

[core/knot.ts:350](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L350)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:70](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L70)

___

### getNextSibling

▸ **getNextSibling**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:340](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L340)

___

### getNode

▸ **getNode**(): `T`

#### Returns

`T`

#### Defined in

[core/knot.ts:62](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L62)

___

### getParentKnot

▸ **getParentKnot**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:393](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L393)

___

### getStyle

▸ **getStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:414](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L414)

___

### getTagName

▸ **getTagName**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:66](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L66)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:361](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L361)

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

[core/knot.ts:179](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L179)

___

### hasChildren

▸ **hasChildren**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:262](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L262)

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

[core/knot.ts:90](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L90)

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

[core/knot.ts:283](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L283)

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

[core/knot.ts:318](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L318)

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

[core/knot.ts:309](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L309)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:430](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L430)

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

[core/knot.ts:49](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L49)

___

### remove

▸ **remove**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:276](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L276)

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

[core/knot.ts:175](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L175)

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

[core/knot.ts:266](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L266)

___

### removeChildren

▸ **removeChildren**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:256](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L256)

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

[core/knot.ts:115](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L115)

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

[core/knot.ts:386](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L386)

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

[core/knot.ts:221](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L221)

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

[core/knot.ts:228](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L228)

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

[core/knot.ts:424](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L424)

___

### replaceChild

▸ **replaceChild**(`knot`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/knot.ts:331](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L331)

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

[core/knot.ts:41](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L41)

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

[core/knot.ts:131](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L131)

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

[core/knot.ts:365](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L365)

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

[core/knot.ts:78](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L78)

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

[core/knot.ts:346](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L346)

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

[core/knot.ts:74](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L74)

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

[core/knot.ts:418](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L418)

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

[core/knot.ts:357](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L357)

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

[core/knot.ts:438](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L438)

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

[core/knot.ts:121](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L121)

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

[core/knot.ts:239](https://github.com/siposdani87/sui-js/blob/ad456a5/src/core/knot.ts#L239)
