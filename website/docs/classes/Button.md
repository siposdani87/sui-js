---
id: "Button"
title: "Class: Button"
sidebar_label: "Button"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseField`](BaseField.md)<`HTMLInputElement`\>

  ↳ **`Button`**

## Constructors

### constructor

• **new Button**(`input`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`Knot`](Knot.md)<`HTMLInputElement`\> |

#### Overrides

[BaseField](BaseField.md).[constructor](BaseField.md#constructor)

#### Defined in

[field/button.ts:13](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/button.ts#L13)

## Properties

### actionContainerKnot

• **actionContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[actionContainerKnot](BaseField.md#actioncontainerknot)

#### Defined in

[field/baseField.ts:20](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L20)

___

### disabled

• **disabled**: `boolean`

#### Inherited from

[BaseField](BaseField.md).[disabled](BaseField.md#disabled)

#### Defined in

[field/baseField.ts:21](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L21)

___

### error

• **error**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[error](BaseField.md#error)

#### Defined in

[field/baseField.ts:15](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L15)

___

### errorTooltip

• **errorTooltip**: [`Tooltip`](Tooltip.md)

#### Inherited from

[BaseField](BaseField.md).[errorTooltip](BaseField.md#errortooltip)

#### Defined in

[field/baseField.ts:18](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L18)

___

### form

• `Optional` **form**: [`Form`](Form.md)

#### Inherited from

[BaseField](BaseField.md).[form](BaseField.md#form)

#### Defined in

[field/baseField.ts:17](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L17)

___

### infoContainerKnot

• **infoContainerKnot**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[infoContainerKnot](BaseField.md#infocontainerknot)

#### Defined in

[field/baseField.ts:19](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L19)

___

### input

• **input**: [`Knot`](Knot.md)<`HTMLInputElement`\>

#### Inherited from

[BaseField](BaseField.md).[input](BaseField.md#input)

#### Defined in

[field/baseField.ts:13](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L13)

___

### inputBlock

• **inputBlock**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[inputBlock](BaseField.md#inputblock)

#### Defined in

[field/baseField.ts:16](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L16)

___

### label

• **label**: [`Knot`](Knot.md)<`HTMLElement`\>

#### Inherited from

[BaseField](BaseField.md).[label](BaseField.md#label)

#### Defined in

[field/baseField.ts:14](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L14)

## Methods

### \_getAttributeName

▸ `Protected` **_getAttributeName**(`inputName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputName` | `string` |

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[_getAttributeName](BaseField.md#_getattributename)

#### Defined in

[field/baseField.ts:109](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L109)

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

[BaseField](BaseField.md).[_getLabelRequiredText](BaseField.md#_getlabelrequiredtext)

#### Defined in

[field/baseField.ts:383](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L383)

___

### \_init

▸ `Private` **_init**(): `void`

#### Returns

`void`

#### Defined in

[field/button.ts:21](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/button.ts#L21)

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

[BaseField](BaseField.md).[_setAdditionalLabel](BaseField.md#_setadditionallabel)

#### Defined in

[field/baseField.ts:371](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L371)

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

[field/baseField.ts:140](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L140)

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

[field/baseField.ts:55](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L55)

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

[BaseField](BaseField.md).[eventClick](BaseField.md#eventclick)

#### Defined in

[field/baseField.ts:62](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L62)

___

### exists

▸ **exists**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[exists](BaseField.md#exists)

#### Defined in

[field/baseField.ts:195](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L195)

___

### existsInput

▸ **existsInput**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInput](BaseField.md#existsinput)

#### Defined in

[field/baseField.ts:201](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L201)

___

### existsInputBlock

▸ **existsInputBlock**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[existsInputBlock](BaseField.md#existsinputblock)

#### Defined in

[field/baseField.ts:207](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L207)

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

[field/baseField.ts:214](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L214)

___

### getName

▸ **getName**(): `string`

#### Returns

`string`

#### Inherited from

[BaseField](BaseField.md).[getName](BaseField.md#getname)

#### Defined in

[field/baseField.ts:93](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L93)

___

### getPreviousValue

▸ **getPreviousValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseField](BaseField.md).[getPreviousValue](BaseField.md#getpreviousvalue)

#### Defined in

[field/baseField.ts:86](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L86)

___

### getValue

▸ **getValue**(): `any`

#### Returns

`any`

#### Inherited from

[BaseField](BaseField.md).[getValue](BaseField.md#getvalue)

#### Defined in

[field/baseField.ts:100](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L100)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[hide](BaseField.md#hide)

#### Defined in

[field/baseField.ts:290](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L290)

___

### isDisabled

▸ **isDisabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isDisabled](BaseField.md#isdisabled)

#### Defined in

[field/baseField.ts:246](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L246)

___

### isEnabled

▸ **isEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isEnabled](BaseField.md#isenabled)

#### Defined in

[field/baseField.ts:240](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L240)

___

### isRequired

▸ **isRequired**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isRequired](BaseField.md#isrequired)

#### Defined in

[field/baseField.ts:220](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L220)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValid](BaseField.md#isvalid)

#### Defined in

[field/baseField.ts:173](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L173)

___

### isValidityValid

▸ **isValidityValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isValidityValid](BaseField.md#isvalidityvalid)

#### Defined in

[field/baseField.ts:165](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L165)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseField](BaseField.md).[isVisible](BaseField.md#isvisible)

#### Defined in

[field/baseField.ts:265](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L265)

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

[field/baseField.ts:80](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L80)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[refresh](BaseField.md#refresh)

#### Defined in

[field/button.ts:46](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/button.ts#L46)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Overrides

[BaseField](BaseField.md).[render](BaseField.md#render)

#### Defined in

[field/button.ts:28](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/button.ts#L28)

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

[BaseField](BaseField.md).[setDisabled](BaseField.md#setdisabled)

#### Defined in

[field/baseField.ts:253](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L253)

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

[field/baseField.ts:123](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L123)

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

[BaseField](BaseField.md).[setLabel](BaseField.md#setlabel)

#### Defined in

[field/baseField.ts:299](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L299)

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

[field/baseField.ts:227](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L227)

___

### setValue

▸ **setValue**(`value?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[setValue](BaseField.md#setvalue)

#### Defined in

[field/baseField.ts:187](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L187)

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

[field/baseField.ts:272](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L272)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[BaseField](BaseField.md).[show](BaseField.md#show)

#### Defined in

[field/baseField.ts:282](https://github.com/siposdani87/sui-js/blob/4b75724/src/field/baseField.ts#L282)
