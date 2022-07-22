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
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_selector` | `string` | `'.tab-panel'` |
| `opt_selectedTab` | `string` | `''` |
| `opt_defaultTab` | `string` | `''` |

#### Defined in

[component/tabPanel.ts:23](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-23)

## Properties

### activeTab

• **activeTab**: `string`

#### Defined in

[component/tabPanel.ts:14](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-14)

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default_tab` | `string` |
| `selected_tab` | `string` |

#### Defined in

[component/tabPanel.ts:13](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-13)

___

### panels

• **panels**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:16](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-16)

___

### tabPanel

• **tabPanel**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:12](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-12)

___

### tabs

• **tabs**: [`Query`](Query.md)<`HTMLElement`\>

#### Defined in

[component/tabPanel.ts:15](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-15)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:40](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-40)

___

### \_initPanels

▸ `Private` **_initPanels**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:69](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-69)

___

### \_initTabs

▸ `Private` **_initTabs**(): `void`

#### Returns

`void`

#### Defined in

[component/tabPanel.ts:51](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-51)

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

[component/tabPanel.ts:77](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-77)

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

[component/tabPanel.ts:101](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-101)

___

### getActive

▸ **getActive**(): `string`

#### Returns

`string`

#### Defined in

[component/tabPanel.ts:128](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-128)

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

[component/tabPanel.ts:108](https://bitbucket.org/siposdani87/sui-js/src/412afc3/src/component/tabPanel.ts#lines-108)
