---
id: "Template"
title: "Class: Template"
sidebar_label: "Template"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Template**(`http`, `opt_options?`): [`Template`](Template.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | [`Http`](Http.md) |
| `opt_options` | `object` |

#### Returns

[`Template`](Template.md)

#### Defined in

[module/template.ts:14](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L14)

## Properties

### http

• **http**: [`Http`](Http.md)

#### Defined in

[module/template.ts:10](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L10)

___

### options

• **options**: [`Objekt`](Objekt.md)\<\{ `locale`: `string` ; `selector`: `string`  }\>

#### Defined in

[module/template.ts:11](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L11)

___

### viewKnot

• **viewKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/template.ts:12](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L12)

## Methods

### \_spaNavigate

▸ **_spaNavigate**(`data`, `isError`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `isError` | `boolean` |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/template.ts:63](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L63)

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

[module/template.ts:97](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L97)

___

### getViewKnot

▸ **getViewKnot**(): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/template.ts:33](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L33)

___

### load

▸ **load**(`url`, `opt_force?`): [`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `opt_force` | `boolean` | `false` |

#### Returns

[`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

#### Defined in

[module/template.ts:37](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/template.ts#L37)
