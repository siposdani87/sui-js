---
id: "Item"
title: "Class: Item<T>"
sidebar_label: "Item"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

## Constructors

### constructor

• **new Item**<`T`\>(`node`, `opt_parentNode?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` \| `HTMLElement` \| `T` |
| `opt_parentNode?` | [`Item`](Item.md)<`HTMLElement`\> |

#### Defined in

[core/item.ts:29](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L29)

## Properties

### listenerStoreKey

• **listenerStoreKey**: `string`

#### Defined in

[core/item.ts:24](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L24)

___

### node

• **node**: `T`

#### Defined in

[core/item.ts:22](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L22)

___

### parentNode

• **parentNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[core/item.ts:23](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L23)

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

[core/item.ts:261](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L261)

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

[core/item.ts:275](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L275)

___

### \_getParentElement

▸ `Private` **_getParentElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[core/item.ts:538](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L538)

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

[core/item.ts:131](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L131)

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

[core/item.ts:147](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L147)

___

### addEventListener

▸ **addEventListener**(`eventName`, `opt_callback?`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `opt_callback?` | `Function` |

#### Returns

`Function`

#### Defined in

[core/item.ts:241](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L241)

___

### afterChild

▸ **afterChild**(`node`): `boolean`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/item.ts:403](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L403)

___

### appendChild

▸ **appendChild**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/item.ts:336](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L336)

___

### beforeChild

▸ **beforeChild**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/item.ts:387](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L387)

___

### clearNode

▸ **clearNode**(): `void`

**`Deprecated`**

#### Returns

`void`

#### Defined in

[core/item.ts:614](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L614)

___

### cloneNode

▸ **cloneNode**(`opt_deep?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_deep` | `boolean` | `false` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[core/item.ts:603](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L603)

___

### createElement

▸ **createElement**<`K`\>(`tagName`): [`Item`](Item.md)<`K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagName` | `string` |

#### Returns

[`Item`](Item.md)<`K`\>

#### Defined in

[core/item.ts:326](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L326)

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

[core/item.ts:309](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L309)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/item.ts:585](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L585)

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

[core/item.ts:71](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L71)

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

[core/item.ts:211](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L211)

___

### getClasses

▸ **getClasses**(): `string`[]

#### Returns

`string`[]

#### Defined in

[core/item.ts:175](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L175)

___

### getComputedStyle

▸ **getComputedStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/item.ts:549](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L549)

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

[core/item.ts:508](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L508)

___

### getFor

▸ **getFor**(): `string`

#### Returns

`string`

#### Defined in

[core/item.ts:113](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L113)

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

[core/item.ts:471](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L471)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[core/item.ts:92](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L92)

___

### getNextSibling

▸ **getNextSibling**(): [`Item`](Item.md)<`HTMLElement`\>

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[core/item.ts:455](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L455)

___

### getNode

▸ **getNode**(): `T`

#### Returns

`T`

#### Defined in

[core/item.ts:80](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L80)

___

### getParentNode

▸ **getParentNode**(): [`Item`](Item.md)<`HTMLElement`\>

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[core/item.ts:528](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L528)

___

### getStyle

▸ **getStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/item.ts:555](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L555)

___

### getTagName

▸ **getTagName**(): `string`

#### Returns

`string`

#### Defined in

[core/item.ts:86](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L86)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[core/item.ts:487](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L487)

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

[core/item.ts:233](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L233)

___

### hasChildren

▸ **hasChildren**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/item.ts:350](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L350)

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

[core/item.ts:123](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L123)

___

### insert

▸ **insert**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/item.ts:379](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L379)

___

### insertAfter

▸ **insertAfter**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/item.ts:427](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L427)

___

### insertBefore

▸ **insertBefore**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/item.ts:415](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L415)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/item.ts:579](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L579)

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

[core/item.ts:62](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L62)

___

### remove

▸ **remove**(): `void`

#### Returns

`void`

#### Defined in

[core/item.ts:369](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L369)

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

[core/item.ts:226](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L226)

___

### removeChild

▸ **removeChild**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[core/item.ts:357](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L357)

___

### removeChildren

▸ **removeChildren**(): `void`

#### Returns

`void`

#### Defined in

[core/item.ts:342](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L342)

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

[core/item.ts:158](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L158)

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

[core/item.ts:519](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L519)

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

[core/item.ts:289](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L289)

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

[core/item.ts:299](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L299)

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

[core/item.ts:571](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L571)

___

### replaceChild

▸ **replaceChild**(`node`): `boolean`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

[core/item.ts:444](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L444)

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

[core/item.ts:51](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L51)

___

### setAttribute

▸ **setAttribute**(`attribute`, `opt_value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |
| `opt_value?` | `string` \| `number` \| `boolean` \| `object` \| `Function` \| `any`[] |

#### Returns

`void`

#### Defined in

[core/item.ts:183](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L183)

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

[core/item.ts:495](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L495)

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

[core/item.ts:106](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L106)

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

[core/item.ts:464](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L464)

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

[core/item.ts:99](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L99)

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

[core/item.ts:562](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L562)

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

[core/item.ts:481](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L481)

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

[core/item.ts:593](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L593)

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

[core/item.ts:167](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L167)

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

[core/item.ts:316](https://github.com/siposdani87/sui-js/blob/035cd52/src/core/item.ts#L316)
