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

• **new Dialog**(`http`, `opt_options?`): [`Dialog`](Dialog.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | [`Http`](Http.md) |
| `opt_options` | `Object` |

#### Returns

[`Dialog`](Dialog.md)

#### Overrides

[BaseModal](BaseModal.md).[constructor](BaseModal.md#constructor)

#### Defined in

[module/dialog.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L13)

## Properties

### body

• **body**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[body](BaseModal.md#body)

#### Defined in

[module/baseModal.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L15)

___

### btnClose

• **btnClose**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[btnClose](BaseModal.md#btnclose)

#### Defined in

[module/baseModal.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L14)

___

### btnMaximize

• **btnMaximize**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[btnMaximize](BaseModal.md#btnmaximize)

#### Defined in

[module/baseModal.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L13)

___

### btnMinimize

• **btnMinimize**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[btnMinimize](BaseModal.md#btnminimize)

#### Defined in

[module/baseModal.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L12)

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

[module/baseModal.ts:22](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L22)

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

[module/baseModal.ts:21](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L21)

___

### hasBlur

• **hasBlur**: `boolean`

#### Inherited from

[BaseModal](BaseModal.md).[hasBlur](BaseModal.md#hasblur)

#### Defined in

[module/baseModal.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L10)

___

### http

• **http**: [`Http`](Http.md)

#### Defined in

[module/dialog.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L10)

___

### interval

• **interval**: `number`

#### Inherited from

[BaseModal](BaseModal.md).[interval](BaseModal.md#interval)

#### Defined in

[module/baseModal.ts:16](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L16)

___

### mainContainerKnot

• **mainContainerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[mainContainerKnot](BaseModal.md#maincontainerknot)

#### Defined in

[module/baseModal.ts:9](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L9)

___

### modal

• **modal**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modal](BaseModal.md#modal)

#### Defined in

[module/baseModal.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L11)

___

### modalBody

• **modalBody**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalBody](BaseModal.md#modalbody)

#### Defined in

[module/baseModal.ts:18](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L18)

___

### modalFooter

• **modalFooter**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalFooter](BaseModal.md#modalfooter)

#### Defined in

[module/baseModal.ts:19](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L19)

___

### modalHeader

• **modalHeader**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalHeader](BaseModal.md#modalheader)

#### Defined in

[module/baseModal.ts:20](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L20)

___

### modalTitle

• **modalTitle**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalTitle](BaseModal.md#modaltitle)

#### Defined in

[module/baseModal.ts:17](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L17)

___

### modalWindow

• **modalWindow**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseModal](BaseModal.md).[modalWindow](BaseModal.md#modalwindow)

#### Defined in

[module/baseModal.ts:23](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L23)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`Object`\>

#### Defined in

[module/dialog.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L11)

___

### windowHeight

• **windowHeight**: `number`

#### Inherited from

[BaseModal](BaseModal.md).[windowHeight](BaseModal.md#windowheight)

#### Defined in

[module/baseModal.ts:8](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L8)

___

### windowWidth

• **windowWidth**: `number`

#### Inherited from

[BaseModal](BaseModal.md).[windowWidth](BaseModal.md#windowwidth)

#### Defined in

[module/baseModal.ts:7](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L7)

## Methods

### \_actionCancel

▸ **_actionCancel**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_actionCancel](BaseModal.md#_actioncancel)

#### Defined in

[module/baseModal.ts:160](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L160)

___

### \_actionOK

▸ **_actionOK**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_actionOK](BaseModal.md#_actionok)

#### Defined in

[module/baseModal.ts:154](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L154)

___

### \_handleActions

▸ **_handleActions**(`dom`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[module/dialog.ts:79](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L79)

___

### \_handleDom

▸ **_handleDom**(`dom`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/dialog.ts:64](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L64)

___

### \_handleMessage

▸ **_handleMessage**(`dom`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/dialog.ts:55](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L55)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/dialog.ts:28](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L28)

___

### \_initBase

▸ **_initBase**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_initBase](BaseModal.md#_initbase)

#### Defined in

[module/baseModal.ts:25](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L25)

___

### \_reset

▸ **_reset**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_reset](BaseModal.md#_reset)

#### Defined in

[module/baseModal.ts:149](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L149)

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

[module/dialog.ts:21](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L21)

___

### \_setTitle

▸ **_setTitle**(`opt_title`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_title` | `string` |

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[_setTitle](BaseModal.md#_settitle)

#### Defined in

[module/baseModal.ts:136](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L136)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Inherited from

[BaseModal](BaseModal.md).[close](BaseModal.md#close)

#### Defined in

[module/baseModal.ts:120](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L120)

___

### isOpened

▸ **isOpened**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseModal](BaseModal.md).[isOpened](BaseModal.md#isopened)

#### Defined in

[module/baseModal.ts:86](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L86)

___

### loadTemplate

▸ **loadTemplate**(`url`): [`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[`Promize`](Promize.md)\<[`Knot`](Knot.md)\<`HTMLElement`\>, [`Knot`](Knot.md)\<`HTMLElement`\>\>

#### Defined in

[module/dialog.ts:38](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/dialog.ts#L38)

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

[module/baseModal.ts:102](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L102)

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

[module/baseModal.ts:174](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L174)
