---
id: "ProgressBar"
title: "Class: ProgressBar"
sidebar_label: "ProgressBar"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ProgressBar**(`dialog`, `confirm`, `opt_options?`): [`ProgressBar`](ProgressBar.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialog` | [`Dialog`](Dialog.md) |
| `confirm` | [`Confirm`](Confirm.md) |
| `opt_options` | `object` |

#### Returns

[`ProgressBar`](ProgressBar.md)

#### Defined in

[module/progressBar.ts:30](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L30)

## Properties

### async

• **async**: [`Async`](Async.md)

#### Defined in

[module/progressBar.ts:22](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L22)

___

### bufferValue

• **bufferValue**: `number`

#### Defined in

[module/progressBar.ts:28](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L28)

___

### confirm

• **confirm**: [`Confirm`](Confirm.md)

#### Defined in

[module/progressBar.ts:16](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L16)

___

### dialog

• **dialog**: [`Dialog`](Dialog.md)

#### Defined in

[module/progressBar.ts:15](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L15)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[module/progressBar.ts:17](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L17)

___

### processConfirm

• **processConfirm**: `ProcessBar`

#### Defined in

[module/progressBar.ts:26](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L26)

___

### processContainer

• **processContainer**: `ProcessBar`

#### Defined in

[module/progressBar.ts:23](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L23)

___

### processDialog

• **processDialog**: `ProcessBar`

#### Defined in

[module/progressBar.ts:25](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L25)

___

### processHeader

• **processHeader**: `ProcessBar`

#### Defined in

[module/progressBar.ts:24](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L24)

___

### progressBarConfirm

• **progressBarConfirm**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:21](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L21)

___

### progressBarContainer

• **progressBarContainer**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:18](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L18)

___

### progressBarDialog

• **progressBarDialog**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:20](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L20)

___

### progressBarHeader

• **progressBarHeader**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/progressBar.ts:19](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L19)

___

### progressValue

• **progressValue**: `number`

#### Defined in

[module/progressBar.ts:27](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L27)

## Methods

### hide

▸ **hide**(`opt_force?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_force?` | `boolean` |

#### Returns

`void`

#### Defined in

[module/progressBar.ts:268](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L268)

___

### lock

▸ **lock**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:291](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L291)

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

[module/progressBar.ts:242](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L242)

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

[module/progressBar.ts:216](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L216)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:165](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L165)

___

### unlock

▸ **unlock**(): `void`

#### Returns

`void`

#### Defined in

[module/progressBar.ts:295](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/progressBar.ts#L295)
