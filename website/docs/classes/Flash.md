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

[module/flash.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-17)

## Properties

### container

• **container**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:12](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-12)

___

### options

• **options**: [`Objekt`](Objekt.md)

#### Defined in

[module/flash.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-13)

## Methods

### \_add

▸ **_add**(`type`, `message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:111](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-111)

___

### \_getCloseButton

▸ `Private` **_getCloseButton**(`flashNode`, `opt_closeCallback?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `flashNode` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_closeCallback` | `Function` | `null` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:78](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-78)

___

### \_getFlashNode

▸ **_getFlashNode**(`type`, `message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:50](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-50)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[module/flash.ts:25](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-25)

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

[module/flash.ts:158](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-158)

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

[module/flash.ts:33](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-33)

___

### addDefault

▸ **addDefault**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:299](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-299)

___

### addError

▸ **addError**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:251](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-251)

___

### addInfo

▸ **addInfo**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:209](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-209)

___

### addMessage

▸ **addMessage**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `Object` | `undefined` |
| `message.closable` | `boolean` | `undefined` |
| `message.content` | `string` | `undefined` |
| `message.type` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:272](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-272)

___

### addSuccess

▸ **addSuccess**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:188](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-188)

___

### addWarning

▸ **addWarning**(`message`, `opt_duration?`, `opt_closeCallback?`, `opt_id?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `opt_duration` | `number` | `0` |
| `opt_closeCallback` | `Function` | `null` |
| `opt_id` | `string` | `''` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/flash.ts:230](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-230)

___

### remove

▸ **remove**(`flash`, `opt_closeCallback?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `flash` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_closeCallback` | `Function` | `null` |

#### Returns

`void`

#### Defined in

[module/flash.ts:172](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-172)

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

[module/flash.ts:144](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/flash.ts#lines-144)
