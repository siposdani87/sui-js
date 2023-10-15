---
id: "BaseField"
title: "Class: BaseField<T>"
sidebar_label: "BaseField"
sidebar_position: 0
custom_edit_url: null
---

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
| `input` | [`Knot`](Knot.md)<`T`\> |
| `opt_label?` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `opt_error?` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `opt_inputBlock?` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `opt_form?` | [`Form`](Form.md) |

#### Defined in

[field/baseField.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L19)

## Properties

### actionContainerKnot

• **actionContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L16)

___

### disabled

• **disabled**: `boolean`

#### Defined in

[field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L17)

___

### error

• **error**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L11)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Defined in

[field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L14)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Defined in

[field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L13)

___

### infoContainerKnot

• **infoContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L15)

___

### input

• **input**: [`Knot`](Knot.md)<`T`\>

#### Defined in

[field/baseField.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L9)

___

### inputBlock

• **inputBlock**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L12)

___

### label

• **label**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L10)

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

[field/baseField.ts:77](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L77)

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

[field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L282)

___

### \_getUpgradedKnot

▸ `Private` **_getUpgradedKnot**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:133](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L133)

___

### \_setActionContainer

▸ `Private` **_setActionContainer**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:237](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L237)

___

### \_setAdditionalLabel

▸ `Protected` **_setAdditionalLabel**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[field/baseField.ts:274](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L274)

___

### \_setInfo

▸ `Private` **_setInfo**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[field/baseField.ts:251](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L251)

___

### \_setInfoContainer

▸ `Private` **_setInfoContainer**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:223](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L223)

___

### \_setMutation

▸ `Private` **_setMutation**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:299](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L299)

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

[field/baseField.ts:100](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L100)

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

[field/baseField.ts:42](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L42)

___

### eventClick

▸ **eventClick**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Defined in

[field/baseField.ts:46](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L46)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:143](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L143)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:147](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L147)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:151](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L151)

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

[field/baseField.ts:155](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L155)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[field/baseField.ts:67](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L67)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Defined in

[field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L62)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Defined in

[field/baseField.ts:72](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L72)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:210](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L210)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:178](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L178)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:174](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L174)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:159](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L159)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:129](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L129)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L123)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:192](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L192)

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

[field/baseField.ts:58](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L58)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:54](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L54)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:50](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L50)

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

[field/baseField.ts:182](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L182)

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

[field/baseField.ts:87](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L87)

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

[field/baseField.ts:216](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L216)

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

[field/baseField.ts:163](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L163)

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

[field/baseField.ts:137](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L137)

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

[field/baseField.ts:196](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L196)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:204](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L204)
