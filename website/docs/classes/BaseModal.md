---
id: "BaseModal"
title: "Class: BaseModal"
sidebar_label: "BaseModal"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`BaseModal`**

  ↳ [`Confirm`](Confirm.md)

  ↳ [`Dialog`](Dialog.md)

  ↳ [`Viewer`](Viewer.md)

## Constructors

### constructor

• **new BaseModal**()

## Properties

### body

• **body**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:18](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L18)

___

### btnClose

• **btnClose**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:17](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L17)

___

### btnMaximize

• **btnMaximize**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:16](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L16)

___

### btnMinimize

• **btnMinimize**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:15](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L15)

___

### eventCancel

• **eventCancel**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:25](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L25)

___

### eventOK

• **eventOK**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:24](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L24)

___

### hasBlur

• **hasBlur**: `boolean`

#### Defined in

[module/baseModal.ts:13](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L13)

___

### interval

• **interval**: `number`

#### Defined in

[module/baseModal.ts:19](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L19)

___

### mainContainerNode

• **mainContainerNode**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:12](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L12)

___

### modal

• **modal**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:14](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L14)

___

### modalBody

• **modalBody**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:21](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L21)

___

### modalFooter

• **modalFooter**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:22](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L22)

___

### modalHeader

• **modalHeader**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:23](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L23)

___

### modalTitle

• **modalTitle**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:20](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L20)

___

### modalWindow

• **modalWindow**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:26](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L26)

___

### windowHeight

• **windowHeight**: `number`

#### Defined in

[module/baseModal.ts:11](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L11)

___

### windowWidth

• **windowWidth**: `number`

#### Defined in

[module/baseModal.ts:10](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L10)

## Methods

### \_actionCancel

▸ `Protected` **_actionCancel**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:202](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L202)

___

### \_actionMaximize

▸ `Private` **_actionMaximize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:218](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L218)

___

### \_actionMinimize

▸ `Private` **_actionMinimize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:211](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L211)

___

### \_actionOK

▸ `Protected` **_actionOK**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:193](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L193)

___

### \_handleCenterPosition

▸ `Private` **_handleCenterPosition**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:235](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L235)

___

### \_handleCloseButton

▸ `Private` **_handleCloseButton**(`opt_allowClose?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_allowClose` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[module/baseModal.ts:114](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L114)

___

### \_initBase

▸ `Protected` **_initBase**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:31](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L31)

___

### \_initButtons

▸ `Private` **_initButtons**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:44](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L44)

___

### \_initCloseButton

▸ `Private` **_initCloseButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:89](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L89)

___

### \_initMaximizeButton

▸ `Private` **_initMaximizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:71](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L71)

___

### \_initMinimizeButton

▸ `Private` **_initMinimizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:53](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L53)

___

### \_reset

▸ `Protected` **_reset**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:185](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L185)

___

### \_setTitle

▸ `Protected` **_setTitle**(`opt_title`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_title` | `string` |

#### Returns

`void`

#### Defined in

[module/baseModal.ts:169](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L169)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:149](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L149)

___

### isOpened

▸ **isOpened**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/baseModal.ts:106](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L106)

___

### open

▸ **open**(`opt_allowClose?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_allowClose` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[module/baseModal.ts:129](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L129)

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

#### Defined in

[module/baseModal.ts:226](https://github.com/siposdani87/sui-js/blob/0baad71/src/module/baseModal.ts#L226)
