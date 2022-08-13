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

[component/cardCollection.ts:33](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-33)

## Properties

### body

• **body**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:22](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-22)

___

### cardCollectionNode

• **cardCollectionNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-15)

___

### cardFooterNode

• **cardFooterNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:23](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-23)

___

### cardTemplate

• **cardTemplate**: [`Item`](Item.md)<`HTMLTemplateElement`\>

#### Defined in

[component/cardCollection.ts:25](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-25)

___

### collection

• **collection**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)\>

#### Defined in

[component/cardCollection.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-18)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/cardCollection.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-21)

___

### ctrl

• **ctrl**: `any`

#### Defined in

[component/cardCollection.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-16)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/cardCollection.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-17)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/cardCollection.ts:20](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-20)

___

### pagerNode

• **pagerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:24](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-24)

___

### query

• **query**: `string`

#### Defined in

[component/cardCollection.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-19)

___

### template

• **template**: `string`

#### Defined in

[component/cardCollection.ts:26](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-26)

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

[component/cardCollection.ts:208](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-208)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:253](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-253)

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

[component/cardCollection.ts:134](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-134)

___

### \_getItems

▸ `Private` **_getItems**(): `any`[]

#### Returns

`any`[]

#### Defined in

[component/cardCollection.ts:239](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-239)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:69](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-69)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:88](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-88)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:98](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-98)

___

### \_initTemplate

▸ `Private` **_initTemplate**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:121](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-121)

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

[component/cardCollection.ts:49](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-49)

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

[component/cardCollection.ts:192](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-192)

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

[component/cardCollection.ts:200](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-200)

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

[component/cardCollection.ts:175](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-175)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:263](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-263)

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

[component/cardCollection.ts:231](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-231)

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

[component/cardCollection.ts:218](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/component/cardCollection.ts#lines-218)
