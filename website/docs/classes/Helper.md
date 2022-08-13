---
id: "Helper"
title: "Class: Helper"
sidebar_label: "Helper"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Helper**()

## Methods

### \_createIconNode

▸ `Private` **_createIconNode**(`iconName`, `parentNode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `iconName` | `string` |
| `parentNode` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[module/helper.ts:400](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-400)

___

### \_setTooltip

▸ `Private` **_setTooltip**(`node`, `opt_description?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_description` | `string` | `''` |

#### Returns

`void`

#### Defined in

[module/helper.ts:411](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-411)

___

### button

▸ **button**(`selector`, `dom`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `callback` | `Function` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/helper.ts:197](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-197)

___

### buttonElement

▸ **buttonElement**(`buttonNode`, `opt_callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buttonNode` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_callback` | `Function` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

`void`

#### Defined in

[module/helper.ts:223](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-223)

___

### createButton

▸ **createButton**(`name`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `callback` | `Function` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/helper.ts:146](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-146)

___

### createIconButton

▸ **createIconButton**(`iconName`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `iconName` | `string` | `undefined` |
| `callback` | `Function` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/helper.ts:267](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-267)

___

### createLink

▸ **createLink**(`name`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `opt_callback` | `Function` | `undefined` |
| `opt_href` | `string` | `'javascript:void(0)'` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/helper.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-21)

___

### iconButton

▸ **iconButton**(`selector`, `dom`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `callback` | `Function` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/helper.ts:324](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-324)

___

### iconButtonElement

▸ **iconButtonElement**(`buttonNode`, `opt_callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buttonNode` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_callback` | `Function` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

`void`

#### Defined in

[module/helper.ts:354](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-354)

___

### link

▸ **link**(`selector`, `dom`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Item`](Item.md)<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_callback` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `[]` |

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[module/helper.ts:76](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-76)

___

### linkElement

▸ **linkElement**(`linkNode`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `linkNode` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_callback` | `Function` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `[]` |

#### Returns

`void`

#### Defined in

[module/helper.ts:105](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-105)

___

### multipleButton

▸ **multipleButton**(`selector`, `dom`, `opt_callback`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> |
| `opt_callback` | `Function` |
| `opt_cssClasses` | `string`[] |

#### Returns

`void`

#### Defined in

[module/helper.ts:171](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-171)

___

### multipleIconButton

▸ **multipleIconButton**(`selector`, `dom`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> |
| `opt_cssClasses` | `string`[] |

#### Returns

`void`

#### Defined in

[module/helper.ts:295](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-295)

___

### multipleLink

▸ **multipleLink**(`selector`, `dom`, `opt_callback`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `opt_callback` | `Function` | `undefined` |
| `opt_cssClasses` | `string`[] | `[]` |

#### Returns

`void`

#### Defined in

[module/helper.ts:48](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-48)

___

### setGravatar

▸ **setGravatar**(`imageNode`, `defaultImageUrl`, `email`, `opt_size?`, `opt_rating?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `imageNode` | [`Item`](Item.md)<`HTMLElement`\> | `undefined` |
| `defaultImageUrl` | `string` | `undefined` |
| `email` | `string` | `undefined` |
| `opt_size` | `number` | `500` |
| `opt_rating` | `string` | `'g'` |

#### Returns

`void`

#### Defined in

[module/helper.ts:430](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/module/helper.ts#lines-430)