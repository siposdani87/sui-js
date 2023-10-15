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

[component/popupContainer.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L10)

## Properties

### container

• **container**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/popupContainer.ts:8](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L8)

___

### selector

• **selector**: `string`

#### Defined in

[component/popupContainer.ts:7](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L7)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:15](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L15)

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

[component/popupContainer.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L19)

___

### clearPosition

▸ **clearPosition**(`popupKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `popupKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:57](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L57)

___

### closeAll

▸ **closeAll**(): `void`

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:37](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L37)

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

[component/popupContainer.ts:31](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L31)

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

[component/popupContainer.ts:24](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L24)

___

### setPosition

▸ **setPosition**(`popupKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `popupKnot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[component/popupContainer.ts:45](https://github.com/siposdani87/sui-js/blob/ad456a5/src/component/popupContainer.ts#L45)
