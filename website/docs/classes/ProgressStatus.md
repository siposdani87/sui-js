---
id: "ProgressStatus"
title: "Class: ProgressStatus"
sidebar_label: "ProgressStatus"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ProgressStatus**(`dom`, `opt_selector?`, `opt_options?`): [`ProgressStatus`](ProgressStatus.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.progress-status'` |
| `opt_options` | `object` | `{}` |

#### Returns

[`ProgressStatus`](ProgressStatus.md)

#### Defined in

[component/progressStatus.ts:11](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L11)

## Properties

### iconKnot

• **iconKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:8](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L8)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[component/progressStatus.ts:7](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L7)

___

### progressStatusKnot

• **progressStatusKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:6](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L6)

___

### textKnot

• **textKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:9](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L9)

## Methods

### setError

▸ **setError**(`text`, `opt_icon?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text` | `string` | `undefined` |
| `opt_icon` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/progressStatus.ts:66](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L66)

___

### setInfo

▸ **setInfo**(`text`, `opt_icon?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text` | `string` | `undefined` |
| `opt_icon` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/progressStatus.ts:58](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L58)

___

### setSuccess

▸ **setSuccess**(`text`, `opt_icon?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text` | `string` | `undefined` |
| `opt_icon` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/progressStatus.ts:54](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L54)

___

### setWarning

▸ **setWarning**(`text`, `opt_icon?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text` | `string` | `undefined` |
| `opt_icon` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/progressStatus.ts:62](https://github.com/siposdani87/sui-js/blob/fa20298/src/component/progressStatus.ts#L62)
