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

• **body**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:19](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L19)

___

### btnClose

• **btnClose**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:18](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L18)

___

### btnMaximize

• **btnMaximize**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:17](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L17)

___

### btnMinimize

• **btnMinimize**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:16](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L16)

___

### eventCancel

• **eventCancel**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:27](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L27)

___

### eventOK

• **eventOK**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:26](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L26)

___

### hasBlur

• **hasBlur**: `boolean`

#### Defined in

[module/baseModal.ts:14](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L14)

___

### interval

• **interval**: `number`

#### Defined in

[module/baseModal.ts:20](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L20)

___

### mainContainerNode

• **mainContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:13](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L13)

___

### modal

• **modal**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:15](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L15)

___

### modalBody

• **modalBody**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:22](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L22)

___

### modalFooter

• **modalFooter**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:23](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L23)

___

### modalHeader

• **modalHeader**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:24](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L24)

___

### modalTitle

• **modalTitle**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:21](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L21)

___

### modalWindow

• **modalWindow**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:28](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L28)

___

### tooltip

• **tooltip**: [`Tooltip`](Tooltip.md)

#### Defined in

[module/baseModal.ts:25](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L25)

___

### windowHeight

• **windowHeight**: `number`

#### Defined in

[module/baseModal.ts:12](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L12)

___

### windowWidth

• **windowWidth**: `number`

#### Defined in

[module/baseModal.ts:11](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L11)

## Methods

### \_actionCancel

▸ `Protected` **_actionCancel**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:205](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L205)

___

### \_actionMaximize

▸ `Private` **_actionMaximize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:221](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L221)

___

### \_actionMinimize

▸ `Private` **_actionMinimize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:214](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L214)

___

### \_actionOK

▸ `Protected` **_actionOK**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:196](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L196)

___

### \_handleCenterPosition

▸ `Private` **_handleCenterPosition**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:238](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L238)

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

[module/baseModal.ts:116](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L116)

___

### \_initBase

▸ `Protected` **_initBase**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:33](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L33)

___

### \_initButtons

▸ `Private` **_initButtons**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:46](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L46)

___

### \_initCloseButton

▸ `Private` **_initCloseButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:91](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L91)

___

### \_initMaximizeButton

▸ `Private` **_initMaximizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:73](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L73)

___

### \_initMinimizeButton

▸ `Private` **_initMinimizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:55](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L55)

___

### \_reset

▸ `Protected` **_reset**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:188](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L188)

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

[module/baseModal.ts:171](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L171)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:151](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L151)

___

### isOpened

▸ **isOpened**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/baseModal.ts:108](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L108)

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

[module/baseModal.ts:131](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L131)

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

[module/baseModal.ts:229](https://github.com/siposdani87/sui-js/blob/a88c06f/src/module/baseModal.ts#L229)
