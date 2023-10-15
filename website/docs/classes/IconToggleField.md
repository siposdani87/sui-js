---
id: "IconToggleField"
title: "Class: IconToggleField"
sidebar_label: "IconToggleField"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseCheckboxField`](BaseCheckboxField.md)

  ↳ **`IconToggleField`**

## Constructors

### constructor

• **new IconToggleField**(`input`, `label`, `error`, `inputBlock`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Knot`](Knot.md)<`HTMLInputElement`\> |
| `label` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `error` | [`Knot`](Knot.md)<`HTMLElement`\> |
| `inputBlock` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[constructor](BaseCheckboxField.md#constructor)

#### Defined in

[field/iconToggleField.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/iconToggleField.ts#L10)

## Properties

### actionContainerKnot

• **actionContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[actionContainerKnot](BaseCheckboxField.md#actioncontainerknot)

#### Defined in

[field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L16)

___

### checkedIcon

• **checkedIcon**: `string`

#### Defined in

[field/iconToggleField.ts:6](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/iconToggleField.ts#L6)

___

### dataLabelKnot

• **dataLabelKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[dataLabelKnot](BaseCheckboxField.md#datalabelknot)

#### Defined in

[field/baseCheckboxField.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L10)

___

### disabled

• **disabled**: `boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[disabled](BaseCheckboxField.md#disabled)

#### Defined in

[field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L17)

___

### error

• **error**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[error](BaseCheckboxField.md#error)

#### Defined in

[field/baseField.ts:11](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L11)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[errorTooltip](BaseCheckboxField.md#errortooltip)

#### Defined in

[field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L14)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[form](BaseCheckboxField.md#form)

#### Defined in

[field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L13)

___

### hiddenInput

• **hiddenInput**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[hiddenInput](BaseCheckboxField.md#hiddeninput)

#### Defined in

[field/baseCheckboxField.ts:8](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L8)

___

### icon

• **icon**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/iconToggleField.ts:8](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/iconToggleField.ts#L8)

___

### infoContainerKnot

• **infoContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[infoContainerKnot](BaseCheckboxField.md#infocontainerknot)

#### Defined in

[field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L15)

___

### input

• **input**: [`Knot`](Knot.md)<`HTMLInputElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[input](BaseCheckboxField.md#input)

#### Defined in

[field/baseField.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L9)

___

### inputBlock

• **inputBlock**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[inputBlock](BaseCheckboxField.md#inputblock)

#### Defined in

[field/baseField.ts:12](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L12)

___

### label

• **label**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[label](BaseCheckboxField.md#label)

#### Defined in

[field/baseField.ts:10](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L10)

___

### spanLabel

• **spanLabel**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[spanLabel](BaseCheckboxField.md#spanlabel)

#### Defined in

[field/baseCheckboxField.ts:9](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L9)

___

### uncheckedIcon

• **uncheckedIcon**: `string`

#### Defined in

[field/iconToggleField.ts:7](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/iconToggleField.ts#L7)

## Methods

### \_change

▸ `Protected` **_change**(): `void`

#### Returns

`void`

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[_change](BaseCheckboxField.md#_change)

#### Defined in

[field/iconToggleField.ts:56](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/iconToggleField.ts#L56)

___

### \_getAttributeName

▸ `Protected` **_getAttributeName**(`inputName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputName` | `string` |

#### Returns

`string`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[_getAttributeName](BaseCheckboxField.md#_getattributename)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[_getLabelRequiredText](BaseCheckboxField.md#_getlabelrequiredtext)

#### Defined in

[field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L282)

___

### \_init

▸ `Protected` **_init**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[_init](BaseCheckboxField.md#_init)

#### Defined in

[field/baseCheckboxField.ts:22](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L22)

___

### \_setAdditionalLabel

▸ `Protected` **_setAdditionalLabel**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | [`Knot`](Knot.md)<`HTMLElement`\> |

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[_setAdditionalLabel](BaseCheckboxField.md#_setadditionallabel)

#### Defined in

[field/baseField.ts:274](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L274)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[checkValidity](BaseCheckboxField.md#checkvalidity)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[eventChange](BaseCheckboxField.md#eventchange)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[eventClick](BaseCheckboxField.md#eventclick)

#### Defined in

[field/baseField.ts:46](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L46)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[exists](BaseCheckboxField.md#exists)

#### Defined in

[field/baseField.ts:143](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L143)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[existsInput](BaseCheckboxField.md#existsinput)

#### Defined in

[field/baseField.ts:147](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L147)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[existsInputBlock](BaseCheckboxField.md#existsinputblock)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[get](BaseCheckboxField.md#get)

#### Defined in

[field/baseField.ts:155](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L155)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getName](BaseCheckboxField.md#getname)

#### Defined in

[field/baseField.ts:67](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L67)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getPreviousValue](BaseCheckboxField.md#getpreviousvalue)

#### Defined in

[field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L62)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getValue](BaseCheckboxField.md#getvalue)

#### Defined in

[field/baseCheckboxField.ts:40](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L40)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[hide](BaseCheckboxField.md#hide)

#### Defined in

[field/baseField.ts:210](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L210)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isDisabled](BaseCheckboxField.md#isdisabled)

#### Defined in

[field/baseField.ts:178](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L178)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isEnabled](BaseCheckboxField.md#isenabled)

#### Defined in

[field/baseField.ts:174](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L174)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isRequired](BaseCheckboxField.md#isrequired)

#### Defined in

[field/baseField.ts:159](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L159)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isValid](BaseCheckboxField.md#isvalid)

#### Defined in

[field/baseField.ts:129](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L129)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isValidityValid](BaseCheckboxField.md#isvalidityvalid)

#### Defined in

[field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L123)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isVisible](BaseCheckboxField.md#isvisible)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[modelChange](BaseCheckboxField.md#modelchange)

#### Defined in

[field/baseField.ts:58](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L58)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[refresh](BaseCheckboxField.md#refresh)

#### Defined in

[field/baseCheckboxField.ts:89](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L89)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[render](BaseCheckboxField.md#render)

#### Defined in

[field/iconToggleField.ts:19](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/iconToggleField.ts#L19)

___

### setDisabled

▸ **setDisabled**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[setDisabled](BaseCheckboxField.md#setdisabled)

#### Defined in

[field/baseCheckboxField.ts:68](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L68)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[setError](BaseCheckboxField.md#seterror)

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

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[setLabel](BaseCheckboxField.md#setlabel)

#### Defined in

[field/baseCheckboxField.ts:82](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseCheckboxField.ts#L82)

___

### setRequired

▸ **setRequired**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[setRequired](BaseCheckboxField.md#setrequired)

#### Defined in

[field/baseField.ts:163](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L163)

___

### setValue

▸ **setValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` \| `boolean` \| `Object` \| `Function` \| `any`[] |

#### Returns

`void`

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[setValue](BaseCheckboxField.md#setvalue)

#### Defined in

[field/iconToggleField.ts:66](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/iconToggleField.ts#L66)

___

### setVisibility

▸ **setVisibility**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[setVisibility](BaseCheckboxField.md#setvisibility)

#### Defined in

[field/baseField.ts:196](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L196)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[show](BaseCheckboxField.md#show)

#### Defined in

[field/baseField.ts:204](https://github.com/siposdani87/sui-js/blob/ad456a5/src/field/baseField.ts#L204)
