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

[component/tooltip.ts:20](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-20)

## Properties

### element

• **element**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/tooltip.ts:12](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-12)

___

### positionCssClass

• **positionCssClass**: `string`

#### Defined in

[component/tooltip.ts:14](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-14)

___

### tooltip

• **tooltip**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/tooltip.ts:15](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-15)

___

### valid

• **valid**: `boolean`

#### Defined in

[component/tooltip.ts:13](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-13)

## Methods

### \_createTooltip

▸ `Private` **_createTooltip**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:73](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-73)

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

[component/tooltip.ts:59](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-59)

___

### \_handleAttributes

▸ `Private` **_handleAttributes**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:105](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-105)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:52](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-52)

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

[component/tooltip.ts:31](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-31)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:136](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-136)

___

### isOpen

▸ **isOpen**(): `boolean`

#### Returns

`boolean`

#### Defined in

[component/tooltip.ts:142](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-142)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:130](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-130)

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

[component/tooltip.ts:96](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-96)

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

[component/tooltip.ts:116](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-116)

___

### toggle

▸ **toggle**(): `void`

#### Returns

`void`

#### Defined in

[component/tooltip.ts:148](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tooltip.ts#lines-148)
