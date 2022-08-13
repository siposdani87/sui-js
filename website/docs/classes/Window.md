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

[module/window.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-16)

## Properties

### document

• **document**: `Document`

#### Defined in

[module/window.ts:11](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-11)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/window.ts:9](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-9)

___

### orientation

• **orientation**: `string`

#### Defined in

[module/window.ts:12](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-12)

___

### window

• **window**: `Window` & typeof `globalThis`

#### Defined in

[module/window.ts:10](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-10)

## Methods

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:36](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-36)

___

### \_initColorSchemeEvent

▸ `Private` **_initColorSchemeEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:206](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-206)

___

### \_initConnectionEvent

▸ `Private` **_initConnectionEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:77](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-77)

___

### \_initResizeEvent

▸ `Private` **_initResizeEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:51](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-51)

___

### \_initScrollEvent

▸ `Private` **_initScrollEvent**(): `void`

#### Returns

`void`

#### Defined in

[module/window.ts:64](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-64)

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

[module/window.ts:151](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-151)

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

[module/window.ts:170](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-170)

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

[module/window.ts:25](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-25)

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

[module/window.ts:224](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-224)

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

[module/window.ts:98](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-98)

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

[module/window.ts:105](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-105)

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

[module/window.ts:124](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-124)

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

[module/window.ts:114](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-114)

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

[module/window.ts:143](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-143)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[module/window.ts:191](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-191)

___

### getOrientation

▸ **getOrientation**(): `string`

#### Returns

`string`

landscape|portrait

#### Defined in

[module/window.ts:197](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-197)

___

### getScrollTop

▸ **getScrollTop**(): `number`

#### Returns

`number`

#### Defined in

[module/window.ts:176](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-176)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[module/window.ts:185](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-185)

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

[module/window.ts:231](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/window.ts#lines-231)
