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
| `opt_options` | `Object` |

#### Returns

[`Template`](Template.md)

#### Defined in

[module/template.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L14)

## Properties

### http

• **http**: [`Http`](Http.md)

#### Defined in

[module/template.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L10)

___

### options

• **options**: [`Objekt`](Objekt.md)\<\{ `locale`: `string` ; `selector`: `string`  }\>

#### Defined in

[module/template.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L11)

___

### viewKnot

• **viewKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/template.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L12)

## Methods

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/template.ts:29](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L29)

___

### \_setOptions

▸ **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

[module/template.ts:21](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L21)

___

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

[module/template.ts:63](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L63)

___

### \_updateDOM

▸ **_updateDOM**(`knot`, `isError`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `isError` | `boolean` |

#### Returns

`void`

#### Defined in

[module/template.ts:84](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L84)

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

[module/template.ts:97](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L97)

___

### getViewKnot

▸ **getViewKnot**(): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/template.ts:33](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L33)

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

[module/template.ts:37](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/template.ts#L37)
