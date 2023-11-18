---
id: "Browser"
title: "Class: Browser"
sidebar_label: "Browser"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Browser**(): [`Browser`](Browser.md)

#### Returns

[`Browser`](Browser.md)

#### Defined in

[module/browser.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L11)

## Properties

### browsers

• **browsers**: `Object`

#### Index signature

▪ [key: `string`]: `boolean`

#### Defined in

[module/browser.ts:6](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L6)

___

### features

• **features**: `string`[]

#### Defined in

[module/browser.ts:5](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L5)

___

### os

• **os**: `string`

#### Defined in

[module/browser.ts:9](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L9)

## Methods

### \_detectBrowsers

▸ **_detectBrowsers**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:53](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L53)

___

### \_detectMissingFeatures

▸ **_detectMissingFeatures**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:21](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L21)

___

### \_detectOS

▸ **_detectOS**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:86](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L86)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L15)

___

### \_setFeature

▸ **_setFeature**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[module/browser.ts:43](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L43)

___

### detect

▸ **detect**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:37](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L37)

___

### eventMissingFeatures

▸ **eventMissingFeatures**(`features`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `features` | `any`[] |

#### Returns

`void`

#### Defined in

[module/browser.ts:49](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L49)

___

### isAndroid

▸ **isAndroid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:126](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L126)

___

### isChrome

▸ **isChrome**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:164](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L164)

___

### isChromium

▸ **isChromium**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:180](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L180)

___

### isChromiumEdge

▸ **isChromiumEdge**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:156](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L156)

___

### isEdge

▸ **isEdge**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:152](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L152)

___

### isFirefox

▸ **isFirefox**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:160](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L160)

___

### isIOS

▸ **isIOS**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:118](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L118)

___

### isInternetExplorer

▸ **isInternetExplorer**(`opt_version`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_version` | `number` |

#### Returns

`boolean`

#### Defined in

[module/browser.ts:134](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L134)

___

### isLinux

▸ **isLinux**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:130](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L130)

___

### isMacOS

▸ **isMacOS**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:114](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L114)

___

### isOpera

▸ **isOpera**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:168](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L168)

___

### isSafari

▸ **isSafari**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:172](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L172)

___

### isWebkit

▸ **isWebkit**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:176](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L176)

___

### isWindows

▸ **isWindows**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:122](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/browser.ts#L122)
