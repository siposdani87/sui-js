---
id: "TabPanel"
title: "Class: TabPanel"
sidebar_label: "TabPanel"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new TabPanel**(`dom`, `opt_selector?`, `opt_selectedTab?`, `opt_defaultTab?`): [`TabPanel`](TabPanel.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.tab-panel'` |
| `opt_selectedTab` | `string` | `''` |
| `opt_defaultTab` | `string` | `''` |

#### Returns

[`TabPanel`](TabPanel.md)

#### Defined in

[component/tabPanel.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L15)

## Properties

### activeTab

• **activeTab**: `string`

#### Defined in

[component/tabPanel.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L11)

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default_tab` | `string` |
| `selected_tab` | `string` |

#### Defined in

[component/tabPanel.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L10)

___

### panels

• **panels**: [`Query`](Query.md)\<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L13)

___

### tabPanel

• **tabPanel**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:9](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L9)

___

### tabs

• **tabs**: [`Query`](Query.md)\<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L12)

## Methods

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:29](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L29)

___

### \_initPanels

▸ **_initPanels**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:52](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L52)

___

### \_initTabs

▸ **_initTabs**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:37](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L37)

___

### \_setActive

▸ **_setActive**(`panelId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `panelId` | `string` |

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:56](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L56)

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

[component/tabPanel.ts:77](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L77)

___

### getActive

▸ **getActive**(): `string`

#### Returns

`string`

#### Defined in

[component/tabPanel.ts:99](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L99)

___

### setActive

▸ **setActive**(`panelId`): [`Promize`](Promize.md)\<`Object`, `Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `panelId` | `string` |

#### Returns

[`Promize`](Promize.md)\<`Object`, `Object`\>

#### Defined in

[component/tabPanel.ts:81](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/component/tabPanel.ts#L81)
