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

[module/template.ts:20](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L20)

## Properties

### http

• **http**: [`Http`](Http.md)

#### Defined in

[module/template.ts:13](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L13)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/template.ts:14](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L14)

___

### viewKnot

• **viewKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/template.ts:15](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L15)

## Methods

### \_handleData

▸ `Private` **_handleData**(`data`, `error`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `error` | `boolean` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/template.ts:88](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L88)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/template.ts:43](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L43)

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

[module/template.ts:31](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L31)

___

### eventError

▸ **eventError**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Object` |
| `message.content` | `string` |
| `message.type` | `string` |

#### Returns

`void`

#### Defined in

[module/template.ts:106](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L106)

___

### getViewKnot

▸ **getViewKnot**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/template.ts:49](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L49)

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

[module/template.ts:57](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/template.ts#L57)
