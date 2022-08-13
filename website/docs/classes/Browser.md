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

[module/browser.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-16)

## Properties

### browsers

• **browsers**: `Object`

#### Index signature

▪ [key: `string`]: `boolean`

#### Defined in

[module/browser.ts:10](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-10)

___

### features

• **features**: `string`[]

#### Defined in

[module/browser.ts:9](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-9)

___

### os

• **os**: `string`

#### Defined in

[module/browser.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-13)

## Methods

### \_detectBrowsers

▸ `Private` **_detectBrowsers**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:77](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-77)

___

### \_detectMissingFeatures

▸ `Private` **_detectMissingFeatures**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:32](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-32)

___

### \_detectOS

▸ `Private` **_detectOS**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:113](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-113)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:23](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-23)

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

[module/browser.ts:61](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-61)

___

### detect

▸ **detect**(): `void`

#### Returns

`void`

#### Defined in

[module/browser.ts:50](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-50)

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

[module/browser.ts:70](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-70)

___

### isAndroid

▸ **isAndroid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:161](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-161)

___

### isChrome

▸ **isChrome**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:212](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-212)

___

### isChromium

▸ **isChromium**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:236](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-236)

___

### isChromiumEdge

▸ **isChromiumEdge**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:200](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-200)

___

### isEdge

▸ **isEdge**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:194](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-194)

___

### isFirefox

▸ **isFirefox**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:206](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-206)

___

### isIOS

▸ **isIOS**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:149](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-149)

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

[module/browser.ts:174](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-174)

___

### isLinux

▸ **isLinux**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:167](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-167)

___

### isMacOS

▸ **isMacOS**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:143](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-143)

___

### isOpera

▸ **isOpera**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:218](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-218)

___

### isSafari

▸ **isSafari**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:224](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-224)

___

### isWebkit

▸ **isWebkit**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:230](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-230)

___

### isWindows

▸ **isWindows**(): `boolean`

#### Returns

`boolean`

#### Defined in

[module/browser.ts:155](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/browser.ts#lines-155)
