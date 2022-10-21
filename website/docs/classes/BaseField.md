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
| `input` | [`Knot`](Knot.md)<`T`\> |
| `opt_label?` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `opt_error?` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `opt_inputBlock?` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `opt_form?` | [`Form`](Form.md) |

#### Defined in

[field/baseField.ts:29](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L29)

## Properties

### actionContainerKnot

• **actionContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:20](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L20)

___

### disabled

• **disabled**: `boolean`

#### Defined in

[field/baseField.ts:21](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L21)

___

### error

• **error**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L15)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Defined in

[field/baseField.ts:18](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L18)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Defined in

[field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L17)

___

### infoContainerKnot

• **infoContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:19](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L19)

___

### input

• **input**: [`Knot`](Knot.md)<`T`\>

#### Defined in

[field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L13)

___

### inputBlock

• **inputBlock**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L16)

___

### label

• **label**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L14)

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

[field/baseField.ts:109](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L109)

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

[field/baseField.ts:383](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L383)

___

### \_getUpgradedKnot

▸ `Private` **_getUpgradedKnot**(): [`Knot`](Knot.md)<`HTMLElement`\>

#### Returns

[`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/baseField.ts:180](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L180)

___

### \_setActionContainer

▸ `Private` **_setActionContainer**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:326](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L326)

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

[field/baseField.ts:371](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L371)

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

[field/baseField.ts:344](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L344)

___

### \_setInfoContainer

▸ `Private` **_setInfoContainer**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:309](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L309)

___

### \_setMutation

▸ `Private` **_setMutation**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:403](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L403)

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

[field/baseField.ts:140](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L140)

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

[field/baseField.ts:55](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L55)

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

[field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L62)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:195](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L195)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:201](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L201)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:207](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L207)

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

[field/baseField.ts:214](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L214)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Defined in

[field/baseField.ts:93](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L93)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Defined in

[field/baseField.ts:86](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L86)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Defined in

[field/baseField.ts:100](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L100)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:290](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L290)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:246](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L246)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:240](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L240)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:220](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L220)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:173](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L173)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:165](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L165)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[field/baseField.ts:265](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L265)

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

[field/baseField.ts:80](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L80)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:74](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L74)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:68](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L68)

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

[field/baseField.ts:253](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L253)

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

[field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L123)

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

[field/baseField.ts:299](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L299)

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

[field/baseField.ts:227](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L227)

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

[field/baseField.ts:187](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L187)

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

[field/baseField.ts:272](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L272)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Defined in

[field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/cc9117e/src/field/baseField.ts#L282)
