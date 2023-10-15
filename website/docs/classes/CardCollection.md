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
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.card-collection'` |
| `opt_ctrl` | `object` | `null` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/cardCollection.ts:25](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L25)

## Properties

### body

• **body**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L19)

___

### cardCollectionKnot

• **cardCollectionKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L12)

___

### cardFooterKnot

• **cardFooterKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:20](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L20)

___

### cardTemplate

• **cardTemplate**: [`Knot`](Knot.md)<`HTMLTemplateElement`\>

#### Defined in

[component/cardCollection.ts:22](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L22)

___

### collection

• **collection**: [`Collection`](Collection.md)<[`Objekt`](Objekt.md)<`Object`\>\>

#### Defined in

[component/cardCollection.ts:15](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L15)

___

### contentHandler

• **contentHandler**: [`ContentHandler`](ContentHandler.md)

#### Defined in

[component/cardCollection.ts:18](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L18)

___

### ctrl

• **ctrl**: `any`

#### Defined in

[component/cardCollection.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L13)

___

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[component/cardCollection.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L14)

___

### pager

• **pager**: [`Pager`](Pager.md)

#### Defined in

[component/cardCollection.ts:17](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L17)

___

### pagerKnot

• **pagerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L21)

___

### query

• **query**: `string`

#### Defined in

[component/cardCollection.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L16)

___

### template

• **template**: `string`

#### Defined in

[component/cardCollection.ts:23](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L23)

## Methods

### \_addCard

▸ `Private` **_addCard**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:165](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L165)

___

### \_draw

▸ `Private` **_draw**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:198](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L198)

___

### \_getCardKnot

▸ `Private` **_getCardKnot**(`item`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/cardCollection.ts:105](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L105)

___

### \_getItems

▸ `Private` **_getItems**(): `any`[]

#### Returns

`any`[]

#### Defined in

[component/cardCollection.ts:187](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L187)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:53](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L53)

___

### \_initContentHandler

▸ `Private` **_initContentHandler**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:69](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L69)

___

### \_initStructure

▸ `Private` **_initStructure**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:76](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L76)

___

### \_initTemplate

▸ `Private` **_initTemplate**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:96](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L96)

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

[component/cardCollection.ts:37](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L37)

___

### eventAction

▸ **eventAction**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:157](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L157)

___

### eventCardKnot

▸ **eventCardKnot**(`cardKnot`, `item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cardKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `item` | [`Objekt`](Objekt.md)<`Object`\> |

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:161](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L161)

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

[component/cardCollection.ts:143](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L143)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[component/cardCollection.ts:206](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L206)

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

[component/cardCollection.ts:182](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L182)

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

[component/cardCollection.ts:172](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/cardCollection.ts#L172)
