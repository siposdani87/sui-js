---
id: "Flash"
title: "Class: Flash"
sidebar_label: "Flash"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Flash**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `Object` |

#### Defined in

[module/flash.ts:17](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L17)

## Properties

### container

• **container**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:12](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L12)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/flash.ts:13](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L13)

## Methods

### \_add

▸ **_add**(`type`, `message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:111](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L111)

___

### \_getCloseButton

▸ `Private` **_getCloseButton**(`flashKnot`, `opt_closeCallback?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `flashKnot` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_closeCallback` | `Function` | `null` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:78](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L78)

___

### \_getFlashKnot

▸ **_getFlashKnot**(`type`, `message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:50](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L50)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/flash.ts:25](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L25)

___

### \_isClosable

▸ `Private` **_isClosable**(`type`, `opt_closeCallback?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `opt_closeCallback` | `Function` | `null` |

#### Returns

`boolean`

#### Defined in

[module/flash.ts:158](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L158)

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

[module/flash.ts:33](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L33)

___

### addDefault

▸ **addDefault**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:297](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L297)

___

### addError

▸ **addError**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:251](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L251)

___

### addInfo

▸ **addInfo**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:209](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L209)

___

### addMessage

▸ **addMessage**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `Object` | `undefined` |
| `message.closable?` | `boolean` | `undefined` |
| `message.content` | `string` | `undefined` |
| `message.type` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:272](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L272)

___

### addSuccess

▸ **addSuccess**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:188](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L188)

___

### addWarning

▸ **addWarning**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:230](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L230)

___

### remove

▸ **remove**(`flash`, `opt_closeCallback?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `flash` | [`Knot`](Knot.md)<`HTMLElement`\> | `undefined` |
| `opt_closeCallback` | `Function` | `null` |

#### Returns

`void`

#### Defined in

[module/flash.ts:172](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L172)

___

### removeById

▸ **removeById**(`opt_id?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_id` | `string` | `''` |

#### Returns

`void`

#### Defined in

[module/flash.ts:144](https://github.com/siposdani87/sui-js/blob/cc9117e/src/module/flash.ts#L144)
