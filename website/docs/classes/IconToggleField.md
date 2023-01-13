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

[field/iconToggleField.ts:19](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/iconToggleField.ts#L19)

## Properties

### actionContainerKnot

• **actionContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[actionContainerKnot](BaseCheckboxField.md#actioncontainerknot)

#### Defined in

[field/baseField.ts:20](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L20)

___

### checkedIcon

• **checkedIcon**: `string`

#### Defined in

[field/iconToggleField.ts:10](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/iconToggleField.ts#L10)

___

### dataLabelKnot

• **dataLabelKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[dataLabelKnot](BaseCheckboxField.md#datalabelknot)

#### Defined in

[field/baseCheckboxField.ts:14](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L14)

___

### disabled

• **disabled**: `boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[disabled](BaseCheckboxField.md#disabled)

#### Defined in

[field/baseField.ts:21](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L21)

___

### error

• **error**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[error](BaseCheckboxField.md#error)

#### Defined in

[field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L15)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[errorTooltip](BaseCheckboxField.md#errortooltip)

#### Defined in

[field/baseField.ts:18](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L18)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[form](BaseCheckboxField.md#form)

#### Defined in

[field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L17)

___

### hiddenInput

• **hiddenInput**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[hiddenInput](BaseCheckboxField.md#hiddeninput)

#### Defined in

[field/baseCheckboxField.ts:12](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L12)

___

### icon

• **icon**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Defined in

[field/iconToggleField.ts:12](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/iconToggleField.ts#L12)

___

### infoContainerKnot

• **infoContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[infoContainerKnot](BaseCheckboxField.md#infocontainerknot)

#### Defined in

[field/baseField.ts:19](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L19)

___

### input

• **input**: [`Knot`](Knot.md)<`HTMLInputElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[input](BaseCheckboxField.md#input)

#### Defined in

[field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L13)

___

### inputBlock

• **inputBlock**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[inputBlock](BaseCheckboxField.md#inputblock)

#### Defined in

[field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L16)

___

### label

• **label**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[label](BaseCheckboxField.md#label)

#### Defined in

[field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L14)

___

### spanLabel

• **spanLabel**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[spanLabel](BaseCheckboxField.md#spanlabel)

#### Defined in

[field/baseCheckboxField.ts:13](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L13)

___

### uncheckedIcon

• **uncheckedIcon**: `string`

#### Defined in

[field/iconToggleField.ts:11](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/iconToggleField.ts#L11)

## Methods

### \_change

▸ `Protected` **_change**(): `void`

#### Returns

`void`

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[_change](BaseCheckboxField.md#_change)

#### Defined in

[field/iconToggleField.ts:72](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/iconToggleField.ts#L72)

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

[field/baseField.ts:109](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L109)

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

[field/baseField.ts:383](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L383)

___

### \_init

▸ `Protected` **_init**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[_init](BaseCheckboxField.md#_init)

#### Defined in

[field/baseCheckboxField.ts:34](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L34)

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

[field/baseField.ts:371](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L371)

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

[field/baseField.ts:140](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L140)

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

[field/baseField.ts:55](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L55)

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

[field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L62)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[exists](BaseCheckboxField.md#exists)

#### Defined in

[field/baseField.ts:195](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L195)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[existsInput](BaseCheckboxField.md#existsinput)

#### Defined in

[field/baseField.ts:201](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L201)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[existsInputBlock](BaseCheckboxField.md#existsinputblock)

#### Defined in

[field/baseField.ts:207](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L207)

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

[field/baseField.ts:214](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L214)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getName](BaseCheckboxField.md#getname)

#### Defined in

[field/baseField.ts:93](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L93)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getPreviousValue](BaseCheckboxField.md#getpreviousvalue)

#### Defined in

[field/baseField.ts:86](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L86)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[getValue](BaseCheckboxField.md#getvalue)

#### Defined in

[field/baseCheckboxField.ts:58](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L58)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[hide](BaseCheckboxField.md#hide)

#### Defined in

[field/baseField.ts:290](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L290)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isDisabled](BaseCheckboxField.md#isdisabled)

#### Defined in

[field/baseField.ts:246](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L246)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isEnabled](BaseCheckboxField.md#isenabled)

#### Defined in

[field/baseField.ts:240](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L240)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isRequired](BaseCheckboxField.md#isrequired)

#### Defined in

[field/baseField.ts:220](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L220)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isValid](BaseCheckboxField.md#isvalid)

#### Defined in

[field/baseField.ts:173](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L173)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isValidityValid](BaseCheckboxField.md#isvalidityvalid)

#### Defined in

[field/baseField.ts:165](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L165)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[isVisible](BaseCheckboxField.md#isvisible)

#### Defined in

[field/baseField.ts:265](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L265)

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

[field/baseField.ts:80](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L80)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[refresh](BaseCheckboxField.md#refresh)

#### Defined in

[field/baseCheckboxField.ts:121](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L121)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[BaseCheckboxField](BaseCheckboxField.md).[render](BaseCheckboxField.md#render)

#### Defined in

[field/iconToggleField.ts:31](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/iconToggleField.ts#L31)

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

[field/baseCheckboxField.ts:94](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L94)

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

[field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L123)

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

[field/baseCheckboxField.ts:112](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseCheckboxField.ts#L112)

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

[field/baseField.ts:227](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L227)

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

[field/iconToggleField.ts:86](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/iconToggleField.ts#L86)

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

[field/baseField.ts:272](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L272)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[BaseCheckboxField](BaseCheckboxField.md).[show](BaseCheckboxField.md#show)

#### Defined in

[field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/b0b5d62/src/field/baseField.ts#L282)
