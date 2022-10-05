---
id: "Tooltip"
title: "Class: Tooltip"
sidebar_label: "Tooltip"
sidebar_position: 0
custom_edit_url: null
---

https://www.getmdl.io/components/index.html#tooltips-section

## Constructors

### constructor

• **new Tooltip**(`element`, `opt_position?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `element` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |  |
| `opt_position` | `string` | `'TOP'` | TOP\|BOTTOM\|LEFT\|RIGHT |

#### Defined in

[component/tooltip.ts:20](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L20)

## Properties

### element

• **element**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/tooltip.ts:12](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L12)

___

### positionCssClass

• **positionCssClass**: `string`

#### Defined in

[component/tooltip.ts:14](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L14)

___

### tooltip

• **tooltip**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/tooltip.ts:15](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L15)

___

### valid

• **valid**: `boolean`

#### Defined in

[component/tooltip.ts:13](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L13)

## Methods

### \_createTooltip

▸ `Private` **_createTooltip**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:73](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L73)

___

### \_getMessage

▸ `Private` **_getMessage**(`opt_message?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_message` | `string` | `''` |

#### Returns

`string`

#### Defined in

[component/tooltip.ts:59](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L59)

___

### \_handleAttributes

▸ `Private` **_handleAttributes**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:105](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L105)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:52](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L52)

___

### \_initPositions

▸ `Private` **_initPositions**(`opt_position?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_position` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/tooltip.ts:31](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L31)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:136](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L136)

___

### isOpen

▸ **isOpen**(): `boolean`

#### Returns

`boolean`

#### Defined in

[component/tooltip.ts:142](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L142)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:130](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L130)

___

### render

▸ **render**(`opt_message?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_message?` | `string` |

#### Returns

`void`

#### Defined in

[component/tooltip.ts:96](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L96)

___

### setMessage

▸ **setMessage**(`opt_message?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_message` | `string` | `''` |

#### Returns

`void`

#### Defined in

[component/tooltip.ts:116](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L116)

___

### toggle

▸ **toggle**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:148](https://github.com/siposdani87/sui-js/blob/8fe9546/src/component/tooltip.ts#L148)
