---
id: "Helper"
title: "Class: Helper"
sidebar_label: "Helper"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Helper**(): [`Helper`](Helper.md)

#### Returns

[`Helper`](Helper.md)

## Methods

### \_createIconKnot

▸ **_createIconKnot**(`iconName`, `parentKnot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `iconName` | `string` |
| `parentKnot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[module/helper.ts:305](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L305)

___

### \_setTooltip

▸ **_setTooltip**(`knot`, `opt_description?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_description` | `string` | `''` |

#### Returns

`void`

#### Defined in

[module/helper.ts:312](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L312)

___

### button

▸ **button**(`selector`, `dom`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `callback` | (`id`: `string`, `button`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/helper.ts:141](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L141)

___

### buttonElement

▸ **buttonElement**(`buttonKnot`, `opt_callback?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buttonKnot` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_callback?` | (`id`: `string`, `button`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

`void`

#### Defined in

[module/helper.ts:160](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L160)

___

### createButton

▸ **createButton**(`name`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `callback` | (`id`: `string`, `button`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/helper.ts:104](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L104)

___

### createIconButton

▸ **createIconButton**(`iconName`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `iconName` | `string` | `undefined` |
| `callback` | (`id`: `string`, `button`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/helper.ts:197](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L197)

___

### createLink

▸ **createLink**(`name`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `opt_callback` | (`href`: `string`, `linkKnot`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_href` | `string` | `'javascript:void(0)'` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/helper.ts:9](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L9)

___

### iconButton

▸ **iconButton**(`selector`, `dom`, `callback`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `callback` | (`id`: `string`, `button`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/helper.ts:241](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L241)

___

### iconButtonElement

▸ **iconButtonElement**(`buttonKnot`, `opt_callback?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buttonKnot` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_callback?` | (`id`: `string`, `button`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `undefined` |

#### Returns

`void`

#### Defined in

[module/helper.ts:264](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L264)

___

### link

▸ **link**(`selector`, `dom`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): [`Knot`](Knot.md)\<`HTMLElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_callback` | (`href`: `string`, `linkKnot`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `[]` |

#### Returns

[`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[module/helper.ts:49](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L49)

___

### linkElement

▸ **linkElement**(`linkKnot`, `opt_callback`, `opt_href?`, `opt_description?`, `opt_allowAccess?`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `linkKnot` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_callback` | (`href`: `string`, `linkKnot`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_href` | `string` | `''` |
| `opt_description` | `string` | `''` |
| `opt_allowAccess` | `boolean` | `true` |
| `opt_cssClasses` | `string`[] | `[]` |

#### Returns

`void`

#### Defined in

[module/helper.ts:70](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L70)

___

### multipleButton

▸ **multipleButton**(`selector`, `dom`, `opt_callback?`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `opt_callback?` | (`id`: `string`, `button`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` |
| `opt_cssClasses` | `string`[] |

#### Returns

`void`

#### Defined in

[module/helper.ts:123](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L123)

___

### multipleIconButton

▸ **multipleIconButton**(`selector`, `dom`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `opt_cssClasses` | `string`[] |

#### Returns

`void`

#### Defined in

[module/helper.ts:220](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L220)

___

### multipleLink

▸ **multipleLink**(`selector`, `dom`, `opt_callback`, `opt_cssClasses?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `undefined` |
| `dom` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `opt_callback` | (`href`: `string`, `linkKnot`: [`Knot`](Knot.md)\<`HTMLElement`\>) => `void` | `undefined` |
| `opt_cssClasses` | `string`[] | `[]` |

#### Returns

`void`

#### Defined in

[module/helper.ts:30](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L30)

___

### setGravatar

▸ **setGravatar**(`imageKnot`, `defaultImageUrl`, `email`, `opt_size?`, `opt_rating?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `imageKnot` | [`Knot`](Knot.md)\<`HTMLElement`\> | `undefined` |
| `defaultImageUrl` | `string` | `undefined` |
| `email` | `string` | `undefined` |
| `opt_size` | `number` | `500` |
| `opt_rating` | `string` | `'g'` |

#### Returns

`void`

#### Defined in

[module/helper.ts:324](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/module/helper.ts#L324)
