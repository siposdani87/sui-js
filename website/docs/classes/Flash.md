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

[module/flash.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L12)

## Properties

### container

• **container**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L9)

___

### options

• **options**: [`Objekt`](Objekt.md)<`Object`\>

#### Defined in

[module/flash.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L10)

## Methods

### \_add

▸ `Private` **_add**(`type`, `message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

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

[module/flash.ts:80](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L80)

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

[module/flash.ts:54](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L54)

___

### \_getFlashKnot

▸ `Private` **_getFlashKnot**(`type`, `message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Knot`](Knot.md)<`HTMLElement`\>

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

[module/flash.ts:30](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L30)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/flash.ts:17](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L17)

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

[module/flash.ts:121](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L121)

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

[module/flash.ts:21](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L21)

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

[module/flash.ts:220](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L220)

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

[module/flash.ts:186](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L186)

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

[module/flash.ts:156](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L156)

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

[module/flash.ts:201](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L201)

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

[module/flash.ts:141](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L141)

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

[module/flash.ts:171](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L171)

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

[module/flash.ts:131](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L131)

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

[module/flash.ts:111](https://github.com/siposdani87/sui-js/blob/ad456a5/src/module/flash.ts#L111)
