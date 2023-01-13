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

[core/knot.ts:29](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L29)

## Properties

### listenerStoreKey

• **listenerStoreKey**: `string`

#### Defined in

[core/knot.ts:24](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L24)

___

### node

• **node**: `T`

#### Defined in

[core/knot.ts:22](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L22)

___

### parentKnot

• **parentKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:23](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L23)

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

[core/knot.ts:271](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L271)

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

[core/knot.ts:285](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L285)

___

### \_getParentElement

▸ `Private` **_getParentElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[core/knot.ts:551](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L551)

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

[core/knot.ts:131](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L131)

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

[core/knot.ts:147](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L147)

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

[core/knot.ts:248](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L248)

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

[core/knot.ts:413](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L413)

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

[core/knot.ts:346](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L346)

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

[core/knot.ts:397](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L397)

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

[core/knot.ts:336](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L336)

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

[core/knot.ts:319](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L319)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:598](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L598)

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

[core/knot.ts:71](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L71)

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

[core/knot.ts:218](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L218)

___

### getClasses

▸ **getClasses**(): `string`[]

#### Returns

`string`[]

#### Defined in

[core/knot.ts:175](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L175)

___

### getComputedStyle

▸ **getComputedStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:562](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L562)

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

[core/knot.ts:518](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L518)

___

### getFor

▸ **getFor**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:113](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L113)

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

[core/knot.ts:481](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L481)

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:92](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L92)

___

### getNextSibling

▸ **getNextSibling**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:465](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L465)

___

### getNode

▸ **getNode**(): `T`

#### Returns

`T`

#### Defined in

[core/knot.ts:80](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L80)

___

### getParentKnot

▸ **getParentKnot**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[core/knot.ts:541](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L541)

___

### getStyle

▸ **getStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

[core/knot.ts:568](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L568)

___

### getTagName

▸ **getTagName**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:86](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L86)

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

[core/knot.ts:497](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L497)

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

[core/knot.ts:240](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L240)

___

### hasChildren

▸ **hasChildren**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:360](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L360)

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

[core/knot.ts:123](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L123)

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

[core/knot.ts:389](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L389)

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

[core/knot.ts:437](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L437)

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

[core/knot.ts:425](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L425)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/knot.ts:592](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L592)

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

[core/knot.ts:62](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L62)

___

### remove

▸ **remove**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:379](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L379)

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

[core/knot.ts:233](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L233)

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

[core/knot.ts:367](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L367)

___

### removeChildren

▸ **removeChildren**(): `void`

#### Returns

`void`

#### Defined in

[core/knot.ts:352](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L352)

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

[core/knot.ts:158](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L158)

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

[core/knot.ts:532](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L532)

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

[core/knot.ts:299](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L299)

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

[core/knot.ts:309](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L309)

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

[core/knot.ts:584](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L584)

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

[core/knot.ts:454](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L454)

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

[core/knot.ts:51](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L51)

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

[core/knot.ts:183](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L183)

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

[core/knot.ts:505](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L505)

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

[core/knot.ts:106](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L106)

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

[core/knot.ts:474](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L474)

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

[core/knot.ts:99](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L99)

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

[core/knot.ts:575](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L575)

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

[core/knot.ts:491](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L491)

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

[core/knot.ts:606](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L606)

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

[core/knot.ts:167](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L167)

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

[core/knot.ts:326](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/core/knot.ts#L326)
