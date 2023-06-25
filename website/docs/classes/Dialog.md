---
id: "Dialog"
title: "Class: Dialog"
sidebar_label: "Dialog"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseModal`](BaseModal.md)

  ↳ **`Dialog`**

## Constructors

### constructor

• **new Dialog**(`http`, `opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | [`Http`](Http.md) |
| `opt_options` | `Object` |

#### Overrides

[BaseModal](BaseModal.md).[constructor](BaseModal.md#constructor)

#### Defined in

[module/dialog.ts:20](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L20)

## Properties

### body

• **body**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[body](BaseModal.md#body)

#### Defined in

[module/baseModal.ts:18](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L18)

___

### btnClose

• **btnClose**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[btnClose](BaseModal.md#btnclose)

#### Defined in

[module/baseModal.ts:17](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L17)

___

### btnMaximize

• **btnMaximize**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[btnMaximize](BaseModal.md#btnmaximize)

#### Defined in

[module/baseModal.ts:16](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L16)

___

### btnMinimize

• **btnMinimize**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[btnMinimize](BaseModal.md#btnminimize)

#### Defined in

[module/baseModal.ts:15](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L15)

___

### eventCancel

• **eventCancel**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[eventCancel](BaseModal.md#eventcancel)

#### Defined in

[module/baseModal.ts:25](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L25)

___

### eventOK

• **eventOK**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[eventOK](BaseModal.md#eventok)

#### Defined in

[module/baseModal.ts:24](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L24)

___

### hasBlur

• **hasBlur**: `boolean`

#### Inherited from

[BaseModal](BaseModal.md).[hasBlur](BaseModal.md#hasblur)

#### Defined in

[module/baseModal.ts:13](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L13)

___

### http

• **http**: [`Http`](Http.md)

#### Defined in

[module/dialog.ts:14](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L14)

___

### interval

• **interval**: `number`

#### Inherited from

[BaseModal](BaseModal.md).[interval](BaseModal.md#interval)

#### Defined in

[module/baseModal.ts:19](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L19)

___

### mainContainerKnot

• **mainContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[mainContainerKnot](BaseModal.md#maincontainerknot)

#### Defined in

[module/baseModal.ts:12](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L12)

___

### modal

• **modal**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modal](BaseModal.md#modal)

#### Defined in

[module/baseModal.ts:14](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L14)

___

### modalBody

• **modalBody**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalBody](BaseModal.md#modalbody)

#### Defined in

[module/baseModal.ts:21](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L21)

___

### modalFooter

• **modalFooter**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalFooter](BaseModal.md#modalfooter)

#### Defined in

[module/baseModal.ts:22](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L22)

___

### modalHeader

• **modalHeader**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalHeader](BaseModal.md#modalheader)

#### Defined in

[module/baseModal.ts:23](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L23)

___

### modalTitle

• **modalTitle**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalTitle](BaseModal.md#modaltitle)

#### Defined in

[module/baseModal.ts:20](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L20)

___

### modalWindow

• **modalWindow**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalWindow](BaseModal.md#modalwindow)

#### Defined in

[module/baseModal.ts:26](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L26)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/dialog.ts:15](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L15)

___

### windowHeight

• **windowHeight**: `number`

#### Inherited from

[BaseModal](BaseModal.md).[windowHeight](BaseModal.md#windowheight)

#### Defined in

[module/baseModal.ts:11](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L11)

___

### windowWidth

• **windowWidth**: `number`

#### Inherited from

[BaseModal](BaseModal.md).[windowWidth](BaseModal.md#windowwidth)

#### Defined in

[module/baseModal.ts:10](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L10)

## Methods

### \_actionCancel

▸ `Protected` **_actionCancel**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_actionCancel](BaseModal.md#_actioncancel)

#### Defined in

[module/baseModal.ts:202](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L202)

___

### \_actionOK

▸ `Protected` **_actionOK**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_actionOK](BaseModal.md#_actionok)

#### Defined in

[module/baseModal.ts:193](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L193)

___

### \_handleActions

▸ `Private` **_handleActions**(`dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[module/dialog.ts:105](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L105)

___

### \_handleDom

▸ `Private` **_handleDom**(`dom`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/dialog.ts:87](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L87)

___

### \_handleMessage

▸ `Private` **_handleMessage**(`dom`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/dialog.ts:75](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L75)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/dialog.ts:42](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L42)

___

### \_initBase

▸ `Protected` **_initBase**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_initBase](BaseModal.md#_initbase)

#### Defined in

[module/baseModal.ts:31](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L31)

___

### \_reset

▸ `Protected` **_reset**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_reset](BaseModal.md#_reset)

#### Defined in

[module/baseModal.ts:185](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L185)

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

[module/dialog.ts:32](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L32)

___

### \_setTitle

▸ `Protected` **_setTitle**(`opt_title`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_title` | `string` |

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_setTitle](BaseModal.md#_settitle)

#### Defined in

[module/baseModal.ts:169](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L169)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[close](BaseModal.md#close)

#### Defined in

[module/baseModal.ts:149](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L149)

___

### isOpened

▸ **isOpened**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseModal](BaseModal.md).[isOpened](BaseModal.md#isopened)

#### Defined in

[module/baseModal.ts:106](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L106)

___

### loadTemplate

▸ **loadTemplate**(`url`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[module/dialog.ts:55](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/dialog.ts#L55)

___

### open

▸ **open**(`opt_allowClose?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_allowClose` | `boolean` | `true` |

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[open](BaseModal.md#open)

#### Defined in

[module/baseModal.ts:129](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L129)

___

### setSize

▸ **setSize**(`width`, `height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[setSize](BaseModal.md#setsize)

#### Defined in

[module/baseModal.ts:226](https://github.com/siposdani87/sui-js/blob/3c5600c/src/module/baseModal.ts#L226)
