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
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.progress-status'` |
| `opt_options` | `Object` | `{}` |

#### Defined in

[component/progressStatus.ts:18](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-18)

## Properties

### iconNode

• **iconNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:11](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-11)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[component/progressStatus.ts:10](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-10)

___

### progressStatusNode

• **progressStatusNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:9](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-9)

___

### textNode

• **textNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/progressStatus.ts:12](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-12)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/progressStatus.ts:46](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-46)

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

[component/progressStatus.ts:32](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-32)

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

[component/progressStatus.ts:57](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-57)

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

[component/progressStatus.ts:103](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-103)

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

[component/progressStatus.ts:87](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-87)

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

[component/progressStatus.ts:79](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-79)

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

[component/progressStatus.ts:95](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/progressStatus.ts#lines-95)
