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

• **new Knot**<`T`\>(`node`, `opt_parentNode?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLElement` = `HTMLElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` \| `HTMLElement` \| `T` |
| `opt_parentNode?` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Defined in

core/knot.ts:29

## Properties

### listenerStoreKey

• **listenerStoreKey**: `string`

#### Defined in

core/knot.ts:24

___

### node

• **node**: `T`

#### Defined in

core/knot.ts:22

___

### parentNode

• **parentNode**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

core/knot.ts:23

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

core/knot.ts:268

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

core/knot.ts:282

___

### \_getParentElement

▸ `Private` **_getParentElement**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

core/knot.ts:548

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

core/knot.ts:131

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

core/knot.ts:147

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

core/knot.ts:248

___

### afterChild

▸ **afterChild**(`node`): `boolean`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

core/knot.ts:410

___

### appendChild

▸ **appendChild**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

core/knot.ts:343

___

### beforeChild

▸ **beforeChild**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

core/knot.ts:394

___

### clearNode

▸ **clearNode**(): `void`

**`Deprecated`**

#### Returns

`void`

#### Defined in

core/knot.ts:624

___

### cloneNode

▸ **cloneNode**(`opt_deep?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_deep` | `boolean` | `false` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

core/knot.ts:613

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

core/knot.ts:333

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

core/knot.ts:316

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

core/knot.ts:595

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

core/knot.ts:71

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

core/knot.ts:218

___

### getClasses

▸ **getClasses**(): `string`[]

#### Returns

`string`[]

#### Defined in

core/knot.ts:175

___

### getComputedStyle

▸ **getComputedStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

core/knot.ts:559

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

core/knot.ts:515

___

### getFor

▸ **getFor**(): `string`

#### Returns

`string`

#### Defined in

core/knot.ts:113

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

core/knot.ts:478

___

### getId

▸ **getId**(): `string`

#### Returns

`string`

#### Defined in

core/knot.ts:92

___

### getNextSibling

▸ **getNextSibling**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

core/knot.ts:462

___

### getNode

▸ **getNode**(): `T`

#### Returns

`T`

#### Defined in

core/knot.ts:80

___

### getParentNode

▸ **getParentNode**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

core/knot.ts:538

___

### getStyle

▸ **getStyle**(): `CSSStyleDeclaration`

#### Returns

`CSSStyleDeclaration`

#### Defined in

core/knot.ts:565

___

### getTagName

▸ **getTagName**(): `string`

#### Returns

`string`

#### Defined in

core/knot.ts:86

___

### getText

▸ **getText**(): `string`

#### Returns

`string`

#### Defined in

core/knot.ts:494

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

core/knot.ts:240

___

### hasChildren

▸ **hasChildren**(): `boolean`

#### Returns

`boolean`

#### Defined in

core/knot.ts:357

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

core/knot.ts:123

___

### insert

▸ **insert**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

core/knot.ts:386

___

### insertAfter

▸ **insertAfter**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

core/knot.ts:434

___

### insertBefore

▸ **insertBefore**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

core/knot.ts:422

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

core/knot.ts:589

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

core/knot.ts:62

___

### remove

▸ **remove**(): `void`

#### Returns

`void`

#### Defined in

core/knot.ts:376

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

core/knot.ts:233

___

### removeChild

▸ **removeChild**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

core/knot.ts:364

___

### removeChildren

▸ **removeChildren**(): `void`

#### Returns

`void`

#### Defined in

core/knot.ts:349

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

core/knot.ts:158

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

core/knot.ts:529

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

core/knot.ts:296

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

core/knot.ts:306

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

core/knot.ts:581

___

### replaceChild

▸ **replaceChild**(`node`): `boolean`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`boolean`

#### Defined in

core/knot.ts:451

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

core/knot.ts:51

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

core/knot.ts:183

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

core/knot.ts:502

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

core/knot.ts:106

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

core/knot.ts:471

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

core/knot.ts:99

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

core/knot.ts:572

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

core/knot.ts:488

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

core/knot.ts:603

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

core/knot.ts:167

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

core/knot.ts:323
