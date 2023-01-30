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

[module/screen.ts:16](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L16)

## Properties

### document

• **document**: `Document`

#### Defined in

[module/screen.ts:11](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L11)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/screen.ts:9](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L9)

___

### orientation

• **orientation**: `string`

#### Defined in

[module/screen.ts:12](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L12)

___

### window

• **window**: `Window`

#### Defined in

[module/screen.ts:10](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L10)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/screen.ts:35](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L35)

___

### \_initColorSchemeEvent

▸ `Private` **_initColorSchemeEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/screen.ts:205](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L205)

___

### \_initConnectionEvent

▸ `Private` **_initConnectionEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/screen.ts:76](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L76)

___

### \_initResizeEvent

▸ `Private` **_initResizeEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/screen.ts:50](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L50)

___

### \_initScrollEvent

▸ `Private` **_initScrollEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/screen.ts:63](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L63)

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

[module/screen.ts:150](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L150)

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

[module/screen.ts:169](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L169)

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

[module/screen.ts:25](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L25)

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

[module/screen.ts:223](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L223)

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

[module/screen.ts:97](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L97)

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

[module/screen.ts:104](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L104)

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

[module/screen.ts:123](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L123)

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

[module/screen.ts:113](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L113)

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

[module/screen.ts:142](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L142)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[module/screen.ts:190](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L190)

___

### getOrientation

▸ **getOrientation**(): `string`

#### Returns

`string`

landscape|portrait

#### Defined in

[module/screen.ts:196](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L196)

___

### getScrollTop

▸ **getScrollTop**(): `number`

#### Returns

`number`

#### Defined in

[module/screen.ts:175](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L175)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[module/screen.ts:184](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L184)

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

[module/screen.ts:230](https://github.com/siposdani87/sui-js/blob/1a445e5/src/module/screen.ts#L230)
