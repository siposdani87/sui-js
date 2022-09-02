---
id: "CardCollection"
title: "Class: CardCollection"
sidebar_label: "CardCollection"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CardCollection**(`dom`, `opt_selector?`, `opt_ctrl?`, `opt_options?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.card-collection'` |
| `opt_ctrl` | `object` | `null` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/cardCollection.ts:33](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L33)

## Properties

### body

• **body**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:22](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L22)

___

### cardCollectionNode

• **cardCollectionNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:15](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L15)

___

### cardFooterNode

• **cardFooterNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:23](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L23)

___

### cardTemplate

• **cardTemplate**: [`Item`](Item.md)<`HTMLTemplateElement`\>

#### Defined in

[component/cardCollection.ts:25](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L25)

___

### collection

• **collection**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/cardCollection.ts:18](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L18)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/cardCollection.ts:21](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L21)

___

### ctrl

• **ctrl**: `any`

#### Defined in

[component/cardCollection.ts:16](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L16)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/cardCollection.ts:17](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L17)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/cardCollection.ts:20](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L20)

___

### pagerNode

• **pagerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:24](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L24)

___

### query

• **query**: `string`

#### Defined in

[component/cardCollection.ts:19](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L19)

___

### template

• **template**: `string`

#### Defined in

[component/cardCollection.ts:26](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L26)

## Methods

### \_addCard

▸ `Private` **_addCard**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:208](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L208)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:253](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L253)

___

### \_getCardNode

▸ `Private` **_getCardNode**(`item`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:134](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L134)

___

### \_getItems

▸ `Private` **_getItems**(): `any`[]

#### Returns

`any`[]

#### Defined in

[component/cardCollection.ts:239](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L239)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:69](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L69)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:88](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L88)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:98](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L98)

___

### \_initTemplate

▸ `Private` **_initTemplate**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:121](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L121)

___

### \_setOptions

▸ `Private` **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:49](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L49)

___

### eventAction

▸ **eventAction**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:192](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L192)

___

### eventCardNode

▸ **eventCardNode**(`cardNode`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cardNode` | [`Item`](Item.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md) |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:200](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L200)

___

### refresh

▸ **refresh**(`opt_page?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_page` | `number` | `-1` |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:175](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L175)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:263](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L263)

___

### setCount

▸ **setCount**(`count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:231](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L231)

___

### setData

▸ **setData**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:218](https://github.com/siposdani87/sui-js/blob/a88c06f/src/component/cardCollection.ts#L218)
