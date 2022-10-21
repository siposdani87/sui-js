---
id: "Page"
title: "Class: Page"
sidebar_label: "Page"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Page**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

module/page.ts:14

## Properties

### document

• **document**: `Document`

#### Defined in

module/page.ts:10

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

module/page.ts:9

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

module/page.ts:32

___

### \_setOptions

▸ `Private` **_setOptions**(`opt_options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

module/page.ts:23

___

### eventClick

▸ **eventClick**(`target`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/page.ts:51

___

### mailTo

▸ **mailTo**(`email`, `opt_subject?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `email` | `string` | `undefined` |
| `opt_subject` | `string` | `''` |

#### Returns

`void`

#### Defined in

module/page.ts:59

___

### setTitle

▸ **setTitle**(`title`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |

#### Returns

`void`

#### Defined in

module/page.ts:43
