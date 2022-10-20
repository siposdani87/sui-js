---
id: "ProgressStatus"
title: "Class: ProgressStatus"
sidebar_label: "ProgressStatus"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ProgressStatus**(`dom`, `opt_selector?`, `opt_options?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.progress-status'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/progressStatus.ts:18](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L18)

## Properties

### iconNode

• **iconNode**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:11](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L11)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/progressStatus.ts:10](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L10)

___

### progressStatusNode

• **progressStatusNode**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:9](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L9)

___

### textNode

• **textNode**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:12](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L12)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/progressStatus.ts:46](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L46)

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

[component/progressStatus.ts:32](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L32)

___

### \_setStatus

▸ `Private` **_setStatus**(`cssClass`, `text`, `opt_icon?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cssClass` | `string` | `undefined` |
| `text` | `string` | `undefined` |
| `opt_icon` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/progressStatus.ts:57](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L57)

___

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

[component/progressStatus.ts:103](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L103)

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

[component/progressStatus.ts:87](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L87)

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

[component/progressStatus.ts:79](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L79)

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

[component/progressStatus.ts:95](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/progressStatus.ts#L95)
