---
id: "Screen"
title: "Class: Screen"
sidebar_label: "Screen"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Screen**(`opt_options?`): [`Screen`](Screen.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `object` |

#### Returns

[`Screen`](Screen.md)

#### Defined in

[module/screen.ts:11](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L11)

## Properties

### document

• **document**: `Document`

#### Defined in

[module/screen.ts:8](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L8)

___

### options

• **options**: [`Objekt`](Objekt.md)\<`object`\>

#### Defined in

[module/screen.ts:6](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L6)

___

### orientation

• **orientation**: `string`

#### Defined in

[module/screen.ts:9](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L9)

___

### window

• **window**: `Window`

#### Defined in

[module/screen.ts:7](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L7)

## Methods

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

[module/screen.ts:158](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L158)

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

[module/screen.ts:73](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L73)

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

[module/screen.ts:77](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L77)

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

[module/screen.ts:85](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L85)

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

[module/screen.ts:81](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L81)

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

[module/screen.ts:100](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L100)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[module/screen.ts:134](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L134)

___

### getOrientation

▸ **getOrientation**(): `string`

#### Returns

`string`

#### Defined in

[module/screen.ts:138](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L138)

___

### getScrollTop

▸ **getScrollTop**(): `number`

#### Returns

`number`

#### Defined in

[module/screen.ts:123](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L123)

___

### getWidth

▸ **getWidth**(): `number`

#### Returns

`number`

#### Defined in

[module/screen.ts:130](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L130)

___

### isColorScheme

▸ **isColorScheme**(`type`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[module/screen.ts:162](https://github.com/siposdani87/sui-js/blob/fa20298/src/module/screen.ts#L162)
