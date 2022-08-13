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

[module/baseModal.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-19)

___

### btnClose

• **btnClose**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-18)

___

### btnMaximize

• **btnMaximize**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-17)

___

### btnMinimize

• **btnMinimize**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-16)

___

### eventCancel

• **eventCancel**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:27](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-27)

___

### eventOK

• **eventOK**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:26](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-26)

___

### hasBlur

• **hasBlur**: `boolean`

#### Defined in

[module/baseModal.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-14)

___

### interval

• **interval**: `number`

#### Defined in

[module/baseModal.ts:20](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-20)

___

### mainContainerNode

• **mainContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-13)

___

### modal

• **modal**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-15)

___

### modalBody

• **modalBody**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:22](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-22)

___

### modalFooter

• **modalFooter**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:23](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-23)

___

### modalHeader

• **modalHeader**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:24](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-24)

___

### modalTitle

• **modalTitle**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-21)

___

### modalWindow

• **modalWindow**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:28](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-28)

___

### tooltip

• **tooltip**: [`Tooltip`](Tooltip.md)

#### Defined in

[module/baseModal.ts:25](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-25)

___

### windowHeight

• **windowHeight**: `number`

#### Defined in

[module/baseModal.ts:12](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-12)

___

### windowWidth

• **windowWidth**: `number`

#### Defined in

[module/baseModal.ts:11](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-11)

## Methods

### \_actionCancel

▸ `Protected` **_actionCancel**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:205](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-205)

___

### \_actionMaximize

▸ `Private` **_actionMaximize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:221](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-221)

___

### \_actionMinimize

▸ `Private` **_actionMinimize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:214](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-214)

___

### \_actionOK

▸ `Protected` **_actionOK**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:196](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-196)

___

### \_handleCenterPosition

▸ `Private` **_handleCenterPosition**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:238](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-238)

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

[module/baseModal.ts:116](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-116)

___

### \_initBase

▸ `Protected` **_initBase**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:33](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-33)

___

### \_initButtons

▸ `Private` **_initButtons**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:46](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-46)

___

### \_initCloseButton

▸ `Private` **_initCloseButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:91](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-91)

___

### \_initMaximizeButton

▸ `Private` **_initMaximizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:73](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-73)

___

### \_initMinimizeButton

▸ `Private` **_initMinimizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:55](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-55)

___

### \_reset

▸ `Protected` **_reset**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:188](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-188)

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

[module/baseModal.ts:171](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-171)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:151](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-151)

___

### isOpened

▸ **isOpened**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/baseModal.ts:108](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-108)

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

[module/baseModal.ts:131](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-131)

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

[module/baseModal.ts:229](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/baseModal.ts#lines-229)
