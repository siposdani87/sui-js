---
id: "TabPanel"
title: "Class: TabPanel"
sidebar_label: "TabPanel"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new TabPanel**(`dom`, `opt_selector?`, `opt_selectedTab?`, `opt_defaultTab?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.tab-panel'` |
| `opt_selectedTab` | `string` | `''` |
| `opt_defaultTab` | `string` | `''` |

#### Defined in

[component/tabPanel.ts:23](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L23)

## Properties

### activeTab

• **activeTab**: `string`

#### Defined in

[component/tabPanel.ts:14](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L14)

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default_tab` | `string` |
| `selected_tab` | `string` |

#### Defined in

[component/tabPanel.ts:13](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L13)

___

### panels

• **panels**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:16](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L16)

___

### tabPanel

• **tabPanel**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:12](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L12)

___

### tabs

• **tabs**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:15](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L15)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:40](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L40)

___

### \_initPanels

▸ `Private` **_initPanels**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:69](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L69)

___

### \_initTabs

▸ `Private` **_initTabs**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:51](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L51)

___

### \_setActive

▸ `Private` **_setActive**(`panelId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `panelId` | `string` |

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:77](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L77)

___

### eventChange

▸ **eventChange**(`panelId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `panelId` | `string` |

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:101](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L101)

___

### getActive

▸ **getActive**(): `string`

#### Returns

`string`

#### Defined in

[component/tabPanel.ts:128](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L128)

___

### setActive

▸ **setActive**(`panelId`): [`Promize`](Promize.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `panelId` | `string` |

#### Returns

[`Promize`](Promize.md)

#### Defined in

[component/tabPanel.ts:108](https://github.com/siposdani87/sui-js/blob/3c5600c/src/component/tabPanel.ts#L108)
