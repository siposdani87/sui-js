---
id: "BaseField"
title: "Class: BaseField<T>"
sidebar_label: "BaseField"
sidebar_position: 0
custom_edit_url: null
---

**`Template`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLInputElement` |

## Hierarchy

- **`BaseField`**

  ↳ [`AutoCompleteField`](AutoCompleteField.md)

  ↳ [`BaseCheckboxField`](BaseCheckboxField.md)

  ↳ [`Button`](Button.md)

  ↳ [`ColorField`](ColorField.md)

  ↳ [`DateTimeField`](DateTimeField.md)

  ↳ [`DateTimeRangeField`](DateTimeRangeField.md)

  ↳ [`FileField`](FileField.md)

  ↳ [`HiddenField`](HiddenField.md)

  ↳ [`LocationField`](LocationField.md)

  ↳ [`NumberField`](NumberField.md)

  ↳ [`RadiobuttonField`](RadiobuttonField.md)

  ↳ [`RangeField`](RangeField.md)

  ↳ [`ResetButton`](ResetButton.md)

  ↳ [`SearchField`](SearchField.md)

  ↳ [`SelectField`](SelectField.md)

  ↳ [`SubmitButton`](SubmitButton.md)

  ↳ [`TextareaField`](TextareaField.md)

  ↳ [`TextField`](TextField.md)

  ↳ [`UrlField`](UrlField.md)

## Constructors

### constructor

• **new BaseField**<`T`\>(`input`, `opt_label?`, `opt_error?`, `opt_inputBlock?`, `opt_form?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `HTMLInputElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Item`](Item.md)<`T`\> |
| `opt_label?` | [`Item`](Item.md)<`HTMLElement`\> |
| `opt_error?` | [`Item`](Item.md)<`HTMLElement`\> |
| `opt_inputBlock?` | [`Item`](Item.md)<`HTMLElement`\> |
| `opt_form?` | [`Form`](Form.md) |

#### Defined in

[field/baseField.ts:29](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-29)

## Properties

### actionContainerNode

• **actionContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:20](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-20)

___

### disabled

• **disabled**: `boolean`

#### Defined in

[field/baseField.ts:21](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-21)

___

### error

• **error**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:15](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-15)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Defined in

[field/baseField.ts:18](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-18)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Defined in

[field/baseField.ts:17](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-17)

___

### infoContainerNode

• **infoContainerNode**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:19](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-19)

___

### input

• **input**: [`Item`](Item.md)<`T`\>

#### Defined in

[field/baseField.ts:13](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-13)

___

### inputBlock

• **inputBlock**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:16](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-16)

___

### label

• **label**: [`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:14](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-14)

## Methods

### \_getAttributeName

▸ `Protected` **_getAttributeName**(`inputName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputName` | `string` |

#### Returns

`string`

#### Defined in

[field/baseField.ts:109](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-109)

___

### \_getLabelRequiredText

▸ `Protected` **_getLabelRequiredText**(`labelText`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `labelText` | `string` |

#### Returns

`string`

#### Defined in

[field/baseField.ts:382](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-382)

___

### \_getUpgradedNode

▸ `Private` **_getUpgradedNode**(): [`Item`](Item.md)<`HTMLElement`\>

#### Returns

[`Item`](Item.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:179](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-179)

___

### \_setActionContainer

▸ `Private` **_setActionContainer**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:325](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-325)

___

### \_setAdditionalLabel

▸ `Protected` **_setAdditionalLabel**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[field/baseField.ts:370](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-370)

___

### \_setInfo

▸ `Private` **_setInfo**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[field/baseField.ts:343](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-343)

___

### \_setInfoContainer

▸ `Private` **_setInfoContainer**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:308](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-308)

___

### \_setMutation

▸ `Private` **_setMutation**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:402](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-402)

___

### checkValidity

▸ **checkValidity**(`opt_force?`, `opt_showMessage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_force` | `boolean` | `false` |
| `opt_showMessage` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:140](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-140)

___

### eventChange

▸ **eventChange**(`value`, `previousValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `previousValue` | `any` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:55](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-55)

___

### eventClick

▸ **eventClick**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Item`](Item.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[field/baseField.ts:62](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-62)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:194](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-194)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:200](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-200)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:206](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-206)

___

### get

▸ **get**(`attribute`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attribute` | `string` |

#### Returns

`any`

#### Defined in

[field/baseField.ts:213](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-213)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[field/baseField.ts:93](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-93)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Defined in

[field/baseField.ts:86](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-86)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Defined in

[field/baseField.ts:100](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-100)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:289](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-289)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:245](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-245)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:239](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-239)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:219](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-219)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:172](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-172)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:165](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-165)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:264](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-264)

___

### modelChange

▸ **modelChange**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:80](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-80)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:74](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-74)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:68](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-68)

___

### setDisabled

▸ **setDisabled**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:252](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-252)

___

### setError

▸ **setError**(`opt_message?`, `opt_isCustomError?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opt_message` | `string` | `''` |
| `opt_isCustomError` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:123](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-123)

___

### setLabel

▸ **setLabel**(`text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:298](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-298)

___

### setRequired

▸ **setRequired**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:226](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-226)

___

### setValue

▸ **setValue**(`value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:186](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-186)

___

### setVisibility

▸ **setVisibility**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Defined in

[field/baseField.ts:271](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-271)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:281](https://bitbucket.org/siposdani87/sui-js/src/5c73bef/src/field/baseField.ts#lines-281)
