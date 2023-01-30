---
id: "Browser"
title: "Class: Browser"
sidebar_label: "Browser"
sidebar_position: 0
custom_edit_url: null
---

http://browserhacks.com/

## Constructors

### constructor

• **new Browser**()

#### Defined in

[module/browser.ts:16](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L16)

## Properties

### browsers

• **browsers**: `Object`

#### Index signature

▪ [key: `string`]: `boolean`

#### Defined in

[module/browser.ts:10](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L10)

___

### features

• **features**: `string`[]

#### Defined in

[module/browser.ts:9](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L9)

___

### os

• **os**: `string`

#### Defined in

[module/browser.ts:13](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L13)

## Methods

### \_detectBrowsers

▸ `Private` **_detectBrowsers**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:77](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L77)

___

### \_detectMissingFeatures

▸ `Private` **_detectMissingFeatures**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:32](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L32)

___

### \_detectOS

▸ `Private` **_detectOS**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:113](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L113)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:23](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L23)

___

### \_setFeature

▸ `Private` **_setFeature**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[module/browser.ts:61](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L61)

___

### detect

▸ **detect**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:50](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L50)

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

[module/browser.ts:70](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L70)

___

### isAndroid

▸ **isAndroid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:161](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L161)

___

### isChrome

▸ **isChrome**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:212](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L212)

___

### isChromium

▸ **isChromium**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:236](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L236)

___

### isChromiumEdge

▸ **isChromiumEdge**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:200](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L200)

___

### isEdge

▸ **isEdge**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:194](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L194)

___

### isFirefox

▸ **isFirefox**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:206](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L206)

___

### isIOS

▸ **isIOS**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:149](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L149)

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

[module/browser.ts:174](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L174)

___

### isLinux

▸ **isLinux**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:167](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L167)

___

### isMacOS

▸ **isMacOS**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:143](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L143)

___

### isOpera

▸ **isOpera**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:218](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L218)

___

### isSafari

▸ **isSafari**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:224](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L224)

___

### isWebkit

▸ **isWebkit**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:230](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L230)

___

### isWindows

▸ **isWindows**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:155](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/browser.ts#L155)
