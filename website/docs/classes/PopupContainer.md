---
id: "PopupContainer"
title: "Class: PopupContainer"
sidebar_label: "PopupContainer"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new PopupContainer**(`opt_selector?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_selector` | `string` | `'body'` |

#### Defined in

[component/popupContainer.ts:15](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L15)

## Properties

### container

• **container**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/popupContainer.ts:11](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L11)

___

### selector

• **selector**: `string`

#### Defined in

[component/popupContainer.ts:10](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L10)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:23](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L23)

___

### \_initCollection

▸ `Private` **_initCollection**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Function` |

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:31](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L31)

___

### clearPosition

▸ **clearPosition**(`popupNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `popupNode` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:84](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L84)

___

### closeAll

▸ **closeAll**(): `void`

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:58](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L58)

___

### delete

▸ **delete**(`popup`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `popup` | [`Popup`](Popup.md) |

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:50](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L50)

___

### push

▸ **push**(`type`, `popup`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Function` |
| `popup` | [`Popup`](Popup.md) |

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:40](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L40)

___

### setPosition

▸ **setPosition**(`popupNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `popupNode` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:69](https://github.com/siposdani87/sui-js/blob/0baad71/src/component/popupContainer.ts#L69)
