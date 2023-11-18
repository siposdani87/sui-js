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

• **new BaseModal**(): [`BaseModal`](BaseModal.md)

#### Returns

[`BaseModal`](BaseModal.md)

## Properties

### body

• **body**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L15)

___

### btnClose

• **btnClose**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L14)

___

### btnMaximize

• **btnMaximize**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L13)

___

### btnMinimize

• **btnMinimize**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L12)

___

### eventCancel

• **eventCancel**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:22](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L22)

___

### eventOK

• **eventOK**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[module/baseModal.ts:21](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L21)

___

### hasBlur

• **hasBlur**: `boolean`

#### Defined in

[module/baseModal.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L10)

___

### interval

• **interval**: `number`

#### Defined in

[module/baseModal.ts:16](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L16)

___

### mainContainerKnot

• **mainContainerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:9](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L9)

___

### modal

• **modal**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L11)

___

### modalBody

• **modalBody**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:18](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L18)

___

### modalFooter

• **modalFooter**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:19](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L19)

___

### modalHeader

• **modalHeader**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:20](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L20)

___

### modalTitle

• **modalTitle**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:17](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L17)

___

### modalWindow

• **modalWindow**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/baseModal.ts:23](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L23)

___

### windowHeight

• **windowHeight**: `number`

#### Defined in

[module/baseModal.ts:8](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L8)

___

### windowWidth

• **windowWidth**: `number`

#### Defined in

[module/baseModal.ts:7](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L7)

## Methods

### \_actionCancel

▸ **_actionCancel**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:160](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L160)

___

### \_actionMaximize

▸ **_actionMaximize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:170](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L170)

___

### \_actionMinimize

▸ **_actionMinimize**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:166](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L166)

___

### \_actionOK

▸ **_actionOK**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:154](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L154)

___

### \_handleCenterPosition

▸ **_handleCenterPosition**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:180](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L180)

___

### \_handleCloseButton

▸ **_handleCloseButton**(`opt_allowClose?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_allowClose` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[module/baseModal.ts:90](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L90)

___

### \_initBase

▸ **_initBase**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:25](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L25)

___

### \_initButtons

▸ **_initButtons**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:35](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L35)

___

### \_initCloseButton

▸ **_initCloseButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:71](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L71)

___

### \_initMaximizeButton

▸ **_initMaximizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:56](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L56)

___

### \_initMinimizeButton

▸ **_initMinimizeButton**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:41](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L41)

___

### \_reset

▸ **_reset**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:149](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L149)

___

### \_setTitle

▸ **_setTitle**(`opt_title`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_title` | `string` |

#### Returns

`void`

#### Defined in

[module/baseModal.ts:136](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L136)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[module/baseModal.ts:120](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L120)

___

### isOpened

▸ **isOpened**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/baseModal.ts:86](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L86)

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

#### Defined in

[module/baseModal.ts:174](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/baseModal.ts#L174)
