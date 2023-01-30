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

[module/progressBar.ts:40](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L40)

## Properties

### async

• **async**: [`Async`](Async.md)

#### Defined in

[module/progressBar.ts:28](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L28)

___

### bufferValue

• **bufferValue**: `number`

#### Defined in

[module/progressBar.ts:34](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L34)

___

### confirm

• **confirm**: [`Confirm`](Confirm.md)

#### Defined in

[module/progressBar.ts:22](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L22)

___

### dialog

• **dialog**: [`Dialog`](Dialog.md)

#### Defined in

[module/progressBar.ts:21](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L21)

___

### mProgressConfirm

• **mProgressConfirm**: `ProcessBar`

#### Defined in

[module/progressBar.ts:32](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L32)

___

### mProgressContainer

• **mProgressContainer**: `ProcessBar`

#### Defined in

[module/progressBar.ts:29](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L29)

___

### mProgressDialog

• **mProgressDialog**: `ProcessBar`

#### Defined in

[module/progressBar.ts:31](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L31)

___

### mProgressHeader

• **mProgressHeader**: `ProcessBar`

#### Defined in

[module/progressBar.ts:30](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L30)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/progressBar.ts:23](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L23)

___

### progressBarConfirm

• **progressBarConfirm**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:27](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L27)

___

### progressBarContainer

• **progressBarContainer**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:24](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L24)

___

### progressBarDialog

• **progressBarDialog**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:26](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L26)

___

### progressBarHeader

• **progressBarHeader**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:25](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L25)

___

### progressValue

• **progressValue**: `number`

#### Defined in

[module/progressBar.ts:33](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L33)

## Methods

### \_getProgressBar

▸ `Private` **_getProgressBar**(`knot`): `ProcessBar`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`ProcessBar`

#### Defined in

[module/progressBar.ts:120](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L120)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:67](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L67)

___

### \_progress

▸ `Private` **_progress**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:161](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L161)

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

[module/progressBar.ts:146](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L146)

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

[module/progressBar.ts:56](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L56)

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

[module/progressBar.ts:310](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L310)

___

### lock

▸ **lock**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:335](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L335)

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

[module/progressBar.ts:281](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L281)

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

[module/progressBar.ts:252](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L252)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:198](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L198)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:341](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/progressBar.ts#L341)
