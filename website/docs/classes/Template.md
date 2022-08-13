---
id: "Template"
title: "Class: Template"
sidebar_label: "Template"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Template**(`http`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | [`Http`](Http.md) |
| `opt_options` | `Object` |

#### Defined in

[module/template.ts:20](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-20)

## Properties

### http

• **http**: [`Http`](Http.md)

#### Defined in

[module/template.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-13)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/template.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-14)

___

### viewNode

• **viewNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/template.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-15)

## Methods

### \_handleData

▸ `Private` **_handleData**(`data`, `error`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Item`](Item.md)<`HTMLElement`\> |
| `error` | `boolean` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/template.ts:88](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-88)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/template.ts:43](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-43)

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

[module/template.ts:31](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-31)

___

### eventError

▸ **eventError**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Object` |

#### Returns

`void`

#### Defined in

[module/template.ts:106](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-106)

___

### getViewNode

▸ **getViewNode**(): [`Item`](Item.md)<`HTMLElement`\>

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/template.ts:49](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-49)

___

### load

▸ **load**(`url`, `opt_force?`): [`Promize`](Promize.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `opt_force` | `boolean` | `false` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/template.ts:57](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/template.ts#lines-57)
