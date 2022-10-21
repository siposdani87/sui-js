---
id: "Screen"
title: "Class: Screen"
sidebar_label: "Screen"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Screen**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

module/screen.ts:16

## Properties

### document

• **document**: `Document`

#### Defined in

module/screen.ts:11

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

module/screen.ts:9

___

### orientation

• **orientation**: `string`

#### Defined in

module/screen.ts:12

___

### window

• **window**: `Window`

#### Defined in

module/screen.ts:10

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

module/screen.ts:36

___

### \_initColorSchemeEvent

▸ `Private` **_initColorSchemeEvent**(): `void`

#### Returns

`void`

#### Defined in

module/screen.ts:206

___

### \_initConnectionEvent

▸ `Private` **_initConnectionEvent**(): `void`

#### Returns

`void`

#### Defined in

module/screen.ts:77

___

### \_initResizeEvent

▸ `Private` **_initResizeEvent**(): `void`

#### Returns

`void`

#### Defined in

module/screen.ts:51

___

### \_initScrollEvent

▸ `Private` **_initScrollEvent**(): `void`

#### Returns

`void`

#### Defined in

module/screen.ts:64

___

### \_resize

▸ `Private` **_resize**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:151

___

### \_scroll

▸ `Private` **_scroll**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:170

___

### \_setOptions

▸ `Private` **_setOptions**(`opt_options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Returns

`void`

#### Defined in

module/screen.ts:25

___

### eventColorSchemeChange

▸ **eventColorSchemeChange**(`colorScheme`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `colorScheme` | `string` |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:224

___

### eventOffline

▸ **eventOffline**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:98

___

### eventOnline

▸ **eventOnline**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:105

___

### eventOrientationChange

▸ **eventOrientationChange**(`orientation`, `width`, `height`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `orientation` | `string` |
| `width` | `number` |
| `height` | `number` |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:124

___

### eventResize

▸ **eventResize**(`width`, `height`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:114

___

### eventScroll

▸ **eventScroll**(`scrollTop`, `event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scrollTop` | `number` |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

module/screen.ts:143

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

module/screen.ts:191

___

### getOrientation

▸ **getOrientation**(): `string`

#### Returns

`string`

landscape|portrait

#### Defined in

module/screen.ts:197

___

### getScrollTop

▸ **getScrollTop**(): `number`

#### Returns

`number`

#### Defined in

module/screen.ts:176

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

module/screen.ts:185

___

### isColorScheme

▸ **isColorScheme**(`type`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | dark\|light\|no-preference |

#### Returns

`boolean`

#### Defined in

module/screen.ts:231
