---
id: "RadiobuttonField"
title: "Class: RadiobuttonField"
sidebar_label: "RadiobuttonField"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseField`](BaseField.md)\<`HTMLInputElement`\>

  ↳ **`RadiobuttonField`**

## Constructors

### constructor

• **new RadiobuttonField**(`input`, `label`, `error`, `inputBlock`, `form`): [`RadiobuttonField`](RadiobuttonField.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Knot`](Knot.md)\<`HTMLInputElement`\> |
| `label` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `error` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `inputBlock` | [`Knot`](Knot.md)\<`HTMLElement`\> |
| `form` | [`Form`](Form.md) |

#### Returns

[`RadiobuttonField`](RadiobuttonField.md)

#### Overrides

[BaseField](BaseField.md).[constructor](BaseField.md#constructor)

#### Defined in

[field/radiobuttonField.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L12)

## Properties

### actionContainerKnot

• **actionContainerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[actionContainerKnot](BaseField.md#actioncontainerknot)

#### Defined in

[field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L16)

___

### dataLabelKnot

• **dataLabelKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[field/radiobuttonField.ts:9](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L9)

___

### disabled

• **disabled**: `boolean`

#### Inherited from

[BaseField](BaseField.md).[disabled](BaseField.md#disabled)

#### Defined in

[field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L17)

___

### error

• **error**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[error](BaseField.md#error)

#### Defined in

[field/baseField.ts:11](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L11)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Inherited from

[BaseField](BaseField.md).[errorTooltip](BaseField.md#errortooltip)

#### Defined in

[field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L14)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Inherited from

[BaseField](BaseField.md).[form](BaseField.md#form)

#### Defined in

[field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L13)

___

### infoContainerKnot

• **infoContainerKnot**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[infoContainerKnot](BaseField.md#infocontainerknot)

#### Defined in

[field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L15)

___

### input

• **input**: [`Knot`](Knot.md)\<`HTMLInputElement`\>

#### Inherited from

[BaseField](BaseField.md).[input](BaseField.md#input)

#### Defined in

[field/baseField.ts:9](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L9)

___

### inputBlock

• **inputBlock**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[inputBlock](BaseField.md#inputblock)

#### Defined in

[field/baseField.ts:12](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L12)

___

### label

• **label**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[label](BaseField.md#label)

#### Defined in

[field/baseField.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L10)

___

### spanLabel

• **spanLabel**: [`Knot`](Knot.md)\<`HTMLElement`\>

#### Defined in

[field/radiobuttonField.ts:10](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L10)

## Methods

### \_change

▸ **_change**(): `void`

#### Returns

`void`

#### Defined in

[field/radiobuttonField.ts:35](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L35)

___

### \_getAttributeName

▸ **_getAttributeName**(`inputName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputName` | `string` |

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[_getAttributeName](BaseField.md#_getattributename)

#### Defined in

[field/baseField.ts:77](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L77)

___

### \_getLabelRequiredText

▸ **_getLabelRequiredText**(`labelText`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `labelText` | `string` |

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[_getLabelRequiredText](BaseField.md#_getlabelrequiredtext)

#### Defined in

[field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L282)

___

### \_getRadioButtonInputs

▸ **_getRadioButtonInputs**(): [`Query`](Query.md)\<`HTMLInputElement`\>

#### Returns

[`Query`](Query.md)\<`HTMLInputElement`\>

#### Defined in

[field/radiobuttonField.ts:154](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L154)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[field/radiobuttonField.ts:23](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L23)

___

### \_setAdditionalLabel

▸ **_setAdditionalLabel**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[_setAdditionalLabel](BaseField.md#_setadditionallabel)

#### Defined in

[field/baseField.ts:274](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L274)

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

[BaseField](BaseField.md).[checkValidity](BaseField.md#checkvalidity)

#### Defined in

[field/baseField.ts:100](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L100)

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

[BaseField](BaseField.md).[eventChange](BaseField.md#eventchange)

#### Defined in

[field/baseField.ts:42](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L42)

___

### eventClick

▸ **eventClick**(`knot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `knot` | [`Knot`](Knot.md)\<`HTMLElement`\> |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[eventClick](BaseField.md#eventclick)

#### Defined in

[field/baseField.ts:46](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L46)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[exists](BaseField.md#exists)

#### Defined in

[field/baseField.ts:143](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L143)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInput](BaseField.md#existsinput)

#### Defined in

[field/baseField.ts:147](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L147)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInputBlock](BaseField.md#existsinputblock)

#### Defined in

[field/baseField.ts:151](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L151)

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

[BaseField](BaseField.md).[get](BaseField.md#get)

#### Defined in

[field/baseField.ts:155](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L155)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[getName](BaseField.md#getname)

#### Defined in

[field/baseField.ts:67](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L67)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseField](BaseField.md).[getPreviousValue](BaseField.md#getpreviousvalue)

#### Defined in

[field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L62)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Overrides

[BaseField](BaseField.md).[getValue](BaseField.md#getvalue)

#### Defined in

[field/radiobuttonField.ts:111](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L111)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[hide](BaseField.md#hide)

#### Defined in

[field/baseField.ts:210](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L210)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Overrides

[BaseField](BaseField.md).[isDisabled](BaseField.md#isdisabled)

#### Defined in

[field/radiobuttonField.ts:144](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L144)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isEnabled](BaseField.md#isenabled)

#### Defined in

[field/baseField.ts:174](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L174)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isRequired](BaseField.md#isrequired)

#### Defined in

[field/baseField.ts:159](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L159)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValid](BaseField.md#isvalid)

#### Defined in

[field/baseField.ts:129](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L129)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValidityValid](BaseField.md#isvalidityvalid)

#### Defined in

[field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L123)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isVisible](BaseField.md#isvisible)

#### Defined in

[field/baseField.ts:192](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L192)

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

[BaseField](BaseField.md).[modelChange](BaseField.md#modelchange)

#### Defined in

[field/baseField.ts:58](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L58)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[refresh](BaseField.md#refresh)

#### Defined in

[field/radiobuttonField.ts:79](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L79)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[render](BaseField.md#render)

#### Defined in

[field/radiobuttonField.ts:52](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L52)

___

### setDisabled

▸ **setDisabled**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `boolean` |

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[setDisabled](BaseField.md#setdisabled)

#### Defined in

[field/radiobuttonField.ts:122](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L122)

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

[BaseField](BaseField.md).[setError](BaseField.md#seterror)

#### Defined in

[field/baseField.ts:87](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L87)

___

### setLabel

▸ **setLabel**(`text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[setLabel](BaseField.md#setlabel)

#### Defined in

[field/radiobuttonField.ts:162](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L162)

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

[BaseField](BaseField.md).[setRequired](BaseField.md#setrequired)

#### Defined in

[field/baseField.ts:163](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L163)

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

[BaseField](BaseField.md).[setValue](BaseField.md#setvalue)

#### Defined in

[field/radiobuttonField.ts:94](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/radiobuttonField.ts#L94)

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

[BaseField](BaseField.md).[setVisibility](BaseField.md#setvisibility)

#### Defined in

[field/baseField.ts:196](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L196)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[show](BaseField.md#show)

#### Defined in

[field/baseField.ts:204](https://github.com/siposdani87/sui-js/blob/9aff0f0/src/field/baseField.ts#L204)
