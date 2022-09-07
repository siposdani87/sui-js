---
id: "Window"
title: "Class: Window"
sidebar_label: "Window"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Window**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

[module/window.ts:16](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L16)

## Properties

### document

• **document**: `Document`

#### Defined in

[module/window.ts:11](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L11)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/window.ts:9](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L9)

___

### orientation

• **orientation**: `string`

#### Defined in

[module/window.ts:12](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L12)

___

### window

• **window**: `Window` & typeof `globalThis`

#### Defined in

[module/window.ts:10](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L10)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:36](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L36)

___

### \_initColorSchemeEvent

▸ `Private` **_initColorSchemeEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:206](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L206)

___

### \_initConnectionEvent

▸ `Private` **_initConnectionEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:77](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L77)

___

### \_initResizeEvent

▸ `Private` **_initResizeEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:51](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L51)

___

### \_initScrollEvent

▸ `Private` **_initScrollEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:64](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L64)

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

[module/window.ts:151](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L151)

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

[module/window.ts:170](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L170)

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

[module/window.ts:25](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L25)

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

[module/window.ts:224](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L224)

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

[module/window.ts:98](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L98)

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

[module/window.ts:105](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L105)

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

[module/window.ts:124](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L124)

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

[module/window.ts:114](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L114)

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

[module/window.ts:143](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L143)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[module/window.ts:191](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L191)

___

### getOrientation

▸ **getOrientation**(): `string`

#### Returns

`string`

landscape|portrait

#### Defined in

[module/window.ts:197](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L197)

___

### getScrollTop

▸ **getScrollTop**(): `number`

#### Returns

`number`

#### Defined in

[module/window.ts:176](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L176)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[module/window.ts:185](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L185)

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

[module/window.ts:231](https://github.com/siposdani87/sui-js/blob/035cd52/src/module/window.ts#L231)
