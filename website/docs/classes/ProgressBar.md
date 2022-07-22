---
id: "ProgressBar"
title: "Class: ProgressBar"
sidebar_label: "ProgressBar"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ProgressBar**(`dialog`, `confirm`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialog` | [`Dialog`](Dialog.md) |
| `confirm` | [`Confirm`](Confirm.md) |
| `opt_options` | `Object` |

#### Defined in

[module/progressBar.ts:40](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-40)

## Properties

### async

• **async**: [`Async`](Async.md)

#### Defined in

[module/progressBar.ts:28](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-28)

___

### bufferValue

• **bufferValue**: `number`

#### Defined in

[module/progressBar.ts:34](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-34)

___

### confirm

• **confirm**: [`Confirm`](Confirm.md)

#### Defined in

[module/progressBar.ts:22](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-22)

___

### dialog

• **dialog**: [`Dialog`](Dialog.md)

#### Defined in

[module/progressBar.ts:21](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-21)

___

### mProgressConfirm

• **mProgressConfirm**: `ProcessBar`

#### Defined in

[module/progressBar.ts:32](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-32)

___

### mProgressContainer

• **mProgressContainer**: `ProcessBar`

#### Defined in

[module/progressBar.ts:29](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-29)

___

### mProgressDialog

• **mProgressDialog**: `ProcessBar`

#### Defined in

[module/progressBar.ts:31](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-31)

___

### mProgressHeader

• **mProgressHeader**: `ProcessBar`

#### Defined in

[module/progressBar.ts:30](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-30)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/progressBar.ts:23](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-23)

___

### progressBarConfirm

• **progressBarConfirm**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:27](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-27)

___

### progressBarContainer

• **progressBarContainer**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:24](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-24)

___

### progressBarDialog

• **progressBarDialog**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:26](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-26)

___

### progressBarHeader

• **progressBarHeader**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:25](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-25)

___

### progressValue

• **progressValue**: `number`

#### Defined in

[module/progressBar.ts:33](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-33)

## Methods

### \_getProgressBar

▸ `Private` **_getProgressBar**(`node`): `ProcessBar`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`ProcessBar`

#### Defined in

[module/progressBar.ts:121](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-121)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:68](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-68)

___

### \_progress

▸ `Private` **_progress**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:162](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-162)

___

### \_separateProgressBars

▸ `Private` **_separateProgressBars**(`containerCallback`, `headerCallback`, `dialogCallback`, `confirmCallback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerCallback` | `Function` |
| `headerCallback` | `Function` |
| `dialogCallback` | `Function` |
| `confirmCallback` | `Function` |

#### Returns

`void`

#### Defined in

[module/progressBar.ts:147](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-147)

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

[module/progressBar.ts:56](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-56)

___

### hide

▸ **hide**(`opt_force?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_force?` | `boolean` |

#### Returns

`void`

#### Defined in

[module/progressBar.ts:311](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-311)

___

### lock

▸ **lock**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:336](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-336)

___

### setBuffer

▸ **setBuffer**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[module/progressBar.ts:282](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-282)

___

### setProgress

▸ **setProgress**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[module/progressBar.ts:253](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-253)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:199](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-199)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:342](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/module/progressBar.ts#lines-342)
